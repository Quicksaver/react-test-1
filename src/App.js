import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HelloWorldList from './HelloWorldList';
import Mingle from './Mingle';

const App = () => {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={HelloWorldList}/>
				<Route path="/mingle/:name" component={Mingle}/>
			</Switch>
		</div>
	);
};

export default App;
