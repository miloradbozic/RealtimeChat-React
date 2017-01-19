import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx'
import UserSection from './users/UserSection.jsx'
import MessageSection from './messages/MessageSection.jsx'
import Socket from '../socket.js'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            channels : [],
            activeChannel: {},
            users: [],
            loggedUser : {id: 33, username: "milorad_bozic"},
            messages : [],
            connected : false
        }
    }
    
    componentDidMount() {
        let socket = this.socket = new Socket();
        socket.on('connect', this.onConnect.bind(this));
        socket.on('disconnect', this.onDisconnect.bind(this));
        socket.on('channel add', this.onAddChannel.bind(this));
        socket.on('user add', this.onAddUser.bind(this));
        socket.on('user edit', this.onEditUser.bind(this));
        socket.on('user remove', this.onRemoveUser.bind(this));
        socket.on('message add', this.onAddMessage.bind(this));
    }

    onConnect() {
        this.setState({connected : true});
        this.socket.emit('channel subscribe');
        this.socket.emit('user subscribe');
    }
    
    onDisconnect() {
        this.setState({connected : false});
    }

    onAddChannel(channel) {
        console.log("Add channel called from ws.");
        let {channels} = this.state;
        channels.push(channel);
        this.setState({channels});
    }

    addChannel(name) {
        console.log("Adding new channel.");
        this.socket.emit('channel add', {id: this.state.channels.length, name});
    }

    setChannel(activeChannel) {
        this.setState({activeChannel});
        this.socket.emit('message unsubscribe');
        this.setState({messages: []});
        this.socket.emit('message subscribe', {channelId: activeChannel.id});
    }

    addUser(username) {
        this.socket.emit('user add', {id: this.state.users.length, username: username});
    }

    onAddUser(user) {
        console.log("On addd user called from ws");
        let {users} = this.state;
        users.push(user);
        this.setState({users});
    }
    
    onEditUser(editUser) {
        let {users} = this.state;
        users = users.map(user => {
            if (editUser.id === user.id) {
                return editUser;
            }
            return user;
        });
        this.setState(users);
    }

    onRemoveUser(removeUser) {
        let {users} = this.state;
        users = users.filter(user => {
            return removeUser.id !== user.id;
        });
        this.setState(users);
    }

    setUsername(username) {
        this.socket.emit('user edit', {username});
    }

    onAddMessage(message) {

        let {messages} = this.state;
        messages.push(message);
        this.setState({messages});
    }

    addMessage(body) {
        let createdAt = new Date;
        let author = this.state.loggedUser.username;
        let {activeChannel} = this.state;
        let {messages} = this.state;

        let message = {
            id: messages.length,
            channelId: activeChannel.id,
            author: author,
            body: body,
            createdAt: createdAt
        };

        this.socket.emit('message add', message);
    }

    render() {
        let messageSection;
        
        if (this.state.activeChannel.id !== undefined) {
            console.log("Setting mewssage section");
            messageSection = (
                <MessageSection
                    {...this.state}
                    addMessage={this.addMessage.bind(this)}
                />
            );
        }

        console.log("active channel is", this.state.activeChannel, this.state.activeChannel.id, this.state.activeChannel.id !== undefined);

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