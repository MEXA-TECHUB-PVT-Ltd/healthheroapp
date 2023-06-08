import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { AppColors } from './AppColor';

const ToastContainer = () => {
  return (
    <Toast
      config={{
        success: internalState => {
          return (
            <View
              style={{
                width: responsiveWidth(80),
                backgroundColor: '#232441',
                paddingVertical: responsiveHeight(2),
                paddingHorizontal: responsiveWidth(4),
                borderRadius: responsiveWidth(3),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  // fontSize: 13,
                }}>
                {internalState.text2}
              </Text>
            </View>
          );
        },
      }}
      position="bottom"
      type="success"
      visibilityTime={2000}
      // ref={ref => {
      //   Toast.setRef(ref);
      // }}
    />
  );
};

export default ToastContainer;

const styles = StyleSheet.create({});
