import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import LottieView from 'lottie-react-native';
import assets from '../assets';

const ResetPassword = ({navigation}) => {
  const [openModel, setOpenModel] = useState(false);
  return (
    <LinearGradient
      colors={['#0B183C', AppColors.blueColor]}
      start={{x: 0, y: 1}}
      end={{x: 0, y: 3}}
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
          {width: responsiveWidth(75), marginTop: responsiveHeight(5)},
        ]}>
        Create New Strong Password
      </Text>
      <Text style={[CssStyle.signInInfo, {width: responsiveWidth(79)}]}>
        Please ensure that the password contains at least one uppercase letter,
        one lowercase letter, One numeric and special character.
      </Text>
      <Input
        bgColor={'#ffffff40'}
        placeholder={'Password'}
        noIcon={true}
        fontSize={16}
        style={{marginTop: responsiveHeight(2)}}
        rightIcon="eye-outline"
        offIcon={'eye-off-outline'}
        enableIcon={true}
      />
      <Input
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
          buttonText={'Create'}
          onPress={() => setOpenModel(true)}
          style={{}}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={setOpenModel}
        onRequestClose={() => setOpenModel(false)}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setOpenModel(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: AppColors.blueColor,
                alignItems: 'center',
                borderTopEndRadius: responsiveWidth(2),
                borderTopLeftRadius: responsiveWidth(2),
              }}>
              <LottieView
                autoplay
                loop
                source={assets.loader}
                colorFilters={[{keypath: 'Plane', color: 'rgb(255, 100, 0)'}]}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 23,
                  fontFamily: 'Interstate-regular',
                  width: responsiveWidth(60),
                  textAlign: 'center',
                  lineHeight: responsiveHeight(3),
                }}>
                Password Updated Successfully
              </Text>
              <CustomButton
                buttonText={'Go to home'}
                onPress={() => navigation.navigate('Login')}
                buttonColor={'transparent'}
                mode="outlined"
                fontWeight={'500'}
                borderColor={'white'}
                style={{marginTop: responsiveHeight(3.7)}}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
