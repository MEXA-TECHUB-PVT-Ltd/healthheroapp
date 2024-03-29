import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CssStyle from '../StyleSheet/CssStyle';
import {AppColors} from '../Helping/AppColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Input from '../component/Input';
import Logo from '../assets/Icon3';
import Timer from '../assets/Icon';
import CustomButton from '../component/CustomButton';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {
  GetAdvance,
  GetBeginner,
  GetIntermediate,
} from '../services/WorkoutPlan';
import {GetSevenFourApi} from '../services/SevenFour';
import {BaseUrl} from '../Helping/BaseUrl';
import {GetUserDetailApi} from '../services/AuthScreen';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../component/Loader';
import Geolocation from '@react-native-community/geolocation';
import {GetDietPlanIDApi} from '../services/DietPlan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Diet_Id, EmailRegistered, PaymentSuccessful} from '../store/action';
import ToastContainer from '../Helping/ToastContainer';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {PaymentSuccessfulId} from '../store/type';

const Dashboard = ({navigation}) => {
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        // console.log('hello sir');
        BackHandler.exitApp();
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );
  const [userDetailData, setUserDetailData] = useState('');
  const [loading, setLoading] = useState(false);
  const BeginnerApi = async () => {
    setLoading(true);
    try {
      const result = await GetBeginner();
      // console.log(result, 'beginner');
      if (result.status == true) {
        setBeginner(result.result);
        setLoading(false);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading;
      console.log(error);
    }
  };
  const id = useSelector(data => data.id);
  const GetUserDetail = async () => {
    setLoading(true);
    try {
      const result = await GetUserDetailApi(id);
      console.log(result);
      if (result.status == true) {
        setLoading(false);
        setUserDetailData(result.result);

        dispatch(EmailRegistered(result.result.email));
        dispatch(PaymentSuccessful(result.result.subscribe_status));
      } else {
        console.error(result.message);
        WeatherApi();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    GetUserDetail();
  }, []);
  const [sevenFourData, setSevenFourData] = useState('');
  const GetSevenByFour = async () => {
    setLoading(true);
    try {
      const result = await GetSevenFourApi();
      if (result.status == true) {
        setSevenFourData(result.result.array_agg);
        setLoading(false);
        WeatherApi();
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading;
      console.log(error);
    }
  };
  const dispatch = useDispatch();
  const getDietPlanId = async () => {
    try {
      const result = await GetDietPlanIDApi(id);
      // console.log(result, 'get plan id');
      if (result.status == true) {
        await AsyncStorage.setItem(
          'DietPlanId',
          `${result.result.fetched_record.diet_plan_id}`,
        );
        dispatch(Diet_Id(result.result.fetched_record.diet_plan_id));
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const AdvanceApi = async () => {
    try {
      const result = await GetAdvance();
      // console.log(result);
      if (result.status == true) {
        setAdvance(result.result);
        WeatherApi();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const PaymentSuccessfulAd = useSelector(item => item.PaymentSuccessfulId);
  const IntermediateApi = async () => {
    try {
      const result = await GetIntermediate();
      // console.log(result);
      if (result.status == true) {
        setIntermediate(result.result);
        WeatherApi();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [getLat, setGetLat] = useState('');
  const [getTemp, setGetTemp] = useState('');
  const WeatherApi = async () => {
    Geolocation.getCurrentPosition(info => setGetLat(info.coords));
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${
      getLat && getLat.latitude
    }&lon=${
      getLat && getLat.longitude
    }&appid=${'794cbb1f951392ed1e70d3c0a77c0766'}`;
    // console.log(await url);
    const result = await fetch(url);
    const response = await result.json();
    setGetTemp(response.main);
  };
  const resultDataTemp = getTemp && getTemp?.temp - 273.15;
  const [advance, setAdvance] = useState([]);
  const [beginner, setBeginner] = useState([]);
  const [intermediate, setIntermediate] = useState([]);
  const dateWithComma = new Date()
    .toDateString()
    .slice(4, 15)
    .replace(/[' ']/g, ', ');
  useEffect(() => {
    BeginnerApi();
    AdvanceApi();
    GetSevenByFour();
    getDietPlanId();
    IntermediateApi();
  }, []);
  useEffect(() => {
    WeatherApi();
  }, [getTemp == undefined]);
  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        CssStyle.mainContainer,
        {
          backgroundColor: AppColors.blueColor,
        },
      ]}>
      <ToastContainer />
      <StatusBar hidden={true} />
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View style={[CssStyle.flexJustify, {marginTop: responsiveHeight(4)}]}>
          <View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-bold',
                fontSize: 22,
              }}>
              Hi, {userDetailData.user_name}
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-regular',
                fontSize: 12,
                marginVertical: responsiveHeight(2),
              }}>
              Today, {dateWithComma.replace(',', '')}
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-regular',
                fontSize: 12,
              }}>
              Suitable for indoor activities
            </Text>
          </View>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Interstate-bold',
              fontSize: 30,
            }}>
            {resultDataTemp ? resultDataTemp?.toFixed(0) : '30'}°C
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={[
            CssStyle.flexJustify,
            {
              backgroundColor: '#232441',
              borderRadius: responsiveHeight(20),
              paddingVertical: responsiveHeight(1),
              paddingHorizontal: responsiveWidth(5),
              marginTop: responsiveHeight(3),
            },
          ]}>
          <Text
            style={{
              fontSize: 11,
              color: 'white',
              fontFamily: 'Interstate-regular',
              opacity: 0.8,
            }}>
            SEARCH WORKOUT
          </Text>
          <Icon name={'search'} size={19} color="#ffffffb1" />
        </TouchableOpacity>
        <View
          style={[
            CssStyle.flexData,
            {
              backgroundColor: '#FF5100',
              borderRadius: responsiveWidth(3),
              paddingHorizontal: responsiveWidth(3),
              paddingVertical: responsiveHeight(2),
              marginTop: responsiveHeight(1.8),
              width: responsiveWidth(90),
              height: responsiveHeight(36),
            },
          ]}>
          <View style={{width: responsiveWidth(40)}}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-bold',
                fontSize: 46,
              }}>
              7 X 4
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-bold',
                fontSize: 27,
              }}>
              Challenge
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-regular',
                width: responsiveWidth(30),
                lineHeight: responsiveHeight(2.5),
              }}>
              {sevenFourData ? sevenFourData[0]?.name : 'No Exercise'}
            </Text>
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
                  opacity: 0.8,
                }}>
                {sevenFourData ? sevenFourData[0]?.calories_burns : '400'} kcal
              </Text>
            </View>
            <View
              style={[
                CssStyle.flexData,
                {
                  overflow: 'visible',
                },
              ]}>
              <Timer width={16} height={16} />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  marginLeft: responsiveWidth(2),
                  fontSize: 12,
                  opacity: 0.8,
                }}>
                {sevenFourData ? sevenFourData[0]?.time : '0'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                sevenFourData
                  ? navigation.navigate('StartNow', {item: sevenFourData[0]})
                  : Toast.show({
                      text1: 'Alert',
                      text2: 'No exercise available',
                    })
              }
              style={{
                borderRadius: responsiveWidth(2),
                backgroundColor: 'white',
                alignItems: 'center',
                paddingVertical: responsiveHeight(1),
                width: responsiveWidth(25),
                marginTop: responsiveHeight(1.4),
              }}>
              <Text style={{color: '#FF5100', fontFamily: 'Interstate-bold'}}>
                Start Now
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Image
              resizeMode="cover"
              source={require('../assets/Image7.png')}
              style={{
                width: responsiveHeight(29.4),
                height: responsiveHeight(37.4),
                position: 'absolute',
                bottom: responsiveHeight(-17.93),
                left: responsiveWidth(-12),
              }}
            />
          </View>
        </View>
        <View
          style={[CssStyle.flexJustify, {marginVertical: responsiveHeight(2)}]}>
          <Text
            style={{
              fontFamily: 'Interstate-bold',
              color: 'white',
              fontSize: 37,
            }}>
            Beginner
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Intermediate', {
                item: {itemData: beginner, name: 'Beginner'},
              })
            }>
            <Text
              style={{
                color: AppColors.buttonText,
                fontFamily: 'Interstate-regular',
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginRight: responsiveWidth(-5)}}>
          {beginner.length > 0 ? (
            <FlatList
              data={beginner}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('WorkoutDetail', {
                        item: item.workout_plan_id,
                      })
                    }
                    style={{
                      marginRight: responsiveWidth(5),
                      alignItems: 'center',
                    }}>
                    <Image
                      borderRadius={responsiveWidth(2)}
                      source={{
                        uri: `${BaseUrl}` + item.image,
                      }}
                      style={{
                        width: responsiveWidth(34),
                        height: responsiveHeight(15),
                      }}
                      // resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontFamily: 'Interstate-regular',
                        marginTop: responsiveWidth(1),
                      }}>
                      {item.workout_title}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontFamily: 'Interstate-regular',
                      }}>
                      21 min | {item.calories_burnt} k
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View
              style={{
                alignItems: 'center',
                marginVertical: responsiveHeight(1),
              }}>
              <Text
                style={{
                  fontFamily: 'Interstate-regular',
                  fontSize: 17,
                  color: 'white',
                  opacity: 0.8,
                }}>
                No Workout plan created.
              </Text>
            </View>
          )}
        </View>

        <View
          style={[CssStyle.flexJustify, {marginVertical: responsiveHeight(2)}]}>
          <Text
            style={{
              fontFamily: 'Interstate-bold',
              color: 'white',
              fontSize: 37,
            }}>
            Intermediate
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Intermediate', {
                item: {itemData: intermediate, name: 'Intermediate'},
              })
            }>
            <Text
              style={{
                color: AppColors.buttonText,
                fontFamily: 'Interstate-regular',
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginRight: responsiveWidth(-5),
          }}>
          {intermediate.length > 0 ? (
            <FlatList
              data={intermediate}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('WorkoutDetail', {
                        item: item.workout_plan_id,
                      })
                    }
                    style={{
                      marginRight: responsiveWidth(5),
                      alignItems: 'center',
                    }}>
                    <Image
                      borderRadius={responsiveWidth(2)}
                      source={{uri: `${BaseUrl}` + item.image}}
                      style={{
                        width: responsiveWidth(34),
                        height: responsiveHeight(15),
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontFamily: 'Interstate-regular',
                        marginTop: responsiveHeight(1),
                      }}>
                      {item.workout_title}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontFamily: 'Interstate-regular',
                      }}>
                      21 min | 400 k
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View
              style={{
                alignItems: 'center',
                marginVertical: responsiveHeight(1),
              }}>
              <Text
                style={{
                  fontFamily: 'Interstate-regular',
                  fontSize: 17,
                  color: 'white',
                  opacity: 0.8,
                }}>
                No Workout plan created.
              </Text>
            </View>
          )}
        </View>
        <View
          style={[CssStyle.flexJustify, {marginVertical: responsiveHeight(2)}]}>
          <Text
            style={{
              fontFamily: 'Interstate-bold',
              color: 'white',
              fontSize: 37,
            }}>
            Advance
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Intermediate', {
                item: {itemData: advance, name: 'Advance'},
              })
            }>
            <Text
              style={{
                color: AppColors.buttonText,
                fontFamily: 'Interstate-regular',
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginRight: responsiveWidth(-5),
          }}>
          {advance.length > 0 ? (
            <FlatList
              data={advance}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('WorkoutDetail', {
                      item: item.workout_plan_id,
                    })
                  }
                  style={{
                    marginRight: responsiveWidth(5),
                    alignItems: 'center',
                  }}>
                  <Image
                    borderRadius={responsiveWidth(2)}
                    source={{uri: `${BaseUrl}` + item.image}}
                    style={{
                      width: responsiveWidth(34),
                      height: responsiveHeight(15),
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 13,
                      fontFamily: 'Interstate-regular',
                      marginTop: responsiveHeight(1),
                    }}>
                    {item.workout_title}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      fontFamily: 'Interstate-regular',
                    }}>
                    {item.time?.slice(0, 2)} min | {item.calories_burnt} k
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={{
                alignItems: 'center',
                marginVertical: responsiveHeight(1),
              }}>
              <Text
                style={{
                  fontFamily: 'Interstate-regular',
                  fontSize: 17,
                  color: 'white',
                  opacity: 0.8,
                }}>
                No Workout plan created.
              </Text>
            </View>
          )}
        </View>
        {!PaymentSuccessfulAd && (
          <View style={{alignItems: 'center', marginTop: responsiveHeight(2)}}>
            <BannerAd
              unitId={TestIds.BANNER}
              size={BannerAdSize.LARGE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        )}
        <View
          style={{marginVertical: responsiveHeight(2), alignItems: 'center'}}>
          <CustomButton
            buttonText={'Explore More'}
            mode="outlined"
            style={{width: responsiveWidth(70)}}
            buttonColor={'transparent'}
            colorText="white"
            onPress={() => navigation.navigate('Dashboard1')}
            borderColor={'#FF5100'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
