import React, { createContext, useState, useEffect } from 'react'

const { Provider, Consumer} = createContext();

function AuthContext({ children }){
	const [userdata, setUserdata] = useState();

	const setContext = (newdata)=>{
		setUserdata((prev)=>(newdata))
	}

	// const loginUser = (values)=>{};
	// const registerUser = (values)=>{};
	// const fetchFromStorage = async () => {};
	return (
			<Provider value={{
					userdata:userdata, 
					setUserdata: setContext,
					// loginUser:loginUser,
					// registerUser:registerUser
				}
			}>
				{ children }
			</Provider>
		)
}
export { AuthContext };
export default Consumer;