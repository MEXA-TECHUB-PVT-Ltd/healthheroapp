import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CssStyle from '../StyleSheet/CssStyle';
import Logo from '../assets/whiteLogo.png';
import Input from '../component/Input';
import CustomButton from '../component/CustomButton';
import {AppColors} from '../Helping/AppColor';
import Icon from 'react-native-vector-icons/Ionicons';
import {ForgetPasswordApi} from '../services/AuthScreen';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const Forget = async () => {
    setLoading(true);
    try {
      const result = await ForgetPasswordApi(email);
      console.log(result);
      if (result.success == true) {
        setLoading(false);
        setEmail('');
        navigation.navigate('Verification',{item:result.data.email});
      } else {
        setLoading(false);
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [data, setData] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setData('');
    }, 2500);
  }, []);

  return (
    <LinearGradient
      colors={['#0B183FBA', '#0A1637']}
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
      <View style={{alignItems: 'center', marginBottom: responsiveHeight(16)}}>
        <Image
          source={Logo}
          resizeMode="contain"
          style={{
            width: responsiveWidth(24),
            height: responsiveHeight(15),
            marginBottom: responsiveHeight(-2),
          }}
        />
      </View>

      <Text style={CssStyle.signInText}>Forget Password</Text>
      <Text style={CssStyle.signInInfo}>
        train and live the new experience of exercising at home
      </Text>
      <Input
        bgColor={'#ffffff40'}
        placeholder={'Email'}
        noIcon={true}
        value={email}
        onChangeText={e => setEmail(e)}
        fontSize={16}
        style={{marginTop: responsiveHeight(2)}}
      />
      {data && (
        <Text style={{color: 'red', marginLeft: responsiveWidth(3)}}>
          Enter the email address
        </Text>
      )}
      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          marginTop: responsiveHeight(3),
        }}>
        <CustomButton
          loading={loading}
          buttonText={'Send Code'}
          onPress={() => (email ? Forget() : setData('email'))}
          style={{}}
        />
      </View>
    </LinearGradient>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
