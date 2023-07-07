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
import HeartProfile from '../Screen/Report';
import Winner from '../Screen/Nutrition';
import UserContact from '../Screen/UserContact';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../Screen/DashboardComponent/Search';
import Beginner from '../Screen/DashboardComponent/Beginner';
import Advance from '../Screen/DashboardComponent/Advance';
import Intermediate from '../Screen/DashboardComponent/Intermediate';
import WorkoutPlan from '../Screen/DashboardComponent/WorkoutPlan';
import Exercise from '../Screen/DashboardComponent/Exercise';
import AuthNavigation from './AuthNavigation';
import {AppColors} from '../Helping/AppColor';
import Gender from '../Auth/AboutProfileData/Gender';
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
import CountDownTime from '../Screen/UserProfile/CountDownTime';
import Faq from '../Screen/UserProfile/Faq';
import GetPremium from '../Screen/UserProfile/GetPremium';
import PrivacyPolicy from '../Screen/UserProfile/PrivacyPolicy';
import SetReminder from '../Screen/UserProfile/SetReminder';
import TrainingRest from '../Screen/UserProfile/TrainingRest';
import UpdatePassword from '../Screen/UserProfile/UpdatePassword';
import WorkoutReminder from '../Screen/UserProfile/WorkoutReminder';
import AboutFreeTrial from '../Screen/UserProfile/AboutFreeTrial';
import GenderProfile from '../Screen/UserProfile/GenderProfile';
import MetricUnits from '../Screen/UserProfile/MetricUnits';
import Discover from '../Screen/Discover';
import Nutrition from '../Screen/Nutrition';
import FocusedAreaProfile from '../Auth/AboutProfileData/FocusedAreaProfile';
import CurrentWeight from '../Auth/AboutProfileData/CurrentWeight';
import CurrentHeight from '../Auth/AboutProfileData/CurrentHeight';
import StartNow from '../Screen/DashboardComponent/StartNow';
import SevenFourWorkout from '../Screen/DashboardComponent/SevenFourWorkout';
import SelectPlan from '../Screen/Nutrition/SelectPlan';
import NutritionHeight from '../Screen/Nutrition/NutritionHeight';
import NutritionWeight from '../Screen/Nutrition/NutritionWeight';
import NutritionTargeted from '../Screen/Nutrition/NutritionTargeted';
import ActiveAge from '../Screen/Nutrition/ActiveAge';
import NutritionGender from '../Screen/Nutrition/NutritionGender';
import WeekGoal from '../Screen/Nutrition/WeekGoal';
import SetCalories from '../Screen/Nutrition/SetCalories';
import SelectFood from '../Screen/Nutrition/Food/SelectFood';
import EnterFood from '../Screen/Nutrition/Food/EnterFood';
import TypeOfTracker from '../Screen/Nutrition/TypeOfTracker';
import Report from '../Screen/Report';
import CreateFood from '../Screen/Nutrition/Food/CreateFood';
import EditWeeklyGoal from '../Screen/Report/EditWeeklyGoal';
import PaymentScreen from '../Screen/UserProfile/PaymentScreen';

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
        component={Discover}
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
        name="Report"
        component={Report}
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
        component={Nutrition}
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
        name="Profile"
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
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="QuitExercise" component={QuitExercise} />
      <Stack.Screen name="CountDownTime" component={CountDownTime} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="GetPremium" component={GetPremium} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="SetReminder" component={SetReminder} />
      <Stack.Screen name="TrainingRest" component={TrainingRest} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      <Stack.Screen name="WorkoutReminder" component={WorkoutReminder} />
      <Stack.Screen name="AboutFreeTrial" component={AboutFreeTrial} />
      <Stack.Screen name="GenderProfile" component={GenderProfile} />
      <Stack.Screen name="MetricUnits" component={MetricUnits} />
      <Stack.Screen name="FocusedAreaProfile" component={FocusedAreaProfile} />
      <Stack.Screen name="CurrentWeight" component={CurrentWeight} />
      <Stack.Screen name="CurrentHeight" component={CurrentHeight} />
      <Stack.Screen name="StartNow" component={StartNow} />
      <Stack.Screen name="CreateFood" component={CreateFood} />
      <Stack.Screen name="SevenFourWorkout" component={SevenFourWorkout} />
      <Stack.Screen name="SelectPlan" component={SelectPlan} />
      <Stack.Screen name="NutritionHeight" component={NutritionHeight} />
      <Stack.Screen name="NutritionWeight" component={NutritionWeight} />
      <Stack.Screen name="NutritionTargeted" component={NutritionTargeted} />
      <Stack.Screen name="NutritionGender" component={NutritionGender} />
      <Stack.Screen name="ActiveAge" component={ActiveAge} />
      <Stack.Screen name="WeekGoal" component={WeekGoal} />
      <Stack.Screen name="SetCalories" component={SetCalories} />
      <Stack.Screen name="SelectFood" component={SelectFood} />
      <Stack.Screen name="EnterFood" component={EnterFood} />
      <Stack.Screen name="TypeOfTracker" component={TypeOfTracker} />
      <Stack.Screen name="EditWeeklyGoal" component={EditWeeklyGoal} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
