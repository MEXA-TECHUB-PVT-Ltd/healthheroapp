import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import CustomButton from '../component/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const UserContact = ({}) => {
  const navigation = useNavigation();
  useEffect(() => {
    Storage();
  }, []);
  const Storage = async () => {
    const result = await AsyncStorage.getItem('userID');
    console.log(result);
  };
  const signOUt = async () => {
    await AsyncStorage.removeItem('userID');
    navigation.navigate('Auth');
  };
  return (
    <View>
      <CustomButton buttonText={'Log out'} onPress={() => signOUt()} />
    </View>
  );
};

export default UserContact;

const styles = StyleSheet.create({});
