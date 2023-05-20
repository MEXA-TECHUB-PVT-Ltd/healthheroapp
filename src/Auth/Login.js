import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StatusBar,
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
import {LoginApi} from '../services/AuthScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {Add} from '../store/action';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');
  const [data, setData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const SignIn = async () => {
    setLoading(true);
    try {
      const result = await LoginApi(email, password);
      console.log(result);
      if (result.status == true) {
        await AsyncStorage.setItem('userPassword', password);
        await AsyncStorage.setItem('userID', `${result.result.user_id}`);
        dispatch(Add(result.result.user_id));
        setLoading(false);
        setEmail('');
        setPassword('');
        setResultData(result.result);
        navigation.navigate('UserNavigation', {
          // screen: 'Dashboard',
          // params: result.result,
        });
        setErrorMessage('');
      } else {
        setLoading(false);
        console.error(result.message);
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setData('');
      setErrorMessage('');
    }, 2500);
  }, [data, setErrorMessage]);
  return (
    <ImageBackground
      style={{
        flex: 1,
        // resizeMode: 'contain',
      }}
      // resizeMode="contain"
      source={require('../assets/signIn.png')}>
      <StatusBar hidden={true} />
      <LinearGradient
        colors={['#0B183C00', '#0B183Ce1']}
        start={{x: 1, y: 0.1}}
        end={{x: 1, y: 0.5}}
        style={{
          paddingHorizontal: responsiveWidth(5),
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
              marginLeft: responsiveWidth(1),
            }}
          />
          <Text style={CssStyle.signInText}>Sign in</Text>
          <Text style={CssStyle.signInInfo}>
            train and live the new experience of exercising at home
          </Text>
          <Input
            bgColor={'#ffffff60'}
            placeholder={'Email'}
            noIcon={true}
            value={email}
            onChangeText={e => setEmail(e)}
            fontSize={16}
            style={{marginTop: responsiveHeight(1)}}
          />
          {errorMessage && (
            <Text style={{color: 'red', marginLeft: responsiveWidth(3)}}>
              {errorMessage}
            </Text>
          )}
          {data == 'email' ? (
            <Text style={{color: 'red', marginLeft: responsiveWidth(3)}}>
              Enter the email
            </Text>
          ) : (
            data == 'Fill' && (
              <Text
                style={{
                  color: 'red',
                  fontWeight: '500',
                  marginLeft: responsiveWidth(3),
                }}>
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
          {data == 'password' ? (
            <Text style={{color: 'red'}}>Enter the password</Text>
          ) : (
            data == 'Fill' && (
              <Text style={{color: 'red', fontWeight: '500'}}>
                Fill the fields
              </Text>
            )
          )}
          <CustomButton
            buttonText={'Forgot password?'}
            onPress={() => navigation.navigate('ForgotPassword')}
            mode="outlined"
            buttonColor={'transparent'}
            borderColor={'transparent'}
            style={{alignSelf: 'flex-end', marginRight: responsiveWidth(-4)}}
          />
        </KeyboardAvoidingView>
        <View
          style={{
            paddingHorizontal: responsiveWidth(12),
            marginHorizontal: responsiveWidth(-5),
            marginTop: responsiveHeight(1),
            paddingTop: responsiveHeight(2.7),
            backgroundColor: AppColors.blueColor,
            flex: 1,
          }}>
          <CustomButton
            loading={loading}
            buttonText={'Login'}
            marginLeft={loading ? responsiveWidth(5) : responsiveWidth(3)}
            onPress={() =>
              !email && !password
                ? setData('Fill')
                : !email
                ? setData('email')
                : !password
                ? setData('password')
                : SignIn()
            }
            style={{}}
          />
          <CustomButton
            buttonText={'Sign Up'}
            onPress={() => navigation.navigate('SignUp')}
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

export default Login;

const styles = StyleSheet.create({});
