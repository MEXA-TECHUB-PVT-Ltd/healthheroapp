import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screen/Dashboard';
import Home from '../assets/Icon5.png';
import Logo from '../assets/Icon3.png';
import Heart from '../assets/Icon2.png';
import WinnerLogo from '../assets/icon1.png';
import Contact from '../assets/Icon4.png';
import Goal from '../Screen/Goal';
import HeartProfile from '../Screen/HeartProfile';
import Winner from '../Screen/Winner';
import UserContact from '../Screen/UserContact';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../Screen/DashboardComponent/Search';
import Beginner from '../Screen/DashboardComponent/Beginner';
import Advance from '../Screen/DashboardComponent/Advance';
import Intermediate from '../Screen/DashboardComponent/Intermediate';
import WorkoutPlan from '../Screen/DashboardComponent/WorkoutPlan';
import Exercise from '../Screen/DashboardComponent/Exercise';
import AuthNavigation from './AuthNavigation';
import Discover from '../Screen/DashboardComponent/Discover';
import {AppColors} from '../Helping/AppColor';

export const BottomTab = () => {
  const Bottom = createBottomTabNavigator();
  return (
    <Bottom.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: '#0B183C',
        tabBarInactiveBackgroundColor: '#0B183C',
        tabBarHideOnKeyboard: true,
      }}>
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Image
                resizeMode="contain"
                source={Home}
                style={{
                  width: 20,
                  height: 19,
                  tintColor: focused ? AppColors.buttonText : 'white',
                }}
              />
            </>
          ),
          tabBarShowLabel: false,
          tabBarLabel: () => (
            <View style={{borderBottomColor: 'yellow', borderBottomWidth: 2}} />
          ),
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Image
                resizeMode="contain"
                source={WinnerLogo}
                style={{
                  width: 20,
                  height: 19,
                  tintColor: focused ? AppColors.buttonText : 'white',
                }}
              />
            </>
          ),
          tabBarShowLabel: false,
          tabBarLabel: () => (
            <View style={{borderBottomColor: 'yellow', borderBottomWidth: 2}} />
          ),
        }}
        name="Dashboard1"
        component={Goal}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Image
                resizeMode="contain"
                source={Heart}
                style={{
                  width: 20,
                  height: 19,
                  tintColor: focused ? AppColors.buttonText : 'white',
                }}
              />
            </>
          ),
          tabBarShowLabel: false,
          tabBarLabel: () => (
            <View style={{borderBottomColor: 'yellow', borderBottomWidth: 2}} />
          ),
        }}
        name="Dashboard2"
        component={HeartProfile}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Image
                resizeMode="contain"
                source={Contact}
                style={{
                  width: 20,
                  height: 19,
                  tintColor: focused ? AppColors.buttonText : 'white',
                }}
              />
            </>
          ),
          tabBarShowLabel: false,
          tabBarLabel: () => (
            <View style={{borderBottomColor: 'yellow', borderBottomWidth: 2}} />
          ),
        }}
        name="Dashboard3"
        component={Winner}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Image
                resizeMode="contain"
                source={Contact}
                style={{
                  width: 20,
                  height: 19,
                  tintColor: focused ? AppColors.buttonText : 'white',
                }}
              />
            </>
          ),
          tabBarShowLabel: false,
          tabBarLabel: () => (
            <View style={{borderBottomColor: 'yellow', borderBottomWidth: 2}} />
          ),
        }}
        name="Dashboard4"
        component={UserContact}
      />
    </Bottom.Navigator>
  );
};

export const UserNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="LogoVersion" component={LogoVersion} /> */}
      {/* <Stack.Screen name="StartScreen" component={StartScreen} /> */}
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="main" component={BottomTab} />
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      <Stack.Screen name="Beginner" component={Beginner} />
      <Stack.Screen name="Advance" component={Advance} />
      <Stack.Screen name="Intermediate" component={Intermediate} />
      <Stack.Screen name="WorkoutPlan" component={WorkoutPlan} />
      <Stack.Screen name="Exercise" component={Exercise} />
      <Stack.Screen name="Auth" component={AuthNavigation} />
      {/* <Stack.Screen name="UserContact" component={UserContact} /> */}
      {/* <Stack.Screen name="Login" component={Login} /> */}
      {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
      {/* <Stack.Screen name="Verification" component={Verification} /> */}
      {/* <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}
      <Stack.Screen name="Discover" component={Discover} />
      {/* <Stack.Screen name="BottomTab" component={BottomTab} /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
