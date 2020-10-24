import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, { useState, useContext, useEffect } from 'react';
import { DefaultTheme, 
	Provider as PaperProvider, 
	Button,
	Portal, Snackbar, Text } from 'react-native-paper';
import ProductList from './components/productList';
import ProductDetails from './components/productDetails';
import ProductEdit from './components/productEdit';
import ProductAdd from './components/productAdd';
import Login from './components/login';
import Signup from './components/signup';
import AuthContxt, { AuthContextProvider } from './components/contexts/AuthContext';
import { apiClient } from './components/apiClient'


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'coral',
    accent: 'yellow',
  },
};

const Stack = createStackNavigator();


export default function App() {
	[errorVisibility, setErrorVisibility] = useState(false);
	[errorMsg, setErrorMsg] = useState(null);


  return (
    <AuthContextProvider 
    	setErrorVisibility={setErrorVisibility}
    	setErrorMsg={setErrorMsg}>
	      <PaperProvider theme={theme}>
	        <AppContent />
	        {errorMsg && <AppErrors 
							        	errorVisibility={errorVisibility}
							        	setErrorVisibility={setErrorVisibility}
							        	errorMsg={errorMsg} />}
	      </PaperProvider>
    </AuthContextProvider>
  );
}



function AppErrors({errorVisibility, setErrorVisibility, errorMsg}){
	return (
			<Portal>
				<Snackbar
					visible={errorVisibility}
					onDismiss={()=>setErrorVisibility(!errorVisibility)}>
					{JSON.stringify(errorMsg)}
				</Snackbar>
			</Portal>
		)
}




function AppContent(){
	const currContxt = useContext(AuthContxt);

	return (
			<NavigationContainer>
        <Stack.Navigator>
          {currContxt.userdata?(
          	<>
          		<Stack.Screen
		            name='Products'
		            component={ProductList}
		            options={{
		            	headerRight:(navigation)=> <LogoutBtn navigation={navigation} />
		            }}
		          />
		          <Stack.Screen
		            // should have conditional rendering
		            // buttons for editing of product
		            name='Details'
		            component={ProductDetails}
		            options={{
		            	headerRight:(navigation)=> <LogoutBtn navigation={navigation} />
		            }}
		          />
		          <Stack.Screen
		            name='Edit'
		            component={ProductEdit}
		            options={{
		            	headerRight:(navigation)=> <LogoutBtn navigation={navigation} />
		            }}
		          />
		          <Stack.Screen
		            name='Add'
		            component={ProductAdd} 
		            options={{
		            	headerRight:(navigation)=> <LogoutBtn navigation={navigation} />
		            }}
		          />
	          </>
        	):(
        		<>
          		<Stack.Screen
		            name='Login'
		            component={Login}
		          />
		          <Stack.Screen
		            name='Signup'
		            component={Signup}
          		/>
        		</>
          )}
        </Stack.Navigator>
      </NavigationContainer>
		)
}


function LogoutBtn({navigation}){
	const currContext = useContext(AuthContxt);
	return(
	  <Button onPress={()=>currContext.logoutUser()}>
	    Logout
	  </Button>
	)
}

