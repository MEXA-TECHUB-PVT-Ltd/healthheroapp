import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Logo from '../assets/Icon3';
import CssStyle from '../StyleSheet/CssStyle';
import Input from '../component/Input';
import CustomButton from '../component/CustomButton';
import {AppColors} from '../Helping/AppColor';
const Login = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#0B183C00', '#0B183C']}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 0.68}}
      style={{
        // bottom: responsiveHeight(61.5),
        paddingHorizontal: responsiveWidth(5),
        // paddingBottom: responsiveHeight(20),
        // paddingTop: responsiveHeight(26),
        flex: 1,
      }}>
      <Logo width={200} height={200} />
      <Text style={CssStyle.signInText}>Sign in</Text>
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
      <Input
        bgColor={'#ffffff40'}
        placeholder={'Password'}
        noIcon={true}
        fontSize={16}
        rightIcon="eye-outline"
        offIcon={'eye-off-outline'}
        enableIcon={true}
      />
      <CustomButton
        buttonText={'Forgot password?'}
        onPress={() => navigation.navigate('ForgotPassword')}
        mode="outlined"
        buttonColor={'transparent'}
        borderColor={'transparent'}
        style={{alignSelf: 'flex-end', marginRight: responsiveWidth(-4)}}
      />
      <View
        style={{
          paddingHorizontal: responsiveWidth(6),
          marginTop: responsiveHeight(8),
          backgroundColor: AppColors.blueColor,
          flex: 1,
        }}>
        <CustomButton
          buttonText={'Login'}
          onPress={() => navigation.navigate('BottomTab')}
          style={{}}
        />
        <CustomButton
          buttonText={'Sign Up'}
          onPress={() => navigation.navigate('SignUp')}
          buttonColor={'transparent'}
          mode="outlined"
          fontWeight={'500'}
          borderColor={'white'}
          style={{marginTop: responsiveHeight(3.7)}}
        />
      </View>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({});
