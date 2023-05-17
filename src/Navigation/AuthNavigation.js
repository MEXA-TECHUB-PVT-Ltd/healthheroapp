import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../StartUp/StartScreen';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import ForgotPassword from '../Auth/ForgotPassword';
import Verification from '../Auth/Verification';
import ResetPassword from '../Auth/ResetPassword';
import { BottomTab } from './BottomTab';

const AuthNavigation = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="StartScreen" component={StartScreen} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="Verification" component={Verification} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      <AuthStack.Screen name="BottomTab" component={BottomTab} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
