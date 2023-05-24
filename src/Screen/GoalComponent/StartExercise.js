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
import Logo from '../../assets/Icon3';
import Timer from '../../assets/Icon';
import CssStyle from '../../StyleSheet/CssStyle';
import CustomButton from '../../component/CustomButton';
import {GetCountDownApi} from '../../services/CountDownApi';
import {useSelector} from 'react-redux';
import {BaseUrl} from '../../Helping/BaseUrl';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Loader from '../../component/Loader';

const StartExercise = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  // console.log(item, 'start exercise');
  const countdownRef = useRef();
  const [loading, setLoading] = useState(false);
  const [countDownData, setCountDownData] = useState(0);
  const [dataCount, setDataCount] = useState(12);
  const id = useSelector(data => data.id);
  // const GetCategory = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await GetCountDownApi(id);
  //     console.log(result);
  //     if (result.status == true) {
  //       setDataCount(result.result.time);
  //       setLoading(false);
  //     } else {
  //       console.error(result.message);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // GetCategory();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <ImageBackground
      style={{
        flex: 1,
        // resizeMode: 'contain',
      }}
      // resizeMode="contain"
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
            flex: 1.5,
          }}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={25} color={'white'} />
        </TouchableOpacity>
        <View style={{alignItems: 'center', flex: 1}}>
          {/* <ProgressCircle
            percent={30 * 3.34}
            radius={50}
            borderWidth={4}
            // outerCircleStyle={{backgroundColor: 'yellow', aspectRatio: 1,}}
            // outerCircleStyle
            color={'#FF7B27'}
            // containerStyle={{backgroundColor: 'transparent',aspectRatio:}}
            // shadowColor="#C6C6C6"
            bgColor={AppColors.blueColor}>
            <View style={CssStyle.flexData}>
              <Countdown
                ref={countdownRef}
                style={styles.timer}
                textStyle={styles.watchTime}
                initialSeconds={countDownData?.time ? countDownData?.time : 15}
                onTimes={e => {
                  //   setDataNumber(e);
                }}
                onPause={e => {}}
                onEnd={
                  e => {}
                  //   e == 0
                  // ? navigation.navigate('Completed')
                  // : console.log(e, 'end')
                }
              />
            </View>
          </ProgressCircle> */}
          <CountdownCircleTimer
            isPlaying
            duration={dataCount}
            size={120}
            strokeWidth={8}
            onComplete={data => {
              navigation.navigate('GetExercise', {item: item.item}),
                setDataCount(0);
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
                fontFamily: 'Interstate-regular',
                marginTop: responsiveHeight(4.7),
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
              <Image
                source={{
                  uri: item?.item?.exercises
                    ? `${BaseUrl}` + item?.item?.exercises[0].animation
                    : item?.item?.exersise_details
                    ? `${BaseUrl}` + item?.item?.exersise_details?.animation
                    : item?.exersise_details
                    ? `${BaseUrl}` + item?.exersise_details?.animation
                    : item?.item?.animation
                    ? `${BaseUrl}` + item?.item.animation
                    : `${BaseUrl}` + item?.item?.image,
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
                {item?.item?.exercises
                  ? item?.item?.exercises[0].title
                  : item?.item?.exersise_details
                  ? item?.item?.exersise_details?.title
                  : item?.exersise_details
                  ? item?.exersise_details?.title
                  : item?.item?.title
                  ? item?.item?.title
                  : item?.item?.workout_title}
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
                {item?.item?.exercises
                  ? item?.item?.exercises[0].description
                  : item?.item?.exersise_details
                  ? item?.item?.exersise_details?.description
                  : item?.exersise_details
                  ? item?.exersise_details?.description
                  : item?.item?.description}
              </Text>
              <View
                style={[CssStyle.flexJustify, {width: responsiveWidth(50)}]}>
                <View
                  style={[
                    CssStyle.flexData,
                    {marginVertical: responsiveHeight(0.6)},
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
                    {item?.item?.calories_burnt
                      ? item?.item?.calories_burnt
                      : 0}{' '}
                    kcal
                  </Text>
                </View>
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
                    {item?.item?.time
                      ? item?.item?.exersise_details
                        ? item?.item?.exersise_details?.time?.slice(0, 2)
                        : item?.item?.time?.slice(0, 2)
                      : '0 sec'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: responsiveHeight(4)}}>
            <CustomButton
              onPress={() =>
                navigation.navigate('GetExercise', {item: item})
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
