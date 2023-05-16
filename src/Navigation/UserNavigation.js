import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../StartUp/StartScreen';
import LogoVersion from '../StartUp/LogoVersion';
import Dashboard from '../Screen/Dashboard';
import BottomTab from './BottomTab';
import Search from '../Screen/DashboardComponent/Search';
import Beginner from '../Screen/DashboardComponent/Beginner';
import Advance from '../Screen/DashboardComponent/Advance';
import Intermediate from '../Screen/DashboardComponent/Intermediate';
import WorkoutPlan from '../Screen/DashboardComponent/WorkoutPlan';
import Exercise from '../Screen/DashboardComponent/Exercise';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import ForgotPassword from '../Auth/ForgotPassword';
import Verification from '../Auth/Verification';
import ResetPassword from '../Auth/ResetPassword';

const UserNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="LogoVersion" component={LogoVersion} /> */}
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Beginner" component={Beginner} />
      <Stack.Screen name="Advance" component={Advance} />
      <Stack.Screen name="Intermediate" component={Intermediate} />
      <Stack.Screen name="WorkoutPlan" component={WorkoutPlan} />
      <Stack.Screen name="Exercise" component={Exercise} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default UserNavigation;

const styles = StyleSheet.create({});
