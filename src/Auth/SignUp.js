import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Logo from '../assets/redLogo.png';
import CssStyle from '../StyleSheet/CssStyle';
import Input from '../component/Input';
import CustomButton from '../component/CustomButton';
import {AppColors} from '../Helping/AppColor';
import {LoginApi, SignUpApi} from '../services/AuthScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {Add} from '../store/action';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resultData, setResultData] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailValidError, setEmailValidError] = useState('');
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const SignUp = async () => {
    setLoading(true);
    try {
      const result = await SignUpApi(email, password);
      if (result.status == true) {
        setLoading(false);
        await AsyncStorage.setItem('userID', `${result.result.user_id}`);
        dispatch(Add(result.result.user_id));
        setEmail('');
        setPassword('');
        setResultData(result.result);
        navigation.navigate('BottomTab');
      } else {
        setLoading(false);
        console.error(result.message);
        setData(result.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setData('');
    }, 2500);
  }, [data]);

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('Email address must be enter');
    } else if (reg.test(val) === false) {
      setEmailValidError('Enter valid email address');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };
  return (
    <ImageBackground
      style={{flex: 1}}
      resizeMode="cover"
      source={require('../assets/signUp.png')}>
      <LinearGradient
        colors={['#0B183C00', '#0B183Ce1']}
        start={{x: 1, y: 0.1}}
        end={{x: 1, y: 0.5}}
        style={{
          // bottom: responsiveHeight(61.5),
          paddingHorizontal: responsiveWidth(5),
          // paddingBottom: responsiveHeight(20),
          // paddingTop: responsiveHeight(26),
          flex: 1,
        }}>
        <KeyboardAvoidingView behavior="position">
          <Image
            source={Logo}
            resizeMode="contain"
            style={{
              width: responsiveWidth(21),
              height: responsiveHeight(15),
              marginTop: responsiveHeight(20),
              marginBottom: responsiveHeight(1),
            }}
          />
          <Text style={CssStyle.signInText}>Create Account</Text>
          <Text style={CssStyle.signInInfo}>
            train and live the new experience of exercising at home
          </Text>
          <Input
            bgColor={'#ffffff60'}
            placeholder={'Username'}
            noIcon={true}
            value={username}
            onChangeText={e => {
              setUsername(e);
            }}
            fontSize={16}
            style={{marginTop: responsiveHeight(1)}}
          />
          <Input
            bgColor={'#ffffff60'}
            placeholder={'Email'}
            noIcon={true}
            value={email}
            onChangeText={e => {
              setEmail(e), handleValidEmail(e);
            }}
            fontSize={16}
            style={{}}
          />
          {data == 'emailFormat' ? (
            <Text style={{color: 'red'}}>Enter the valid email address</Text>
          ) : data == 'email' ? (
            <Text style={{color: 'red'}}>Enter the email</Text>
          ) : (
            data == 'Fill' && (
              <Text style={{color: 'red', fontWeight: '500'}}>
                Fill the fields
              </Text>
            )
          )}
          <Input
            bgColor={'#ffffff60'}
            placeholder={'Password'}
            noIcon={true}
            fontSize={16}
            value={password}
            onChangeText={e => setPassword(e)}
            rightIcon="eye-outline"
            offIcon={'eye-off-outline'}
            enableIcon={true}
          />
          {data == 'passwordLength' ? (
            <Text style={{color: 'red', marginLeft: responsiveWidth(4)}}>
              Password must be at least 6 character
            </Text>
          ) : data == 'password' ? (
            <Text style={{color: 'red', marginLeft: responsiveWidth(4)}}>
              Enter the password
            </Text>
          ) : (
            data == 'Fill' && (
              <Text
                style={{
                  color: 'red',
                  marginLeft: responsiveWidth(-2),
                  fontWeight: '500',
                }}>
                Fill the fields
              </Text>
            )
          )}
          <View style={{height: responsiveHeight(2)}} />
        </KeyboardAvoidingView>
        <View
          style={{
            paddingHorizontal: responsiveWidth(12),
            marginHorizontal: responsiveWidth(-5),
            marginTop: responsiveHeight(1),
            paddingTop: responsiveHeight(2),
            backgroundColor: AppColors.blueColor,
            flex: 1,
          }}>
          <CustomButton
            loading={loading}
            buttonText={'Signup'}
            onPress={() =>
              !email && !password
                ? setData('Fill')
                : !email
                ? setData('email')
                : !password
                ? setData('password')
                : emailValidError
                ? setData('emailFormat')
                : password.length < 7
                ? setData('passwordLength')
                : SignUp()
            }
            style={{}}
          />
          <CustomButton
            buttonText={'Login'}
            onPress={() => navigation.navigate('Login')}
            buttonColor={'transparent'}
            mode="outlined"
            fontWeight={'500'}
            borderColor={'white'}
            style={{marginTop: responsiveHeight(2.7)}}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
