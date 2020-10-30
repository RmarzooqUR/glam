import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, { useState, useContext } from 'react';
import { DefaultTheme, 
	Provider as PaperProvider, 
	Button,
	Portal,
	Snackbar,
	ActivityIndicator, Colors } from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native'
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
	const [errorVisibility, setErrorVisibility] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const [loadingState, setLoadingState] = useState(true);

  return (
	  <AuthContextProvider
			setErrorVisibility={setErrorVisibility}
	  	setErrorMsg={setErrorMsg}
	  	setLoadingState={setLoadingState}
	  	>
	      <PaperProvider theme={theme}>
	        <AppContent loadingState={loadingState} />
	        {errorMsg && <AppErrors 
							        	errorVisibility={errorVisibility}
							        	setErrorVisibility={setErrorVisibility}
							        	errorMsg={errorMsg} />}
	      </PaperProvider>
    </AuthContextProvider>
  );
}



function AppErrors({errorVisibility, setErrorVisibility, errorMsg}){
	const stringError = (error, msg) => {
		try{
			for (const [key, value] of Object.entries(error)){
				if(value instanceof Array){
					msg += `\n${stringError(value, "")}`
				}
				else{
					msg += `${value}\n`;
				}}}catch{
					msg = "An unexpected error occured";
				}
		return msg;
	}

	return (
			<Portal>
				<Snackbar
					theme={{colors:{accent:'red'}}}
					style = {styles.errorStyle}
					visible={errorVisibility}
					onDismiss={()=>setErrorVisibility(!errorVisibility)}>
					<Text style={styles.errorText}>{stringError(errorMsg, "")}</Text>
				</Snackbar>
			</Portal>
		)
}


function AppContent({loadingState}){
	const currContxt = useContext(AuthContxt);

	return (
		<>
			{loadingState?(
		  	<View style={styles.activityStyle} >
		  		<ActivityIndicator animating={true} color={Colors.red800}/>
		  	</View>
		  	):(
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
			          {currContxt.userdata && currContxt.userdata.user.is_admin && 
			          	<>
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
			          	</>}
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
	        		</>)
	          }
	        </Stack.Navigator>
	      </NavigationContainer>
				)}
			</>
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

const styles = StyleSheet.create({
	errorStyle:{
		backgroundColor:'#ffe6e6',
		borderWidth:2,
		borderColor:'red',
		borderRadius:5,
	},
	errorText:{
		color: 'red'
	}, 
	activityStyle:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
	}
})