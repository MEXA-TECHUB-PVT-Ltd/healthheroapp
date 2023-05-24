import {
  KeyboardAvoidingView,
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
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../../Helping/AppColor';
import CssStyle from '../../StyleSheet/CssStyle';
import CustomButton from '../../component/CustomButton';
import {TakeTrainingRest} from '../../services/RestApi';
import {useDispatch, useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import assets from '../../assets';
import {TakeCountDownApi} from '../../services/CountDownApi';
import Input from '../../component/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdatePasswordApi} from '../../services/AuthScreen';
import {User_password} from '../../store/action';

const UpdatePassword = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(13);
  const id = useSelector(data => data);
  const [oldPassword, setOldPassword] = useState('');
  const [openRestartModel, setOpenRestartModel] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const handleValidEmail = val => {
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    if (val.length === 0) {
      setEmailValidError('Password not valid');
    } else if (reg.test(val) === false) {
      setEmailValidError('Enter valid  password');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };
  const dispatch = useDispatch();
  const ChangePassword = async () => {
    setLoading(true);
    try {
      const result = await UpdatePasswordApi(item.email, newPassword);
      console.log(result);
      if (result.status == true) {
        await AsyncStorage.setItem('userPassword', `${newPassword}`);
        dispatch(User_password(newPassword));
        setLoading(false);
        setOpenRestartModel(true);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading;
      console.log(error);
    }
  };
  // useEffect(() => {
  //   GetUserName();
  // }, []);
  // const GetUserName = async () => {
  //   const result = await AsyncStorage.getItem('userPassword');
  //   setOldPassword(result);
  //   console.log(result);
  // };
  useEffect(() => {
    setTimeout(() => {
      setData('');
    }, 2500);
  }, [data]);
  return (
    <LinearGradient
      colors={['#0A1F58', '#0A1637']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.4}}
      style={{
        paddingHorizontal: responsiveWidth(6),
        flex: 1,
        paddingTop: responsiveHeight(3),
        backgroundColor: '#0A1F58',
      }}>
      <TouchableOpacity
        style={{marginLeft: responsiveWidth(-3)}}
        onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-back"
          size={29}
          style={{padding: '2%'}}
          color={AppColors.buttonText}
        />
      </TouchableOpacity>
      <KeyboardAvoidingView behavior="position" style={{}}>
        <View style={{marginTop: responsiveHeight(6)}}>
          <Text style={[CssStyle.textInsideSettingComponent, {fontSize: 40}]}>
            Update Password
          </Text>
          <Text
            style={[
              CssStyle.textInfoSetting,
              {
                lineHeight: responsiveHeight(3),
                paddingTop: responsiveHeight(1),
              },
            ]}>
            Please ensure that the password contains at least one uppercase
            letter, one lowercase letter, One numeric and Special Character.
          </Text>
        </View>

        <View
          style={[
            {
              paddingHorizontal: responsiveWidth(1),
              paddingTop: responsiveHeight(3),
            },
          ]}>
          <Input
            bgColor={'#ffffff60'}
            placeholder={'Old Password'}
            noIcon={true}
            fontSize={16}
            value={password}
            onChangeText={e => setPassword(e)}
            rightIcon="eye-outline"
            offIcon={'eye-off-outline'}
            enableIcon={true}
          />
          {data == 'oldPassword' ? (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginLeft: responsiveWidth(5),
              }}>
              Old password is wrong
            </Text>
          ) : data == 'AddField' ? (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginLeft: responsiveWidth(5),
              }}>
              Fill the fields
            </Text>
          ) : (
            data == 'oldNewMatch' && (
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  marginLeft: responsiveWidth(5),
                }}>
                New password and old password is matching
              </Text>
            )
          )}
          <Input
            bgColor={'#ffffff60'}
            placeholder={'New Password'}
            noIcon={true}
            fontSize={16}
            value={newPassword}
            onChangeText={e => {
              setNewPassword(e);
            }}
            rightIcon="eye-outline"
            offIcon={'eye-off-outline'}
            enableIcon={true}
          />
          {data == 'NewPassword' ? (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginLeft: responsiveWidth(5),
              }}>
              new password not match
            </Text>
          ) : data == 'AddField' ? (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginLeft: responsiveWidth(5),
              }}>
              Fill the fields
            </Text>
          ) : (
            data == 'oldNewMatch' && (
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  marginLeft: responsiveWidth(5),
                }}>
                New password and old password is matching
              </Text>
            )
          )}
          <Input
            bgColor={'#ffffff60'}
            placeholder={'Confirm Password'}
            noIcon={true}
            fontSize={16}
            value={confirmPassword}
            onChangeText={e => setConfirmPassword(e)}
            rightIcon="eye-outline"
            offIcon={'eye-off-outline'}
            enableIcon={true}
          />
          {data == 'NewPassword' ? (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginLeft: responsiveWidth(5),
              }}>
              new password not match
            </Text>
          ) : (
            data == 'AddField' && (
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  marginLeft: responsiveWidth(5),
                }}>
                Fill the fields
              </Text>
            )
          )}
        </View>
        <View style={{alignItems: 'center', paddingTop: responsiveHeight(5)}}>
          <CustomButton
            loading={loading}
            onPress={() => {
              !password && !newPassword && !confirmPassword
                ? setData('AddField')
                : id.userPassword !== password
                ? setData('oldPassword')
                : newPassword !== confirmPassword
                ? setData('NewPassword')
                : password == newPassword
                ? setData('oldNewMatch')
                : emailValidError
                ? setData('NewAuthentic')
                : ChangePassword();
            }}
            activeOpacity={1}
            buttonColor={AppColors.buttonText}
            style={{width: responsiveWidth(78)}}
            buttonText={'Update'}
            paddingVertical={1}
          />
        </View>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openRestartModel}
        onRequestClose={() => setOpenRestartModel(false)}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setOpenRestartModel(false)}>
          <View style={{flex: 1, backgroundColor: '#00000090'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  backgroundColor: AppColors.blueColor,
                  borderTopEndRadius: responsiveHeight(3),
                  borderTopLeftRadius: responsiveHeight(3),
                  paddingVertical: responsiveHeight(3.8),
                  paddingHorizontal: responsiveWidth(6),
                  alignItems: 'center',
                }}>
                <View
                  // activeOpacity={1}
                  style={{
                    // height: wp(28),
                    width: 125,
                    // backgroundColor: 'red',
                    aspectRatio: 1,
                    alignSelf: 'center',
                  }}>
                  <Lottie
                    source={assets.loader}
                    autoPlay
                    loop={true}
                    resizeMode="cover"
                    speed={1}
                    // style={{width}}
                    colorFilter={[{color: 'red'}]}
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 23,
                    fontFamily: 'Interstate-regular',
                    width: responsiveWidth(75),
                    textAlign: 'center',
                    lineHeight: responsiveHeight(4),
                    marginTop: responsiveHeight(2),
                    textTransform: 'capitalize',
                  }}>
                  Password Updated Successfully
                </Text>

                <View style={[{alignItems: 'center'}]}>
                  <CustomButton
                    buttonText={'Go Back'}
                    onPress={() => {
                      navigation.goBack(), setOpenRestartModel(false);
                    }}
                    buttonColor={'transparent'}
                    mode="outlined"
                    fontWeight={'500'}
                    borderColor={'white'}
                    style={{
                      marginTop: responsiveHeight(3.7),
                      width: responsiveWidth(50),
                      marginBottom: responsiveHeight(1),
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({});
