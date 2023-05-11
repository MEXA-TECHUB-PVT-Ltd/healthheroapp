import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import UserScreen from '../Style/UserScreen';
import CssStyle from '../StyleSheet/CssStyle';

const Loader = () => {
  return (
    <ActivityIndicator size={'large'} color="black" style={CssStyle.mainContainerModelCopied} />
  );
};

export default Loader;

const styles = StyleSheet.create({});
