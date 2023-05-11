import {LogBox, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import UserNavigation from './src/Navigation/UserNavigation';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <NavigationContainer>
      <UserNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
