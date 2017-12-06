---
path: "/blog"
date: "2017-07-06T12:57:12.962Z"
title: "关于这个站点"
tags: 
    - "life"
draft: false 
---

该站点使用的是[gatsby](https://www.gatsbyjs.org/)静态网站生成，据说具备了屌炸天的优势[gatsby特点](https://www.gatsbyjs.org/features/)，实际使用的体验也确实如此。

静态博客的一大特点就是快，访问速度快，部署简单。页面也不需要太复杂，能写点[markdown](https://guides.github.com/features/mastering-markdown/)就够了，在intellij idea里编写好markdown文本，然后再执行一句自己写的脚本就直接部署到线上了，比起[workpress](http://wordpress.org/)之类的重量级CMS,那真的是把至简至美做到了极致。。

这个站点还有一个特点就是，完全建立在[React](https://reactjs.net/)的渲染引擎基础上，使用[css-in-js](https://alligator.io/react/css-in-js-roundup-styling-react-components/)技术使得每个组件只需要一个js就能完成html/js/css的所有定义，各个模块之间高度组件化，编写页面代码非常顺畅，能够做到随心所欲的代码解耦和复用，写前端终于有种像写后端代码一样丝滑的感觉了，对前端开发好感倍增。丝滑的不要不要滴。。

但是也有不方便的地方，比如无法统计页面访问次数，评论系统也没有。统计页面访问次数，这个我就不要了，但是如果评论系统都没了，那写博客就有点就像是自娱自乐了,了无生趣了。所以还是捣鼓了一下，用[gitment](https://imsun.github.io/gitment/)把评论系统嵌进每个页面中。不过gitment要使用在基于React建立的站点的话，是需要自己写些代码的(注意传入的`loc`应该是url中的路径部分)：


```js
import React from "react"
import 'gitment/style/default.css'
import Gitment from 'gitment'

class Comment extends React.Component {
    renderComment() {
        if (!(this.props.loc === ``)) {
            const gitment = new Gitment({
                id: this.props.loc,
                owner: 'github的用户名',
                repo: '存储评论的项目名',
                oauth: {
                    client_id: 'github上提供的client ID',
                    client_secret: 'github上提供的client secret',
                },
            });
            gitment.render('commentContainer');
        }
    }

    componentDidMount() {
        this.renderComment();
    }

    componentDidUpdate() {
        this.renderComment();
    }

    render() {
        if (!(this.props.loc === ``)) {
            return (
                <div>
                    <div id='commentContainer'></div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default Comment 
```

当然这个站点主要就是分享一些工作和生活中的事情为主的。
