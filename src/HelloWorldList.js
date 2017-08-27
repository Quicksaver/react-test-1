import React, { Component } from 'react';

import UsersAPI from './UsersAPI';
import HelloWorld from './HelloWorld';
import AddGreeter from './AddGreeter';
import HelloMap from './HelloMap';
import './HelloWorldList.css';

class HelloWorldList extends Component {
	constructor(props) {
        super(props);
        this.state = { greetings: [], nextId: 1 };
    }

    componentDidMount() {
        UsersAPI.register(this);
        this.dataChanged();
    }

    componentWillUnmount() {
        UsersAPI.unregister(this);
    }

    dataChanged() {
        UsersAPI.all()
			.then((greetings) => {
				this.setState({ greetings });
			});
    }

    renderGreetings() {
        let ret = [];
        for(let person of this.state.greetings) {
            ret.push((
                <HelloWorld
                    key={person.id}
                    person={person}
                />
            ));
        }
        return ret;
    }

    render() {
        return (
            <div className="HelloWorldList">
                <AddGreeter/>
                {this.renderGreetings()}
                <HelloMap/>
            </div>
        );
    }
}

export default HelloWorldList;
