import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CssStyle from '../StyleSheet/CssStyle';
import {AppColors} from '../Helping/AppColor';

const Loader = () => {
  return (
    <ActivityIndicator
      size={'large'}
      color="white"
      style={[CssStyle.mainContainerModelCopied, {backgroundColor: '#0B183C'}]}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({});
