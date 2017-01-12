import React, {Component} from 'react';
import moment from 'moment';

class Message extends Component {

    /*
    onClick(e) {
        e.preventDefault();

        const {setChannel, channel} = this.props;
        setChannel(channel);
    }
    */

    render() {
        const {message, user} = this.props;
        const createdAt = moment(message.createdAt).format('HH:mm MM/DD');

        return (
            <li className="message">
                <div className="author">
                    <strong>{message.author}</strong>
                    <i className="timestamp">{createdAt}</i>
                </div>
                <div className="body">{message.body}</div>
            </li>
        )
    }
}

Message.propTypes = {
    message: React.PropTypes.object.isRequired,
}

export default Message;