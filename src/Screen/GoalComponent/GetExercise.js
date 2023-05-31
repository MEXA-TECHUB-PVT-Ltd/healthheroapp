import {
  BackHandler,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import CustomButton from '../../component/CustomButton';
import {BaseUrl} from '../../Helping/BaseUrl';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {useSelector} from 'react-redux';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {StartWorkoutPlanApi} from '../../services/WorkoutPlan';
import moment from 'moment';
const GetExercise = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  // console.log(item, 'item');
  // console.log(item, 'get exercise');
  const countdownRef = useRef();
  const dataRedux = useSelector(data => data.workoutPlanData);
  const [dataTakeFromRedux, setDataTakeFromRedux] = useState(
    dataRedux ? dataRedux?.workout_plan_exersises : [],
  );
  const [index, setIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  // console.log(dataTakeFromRedux);
  const [takeNumberOfCircle, setTakeNumberOfCircle] = useState('');
  const [openModel, setOpenModel] = useState(false);
  useEffect(() => {
    countdownRef.current.start();
    setRunning(true);
  }, [item, index]);
  const [running, setRunning] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);

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
  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${padDigits(hours)}:${padDigits(minutes)}:${padDigits(seconds)}`;
  };

  const padDigits = number => {
    return number.toString().padStart(2, '0');
  };
  const id = useSelector(data => data.id);
  const [loading, setLoading] = useState(false);
  const StartWorkoutForProgress = async () => {
    setLoading(true);
    try {
      const result = await StartWorkoutPlanApi(
        id,
        dataRedux.workout_plan_id,
        formatTime(timeElapsed),
        moment(new Date()).format('YYYY-MM-DD'),
      );
      console.log(result, 'start workout api response');
      if (result.status == true) {
        setLoading(false);
      } else {
        setLoading(false);
        console.error(result.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView style={[CssStyle.mainContainer, {}]}>
      <ImageBackground
        style={{width: responsiveWidth(100), height: responsiveHeight(40)}}
        source={{
          uri:
            `${BaseUrl}` +
            dataTakeFromRedux[index]?.exersise_details?.animation,
        }}></ImageBackground>

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
            {dataTakeFromRedux[index]?.exersise_details?.title}
          </Text>
          <View
            style={[
              CssStyle.flexJustify,
              {marginTop: responsiveHeight(9.4), flex: 1},
            ]}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FF510050',
                borderRadius: responsiveHeight(10),
                width: 39,
                height: 39,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                index == 0 ? {} : setIndex(index - 1);
              }}>
              <Icon
                name="chevron-back-outline"
                size={29}
                color={AppColors.buttonText}
              />
            </TouchableOpacity>
            <ProgressCircle
              percent={takeNumberOfCircle * 8}
              radius={52}
              borderWidth={4}
              color={'#FF7B27'}
              shadowColor="#C6C6C6"
              bgColor={AppColors.blueColor}>
              <View style={CssStyle.flexData}>
                <Countdown
                  ref={countdownRef}
                  style={styles.timer}
                  textStyle={styles.watchTime}
                  initialSeconds={dataTakeFromRedux[index].time}
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
            <TouchableOpacity
              style={{
                backgroundColor: '#FF510050',
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
                      StartWorkoutForProgress())
                    : (navigation.navigate('RestTime', {item: index}),
                      setRunning(false));
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
                  {/* <Text
                    style={{
                      color: 'white',
                      fontSize: 17,
                      fontFamily: 'Interstate-regular',
                      paddingBottom: responsiveHeight(5),
                    }}>
                    {completed ? 'completed' : 'No Next Exercise'}
                  </Text> */}
                  <CustomButton
                    iconName={'checkmark'}
                    onPress={() => {
                      navigation.navigate('Focused', {item: 'hello'}),
                      setRunning(false), StartWorkoutForProgress();
                    }}
                    iconColor="white"
                    buttonText={'Complete workout'}
                    style={{width: responsiveWidth(80)}}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    index == dataTakeFromRedux.length - 1
                      ? {}
                      : setIndex(index + 1);
                  }}
                  style={[
                    CssStyle.flexData,
                    {marginBottom: responsiveHeight(2)},
                  ]}>
                  <View style={{width: responsiveWidth(32)}}>
                    <Image
                      source={{
                        uri:
                          `${BaseUrl}` +
                          dataTakeFromRedux[index + 1]?.exersise_details
                            .animation,
                      }}
                      resizeMode="contain"
                      style={{
                        width: 99,
                        height: 90,
                        //   marginRight: responsiveWidth(2),
                      }}
                    />
                  </View>
                  <View style={{width: responsiveWidth(53)}}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontFamily: 'Interstate-regular',
                        opacity: 0.8,
                      }}>
                      {dataTakeFromRedux[index + 1]?.exersise_details.title}
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
                      {
                        dataTakeFromRedux[index + 1]?.exersise_details
                          .description
                      }
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
                          45 min
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
                  duration={10}
                  size={110}
                  strokeWidth={8}
                  onComplete={() => setOpenModel(false)}
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
                        setOpenModel(false);
                    }}
                    activeOpacity={1}
                    buttonColor={'transparent'}
                    mode="outlined"
                    borderColor={'white'}
                    style={{width: responsiveWidth(38)}}
                    buttonText={'Quit'}
                  />
                  <CustomButton
                    onPress={() => setOpenModel(false)}
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
    fontSize: responsiveWidth(6),
    fontWeight: 'bold',
  },
  timer: {
    // marginVertical: 10,
  },
});
