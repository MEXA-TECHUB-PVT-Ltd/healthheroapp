import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
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
import {CustomModelCenter} from '../component/CustomModel';

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
      console.log(result);
      if (result.status == true) {
        setLoading(false);
        await AsyncStorage.setItem('userID', `${result.result.user_id}`);
        // await AsyncStorage.setItem('userName', result.result.);
        await AsyncStorage.setItem('userPassword', password);
        dispatch(Add(result.result.user_id));
        setEmail('');
        setPassword('');
        setResultData(result.result);
        setOpenModel(true);
        // navigation.navigate('UserNavigation', {screen: 'Gender'});
      } else {
        setLoading(false);
        console.error(result.message);
        setData('Error');
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
  const [openModel, setOpenModel] = useState(false);
  const [passwordValidError, setPasswordValidError] = useState('');
  const handleValidPassword = val => {
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    if (val.length === 0) {
      setPasswordValidError('Password not valid');
    } else if (reg.test(val) === false) {
      setPasswordValidError('Enter valid  password');
    } else if (reg.test(val) === true) {
      setPasswordValidError('');
    }
  };
  return (
    <ImageBackground
      style={{flex: 1}}
      // resizeMode="cover"
      source={require('../assets/signUp.png')}>
      <LinearGradient
        colors={['#0B183C00', '#0B183Ce1']}
        start={{x: 1, y: 0.1}}
        end={{x: 1, y: 0.5}}
        style={{
          // paddingHorizontal: responsiveWidth(5),
          flex: 1,
        }}>
        <ScrollView
          keyboardShouldPersistTaps='always'
          showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            style={{paddingHorizontal: responsiveWidth(5)}}
            behavior="position">
            <Image
              source={Logo}
              resizeMode="contain"
              style={{
                width: responsiveWidth(21),
                height: responsiveHeight(15),
                marginTop: responsiveHeight(23),
                marginBottom: responsiveHeight(1),
                marginLeft: responsiveWidth(1),
              }}
            />
            <Text style={[CssStyle.signInText, {fontSize: 33}]}>
              Create Account
            </Text>
            <Text style={[CssStyle.signInInfo,{fontSize:12,opacity:0.8}]}>
              train and live the new experience of exercising at home
            </Text>
            {/* <Input
            bgColor={'#ffffff60'}
            placeholder={'Username'}
            noIcon={true}
            value={username}
            onChangeText={e => {
              setUsername(e);
            }}
            fontSize={16}
            style={{marginTop: responsiveHeight(1)}}
          /> */}
            <Input
              bgColor={'#ffffff60'}
              placeholder={'Email'}
              noIcon={true}
              value={email}
              onChangeText={e => {
                setEmail(e), handleValidEmail(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(4)}}
            />
            {data == 'emailFormat' ? (
              <Text style={{color: 'red'}}>Enter the valid email address</Text>
            ) : data == 'email' ? (
              <Text style={{color: 'red'}}>Enter the email</Text>
            ) : data == 'Error' ? (
              <Text style={{color: 'red'}}>
                Email is invalid or already have an account
              </Text>
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
              onChangeText={e => {
                setPassword(e), handleValidPassword(e);
              }}
              rightIcon="eye-outline"
              offIcon={'eye-off-outline'}
              enableIcon={true}
            />
            {data == 'passwordLength' ? (
              <Text style={{color: 'red', marginLeft: responsiveWidth(4)}}>
                Password must be contain one Uppercase alphabet and atleast 6
                character
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
              paddingHorizontal: responsiveWidth(15),
              marginHorizontal: responsiveWidth(-5),
              marginTop: responsiveHeight(1),
              paddingTop: responsiveHeight(3),
              backgroundColor: AppColors.blueColor,
              paddingBottom: responsiveHeight(8),
              // flex: 1,
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
                  : passwordValidError
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
              styleText={{width: responsiveWidth(100)}}
              borderColor={'white'}
              style={{marginTop: responsiveHeight(2.7)}}
            />
          </View>
        </ScrollView>
      </LinearGradient>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModel}
        onRequestClose={() => setOpenModel(false)}>
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
              <Text style={[styles.signInText]}>Enter Username</Text>
              <Input
                bgColor={'#ffffff60'}
                placeholder={'Username'}
                noIcon={true}
                value={username}
                onChangeText={e => {
                  setUsername(e);
                }}
                fontSize={16}
                style={{
                  marginTop: responsiveHeight(2),
                  width: responsiveWidth(88),
                }}
              />
              {data == 'username' && (
                <Text
                  style={{
                    color: AppColors.buttonText,
                    fontWeight: '500',
                  }}>
                  Enter username
                </Text>
              )}
              <CustomButton
                buttonText={'Continue'}
                onPress={() => {
                  username.length > 2
                    ? (navigation.navigate('UserNavigation', {
                        screen: 'Gender',
                        params: {
                          item: {
                            itemResult: resultData,
                            itemName: username,
                          },
                        },
                      }),
                      setUsername(''))
                    : setData('username');
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
      </Modal>
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-regular',
    fontSize: 24,
    lineHeight: responsiveHeight(5),
  },
});
