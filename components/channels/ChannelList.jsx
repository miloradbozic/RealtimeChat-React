import React, {Component} from 'react';
import Channel from './Channel.jsx';

class ChannelList extends Component {
        render() {
            return (
                <ul>
                    {
                        this.props.channels.map( c => {
                            return <Channel 
                                channel={c}
                                key={c.id}
                                {...this.props}
                            />
                        })
                    }
                </ul>
            )
        }
}

ChannelList.propTypes = {
    channels:  React.PropTypes.array.isRequired,
    setChannel: React.PropTypes.func.isRequired,
    activeChannel: React.PropTypes.object.isRequired
}

export default ChannelList;