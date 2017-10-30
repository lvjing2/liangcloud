# 无服务云计算

Aws lambda的使用体验


1. Aws lambda的service less计算的使用过程中存在的问题
  - 难以确保整个计算服务的成功执行
  - 每个节点运行的状态难以追踪和维护，需要通过文件形式记录在S3上。
  - lambda function 的启动关闭缺少回调函数，无法实现当function出现无法捕捉的异常导致退出时，进行一些清理操作。
  - aws s3中没有文件夹的概念，所有的都是key.只是为了方便所以有可以list所有下一级子key的操作。aws s3中如果要获取某个prefix下的所有key的个数，必须要list出当前prefix的所有key，然后计算key的数量。这对于local文件系统是可以接受，但是对于s3上远程list会非常的耗时。如果s3提供这样小接口的话，其实就会方便很多。
  - 每个function的限制还是比较多的
    - 每个最长运行5min
    - 每个bucket最多只能有100个lambda function.
    - 一个role触发的同时计算的结点数最多只有1000个。
    - ...
    
  
   