import React, { Component } from 'react';

import HelloWorld from './HelloWorld';
import AddGreeter from './AddGreeter';
import HelloMap from './HelloMap';
import './HelloWorldList.css';

class HelloWorldList extends Component {
    renderGreetings() {
        let ret = [];
        for(let person of this.props.greetings) {
            ret.push((
                <HelloWorld
                    key={person.id}
                    person={person}
                    removeGreeting={this.props.removeGreeting}
                />
            ));
        }
        return ret;
    }

    render() {
        return (
            <div className="HelloWorldList">
                <AddGreeter addGreeting={this.props.addGreeting} />
                {this.renderGreetings()}
                <HelloMap/>
            </div>
        );
    }
}

export default HelloWorldList;
