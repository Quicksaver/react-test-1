import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Mingle.css';

class Mingle extends Component {
    render() {
        let person;
        let id = parseInt(this.props.match.params.person, 10);
        for(let greeting of this.props.greetings) {
            if(greeting.id === id) {
                person = greeting;
                break;
            }
        }
        if(!person) {
            return (
                <div className="Mingle">
                    <Link to="/">Lets meet someone else.</Link>
                </div>
            );
        }

        return (
            <div className="Mingle">
                How nice to see you here, {person.first} {person.last}!
                <br/>
                <Link to="/">Lets meet someone else.</Link>
            </div>
        );
    }
}

export default Mingle;
