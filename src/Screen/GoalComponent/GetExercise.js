import {
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
import React, {useRef, useState} from 'react';
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
import Logo from '../../assets/Icon3';
import CustomButton from '../../component/CustomButton';
import {BaseUrl} from '../../Helping/BaseUrl';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

const GetExercise = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item, 'get exercise');
  const countdownRef = useRef();
  const [completedModel, setCompletedModel] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [dataNumber, setDataNumber] = useState(0);
  return (
    <ScrollView style={[CssStyle.mainContainer, {}]}>
      <ImageBackground
        // resizeMode="contain"
        style={{width: responsiveWidth(100), height: responsiveHeight(40)}}
        source={{
          uri: item?.image
            ? `${BaseUrl}` + item?.image
            : `${BaseUrl}` + item?.exersise_details?.image,
        }}>
        <TouchableOpacity
          style={{
            paddingLeft: responsiveWidth(5),
            paddingTop: responsiveHeight(3),
          }}
          onPress={() => setOpenModel(true)}>
          <Icon name="chevron-back-outline" size={25} color={'white'} />
        </TouchableOpacity>
      </ImageBackground>
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.blueColor,
          borderTopLeftRadius: responsiveWidth(5),
          borderTopRightRadius: responsiveWidth(5),
          paddingHorizontal: responsiveWidth(6),
          marginTop: responsiveHeight(-3),
          paddingTop: responsiveHeight(5),
        }}>
        <Text style={[styles.signInText]}>
          {completedModel
            ? item.exercises
              ? item.exercises[1]?.title
              : item.title
            : `${
                item?.exercises
                  ? item?.exercises[0]?.title
                  : item?.exersise_details
                  ? item?.exersise_details.title
                  : item?.title
                  ? item?.title
                  : item?.workout_title
              }`}
        </Text>
        <View
          style={[
            CssStyle.flexJustify,
            {
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: responsiveWidth(10),
              paddingVertical: responsiveHeight(1.8),
              paddingHorizontal: responsiveWidth(8),
              marginTop: responsiveHeight(3.6),
            },
          ]}>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            {item.workout_plan_exersises
              ? item.workout_plan_exersises?.length
              : 0}{' '}
            <Text style={{color: 'white'}}>moves</Text>
          </Text>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-bold'}}>
            {item?.level_of_workout}
          </Text>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            {completedModel
              ? '25'
              : `${item?.time ? item?.time?.slice(0, 2) : '0'}`}{' '}
            <Text style={{color: 'white'}}>sec</Text>
          </Text>
        </View>
        <View
          style={[CssStyle.flexJustify, {marginTop: responsiveHeight(5.4)}]}>
          {/* <Text style={styles.watchTime}>00:{<Countdown ref={countdownRef} style={styles.timer} textStyle={styles.watchTime} initialSeconds={30} onTimes={(e) => {}} onPause={(e) => {}} onEnd={(e) => navigation.navigate("Rest")} />}</Text> */}
          <TouchableOpacity
            style={{
              backgroundColor: '#FF510050',
              borderRadius: responsiveHeight(10),
              width: 39,
              height: 39,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() =>
              completedModel
                ? setCompletedModel(false)
                : navigation.navigate('RestTime')
            }>
            <Icon
              name="chevron-back-outline"
              size={29}
              color={AppColors.buttonText}
            />
          </TouchableOpacity>
          {/* <ProgressCircle
            percent={item?.time?.slice(0, 2) * 60}
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
                initialSeconds={completedModel ? 6 : 30}
                onTimes={e => {
                  setDataNumber(e);
                }}
                onPause={e => {}}
                onEnd={
                  e => {}
                }
              />
            </View>
          </ProgressCircle> */}
          <CountdownCircleTimer
            isPlaying
            duration={30}
            size={120}
            strokeWidth={8}
            onComplete={() => setCompletedModel(true)}
            colors={['#FF5100', '#FF510090', '#FF5100b1', '#FF5100e1']}>
            {({remainingTime}) => (
              <Text style={{color: 'white', fontSize: 22}}>
                {remainingTime}
              </Text>
            )}
          </CountdownCircleTimer>
          {completedModel ? (
            <Text style={{marginLeft: responsiveWidth(9)}}></Text>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: '#FF510050',
                borderRadius: responsiveHeight(10),
                width: 39,
                height: 39,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setCompletedModel(true)}>
              <Icon
                name="chevron-forward-outline"
                size={29}
                color={AppColors.buttonText}
              />
            </TouchableOpacity>
          )}
        </View>
        {completedModel ? (
          <View
            style={{
              alignItems: 'center',
              marginVertical: responsiveHeight(6),
              paddingBottom: responsiveHeight(7),
            }}>
            <CustomButton
              onPress={() =>
                navigation.navigate('Focused', {item: item?.workout_plan_id})
              }
              activeOpacity={1}
              buttonColor={AppColors.buttonText}
              paddingVertical={3}
              style={{width: responsiveWidth(80)}}
              iconName="checkmark"
              iconColor={'white'}
              buttonText={'Complete Workout'}
            />
          </View>
        ) : (
          <View style={{marginTop: responsiveHeight(6), flex: 1}}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-regular',
                fontSize: 17,
                marginBottom: responsiveHeight(2),
              }}>
              Next Exercise
            </Text>
            <View style={{flex: 1}}>
              {item.exercises ? (
                <View
                  style={[
                    CssStyle.flexData,
                    {marginBottom: responsiveHeight(2)},
                  ]}>
                  <View style={{width: responsiveWidth(29)}}>
                    <Image
                      source={{
                        uri: `${BaseUrl}` + item.exercises[0]?.animation,
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
                      {item.exercises[1].title}
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
                      {item.exercises[0].description}
                    </Text>
                    <View
                      style={[
                        CssStyle.flexJustify,
                        {width: responsiveWidth(45)},
                      ]}>
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
              ) : item.workout_plan_exersises ? (
                <View
                  style={[
                    CssStyle.flexData,
                    {marginBottom: responsiveHeight(2)},
                  ]}>
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
                      Lorem ipsum dolor sit emet , consectetur amet elitr dolor
                      sit, emit as
                    </Text>
                    <View
                      style={[
                        CssStyle.flexJustify,
                        {width: responsiveWidth(45)},
                      ]}>
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
            </View>
          </View>
        )}
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
    fontSize: responsiveFontSize(5),
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
