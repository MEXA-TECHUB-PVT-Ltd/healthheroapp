import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {
  responsiveWidth as w,
} from 'react-native-responsive-dimensions';

export const Line = ({style}) => (
  <View style={[style, {borderBottomWidth: 1, borderBottomColor: '#eee'}]} />
);

const styles = StyleSheet.create({
  armText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: w(2),
    textTransform: 'uppercase',
  },
  watchTime: {
    color: 'black',
    fontSize: w(6),
    fontWeight: 'bold',
  },
  timer: {
    // marginVertical: 10,
  },
});
