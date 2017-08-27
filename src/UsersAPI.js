import DataAPI from './DataAPI';

const UsersAPI = new class extends DataAPI {
	constructor() {
		super(() => {
			return fetch("/greetings.json")
					.then((response) => {
						return response.json();
					})
					.then((greetings) => {
						let nextId = 0;
						if(greetings) {
							for(let x of greetings) {
								nextId = Math.max(nextId, x.id +1);
							}
						}
						return { greetings, nextId };
					})
					.catch((ex) => {
						console.error(ex);
					});
		});
	}

	forId(id) {
		return this.get().then((users) => {
			for(let i = 0; i < users.greetings.length; i++) {
				if(users.greetings[i].id === id) {
					return {...users.greetings[i]};
				}
			}
			return null;
		});
	}

	all() {
		return this.get().then((users) => {
			return [...users.greetings];
		});
	}

	add(newName) {
		this.get().then((users) => {
			let greetings = [...users.greetings, { id: users.nextId, first: newName, last: "Foobar" }];
			let nextId = users.nextId +1;

			this.set({ greetings, nextId });
		});
    }

	remove(id) {
		this.get().then((users) => {
			let greetings = [...users.greetings];
			let nextId = users.nextId;

			for(let i = 0; i < greetings.length; i++) {
				if(greetings[i].id === id) {
					greetings.splice(i, 1);
					break;
				}
			}

			this.set({ greetings, nextId });
		});
    }
}();

export default UsersAPI;
