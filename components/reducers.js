const types={
	login:'LOGIN',
	signup:'SIGNUP',
	loadingToken:'LOADING_TOKEN'
}

export function reducer(state, action){
	switch(action.types){
		case types.loadingToken:
			return {...state, JSON.parse(action.token)};
		case types.login:
			return {...state, action.}
	}
}