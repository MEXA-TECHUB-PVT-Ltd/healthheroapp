import {
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
import CssStyle from '../../StyleSheet/CssStyle';
import CustomButton from '../../component/CustomButton';
import {GetCountDownApi} from '../../services/CountDownApi';
import {useSelector} from 'react-redux';
const StartExercise = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  // console.log(item);
  const countdownRef = useRef();
  const [loading, setLoading] = useState(false);
  const [countDownData, setCountDownData] = useState('');
  const id = useSelector(data => data.id);
  const GetCategory = async () => {
    setLoading(true);
    try {
      const result = await GetCountDownApi(id);
      console.log(result);
      if (result.status == true) {
        setCountDownData(result.result);
        setLoading(false);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    GetCategory();
  }, []);
  return (
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
          <ProgressCircle
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
            {/* } */}
            {/* </Text> */}
          </ProgressCircle>
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
                source={require('../../assets/Rectangle33.png')}
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
                Yoga Exercise
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
                Lorem ipsum dolor sit emet , consectetur amet elitr dolor sit,
                emit as
              </Text>
              <View
                style={[CssStyle.flexJustify, {width: responsiveWidth(45)}]}>
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
                    400 kcal
                  </Text>
                </View>
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
          </View>
          <View style={{alignItems: 'center', marginTop: responsiveHeight(4)}}>
            <CustomButton
              onPress={() => navigation.navigate('GetExercise', {item: item})}
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
