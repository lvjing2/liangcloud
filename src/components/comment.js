import React from "react"
import 'gitment/style/default.css'
import Gitment from 'gitment'

class Comment extends React.Component {
    componentDidMount() {
        const gitment = new Gitment({
            id: '',
            title: 'Gitment：使用 GitHub Issues 搭建评论系统',
            owner: 'lvjing2',
            repo: 'liangcloud.cn',
            oauth: {
                client_id: 'b429d0c43e3235b289d1',
                client_secret: 'b9f56fef85de76cfb5d7e0be179dd75028e942c9',
            },
        });
        gitment.render('commentContainer');
    }

    render() {
        return (
            <div>
                <div id='commentContainer'></div>
            </div>
        )
    }
}

export default Comment
