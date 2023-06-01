import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CssStyle from '../StyleSheet/CssStyle';
import {AppColors} from '../Helping/AppColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Line} from '../component/Line';
import KeepAwake from 'react-native-keep-awake';
import CustomButton from '../component/CustomButton';
import {RestartProgressAPI} from '../services/WorkoutPlan';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../component/Input';
import {
  GetUserDetailApi,
  PostFeedBackApi,
  UpdateProfileApi,
} from '../services/AuthScreen';
import Loader from '../component/Loader';
import Lottie from 'lottie-react-native';
import assets from '../assets';
import Share from 'react-native-share';
import {Diet_Id, Water_Id, Workout_Plan_Id} from '../store/action';

const UserContact = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [openRestartModel, setOpenRestartModel] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [openModel, setOpenModel] = useState(false);
  const [username, setUsername] = useState('');
  const [openModelUserName, setOpenModelUsername] = useState(false);
  const [data, setData] = useState('');
  const [openUserSuccessfully, setOpenUserSuccessfully] = useState(false);
  const [userDetailData, setUserDetailData] = useState('');
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [postFeedBack, setPostFeedBack] = useState(false);
  const id = useSelector(data => data.id);

  const workOut = [
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Gender',
      nav: 'GenderProfile',
    },
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Training rest',
      nav: 'TrainingRest',
    },
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Count Down time',
      nav: 'CountDownTime',
    },
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Restart progress',
      nav: '',
    },
  ];
  const WorkOutSection = () => (
    <>
      <Text style={[CssStyle.settingText, {marginTop: responsiveHeight(0)}]}>
        Workout
      </Text>
      <View style={[{}]}>
        {workOut.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                item.text == 'Restart progress'
                  ? setOpenRestartModel(true)
                  : navigation.navigate(item.nav, {item: userDetailData});
              }}
              key={index}>
              <View style={[CssStyle.flexJustify, {}]}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Interstate-regular',
                    fontSize: 14,
                    letterSpacing: 0.8,
                    opacity: 0.8,
                  }}>
                  {item.text}
                </Text>
                {item.icon}
              </View>
            </TouchableOpacity>
            {index !== workOut.length - 1 && (
              <Line style={{marginVertical: responsiveHeight(2)}} />
            )}
          </View>
        ))}
      </View>
    </>
  );
  const generalSetting = [
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Update Password',
      nav: 'UpdatePassword',
    },
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Go Premium',
      nav: 'GetPremium',
    },
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Workout Reminder',
      nav: 'WorkoutReminder',
    },
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Metric & Imperial units',
      nav: 'MetricUnits',
    },
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Keep the screen on',
      nav: '',
    },
  ];
  const SupportUs = [
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Share with friends',
      nav: '',
    },
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Remove ads',
      nav: '',
    },
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Feedback',
      nav: '',
    },
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Rate us',
      nav: '',
    },
    {
      icon: <Icon name="chevron-forward-outline" size={25} color="white" />,
      text: 'Privacy policy',
      nav: 'PrivacyPolicy',
    },
  ];
  const GeneralSettings = () => (
    <>
      <Text style={CssStyle.settingText}>General Settings</Text>
      <View style={[{}]}>
        {isEnabled ? <KeepAwake /> : ''}
        {generalSetting.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              disabled={item.text == 'Keep the screen on' ? true : false}
              onPress={() => {
                navigation.navigate(item.nav, {item: userDetailData});
              }}
              key={index}>
              <View style={CssStyle.flexJustify}>
                {/* <View style={[CssStyle.flexData, {}]}> */}
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    letterSpacing: 0.8,
                    opacity: 0.8,
                    fontFamily: 'Interstate-regular',
                  }}>
                  {item.text}
                </Text>
                {/* </View> */}
                {item.text == 'Keep the screen on' ? (
                  <Switch
                    style={{marginLeft: responsiveWidth(1)}}
                    trackColor={{false: '#D8D8D880', true: '#006FFF40'}}
                    thumbColor={isEnabled ? AppColors.buttonText : '#D8D8D8'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                ) : (
                  item.icon
                )}
              </View>
            </TouchableOpacity>
            {index !== generalSetting.length - 1 && (
              <Line style={{marginVertical: responsiveHeight(2)}} />
            )}
          </View>
        ))}
      </View>
    </>
  );
  const SupportUsComponent = () => (
    <>
      <Text style={CssStyle.settingText}>Support Us </Text>
      <View style={[{flex: 1, marginBottom: responsiveHeight(3)}]}>
        {SupportUs.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                item.text == 'Feedback'
                  ? setPostFeedBack(true)
                  : item.text == 'Share with friends'
                  ? Share.open({title: 'Feedback'})
                      .then(res => {
                        console.log(res);
                      })
                      .catch(err => {
                        err && console.log(err);
                      })
                  : item.text == 'Rate us'
                  ? {}
                  : item.text == 'Remove ads'
                  ? navigation.navigate('GoPremium')
                  : navigation.navigate('PrivacyPolicy');
              }}
              key={index}>
              <View style={[CssStyle.flexJustify, {}]}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    letterSpacing: 0.8,
                    opacity: 0.8,
                    fontFamily: 'Interstate-regular',
                  }}>
                  {item.text}
                </Text>
                {item.icon}
              </View>
            </TouchableOpacity>
            {index !== SupportUs.length - 1 && (
              <Line style={{marginVertical: responsiveHeight(2)}} />
            )}
          </View>
        ))}
      </View>
    </>
  );
  const dispatch = useDispatch();

  const [feedBack, setFeedBack] = useState('');
  const LogOut = async () => {
    await AsyncStorage.removeItem('userID');
    await AsyncStorage.removeItem('userPassword');
    await AsyncStorage.removeItem('DietPlanId');
    await AsyncStorage.removeItem('Workout_Plan_Id');
    await AsyncStorage.removeItem('WaterTrackerId');
    await AsyncStorage.removeItem('WeightReviewId');
    dispatch(Water_Id(null));
    dispatch(Diet_Id(null));
    dispatch(Workout_Plan_Id(null));
    navigation.navigate('Auth', {screen: 'Login'});
    setOpenModel(false);
  };
  const [dataRestart, setDataRestart] = useState('');
  const RestartProgress = async () => {
    setLoading(true);
    try {
      const result = await RestartProgressAPI(id);
      // console.log(result);
      if (result.status == true) {
        setLoading(false);
        setDataRestart('');
        setOpenRestartModel(false);
      } else {
        setDataRestart(result.message);
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    var mount = true;
    const listener = navigation.addListener('focus', async () => {
      setLoadingUser(true);
      try {
        const result = await GetUserDetailApi(id);
        // console.log(result);
        if (result.status == true) {
          setLoadingUser(false);
          setUserDetailData(result.result);
        } else {
          console.error(result.message);
          setLoadingUser(false);
        }
      } catch (error) {
        setLoadingUser(false);
        console.log(error);
      }
    });
    return () => {
      listener;
      mount = false;
    };
  }, []);
  const GetUserDetail = async () => {
    setLoadingUser(true);
    try {
      const result = await GetUserDetailApi(id);
      // console.log(result);
      if (result.status == true) {
        setLoadingUser(false);
        setUserDetailData(result.result);
      } else {
        console.error(result.message);
        setLoadingUser(false);
      }
    } catch (error) {
      setLoadingUser(false);
      console.log(error);
    }
  };
  useEffect(() => {
    GetUserDetail();
  }, []);
  const UpdateUserName = async () => {
    setLoadingUpdate(true);
    try {
      const result = await UpdateProfileApi(
        id,
        username,
        userDetailData.device_id,
        userDetailData.gender,
        userDetailData.focused_areas,
        userDetailData.height,
        userDetailData.weight,
        userDetailData.weight_unit,
        userDetailData.height_unit,
      );
      // console.log(result);
      if (result.status == true) {
        setLoadingUpdate(false);
        setOpenModelUsername(false);
        setOpenUserSuccessfully(true);
        setUsername('');
      } else {
        console.error(result.message);
        setLoadingUpdate(false);
      }
    } catch (error) {
      setLoadingUpdate(false);
      console.log(error);
    }
  };
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const ShareFeedBack = async () => {
    setLoadingFeedback(true);
    try {
      const result = await PostFeedBackApi(id, feedBack);
      // console.log(result, 'feedback');
      if (result.status == true) {
        setLoadingFeedback(false);
        setFeedBack('');
        setPostFeedBack(false);
      } else {
        console.error(result.message);
        setLoadingFeedback(false);
      }
    } catch (error) {
      setLoadingFeedback(false);
      console.log(error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setData('');
    }, 2500);
  }, [data]);
  return loadingUser ? (
    <Loader />
  ) : (
    <ScrollView
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <ImageBackground
        // resizeMode="contain"
        source={require('../assets/backgroundProfile.png')}
        style={{
          alignItems: 'center',
          // backgroundColor: AppColors.buttonText,
          paddingTop: responsiveHeight(5.5),
        }}>
        <Text style={[styles.signInText]}>My Profile</Text>
        <View style={{alignItems: 'center', marginBottom: responsiveHeight(2)}}>
          <View
            style={{
              width: responsiveWidth(21),
              height: responsiveHeight(10),
              backgroundColor: 'white',
              borderRadius: responsiveWidth(3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Interstate-bold',
                fontSize: 34,
                color: AppColors.buttonText,
              }}>
              {userDetailData?.user_name?.slice(0, 2)}
            </Text>
          </View>
          <View style={[CssStyle.flexData, {marginTop: responsiveHeight(2.2)}]}>
            <Text
              style={{
                fontFamily: 'Interstate-bold',
                fontSize: 24,
                color: 'white',
              }}>
              {userDetailData?.user_name}
            </Text>
            <TouchableOpacity onPress={() => setOpenModelUsername(true)}>
              <Image
                style={{width: 14, height: 14, marginLeft: responsiveWidth(2)}}
                resizeMode="contain"
                source={require('../assets/Health-Hero/Iconfeather-edit-3.png')}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: 'Interstate-regular',
              fontSize: 16,
              color: 'white',
              marginVertical: responsiveHeight(1),
            }}>
            {userDetailData?.email}
          </Text>
        </View>
      </ImageBackground>
      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          flex: 1,
          marginTop: responsiveHeight(2),
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AllPlan')}
          style={{marginVertical: responsiveHeight(2)}}>
          <View style={[CssStyle.flexJustify, {}]}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-regular',
                fontSize: 14,
                letterSpacing: 0.8,
              }}>
              My Plan
            </Text>
            <Icon name="chevron-forward-outline" size={25} color="white" />
          </View>
        </TouchableOpacity>
        <WorkOutSection />
        <GeneralSettings />
        <SupportUsComponent />
        <View
          style={{alignItems: 'center', marginVertical: responsiveHeight(4.5)}}>
          <CustomButton
            onPress={() => setOpenModel(true)}
            activeOpacity={1}
            imageIcon={
              <MaterialIcons
                style={{transform: [{rotate: '180deg'}]}}
                name="logout"
                size={23}
                color="white"
              />
            }
            buttonColor={AppColors.buttonText}
            style={{width: responsiveWidth(80)}}
            buttonText={'Logout'}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
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
                  borderTopEndRadius: responsiveHeight(3),
                  borderTopLeftRadius: responsiveHeight(3),
                  paddingVertical: responsiveHeight(4.8),
                  paddingHorizontal: responsiveWidth(6),
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Interstate-bold',
                      fontSize: 25,
                      color: 'white',
                      marginBottom: responsiveHeight(5),
                    }}>
                    Logout
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Interstate-regular',
                      color: 'white',
                      marginBottom: responsiveHeight(2),
                      fontSize: 16,
                    }}>
                    Do you really want to logout?
                  </Text>
                </View>

                <View style={[CssStyle.flexJustify, {}]}>
                  <CustomButton
                    buttonText={'Cancel'}
                    onPress={() => {
                      setOpenModel(false);
                    }}
                    buttonColor={'transparent'}
                    mode="outlined"
                    fontWeight={'500'}
                    borderColor={'white'}
                    style={{
                      marginTop: responsiveHeight(3.7),
                      width: responsiveWidth(41),
                    }}
                  />
                  <CustomButton
                    buttonText={'Logout'}
                    onPress={() => {
                      LogOut();
                    }}
                    // buttonColor={'transparent'}
                    // mode="outlined"
                    fontWeight={'500'}
                    // borderColor={'white'}
                    style={{
                      marginTop: responsiveHeight(3.7),
                      width: responsiveWidth(41),
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
                  paddingVertical: responsiveHeight(4.8),
                  paddingHorizontal: responsiveWidth(6),
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Interstate-bold',
                      fontSize: 25,
                      color: 'white',
                      marginBottom: responsiveHeight(5),
                    }}>
                    Restart Progress
                  </Text>
                  {dataRestart ? (
                    <Text
                      style={{
                        fontFamily: 'Interstate-regular',
                        color: 'white',
                        marginBottom: responsiveHeight(2),
                        fontSize: 15,
                        opacity: 0.9,
                      }}>
                      There is no active workout plan
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Interstate-regular',
                        color: 'white',
                        marginBottom: responsiveHeight(2),
                        fontSize: 15,
                        opacity: 0.9,
                      }}>
                      Would you like to restart your workout progress?
                    </Text>
                  )}
                </View>

                <View style={[CssStyle.flexJustify, {}]}>
                  <CustomButton
                    buttonText={'Cancel'}
                    onPress={() => {
                      setOpenRestartModel(false);
                    }}
                    buttonColor={'transparent'}
                    mode="outlined"
                    fontWeight={'500'}
                    borderColor={'white'}
                    style={{
                      marginTop: responsiveHeight(3.7),
                      width: responsiveWidth(41),
                    }}
                  />
                  <CustomButton
                    loading={loading}
                    buttonText={dataRestart ? 'Close' : 'Restart'}
                    onPress={() => {
                      dataRestart
                        ? setOpenRestartModel(false)
                        : RestartProgress(),
                        setDataRestart('');
                    }}
                    // buttonColor={'transparent'}
                    // mode="outlined"
                    fontWeight={'500'}
                    // borderColor={'white'}
                    style={{
                      marginTop: responsiveHeight(3.7),
                      width: responsiveWidth(41),
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModelUserName}
        onRequestClose={() => setOpenModelUsername(false)}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setOpenModelUsername(false)}>
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
                  loading={loadingUpdate}
                  buttonText={'Update'}
                  onPress={() => {
                    !username ? setData('username') : UpdateUserName();
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={openUserSuccessfully}
        onRequestClose={() => setOpenUserSuccessfully(false)}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setOpenUserSuccessfully(false)}>
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
                  Username Updated Successfully
                </Text>

                <View style={[{alignItems: 'center'}]}>
                  <CustomButton
                    buttonText={'Go Back'}
                    onPress={() => {
                      setOpenUserSuccessfully(false),
                        GetUserDetail(),
                        setOpenModelUsername(false);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={postFeedBack}
        onRequestClose={() => setPostFeedBack(false)}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setPostFeedBack(false)}>
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
                  paddingHorizontal: responsiveWidth(3),
                  alignItems: 'center',
                  // width: responsiveWidth(80),
                }}>
                <Input
                  bgColor={'#ffffff60'}
                  placeholder={'Give Feedback'}
                  noIcon={true}
                  value={feedBack}
                  onChangeText={e => setFeedBack(e)}
                  fontSize={16}
                  multiline={true}
                  height={responsiveHeight(18)}
                  borderRadius={responsiveWidth(6)}
                  style={{
                    textAlignVertical: 'top',
                    width: responsiveWidth(88),
                  }}
                />

                <View style={[{alignItems: 'center'}]}>
                  <CustomButton
                    loading={loadingFeedback}
                    buttonText={'Post Feedback'}
                    onPress={() => {
                      feedBack
                        ? ShareFeedBack()
                        : ToastAndroid.show(
                            'Please fill the field',
                            ToastAndroid.SHORT,
                          );
                    }}
                    // buttonColor={'transparent'}
                    // mode="outlined"
                    fontWeight={'500'}
                    // borderColor={'white'}
                    style={{
                      marginTop: responsiveHeight(3.7),
                      width: responsiveWidth(70),
                      marginBottom: responsiveHeight(1),
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

export default UserContact;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-regular',
    fontSize: 18,
    opacity: 0.9,
    marginBottom: responsiveHeight(3.6),
  },
});
