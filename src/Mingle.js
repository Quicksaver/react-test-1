import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Mingle.css';

class Mingle extends Component {
    render() {
        return (
            <div className="Mingle">
                How nice to see you here, {this.props.match.params.name}!
                <br/>
                <Link to="/">Lets meet someone else.</Link>
            </div>
        );
    }
}

export default Mingle;
