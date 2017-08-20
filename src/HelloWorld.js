import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './HelloWorld.css';

class HelloWorld extends Component {
    constructor(props) {
        super(props);
        this.state = { greeting: 'Hello' };

        this.frenchify = this.frenchify.bind(this);
        this.removeGreeting = this.removeGreeting.bind(this);
    }

    removeGreeting() {
        this.props.removeGreeting(this.props.person.id);
    }

    frenchify() {
        this.setState({ greeting: 'Bonjour' });
    }

    render() {
        return (
            <div className="HelloWorld">
                {this.state.greeting} <Link to={{ pathname: '/mingle/'+this.props.person.id }}>{this.props.person.first}</Link>!
                <br/>
                <button className="frenchify" onClick={this.frenchify}>Frenchify!</button>
                &nbsp;&nbsp;
                <button className="remove" onClick={this.removeGreeting}>Remove</button>
            </div>
        );
    }
}

export default HelloWorld;
