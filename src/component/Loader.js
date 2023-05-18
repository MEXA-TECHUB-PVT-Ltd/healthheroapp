import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CssStyle from '../StyleSheet/CssStyle';

const Loader = () => {
  return (
    <ActivityIndicator
      size={'large'}
      color="black"
      style={[CssStyle.mainContainerModelCopied, {backgroundColor: 'white'}]}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({});
