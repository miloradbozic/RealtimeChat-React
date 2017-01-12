import React, {Component} from 'react';

class User extends Component {

    onClick(e) {
        console.log(this.props.user.username);
    }
    render() {
        const {user} = this.props;

        return (
            <li>
                <a onClick={this.onClick.bind(this)}>
                    {user.username}
                </a>
            </li>
        )
    }
}

User.propTypes = {
    user: React.PropTypes.object.isRequired
}

export default User;