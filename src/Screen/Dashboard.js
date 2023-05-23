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
import CustomButton from '../component/CustomButton';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  GetAdvance,
  GetBeginner,
  GetIntermediate,
} from '../services/WorkoutPlan';
import {GetSevenFourApi} from '../services/SevenFour';
import {BaseUrl} from '../Helping/BaseUrl';
import {GetUserDetailApi} from '../services/AuthScreen';
import {useSelector} from 'react-redux';

const Dashboard = ({navigation}) => {
  const dataGym = [
    {image: require('../assets/second.png')},
    {image: require('../assets/third.png')},
    {image: require('../assets/first.png')},
  ];
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
      if (result.status == true) {
        setLoading(false);
        setUserDetailData(result.result);
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
    GetUserDetail();
  }, []);
  const [sevenFourData, setSevenFourData] = useState('');
  const GetSevenByFour = async () => {
    setLoading(true);
    try {
      const result = await GetSevenFourApi();
      // console.log(result);
      if (result.status == true) {
        setSevenFourData(result.result.array_agg);
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
  const AdvanceApi = async () => {
    try {
      const result = await GetAdvance();
      // console.log(result);
      if (result.status == true) {
        setAdvance(result.result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const IntermediateApi = async () => {
    try {
      const result = await GetIntermediate();
      // console.log(result);
      if (result.status == true) {
        setIntermediate(result.result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    BeginnerApi();
    AdvanceApi();
    GetSevenByFour();
    IntermediateApi();
  }, []);
  const [advance, setAdvance] = useState([]);
  const [beginner, setBeginner] = useState([]);
  const [intermediate, setIntermediate] = useState([]);
  return loading ? (
    <ActivityIndicator
      size={'large'}
      color="black"
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    />
  ) : (
    <ScrollView
      style={[
        CssStyle.mainContainer,
        {
          backgroundColor: AppColors.blueColor,
        },
      ]}>
      <StatusBar hidden={true} />
      {/* {console.log(new Date().toDateString())} */}
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
              Today, {new Date().toDateString().slice(4, 15).replace(' ', ', ')}
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
            30°C
          </Text>
        </View>
        {/* <Input
          onPressRightIcon={() => navigation.navigate('Search')}
          noIcon={true}
          height={responsiveHeight(5)}
          placeholder={'SEARCH WORKOUT'}
          rightIcon="search"
        /> */}
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
            }}>
            SEARCH WORKOUT
          </Text>
          <Icon name={'search'} size={19} color="white" />
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
              {sevenFourData[0]?.name}
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
                }}>
                400 kcal
              </Text>
            </View>
            <View
              style={[
                CssStyle.flexData,
                {
                  overflow: 'visible',
                },
              ]}>
              <Logo width={16} height={16} />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  marginLeft: responsiveWidth(2),
                  fontSize: 12,
                }}>
                45 min
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('StartNow', {item: sevenFourData[0]})
              }
              style={{
                borderRadius: responsiveWidth(2),
                backgroundColor: 'white',
                alignItems: 'center',
                paddingVertical: responsiveHeight(1),
                width: responsiveWidth(25),
                marginTop: responsiveHeight(1.4),
              }}>
              <Text style={{color: '#FF5100'}}>Start Now</Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Image
              resizeMode="cover"
              source={{
                uri: `${BaseUrl}` + sevenFourData[0]?.image,
              }}
              style={{
                width: responsiveHeight(29.4),
                height: responsiveHeight(37.4),
                position: 'absolute',
                bottom: responsiveHeight(-18.6),
                left: responsiveWidth(-10),
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
                }}>
                No Workout plan created.
              </Text>
            </View>
          )}
        </View>
        <View
          style={{marginVertical: responsiveHeight(2), alignItems: 'center'}}>
          <CustomButton
            buttonText={'Explore More'}
            mode="outlined"
            style={{width: responsiveWidth(70)}}
            buttonColor={'transparent'}
            colorText="white"
            onPress={() => {}}
            borderColor={'#FF5100'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
