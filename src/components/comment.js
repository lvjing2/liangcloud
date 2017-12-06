import React from "react"
import 'gitment/style/default.css'
import Gitment from 'gitment'

class Comment extends React.Component {
    renderComment() {
        if (!(this.props.loc === ``)) {
            const gitment = new Gitment({
                id: this.props.loc,
                owner: 'lvjing2',
                repo: 'liangcloud.cn',
                oauth: {
                    client_id: 'b429d0c43e3235b289d1',
                    client_secret: 'b9f56fef85de76cfb5d7e0be179dd75028e942c9',
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
