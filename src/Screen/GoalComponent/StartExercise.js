import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {Countdown} from 'react-native-element-timer';
import ProgressCircle from 'react-native-progress-circle';
import {AppColors} from '../../Helping/AppColor';
import Timer from '../../assets/Icon';
import CssStyle from '../../StyleSheet/CssStyle';
import CustomButton from '../../component/CustomButton';
import {GetCountDownApi} from '../../services/CountDownApi';
import {useSelector} from 'react-redux';
import {BaseUrl} from '../../Helping/BaseUrl';
import Loader from '../../component/Loader';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import NoImage from '../../assets/noImageRed';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const StartExercise = ({navigation, route}) => {
  const {item} = route.params ? route.params : 0;
  const [countDownData, setCountDownData] = useState(9);
  const id = useSelector(data => data);
  const GetCategory = async () => {
    setLoading(true);
    try {
      const result = await GetCountDownApi(id.id);
      // console.log(result);
      if (result.status == true) {
        setCountDownData(result.result.time);
        setLoading(false);
        // countdownRef.current.start();
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const [reduxData, setReduxData] = useState(
    id ? id.workoutPlanData[item ? item : 0] : '',
  );
  const otherExercise_data = reduxData?.exercise_details
    ? reduxData?.exercise_details[0]
    : reduxData?.exersise_details;
  // console.log(reduxData, 'fsldfjskld');
  useEffect(() => {
    GetCategory();
  }, []);
  const countdownRef = useRef();
  const [loading, setLoading] = useState(false);
  const [dataTime, setDataTime] = useState(false);
  useEffect(() => {
    // countdownRef.current.start();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={require('../../assets/Health-Hero/backgroundOther.png')}>
      <LinearGradient
        colors={['#0B183C00', '#0B183Ce1']}
        start={{x: 1, y: 0.1}}
        end={{x: 1, y: 0.5}}
        style={{
          paddingHorizontal: responsiveWidth(5),
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            marginLeft: responsiveWidth(1),
            paddingTop: responsiveHeight(3),
            flex: 0.7,
          }}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={25} color={'white'} />
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginBottom: responsiveHeight(4)}}>
          <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.LARGE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
        <View style={{alignItems: 'center', flex: 1}}>
          {/* <ProgressCircle
            percent={countdownRef * 40}
            radius={50}
            borderWidth={4}
            color={'#FF7B27'}
            containerStyle={{}}
            // shadowColor="#C6C6C6"
            bgColor={AppColors.blueColor}>
            <View style={CssStyle.flexData}>
              <Countdown
                ref={countdownRef}
                style={styles.timer}
                textStyle={styles.watchTime}
                initialSeconds={countDownData}
                onTimes={e => {
                  //   setDataNumber(e);
                }}
                onPause={e => {}}
                onEnd={e => {
                  navigation.navigate('GetExercise', {item: 'StartExercise'});
                }}
              />
            </View>
          </ProgressCircle> */}
          <CountdownCircleTimer
            isPlaying={dataTime ? false : true}
            duration={countDownData}
            size={120}
            strokeWidth={8}
            onComplete={e => {
              navigation.navigate('GetExercise'), setDataTime(true);
            }}
            colors={['#FF5100', '#FF510090', '#FF5100b1', '#FF5100e1']}>
            {({remainingTime}) => (
              <Text style={{color: 'white', fontSize: 22}}>
                {remainingTime}
              </Text>
            )}
          </CountdownCircleTimer>
          <Text
            style={[
              styles.signInText,
              {
                fontFamily: 'Interstate-bold',
                marginTop: responsiveHeight(2.7),
              },
            ]}>
            Ready to Go!
          </Text>
        </View>
        <View style={{marginTop: responsiveHeight(6), flex: 2}}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Interstate-regular',
              fontSize: 17,
              marginBottom: responsiveHeight(2),
            }}>
            Upcoming Exercise
          </Text>
          <View
            style={[CssStyle.flexData, {marginBottom: responsiveHeight(2)}]}>
            <View style={{width: responsiveWidth(29)}}>
              {reduxData?.exercise_details !== null ? (
                <Image
                  source={{
                    uri: otherExercise_data
                      ? `${BaseUrl}` + otherExercise_data?.animation
                      : reduxData?.animation,
                  }}
                  resizeMode="contain"
                  style={{
                    width: 99,
                    height: 90,
                    //   marginRight: responsiveWidth(2),
                  }}
                />
              ) : (
                <NoImage
                  width={responsiveWidth(19)}
                  height={responsiveHeight(9)}
                  style={{marginRight: responsiveWidth(4)}}
                />
              )}
            </View>
            <View style={{width: responsiveWidth(53)}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'Interstate-regular',
                  opacity: 0.8,
                  textTransform: 'capitalize',
                }}>
                {otherExercise_data
                  ? reduxData?.exercise_details !== null
                    ? otherExercise_data?.title
                    : 'No title'
                  : reduxData?.title}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 11,
                  fontFamily: 'Interstate-regular',
                  marginVertical: responsiveHeight(0.7),
                  opacity: 0.5,
                  lineHeight: responsiveHeight(2),
                  height: responsiveHeight(2.7),
                }}>
                {otherExercise_data
                  ? reduxData?.exercise_details !== null
                    ? otherExercise_data?.description
                    : 'no description'
                  : reduxData?.description}
              </Text>
              <View
                style={[CssStyle.flexJustify, {width: responsiveWidth(50)}]}>
                <View
                  style={[
                    CssStyle.flexData,
                    {marginVertical: responsiveHeight(1)},
                  ]}>
                  <Timer width={16} height={16} />
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Interstate-regular',
                      fontSize: 12,
                      marginLeft: responsiveWidth(2),
                      opacity: 0.5,
                    }}>
                    {!reduxData?.reps
                      ? reduxData?.time
                        ? reduxData?.time
                        : '0 sec'
                      : reduxData?.reps}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: responsiveHeight(4)}}>
            <CustomButton
              onPress={() =>
                navigation.navigate('GetExercise', {
                  indexNumber: item,
                })
              }
              activeOpacity={1}
              buttonColor={AppColors.buttonText}
              paddingVertical={2}
              style={{width: responsiveWidth(80)}}
              buttonText={'Start Exercise'}
            />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default StartExercise;

const styles = StyleSheet.create({
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
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: responsiveFontSize(4),
  },
});
