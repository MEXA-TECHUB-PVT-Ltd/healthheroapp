import {LogBox, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import UserNavigation from './src/Navigation/UserNavigation';
import {Provider} from 'react-redux';
import { store } from './src/store/store';
import MainApplication from './src/Navigation/MainNavigation';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <Provider store={store}>
      <MainApplication />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
