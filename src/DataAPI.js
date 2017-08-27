class DataAPI {
	constructor(initializer) {
		this._frozen = false;
		this._observers = new Set();

		// Each instance of this class requires an initializer that returns "something" that can be considered as data;
		// be warned, "undefined" counts as "something"!
		this._initializer = initializer;
		this._data = null;
	}

	// Use this to fetch the actual data from the API.
	get() {
		// Lazy load the data; only retrieve it when it's actually needed.
		// Use promises as to not block execution while we wait for the data to be fetched or calculated.
		if(!this._data) {
			this.set(this._initializer);
		}
		return this._data;
	}

	// Use this to override the data in the API;
	// supply it either the new data directly, a function that will return the data, or a promise that will resolve with the data.
	set(initializer) {
		// Prevent recursively notifying observers.
		if(this._frozen) { return; }
		this._frozen = true;

		// Because we're returning a promise and not a value itself, we need to replace the whole promise
		// so that its resolved value stays current.
		this._data = new Promise((resolve, reject) => {
			try {
				if(typeof(initializer) === 'function') {
					resolve(initializer());
				} else {
					resolve(initializer);
				}
			}
			catch(ex) {
				console.error(ex);
				resolve(undefined);
			}
		});

		// Update the state of observing components to reflect the addition of this user.
		this._update();

		this._frozen = false;
	}

	_update() {
		// TODO: Each of these calls could be done in promises for some added asynchronicity;
		// don't know how desirable that is though.
		for(let observer of this._observers) {
			try {
				if(typeof(observer.dataChanged) === 'function') {
					// Pass the API object as the method's single argument,
					// for easy switching inside the observer between multiple API objects if necessary.
					observer.dataChanged(this);
				}
			}
			catch(ex) {
				console.error(ex);
			}
		}
	}

	// Register an object/component to be notified of when the data changes.
	register(observer) {
		this._observers.add(observer);
	}

	unregister(observer) {
		this._observers.delete(observer);
	}
}

export default DataAPI;
