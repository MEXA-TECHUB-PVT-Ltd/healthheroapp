import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import UserNavigation from './src/Navigation/UserNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <UserNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
