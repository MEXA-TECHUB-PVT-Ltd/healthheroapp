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
import Logo from '../../assets/Icon';
import CssStyle from '../../StyleSheet/CssStyle';
import CustomButton from '../../component/CustomButton';
import {useSelector} from 'react-redux';
import {GetRestTimeApi} from '../../services/RestApi';
import Loader from '../../component/Loader';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {BaseUrl} from '../../Helping/BaseUrl';

const RestTime = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  // console.log(item);
  const countdownRef = useRef();

  const data = useSelector(data => data);
  const [loading, setLoading] = useState(false);
  const [dataTakeFromRedux, setDataTakeFromRedux] = useState(
    data.workoutPlanData,
  );
  const [sec, setSec] = useState(12);
  const GetPlan = async () => {
    setLoading(true);
    try {
      const result = await GetRestTimeApi(data.id);
      if (result.status == true) {
        setLoading(false);
        setSec(parseInt(result.result.time));
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
    GetPlan();
  }, [data]);
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
      source={require('../../assets/Health-Hero/restTime.png')}>
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
            marginLeft: responsiveWidth(3),
            paddingTop: responsiveHeight(3),
            flex: 1.5,
          }}
          onPress={() => {
            navigation.navigate('GetExercise', {item: Math.random()});
          }}>
          <Icon name="chevron-back-outline" size={25} color={'white'} />
        </TouchableOpacity>
        <View style={{alignItems: 'center', flex: 1}}>
          {/* <ProgressCircle
            percent={dataNumber * 3.34}
            radius={50}
            borderWidth={4}
            color={'#FF7B27'}
            shadowColor="#C6C6C6"
            bgColor={AppColors.blueColor}>
            <View style={CssStyle.flexData}>
              <Countdown
                ref={countdownRef}
                style={styles.timer}
                textStyle={styles.watchTime}
                initialSeconds={sec}
                onTimes={e => {
                  setDataNumber(e);
                }}
                onPause={e => {}}
                onEnd={e => {}}
              />
            </View>
          </ProgressCircle> */}
          <CountdownCircleTimer
            isPlaying
            duration={sec}
            size={120}
            strokeWidth={8}
            onComplete={() => {
              navigation.navigate('GetExercise', {item: Math.random()});
            }}
            colors={['#FF5100', '#FF5100', '#FF5100']}>
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
            Rest Time
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
            Next Exercise
          </Text>
          {dataTakeFromRedux[item + 1] ? (
            <View
              style={[CssStyle.flexData, {marginBottom: responsiveHeight(2)}]}>
              <View style={{width: responsiveWidth(34)}}>
                <Image
                  source={{
                    uri: dataTakeFromRedux[item + 1]?.exercise_details
                      ? `${BaseUrl}` +
                        dataTakeFromRedux[item + 1]?.exercise_details[0]
                          .animation
                      : `${BaseUrl}` +
                        dataTakeFromRedux[item + 1]?.exersise_details
                          ?.animation,
                  }}
                  // resizeMode="contain"
                  style={{
                    width: 110,
                    height: 85,
                    //   marginRight: responsiveWidth(2),
                  }}
                  borderRadius={responsiveWidth(2)}
                />
              </View>
              <View style={{width: responsiveWidth(56)}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    fontFamily: 'Interstate-regular',
                    opacity: 0.8,
                  }}>
                  {dataTakeFromRedux[item + 1]?.exercise_details
                    ? dataTakeFromRedux[item + 1]?.exercise_details[0]?.title
                    : dataTakeFromRedux[item + 1]?.exersise_details?.title}
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
                  {dataTakeFromRedux[item + 1]?.exercise_details
                    ? dataTakeFromRedux[
                        item + 1
                      ]?.exercise_details[0]?.description.slice(0, 72)
                    : dataTakeFromRedux[
                        item + 1
                      ]?.exersise_details?.description?.slice(0, 72)}
                  {/* {dataTakeFromRedux[item + 1]?.exersise_details?.description
                    ?.length > 71 && (
                    <Text
                      style={{color: 'blue'}}
                      onPress={() =>
                        Alert.alert(
                          'Information',
                          dataTakeFromRedux[item + 1]?.exersise_details
                            ?.description,
                        )
                      }>
                      See more
                    </Text>
                  )} */}
                </Text>
                <View
                  style={[CssStyle.flexJustify, {width: responsiveWidth(45)}]}>
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
                      {dataTakeFromRedux[item + 1]?.time}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                paddingVertical: responsiveHeight(2),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 17,
                  fontFamily: 'Interstate-regular',
                  paddingBottom: responsiveHeight(5),
                }}>
                No Next Exercise
              </Text>
            </View>
          )}
          <View style={{alignItems: 'center', marginTop: responsiveHeight(7)}}>
            <View style={[CssStyle.flexJustify, {width: responsiveWidth(80)}]}>
              <CustomButton
                onPress={() => {
                  setSec(sec + 20);
                }}
                buttonText={'20s'}
                iconName="add"
                style={{width: responsiveWidth(38)}}
                fontWeight="bold"
                buttonColor={'transparent'}
                colorText={'white'}
                borderColor={'white'}
                mode="outlined"
                // paddingVertical={3}
                iconColor={'white'}
              />
              <CustomButton
                onPress={() => {
                  navigation.navigate('GetExercise', {item: Math.random()});
                }}
                buttonText={'Skip'}
                style={{width: responsiveWidth(38)}}
                fontWeight="bold"
                iconColor="white"
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default RestTime;

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
