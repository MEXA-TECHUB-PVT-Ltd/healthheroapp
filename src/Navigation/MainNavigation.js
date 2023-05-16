import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigation from './AuthNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {Add} from '../store/action';
import {BottomTab, UserNavigation} from './BottomTab';

const MainApplication = () => {
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  const dataId = useSelector(data => console.log(data, 'redux'));
  const Storage = async () => {
    const result = await AsyncStorage.getItem('userID');
    console.log(result);
    if (result) {
      dispatch(Add(result));
      setData(<UserNavigation />);
    } else {
      setData(<AuthNavigation />);
    }
  };
  useEffect(() => {
    Storage();
  }, []);
  return <NavigationContainer>{data}</NavigationContainer>;
};

export default MainApplication;

const styles = StyleSheet.create({});
