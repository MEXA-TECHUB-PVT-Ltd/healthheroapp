import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../StartUp/StartScreen';
import LogoVersion from '../StartUp/LogoVersion';

const UserNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="LogoVersion" component={LogoVersion} /> */}
      <Stack.Screen name="StartScreen" component={StartScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigation;

const styles = StyleSheet.create({});
