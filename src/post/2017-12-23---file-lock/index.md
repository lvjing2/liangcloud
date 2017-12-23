---
path: "/blog"
date: "2017-12-23T12:13:33.962Z"
title: "高并发文件读写"
tags: 
    - "cloud"
draft: false
---


闲来无事，硬扯了个蛋。

目前着手的项目，是关于一个用文件做缓存的。具体过程是页面的每个请求都会触发一个线程来读取资源文件，当文件系统里不存在该文件时，则会从数据库中读取并编译出资源对象，然后序列化并保存到文件中。这样下次访问该页面时直接从文件系统中读取即可，这样达到了加速页面访问的效果。

这样的设计没什么问题，但实际实现中会有多线程同时读取同一个文件，并且某些现成读取该文件的时候其他线程可能正在写这个文件。所以这里需要进行文件同步。这里就需要对单个文件进行锁定，所以研究了一下文件锁`FileLock`.

说到`FileLock`，就必须理解`nio`。`NIO`是最新一代的IO模型，是`BIO`的升级。`NIO`最主要的特点是

`BIO`是基于stream的IO操作，一次操作只能读或写一个byte，这样是非常容易创建数据的filter,以及filter Chain，但是缺点是速度慢。`NIO`是基于block的IO操作，一次操作可以读或者写一个数据block，速度自然就快了。`NIO`还有个更重要的特点就是将原本`BIO`中需要进行用户空间和内科空间进行buffer拷贝操作完全编程由系统内核间的拷贝，这对性能有非常大的提升。当然随着java自身的优化，原先`BIO`的一些基于stream的api也改成基于block的实现，从而优化了部分`BIO`api的运行速度。Java`NIO`中还提供了非常有用的功能，比如`Memory-mapped file IO`以及本文的重点`File Lock`等。

文件锁实际上和普通的java对象锁类似，都是advisory锁，主要用来在一个系统的不同部分对同一个文件的读写操作进行协作。通过文件锁可以锁住整个文件，也可以锁住文件的某一部分。如果获得了独占锁，那么系统的其他地方就不能获取这个文件或者这个文件被锁住的部分。如果获取的是共享锁，那么系统其他地方仍可以获取到这个锁，并访问这个文件。通过使用文件锁，就可以达到是文件的写操作原子化，同时不会对系统的其他部分造成干扰。

下面分享下如何使用文件锁解决项目中文件同时读写的问题。
1. 写线程中需要获取独占锁。
2. 读线程中不需要做任何特殊的处理。

```java
@Slf4j
public class WriteThread implements Runnable {

    File file;
    int writeTime;
    WriteThread(String fileName, int writeTime) {
        this.file = FileUtils.getFile(fileName);
        this.writeTime = writeTime;
    }

    @Override
    public void run() {
        String currentThreadName = Thread.currentThread().getName();
        try {
            FileChannel fileChannel = new RandomAccessFile(file, "rw").getChannel();
            FileLock fileLock = null;
            while(true) {
                try {
                    fileLock = fileChannel.tryLock();
                    break;
                } catch (Exception e) {
                    Thread.sleep(100);
                }
            }
            log.error("start write thread {}", currentThreadName);
            fileChannel.write(ByteBuffer.wrap(("=======" + currentThreadName + "========").getBytes()));
            Thread.sleep(writeTime);
            log.error("end write thread {}", currentThreadName);

            fileLock.release();
            fileChannel.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

```java
@Slf4j
public class ReadThread implements Runnable {
    File file;

    ReadThread(String fileName) {
        file = FileUtils.getFile(fileName);
   }

    @Override
    public void run() {
        String currentThreadName = Thread.currentThread().getName();
        try {
            FileInputStream fileInputStream = new FileInputStream(file);

            log.error("start read thread name: {}", currentThreadName);
            byte[] buffer = new byte[256];
            StringBuilder fileContent = new StringBuilder();
            int readLen = -1;
            while ((readLen = fileInputStream.read(buffer)) != -1) {
                fileContent.append(new String(buffer, 0, readLen));
            }
            log.info("read thread {} get file content: {}", currentThreadName, fileContent.toString());
            log.error("end read thread name: {}", currentThreadName);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

```java
@SpringBootApplication
@Slf4j
public class DemoApplication implements ApplicationRunner {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments applicationArguments) throws Exception {
		String fileName = "test.test";
		Files.deleteIfExists(FileUtils.getFile(fileName).toPath());
		ExecutorService executorService = Executors.newFixedThreadPool(10);
		executorService.execute(new WriteThread(fileName, 1000));
		executorService.execute(new WriteThread(fileName, 3000));
		Thread.sleep(50);
		// read when the first writing
		executorService.execute(new ReadThread(fileName));
		executorService.execute(new ReadThread(fileName));
		Thread.sleep(2000);
		// read when the send writing
		executorService.execute(new ReadThread(fileName));
		executorService.execute(new ReadThread(fileName));
		executorService.execute(new ReadThread(fileName));
		executorService.execute(new ReadThread(fileName));
		executorService.shutdown();
	}
}
```

运行结果如下：
```text
start write thread pool-1-thread-1
start read thread name: pool-1-thread-3
read thread pool-1-thread-3 get file content: =======pool-1-thread-1========
end read thread name: pool-1-thread-3
start read thread name: pool-1-thread-4
read thread pool-1-thread-4 get file content: =======pool-1-thread-1========
end read thread name: pool-1-thread-4
end write thread pool-1-thread-1
start write thread pool-1-thread-2
start read thread name: pool-1-thread-5
start read thread name: pool-1-thread-6
start read thread name: pool-1-thread-8
start read thread name: pool-1-thread-7
read thread pool-1-thread-7 get file content: =======pool-1-thread-2========
end read thread name: pool-1-thread-7
read thread pool-1-thread-5 get file content: =======pool-1-thread-2========
read thread pool-1-thread-6 get file content: =======pool-1-thread-2========
read thread pool-1-thread-8 get file content: =======pool-1-thread-2========
end read thread name: pool-1-thread-5
end read thread name: pool-1-thread-6
end read thread name: pool-1-thread-8
end write thread pool-1-thread-2
```

结果非常理想，可以完美解决问题。赞一个