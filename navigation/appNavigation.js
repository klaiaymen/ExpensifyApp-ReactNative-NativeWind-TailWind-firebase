// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useDispatch, useSelector } from 'react-redux';

import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../redux/slices/user';


const Stack = createNativeStackNavigator();



export default function AppNavigation() { 
  const {user} = useSelector(state=> state.user);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, u=>{
    //console.log('get user:',u);
    dispatch(setUser(u));
  })
  if(user){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="AddTrip" component={AddTripScreen} />
          <Stack.Screen options={{headerShown: false}} name="AddExpense" component={AddExpenseScreen} />
          <Stack.Screen options={{headerShown: false}} name="TripExpenses" component={TripExpensesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
      
      
  }else{
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen options={{headerShown: false,presentation: 'modal'}} name="SignIn" component={SignInScreen} />
          <Stack.Screen options={{headerShown: false,presentation: 'modal'}} name="SignUp" component={SignUpScreen} />
          <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      
      
    )
  }
}