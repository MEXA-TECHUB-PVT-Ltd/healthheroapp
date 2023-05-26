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

const GetExercise = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item, 'item');
  // console.log(item, 'get exercise');
  const countdownRef = useRef();
  const dataRedux = useSelector(data => data.workoutPlanData);
  const [dataTakeFromRedux, setDataTakeFromRedux] = useState(
    dataRedux ? dataRedux?.workout_plan_exersises : [],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  // console.log(dataTakeFromRedux);

  const [openModel, setOpenModel] = useState(false);
  // const id = 0;

  // for (let id = 0; id < dataRedux.length; id++) {
  //   console.log(dataRedux[id].reps, 'this is reps');
  //   setTimeout(() => {
  //     // console.log(id);
  //     // console.log('set time out is' + id);
  //     console.log(dataRedux[id]?.reps * 100, 'hello', '   ' + id);
  //   }, dataRedux[id]?.reps * 100);
  // }
  const [taketime, setTakeTime] = useState(dataTakeFromRedux.length);
  // const [taketime, setTakeTime] = useState(1);
  const timerRef = useRef(taketime);
  const [timeData, setTimeData] = useState('');
  const flatNode = useRef();
  // console.log(taketime, 'data from api');
  // console.log(timeData);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    // item == 'RestTime' ?  : '';
    countdownRef.current.start();
  }, []);
  const isFocused = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      setTakeTime(0 + 1);
      const timerID = setInterval(() => {
        timerRef.current -= 1;
        if (timerRef.current < 0) {
          clearInterval(timerID);
          // setTimeData('hello');
        } else {
          console.log('this is the owner ' + timerID);
          activeIndex == dataTakeFromRedux.length - 1
            ? setCompleted(true)
            : navigation.navigate('RestTime', {item: activeIndex});
          activeIndex == dataTakeFromRedux.length - 1
            ? console.log('Completed the workout plan')
            : (setActiveIndex(activeIndex + 1),
              flatNode.current.scrollToIndex({
                index: activeIndex + 1,
                animated: true,
              }));
          // : {};
          setTimeData(timerID);
          setTakeTime(timerRef.current);
        }
      }, dataTakeFromRedux[activeIndex].reps * 500);
      return () => {
        clearInterval(timerID);
      };
    }, [isFocused, item]),
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     const backAction = () => {
  //       setOpenModel(true);
  //     };
  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       backAction,
  //     );
  //     return () => backHandler.remove();
  //   }, []),
  // );
  // console.log(activeIndex, 'index value');
  return (
    <ScrollView style={[CssStyle.mainContainer, {}]}>
      <ImageBackground
        // resizeMode="contain"
        style={{width: responsiveWidth(100), height: responsiveHeight(40)}}
        source={{
          uri:
            `${BaseUrl}` +
            dataRedux.workout_plan_exersises[0].exersise_details.animation,
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
          // paddingHorizontal: responsiveWidth(6),
          marginTop: responsiveHeight(-3),
          paddingTop: responsiveHeight(5),
        }}>
        {/* {dataRedux.map((item, index) => {
          const timer = setTimeout(() => {
            // Perform some action after a specific timeout
            console.log(`Item ${index + 1} processed after 1 second`);
            return (
              <View>
                <Text style={{color: 'white'}}>hello</Text>
                <Text style={{color: 'white'}}>hello</Text>
                <Text style={{color: 'white'}}>hello</Text>
              </View>
            );
            // Here you can update the state or perform any other action

            // Clear the timeout once the action is completed
            clearTimeout(timer);
          }, (index + 1) * 1000);
          // return {...items,}
        })} */}

        <SwiperFlatList
          ref={flatNode}
          index={activeIndex}
          scrollEnabled={false}
          data={dataTakeFromRedux}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  width: responsiveWidth(100),
                  paddingHorizontal: responsiveWidth(6),
                }}>
                <Text style={[styles.signInText]}>
                  {item.exersise_details.title}
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
                  {/* <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            {item?.workout_plan_exersises
              ? item?.workout_plan_exersises?.length
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
          </Text> */}
                </View>
                <View
                  style={[
                    CssStyle.flexJustify,
                    {marginTop: responsiveHeight(5.4)},
                  ]}>
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
                    onPress={() => {
                      activeIndex == 0
                        ? {}
                        : (setActiveIndex(activeIndex - 1),
                          flatNode.current.scrollToIndex({
                            index: activeIndex - 1,
                            animated: true,
                          }));
                    }}>
                    <Icon
                      name="chevron-back-outline"
                      size={29}
                      color={AppColors.buttonText}
                    />
                  </TouchableOpacity>
                  <ProgressCircle
                    percent={item?.reps * 8}
                    radius={52}
                    borderWidth={4}
                    color={'#FF7B27'}
                    shadowColor="#C6C6C6"
                    bgColor={AppColors.blueColor}>
                    <Text>{item.reps}</Text>
                    <View style={CssStyle.flexData}>
                      <Countdown
                        ref={countdownRef}
                        style={styles.timer}
                        textStyle={styles.watchTime}
                        initialSeconds={item.reps ? item.reps : 15}
                        onTimes={e => {
                          // setDataNumber(e);
                        }}
                        onPause={e => {}}
                        onEnd={e => {}}
                      />
                    </View>
                  </ProgressCircle>
                  {/* <CountdownCircleTimer
                  isPlaying
                  duration={item.reps}
                  size={120}
                  strokeWidth={8}
                  onComplete={() => navigation.navigate('RestTime')}
                  colors={['#FF5100', '#FF510090', '#FF5100b1', '#FF5100e1']}>
                  {({remainingTime}) => (
                    <Text style={{color: 'white', fontSize: 22}}>
                      {remainingTime}
                    </Text>
                  )}
                </CountdownCircleTimer> */}
                  {console.log(activeIndex)}
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
                      activeIndex == dataTakeFromRedux.length - 1
                        ? {}
                        : (flatNode.current.scrollToIndex({
                            index: activeIndex + 1,
                            animated: true,
                          }),
                          setActiveIndex(index + 1));
                    }}>
                    <Icon
                      name="chevron-forward-outline"
                      size={29}
                      color={AppColors.buttonText}
                    />
                  </TouchableOpacity>
                </View>
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
                    {!dataTakeFromRedux[index + 1] ? (
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
                          {completed ? 'completed' : 'No Next Exercise'}
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setActiveIndex(activeIndex + 1),
                            flatNode.current.scrollToIndex({
                              index: activeIndex + 1,
                              animated: true,
                            });
                        }}
                        style={[
                          CssStyle.flexData,
                          {marginBottom: responsiveHeight(2)},
                        ]}>
                        <View style={{width: responsiveWidth(32)}}>
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
                            {
                              dataTakeFromRedux[index + 1]?.exersise_details
                                .title
                            }
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
                          <View
                            style={[
                              CssStyle.flexJustify,
                              // {width: responsiveWidth(45)},
                            ]}>
                            {/* <View
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
                            </View> */}
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
            );
          }}
        />
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
