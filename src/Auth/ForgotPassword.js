import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CssStyle from '../StyleSheet/CssStyle';
import Logo from '../assets/Icon3';
import Input from '../component/Input';
import CustomButton from '../component/CustomButton';
import {AppColors} from '../Helping/AppColor';
import Icon from 'react-native-vector-icons/Ionicons';

const ForgotPassword = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#0B183FBA', '#0A1637']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.2}}
      style={{
        paddingHorizontal: responsiveWidth(5),
        flex: 1,
        paddingTop: responsiveHeight(3),
      }}>
      <TouchableOpacity
        style={{marginLeft: responsiveWidth(-2)}}
        onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-back-outline"
          size={30}
          color={AppColors.buttonText}
        />
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginBottom: responsiveHeight(16)}}>
        <Logo width={100} height={100} />
      </View>

      <Text style={CssStyle.signInText}>Forget Password</Text>
      <Text style={CssStyle.signInInfo}>
        train and live the new experience of exercising at home
      </Text>
      <Input
        bgColor={'#ffffff40'}
        placeholder={'Email'}
        noIcon={true}
        fontSize={16}
        style={{marginTop: responsiveHeight(2)}}
      />
      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          marginTop: responsiveHeight(3),
        }}>
        <CustomButton
          buttonText={'Send Code'}
          onPress={() => navigation.navigate('Verification')}
          style={{}}
        />
      </View>
    </LinearGradient>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
