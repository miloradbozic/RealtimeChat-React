import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx'
import UserSection from './users/UserSection.jsx'
import MessageSection from './messages/MessageSection.jsx'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            channels : [],
            activeChannel: {},
            users: [
                {id :0, username: "popara"},
                {id :1, username: "john_lennon"}
            ],
            loggedUser : {id: 33, username: "milorad_bozic"},
            messages : [
                {
                    id :0,
                    author: 'milorad_bozic',
                    body: "Hello Friends, how are you tonight?",
                    createdAt: new Date()

                },
                {
                    id :1,
                    author: 'john_lennon',
                    body: "Hello to you too, motherfucker!?",
                    createdAt: new Date()

                }
            ]
        }
    }
    
    addChannel(name) {
        let {channels} = this.state;
        channels.push({id: channels.length, name});
        this.setState({channels});
        //TODO: send to server
    }

    setChannel(activeChannel) {
        this.setState({activeChannel});
        //TODO: Get channels messages from server
    }

    addUser(username) {
        let {users} = this.state;
        users.push({id: users.length, username});
        this.setState({users});
        //TODO: save on server
    }
    
    addMessage(messageBody) {
        let {messages} = this.state;
        const createdAt = new Date;
        const author = this.state.loggedUser.username;
        messages.push({
            id: messages.length,
            author: author,
            body: messageBody,
            createdAt: createdAt
        });
        this.setState({messages});
        //TODO: save to server
    }

    render() {


        let messageSection;
        if (this.state.activeChannel.id !== undefined) {
            messageSection = (
                <MessageSection
                    {...this.state}
                    addMessage={this.addMessage.bind(this)}
                />
            );
        }

        return (
            <div className="app">
                <div className="nav">
                    <ChannelSection 
                        {...this.state}
                        addChannel={this.addChannel.bind(this)}
                        setChannel={this.setChannel.bind(this)}
                    />
                    <div className="separator"/>
                    <UserSection
                        {...this.state}
                        addUser={this.addUser.bind(this)}
                    />
                </div>
                <div className="messages-container">
                    {messageSection}
                </div>
            </div>  
        )
    }
}

export default App;