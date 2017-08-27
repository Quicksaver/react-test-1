import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import UsersAPI from './UsersAPI';
import HelloWorldList from './HelloWorldList';
import Mingle from './Mingle';

class App extends Component {
	constructor(props) {
        super(props);
        this.state = { greetings: [], nextId: 1 };
    }

    componentDidMount() {
        UsersAPI.all()
			.then((greetings) => {
				this.setState({ greetings });
			});
    }

	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={HelloWorldList}/>
					<Route path="/mingle/:person" component={Mingle}/>
				</Switch>
			</div>
		);
	}
}

export default App;
