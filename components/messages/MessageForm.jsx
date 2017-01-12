import React, {Component} from 'react';

class MessageForm extends Component {

    onSubmit(e) {
        e.preventDefault();
        const node = this.refs.message;
        const message = node.value;
        this.props.addMessage(message);
        node.value = '';    //empty the input
    }

    render() {

        let input;

        if (this.props.activeChannel.id !== undefined) {
            input =  (<input 
                        className="form-control"
                        placeholder="Write Message"
                        type="text" 
                        ref="message"
            />);
        }
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                   {input}
                </div>
            </form>
        )
    }

}

MessageForm.propTypes = {
    addMessage: React.PropTypes.func.isRequired,
    activeChannel: React.PropTypes.object.isRequired
}

export default MessageForm;