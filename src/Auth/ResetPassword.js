import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {CustomModel} from '../component/CustomModel';
import Lottie from 'lottie-react-native';
import assets from '../assets';
import {ResetPasswordApi} from '../services/AuthScreen';

const ResetPassword = ({navigation, route}) => {
  const {item} = route.params;
  const [openModel, setOpenModel] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const ResetPasswordValue = async () => {
    setLoading(true);
    try {
      const result = await ResetPasswordApi(item, password);
      console.log(result);
      if (result.status == true) {
        setLoading(false);
        setPassword('');
        setConfirmPassword('');
        // navigation.navigate('Verification', {item: result.data.email});
        setOpenModel(true);
      } else {
        setLoading(false);
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setData('');
  }, [data]);
  return (
    <LinearGradient
      colors={['#0B183C', AppColors.blueColor]}
      start={{x: 0, y: -1}}
      end={{x: 0, y: 0.3}}
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
      <Text
        style={[
          CssStyle.signInText,
          {width: responsiveWidth(75), marginTop: responsiveHeight(5.8)},
        ]}>
        Create New Strong Password
      </Text>
      <Text
        style={[
          CssStyle.signInInfo,
          {width: responsiveWidth(79), lineHeight: responsiveHeight(2.7)},
        ]}>
        Please ensure that the password contains at least one uppercase letter,
        one lowercase letter, One numeric and special character.
      </Text>
      <Input
        value={password}
        onChangeText={e => setPassword(e)}
        bgColor={'#ffffff40'}
        placeholder={'Password'}
        noIcon={true}
        fontSize={16}
        style={{marginTop: responsiveHeight(2)}}
        rightIcon="eye-outline"
        offIcon={'eye-off-outline'}
        enableIcon={true}
      />
      {data == 'EnterPassword' ? (
        <Text style={{color: 'red'}}>Enter the password</Text>
      ) : data == 'Enter' ? (
        <Text style={{color: 'red'}}>Fill the fields</Text>
      ) : (
        data == 'Length' && (
          <Text style={{color: 'red'}}>
            Password must be atleast 6 character
          </Text>
        )
      )}
      <Input
        value={confirmPassword}
        onChangeText={e => setConfirmPassword(e)}
        bgColor={'#ffffff40'}
        placeholder={'Confirm Password'}
        noIcon={true}
        fontSize={16}
        style={{marginTop: responsiveHeight(2)}}
        rightIcon="eye-outline"
        offIcon={'eye-off-outline'}
        enableIcon={true}
      />
      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          marginTop: responsiveHeight(8),
        }}>
        <CustomButton
          loading={loading}
          buttonText={'Create'}
          onPress={() =>
            password && confirmPassword
              ? password == confirmPassword
                ? ResetPasswordValue()
                : password.length < 7 || confirmPassword.length < 7
                ? setData('Length')
                : setData('Enter')
              : setData('EnterPassword')
          }
          style={{}}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={openModel}
        onRequestClose={() => setOpenModel(false)}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setOpenModel(false)}>
          <View style={{flex: 1, backgroundColor: '#00000090'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  backgroundColor: AppColors.blueColor,
                  alignItems: 'center',
                  borderTopEndRadius: responsiveHeight(3),
                  borderTopLeftRadius: responsiveHeight(3),
                  paddingVertical: responsiveHeight(4.8),
                }}>
                <View
                  // activeOpacity={1}
                  style={{
                    // height: wp(28),
                    width: 90,
                    // backgroundColor: 'red',
                    aspectRatio: 1,
                    alignSelf: 'center',
                    marginTop: responsiveHeight(1),
                  }}>
                  <Lottie
                    source={assets.loader}
                    autoPlay
                    loop={true}
                    resizeMode="cover"
                    speed={1}
                    colorFilter={[{color: 'red'}]}
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 23,
                    fontFamily: 'Interstate-regular',
                    width: responsiveWidth(60),
                    textAlign: 'center',
                    lineHeight: responsiveHeight(3),
                    marginTop: responsiveHeight(4),
                  }}>
                  Password Updated Successfully
                </Text>
                <CustomButton
                  buttonText={'Go to home'}
                  onPress={() => {
                    setOpenModel(false), navigation.navigate('Login');
                  }}
                  buttonColor={'transparent'}
                  mode="outlined"
                  fontWeight={'500'}
                  borderColor={'white'}
                  style={{
                    marginTop: responsiveHeight(3.7),
                    width: responsiveWidth(48),
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
