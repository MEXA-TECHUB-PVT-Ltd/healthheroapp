import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigation from './AuthNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  Add,
  Diet_Id,
  User_password,
  Water_Id,
  WeightReviewId,
} from '../store/action';
import {BottomTab, UserNavigation} from './BottomTab';

const MainApplication = () => {
  const [data, setData] = useState('');
  const dispatch = useDispatch();
  const dataId = useSelector(data => console.log(data, 'redux'));
  const Storage = async () => {
    const result = await AsyncStorage.getItem('userID');
    const dietPlanId = await AsyncStorage.getItem('DietPlanId');
    const waterTrackerId = await AsyncStorage.getItem('WaterTrackerId');
    const userPassword = await AsyncStorage.getItem('userPassword');
    const WeightReview = await AsyncStorage.getItem('WeightReviewId');
    dispatch(Diet_Id(dietPlanId));
    dispatch(Water_Id(waterTrackerId));
    dispatch(User_password(userPassword));
    dispatch(WeightReviewId(WeightReview));
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
