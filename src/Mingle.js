import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import UsersAPI from './UsersAPI';
import './Mingle.css';

class Mingle extends Component {
    constructor(props) {
        super(props);
        this.state = { person: null };
    }

    componentDidMount() {
        UsersAPI.register(this);
        this.dataChanged();
    }

    componentWillUnmount() {
        UsersAPI.unregister(this);
    }

    dataChanged() {
        let id = parseInt(this.props.match.params.person, 10);
        UsersAPI.forId(id)
			.then((person) => {
				this.setState({ person });
			});
    }

    render() {
        if(!this.state.person) {
            return (
                <div className="Mingle">
                    <Link to="/">Lets meet someone else.</Link>
                </div>
            );
        }

        return (
            <div className="Mingle">
                How nice to see you here, {this.state.person.first} {this.state.person.last}!
                <br/>
                <Link to="/">Lets meet someone else.</Link>
            </div>
        );
    }
}

export default Mingle;
