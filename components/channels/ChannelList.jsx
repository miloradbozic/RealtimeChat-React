import React, {Component} from 'react';
import Channel from './Channel.jsx';

class ChannelList extends Component {

        render() {
console.log("CH NAME" + this.props.channels);

            return (
                <ul>
                    {
                        this.props.channels.map( c => {
                            console.log(c);
                            return <Channel 
                                channel={c}
                                setChannel={this.props.setChannel}
                            />
                        })
                    }
                </ul>
            )
        }
}

ChannelList.propTypes = {
    channels:  React.PropTypes.array.isRequired,
    setChannel: React.PropTypes.func.isRequired
}

export default ChannelList;