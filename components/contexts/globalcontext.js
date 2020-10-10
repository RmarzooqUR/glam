import React, { createContext, useState, useEffect } from 'react'

const { Provider, Consumer} = createContext();

function GlobalContext({ children }){
	const [userdata, setUserdata] = useState();

	const setContext = (newdata)=>{
		setUserdata((prev)=>(newdata))
	}


	return (
			<Provider value={{
					userdata:userdata, 
					setUserdata: setContext
				}
			}>
				{ children }
			</Provider>
		)
}
export { GlobalContext };
export default Consumer;