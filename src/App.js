import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HelloWorldList from './HelloWorldList';
import Mingle from './Mingle';

class App extends Component {
	constructor(props) {
        super(props);
        this.state = { greetings: [], nextId: 1 };

        this.addGreeting = this.addGreeting.bind(this);
        this.removeGreeting = this.removeGreeting.bind(this);
    }

    componentDidMount() {
        this.grabGreetings();
    }

    grabGreetings() {
        fetch("/greetings.json")
            .then((response) => {
                return response.json();
            })
            .then((greetings) => {
                if(greetings) {
					let nextId = 0;
					for(let x of greetings) {
						nextId = Math.max(nextId, x.id +1);
					}
                    this.setState({ greetings, nextId });
                }
            })
            .catch((ex) => {
                console.error(ex);
            });
    }

    addGreeting(newName) {
		let id = this.state.nextId;
        this.setState({ greetings: [...this.state.greetings, { id, first: newName, last: "Foobar" }], nextId: this.state.nextId +1 });
    }

    removeGreeting(person) {
        let filteredGreetings = [...this.state.greetings];
		for(let i = 0; i < filteredGreetings.length; i++) {
			if(filteredGreetings[i].id === person) {
				filteredGreetings.splice(i, 1);
				break;
			}
		}
        this.setState({ greetings: filteredGreetings });
    }

	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" render={(props) => (
						<HelloWorldList
							{...props}
							greetings={this.state.greetings}
							addGreeting={this.addGreeting}
							removeGreeting={this.removeGreeting}
						/>
					)}/>
					<Route path="/mingle/:person" render={(props) => (
						<Mingle
							{...props}
							greetings={this.state.greetings}
						/>
					)}/>
				</Switch>
			</div>
		);
	}
}

export default App;
