import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screen/Dashboard';
import Home from '../assets/Icon5.png';
import Logo from '../assets/Icon3.png';
import Heart from '../assets/Health-Hero/Group722.png';
import WinnerLogo from '../assets/Health-Hero/Icon.png';
import TextLogo from '../assets/Health-Hero/Iconfeather-file-text.png';
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
import Gender from '../Auth/Gender';
import WorkoutExercise from '../Screen/GoalComponent/WorkoutExercise';
import GetExercise from '../Screen/GoalComponent/GetExercise';
import WorkoutDetail from '../Screen/GoalComponent/WorkoutDetail';
import Focused from '../Screen/GoalComponent/Focused';
import ExerciseDetail from '../Screen/GoalComponent/ExerciseDetail';
import AllPlan from '../Screen/GoalComponent/Plan/AllPlan';
import CreatePlan from '../Screen/GoalComponent/Plan/CreatePlan';
import StartExercise from '../Screen/GoalComponent/StartExercise';
import RestTime from '../Screen/GoalComponent/RestTime';
import QuitExercise from '../Screen/GoalComponent/QuitExercise';

export const BottomTab = () => {
  const Bottom = createBottomTabNavigator();
  return (
    <Bottom.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: '#0A1F58',
        tabBarInactiveBackgroundColor: '#0A1F58',
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
                source={TextLogo}
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
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="main" component={BottomTab} />
      <Stack.Screen name="Beginner" component={Beginner} />
      <Stack.Screen name="Advance" component={Advance} />
      <Stack.Screen name="Intermediate" component={Intermediate} />
      <Stack.Screen name="WorkoutPlan" component={WorkoutPlan} />
      <Stack.Screen name="Exercise" component={Exercise} />
      <Stack.Screen name="Auth" component={AuthNavigation} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="Gender" component={Gender} />
      <Stack.Screen name="WorkoutExercise" component={WorkoutExercise} />
      <Stack.Screen name="GetExercise" component={GetExercise} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
      <Stack.Screen name="Focused" component={Focused} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetail} />
      <Stack.Screen name="AllPlan" component={AllPlan} />
      <Stack.Screen name="CreatePlan" component={CreatePlan} />
      <Stack.Screen name="StartExercise" component={StartExercise} />
      <Stack.Screen name="RestTime" component={RestTime} />
      <Stack.Screen name="QuitExercise" component={QuitExercise} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
