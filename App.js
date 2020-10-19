import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, { useContext } from 'react';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
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

  return (
    <AuthContextProvider>
      <PaperProvider theme={theme}>
        <AppContent />
      </PaperProvider>
    </AuthContextProvider>
  );
}

function LogoutBtn({navigation}){
	const currContext = useContext(AuthContxt);
	return(
	  <Button onPress={()=>{
	  		apiClient.post('/auth/logout/')
	  		.then(currContext.setUser(null))
	  		.catch((e)=>alert(JSON.stringify(e.response.data)))
			}
	  }>
	    Logout
	  </Button>
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
