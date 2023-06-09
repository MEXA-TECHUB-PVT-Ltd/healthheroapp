import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import CssStyle from '../StyleSheet/CssStyle';
import {AppColors} from '../Helping/AppColor';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const LogoVersion = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('StartScreen');
    }, 2000);
  }, []);
  return (
    <View style={CssStyle.flexCenter}>
      <View style={{flex: 1}} />
      <View style={{flex: 1}}>
        <Text style={styles.textHeading}> Health Hero Club</Text>
      </View>
      <View style={[CssStyle.flexEnd, {marginBottom: responsiveHeight(2)}]}>
        <Text style={styles.version}>Version 1.1</Text>
      </View>
    </View>
  );
};

export default LogoVersion;

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 24,
    color: AppColors.text,
    fontFamily: 'Interstate-bold',
    letterSpacing: 0,
  },
  version: {
    color: AppColors.text,
    fontSize: 13,
    fontFamily: 'Interstate-bold',
  },
});
