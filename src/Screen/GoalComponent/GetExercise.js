import {
  Alert,
  BackHandler,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from '../../Helping/AppColor';
import {Countdown} from 'react-native-element-timer';
import ProgressCircle from 'react-native-progress-circle';
import Logo from '../../assets/Icon';
import NoImage from '../../assets/noImageRed';
import CustomButton from '../../component/CustomButton';
import {BaseUrl} from '../../Helping/BaseUrl';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {useSelector} from 'react-redux';
import {StartWorkoutPlanApi} from '../../services/WorkoutPlan';
import moment from 'moment';
import {
  CompleteSevenByFourApi,
  StartSevenByFourApi,
} from '../../services/SevenFour';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';

const GetExercise = ({navigation, route}) => {
  const id = useSelector(data => data.id);
  const workplanId = useSelector(data => data.workoutPlanId);

  const {item, indexNumber, indexData, itemIndex} = route.params
    ? route.params
    : '';
  const countdownRef = useRef();
  const [countQuit, setCountQuit] = useState(10);
  const dataRedux = useSelector(data => data.workoutPlanData);
  const [index, setIndex] = useState(indexNumber ? indexNumber : 0);
  const [dataTakeFromRedux, setDataTakeFromRedux] = useState(
    dataRedux ? dataRedux : [],
  );
  const [takeNumberOfCircle, setTakeNumberOfCircle] = useState('');
  const [openModel, setOpenModel] = useState(false);
  const timeStr = dataTakeFromRedux[index]?.time;
  const timeObj = moment(timeStr, 'HH:mm:ss');
  const seconds =
    timeObj.hours() * 3600 + timeObj.minutes() * 60 + timeObj.seconds();
  const calculateY = (x, maxValue) => {
    // Convert x to a decimal value
    const xDecimal = x / 100;

    // Calculate y by multiplying xDecimal by the maxValue
    const y = xDecimal * maxValue;

    return y;
  };
  const x = 100; // The x value representing 50%
  const maxValue = seconds; // The maximum value corresponding to 100%
  const y = calculateY(x, maxValue);
  // console.log(y); // Output: 100
  const padDigits = number => {
    return number.toString().padStart(2, '0');
  };
  const findPercentage = takeNumberOfCircle / seconds;

  useEffect(() => {
    dataTakeFromRedux[index]?.time != '0' ? countdownRef.current.start() : {};
    setRunning(true);
  }, [item, index]);

  const [running, setRunning] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const SevenByFour = useSelector(data => data);

  useEffect(() => {
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const handleBackPress = () => {
      setOpenModel(true), setCountQuit(10);
      return true;
    };

    const addBackPressListener = () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    };

    const removeBackPressListener = () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };

    addBackPressListener();

    return () => {
      removeBackPressListener();
    };
  }, []);
  const PaymentSuccessful = useSelector(item => item.PaymentSuccessfulId);

  useEffect(() => {
    const unsubscribe = interStitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        index == 5 && indexData == 5 && interStitial.show();
      },
    );
    !PaymentSuccessful && interStitial.load();
    return unsubscribe;
  }, [indexData == 5]);
  useEffect(() => {
    const unsubscribe = interStitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        index == 1 && indexData == 1 && interStitial.show();
      },
    );
    !PaymentSuccessful && interStitial.load();
    return unsubscribe;
  }, [item]);

  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${padDigits(hours)}:${padDigits(minutes)}:${padDigits(seconds)}`;
  };

  const StartWorkoutForProgress = async () => {
    // setLoading(true);
    try {
      const result = await StartWorkoutPlanApi(
        id,
        workplanId,
        formatTime(timeElapsed),
        moment(new Date()).format('YYYY-MM-DD'),
      );
      console.log(result, 'start workout api response');
      if (result.status == true) {
        // setLoading(false);
        setRunning(false);
      } else {
        setRunning(false);
        // setLoading(false);
        // ToastAndroid.show(result.message, ToastAndroid.SHORT);
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const CompleteSevenByFour = async () => {
    // setLoading(true);
    try {
      const result = await StartSevenByFourApi(
        id,
        SevenByFour.SevenByFourId,
        SevenByFour.SevenByFourWeekId,
        SevenByFour.SevenByFourDayId,
        formatTime(timeElapsed),
        moment(new Date()).format('YYYY-MM-DD'),
      );
      console.log(result, 'this is the complete seven by four');
      if (result.status == true) {
        // setLoading(false);
        setRunning(false);
      } else {
        setRunning(false);
        // setLoading(false);
        // ToastAndroid.show(result.message, ToastAndroid.SHORT);
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const adUnitId = TestIds.INTERSTITIAL;
  const interStitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion'],
  });
  // console.log(running, index, 'sdfds');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <ImageBackground
        style={{width: responsiveWidth(100), height: responsiveHeight(40)}}
        source={
          dataTakeFromRedux[index]?.exercise_details !== null
            ? {
                uri: dataTakeFromRedux[index]?.exercise_details
                  ? `${BaseUrl}` +
                    dataTakeFromRedux[index]?.exercise_details[0]?.animation
                  : `${BaseUrl}` +
                    dataTakeFromRedux[index]?.exersise_details?.animation,
              }
            : require('../../assets/noImageRed.png')
        }></ImageBackground>

      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.blueColor,
          borderTopLeftRadius: responsiveWidth(5),
          borderTopRightRadius: responsiveWidth(5),
          marginTop: responsiveHeight(-3),
          paddingTop: responsiveHeight(5),
        }}>
        <View
          style={{
            width: responsiveWidth(100),
            paddingHorizontal: responsiveWidth(6),
            flex: 1,
          }}>
          <Text style={[styles.signInText]}>
            {dataTakeFromRedux[index]?.exersise_details !== null
              ? dataTakeFromRedux[index]?.exercise_details !== null
                ? dataTakeFromRedux[index]?.exercise_details
                  ? dataTakeFromRedux[index]?.exercise_details[0]?.title
                  : dataTakeFromRedux[index]?.exersise_details?.title
                : 'No title'
              : 'No title'}
          </Text>
          <View
            style={[
              CssStyle.flexJustify,
              {marginTop: responsiveHeight(9.4), flex: 1},
            ]}>
            <TouchableOpacity
              style={{
                backgroundColor: index == 0 ? '#ffffff40' : '#FF510050',
                borderRadius: responsiveHeight(10),
                width: 39,
                height: 39,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                index == 0
                  ? {}
                  : (setIndex(index - 1),
                    navigation.navigate('RestTime', {item: index - 1}),
                    setRunning(false));
              }}>
              <Icon
                name="chevron-back-outline"
                size={29}
                color={AppColors.buttonText}
              />
            </TouchableOpacity>
            {/* {console.log(takeNumberOfCircle/11-20)} */}
            {dataTakeFromRedux[index]?.time !== '0' ? (
              <ProgressCircle
                percent={findPercentage * 100}
                radius={52}
                borderWidth={4}
                color={'#FF7B27'}
                shadowColor="#C6C6C6"
                bgColor={AppColors.blueColor}>
                <View style={CssStyle.flexData}>
                  <Countdown
                    ref={countdownRef}
                    style={styles.timer}
                    textStyle={[
                      styles.watchTime,
                      {
                        fontSize: responsiveWidth(5.5),
                      },
                    ]}
                    initialSeconds={seconds}
                    onTimes={e => setTakeNumberOfCircle(e)}
                    onPause={e => {}}
                    onEnd={e =>
                      index == dataTakeFromRedux.length - 1
                        ? {}
                        : (setIndex(index + 1),
                          navigation.navigate('RestTime', {item: index}),
                          setRunning(false))
                    }
                  />
                </View>
              </ProgressCircle>
            ) : (
              <View
                style={{
                  marginVertical: responsiveHeight(4),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Interstate-regular',
                    fontSize: 28,
                    marginBottom: responsiveHeight(1),
                  }}>
                  {dataTakeFromRedux[index]?.reps}{' '}
                  <Text style={{fontSize: 19}}>X</Text>
                </Text>
                {/* <CustomButton
                  buttonText={'Rest Time'}
                  paddingVertical={2}
                  style={{width: responsiveWidth(35)}}
                  onPress={() => {
                    index == dataTakeFromRedux.length - 1
                      ? (navigation.navigate('Focused', {item: 'hello'}),
                        setRunning(false),
                        dataTakeFromRedux[index]?.exercise_details
                          ? CompleteSevenByFour()
                          : StartWorkoutForProgress())
                      : (setIndex(index + 1),
                        navigation.navigate('RestTime', {item: index}),
                        setRunning(false));
                  }}
                /> */}
              </View>
            )}
            <TouchableOpacity
              style={{
                backgroundColor:
                  index == dataTakeFromRedux.length - 1
                    ? '#ffffff40'
                    : '#FF510050',
                borderRadius: responsiveHeight(10),
                width: 39,
                height: 39,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                index == dataTakeFromRedux.length - 1
                  ? {}
                  : setIndex(index + 1),
                  index == dataTakeFromRedux.length - 1
                    ? (navigation.navigate('Focused'),
                      setRunning(false),
                      dataTakeFromRedux[index]?.exercise_details
                        ? CompleteSevenByFour()
                        : StartWorkoutForProgress())
                    : (setRunning(false),
                      navigation.navigate('RestTime', {item: index}));
              }}>
              <Icon
                name="chevron-forward-outline"
                size={29}
                color={AppColors.buttonText}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: responsiveHeight(9), flex: 1}}>
            <Text
              onPress={() => setRunning(!running)}
              style={{
                color: 'white',
                fontFamily: 'Interstate-regular',
                fontSize: 17,
                marginBottom: responsiveHeight(2),
              }}>
              Next Exercise
            </Text>
            <View style={{flex: 1, paddingBottom: responsiveHeight(7)}}>
              {!dataTakeFromRedux[index + 1] ? (
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: responsiveHeight(2),
                  }}>
                  <CustomButton
                    iconName={'checkmark'}
                    onPress={() => {
                      navigation.navigate('Focused', {item: 'hello'}),
                        setRunning(false),
                        dataTakeFromRedux[index]?.exercise_details
                          ? CompleteSevenByFour()
                          : StartWorkoutForProgress();
                    }}
                    iconColor="white"
                    buttonText={'Complete workout'}
                    style={{width: responsiveWidth(80)}}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={1}
                  // onPress={() => {
                  //   index == dataTakeFromRedux.length - 1
                  //     ? {}
                  //     : setIndex(index + 1);
                  // }}
                  style={[
                    CssStyle.flexData,
                    {marginBottom: responsiveHeight(2)},
                  ]}>
                  <View style={{width: responsiveWidth(32)}}>
                    {dataTakeFromRedux[index + 1]?.exercise_details !== null ? (
                      <Image
                        source={{
                          uri: dataTakeFromRedux[index + 1]?.exercise_details
                            ? `${BaseUrl}` +
                              dataTakeFromRedux[index + 1]?.exercise_details[0]
                                ?.animation
                            : `${BaseUrl}` +
                              dataTakeFromRedux[index + 1]?.exersise_details
                                ?.animation,
                        }}
                        resizeMode="contain"
                        style={{
                          width: 99,
                          height: 90,
                          //   marginRight: responsiveWidth(2),
                        }}
                      />
                    ) : (
                      <NoImage width={99} height={90} />
                    )}
                  </View>
                  <View style={{width: responsiveWidth(53)}}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontFamily: 'Interstate-regular',
                        opacity: 0.8,
                      }}>
                      {dataTakeFromRedux[index + 1]?.exersise_details !== null
                        ? dataTakeFromRedux[index + 1]?.exercise_details
                          ? dataTakeFromRedux[index + 1]?.exercise_details[0]
                              ?.title
                          : dataTakeFromRedux[index + 1]?.exersise_details
                              ?.title
                        : 'No Title'}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 11,
                        fontFamily: 'Interstate-regular',
                        marginVertical: responsiveHeight(0.7),
                        opacity: 0.5,
                        lineHeight: responsiveHeight(2),
                      }}>
                      {dataTakeFromRedux[index + 1]?.exersise_details !== null
                        ? dataTakeFromRedux[index + 1]?.exercise_details
                          ? dataTakeFromRedux[
                              index + 1
                            ]?.exercise_details[0]?.description.slice(0, 62)
                          : dataTakeFromRedux[
                              index + 1
                            ]?.exersise_details?.description.slice(0, 72)
                        : 'No Description'}
                      {/* {(dataTakeFromRedux[index + 1]?.exersise_details
                        ?.description?.length > 71 ||
                        dataTakeFromRedux[index + 1]?.exercise_details
                          ?.description?.length > 71) && (
                        <Text
                          style={{color: 'blue'}}
                          onPress={() =>
                            Alert.alert(
                              'Information',
                              dataTakeFromRedux[index + 1]?.exercise_details
                                ? dataTakeFromRedux[index + 1]
                                    .exercise_details[0]?.description
                                : dataTakeFromRedux[index + 1]?.exersise_details
                                    ?.description,
                            )
                          }>
                          See more
                        </Text>
                      )} */}
                    </Text>
                    <View style={[CssStyle.flexJustify]}>
                      <View
                        style={[
                          CssStyle.flexData,
                          {marginVertical: responsiveHeight(1)},
                        ]}>
                        <Logo width={16} height={16} />
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: 'Interstate-regular',
                            fontSize: 12,
                            marginLeft: responsiveWidth(2),
                            opacity: 0.5,
                          }}>
                          {!dataTakeFromRedux[index + 1]?.reps
                            ? dataTakeFromRedux[index + 1]?.time !== null
                              ? dataTakeFromRedux[index + 1]?.time
                              : '0'
                            : dataTakeFromRedux[index + 1]?.reps}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
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
          <View style={{flex: 1, backgroundColor: '#00000060'}}>
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
                  paddingTop: responsiveHeight(4),
                  paddingBottom: responsiveHeight(5),
                }}>
                <CountdownCircleTimer
                  isPlaying
                  duration={countQuit}
                  size={110}
                  strokeWidth={8}
                  onComplete={() => {
                    setOpenModel(false), setCountQuit(0);
                  }}
                  colors={['#FF5100', '#FF510090', '#FF5100b1', '#FF5100e1']}>
                  {({remainingTime}) => (
                    <Text style={{color: 'white', fontSize: 22}}>
                      {remainingTime}
                    </Text>
                  )}
                </CountdownCircleTimer>
                <View
                  style={[
                    CssStyle.flexJustify,
                    {marginTop: responsiveHeight(5.7)},
                  ]}>
                  <CustomButton
                    onPress={() => {
                      navigation.navigate('QuitExercise', {item: item}),
                        dataTakeFromRedux[index]?.exercise_details
                          ? CompleteSevenByFour()
                          : StartWorkoutForProgress();
                      setRunning(false);
                      setOpenModel(false);
                      setCountQuit(0);
                      // BackHandler.removeEventListener('hardwareBackPress');
                    }}
                    activeOpacity={1}
                    buttonColor={'transparent'}
                    mode="outlined"
                    borderColor={'white'}
                    style={{width: responsiveWidth(38)}}
                    buttonText={'Quit'}
                  />
                  <CustomButton
                    onPress={() => {
                      setOpenModel(false), setCountQuit(false);
                    }}
                    activeOpacity={1}
                    style={{
                      width: responsiveWidth(38),
                      marginLeft: responsiveWidth(4),
                    }}
                    buttonColor={AppColors.buttonText}
                    buttonText={'Continue'}
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

export default GetExercise;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: responsiveFontSize(3.3),
    alignSelf: 'center',
  },
  armText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: responsiveWidth(2),
    textTransform: 'uppercase',
  },
  watchTime: {
    color: 'white',
    fontWeight: 'bold',
  },
  timer: {
    // marginVertical: 10,
  },
});
