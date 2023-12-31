const api = {
	endpoint: 'http://127.0.0.1:3010',

	save_token : (token) => { localStorage.setItem('token', token); },

	get_token: () => localStorage.getItem('token'), // Fijarse que no tenemos {}

	remove_token: () => { localStorage.removeItem('token'); },
	
	get : async function(path, obj={}, token= null){
		
		const query = Object
			.keys(obj)
			.map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
			.join('&');

			const url = this.endpoint + path + "?" + query;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				'Content-Type' : 'application/json',
				'token': token
			},
			redirect : 'follow',

		})
		return response.json(); // Nos devuelve una promesa
	},

	post: async function(path, obj={}, token = null, method = "POST"){

		const url = this.endpoint + path;

		const response = await fetch(url,{
			method: method,
			headers: {
				'Content-Type' : 'application/json',
				'token': token
			},
			redirect : 'follow',
			body: JSON.stringify(obj)
		});
		
		return response.json(); 
	},

	put: async function(path, obj = {}, token=null) {
        return await this.post(path, obj, token, "PUT")
    },

	delete: async function (path, obj = {}, token=null) {
		return await this.post(path, obj, token, "DELETE")
	}

}

module.exports = api;