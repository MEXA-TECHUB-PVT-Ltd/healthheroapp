import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CssStyle from '../StyleSheet/CssStyle';
import {AppColors} from '../Helping/AppColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../assets/Icon3';
import Timer from '../assets/Icon';
import NoImage from '../assets/noImageRed';
import Loader from '../component/Loader';
import {
  ExerciseOfTheDay,
  GetAllWorkoutPlanAPI,
  GetWorkoutById,
} from '../services/WorkoutPlan';
import {GetAllCategories} from '../services/WorkoutCategory';
import {BaseUrl} from '../Helping/BaseUrl';
import {FlatListData} from '../Helping/FlatListData';
import moment from 'moment';

const Discover = ({navigation}) => {
  const advance = [{item: 1}, {item: 2}, {item: 3}];
  const [exerciseData, setExerciseData] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    GetAllWorkout();
    GetCategory();
  }, []);
  const [selectItem, setSelect] = useState(0);
  const [categoryIdIndex, setCategoryIdIndex] = useState('');
  const [workoutData, setWorkoutData] = useState([]);

  const GetAllWorkout = async () => {
    // setLoading(true);
    try {
      const result = await GetAllWorkoutPlanAPI();
      // console.log(result, 'sfsd');
      if (result.status == true) {
        setExerciseData(result.result);
        setLoading(false);
      } else {
        // console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    generateRandomNumber();
  }, []);
  function generateRandomNumber() {
    const currentDate = new Date('2023-06-08T06:05:54.746Z');
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
    const year = currentDate.getFullYear();

    const uniqueNumber = (day + month + year) % 21; // Remainder after dividing by 21
    return uniqueNumber;
  }

  // Generate and display the unique number
  // const uniqueNum = generateRandomNumber();
  const indexNumberGet = generateRandomNumber();
  useEffect(() => {
    WorkoutPlan();
  }, [categoryIdIndex]);

  const GetCategory = async () => {
    setLoading(true);
    try {
      const result = await GetAllCategories();
      if (result.status == true) {
        setCategory(result.result);
        // setLoading(false);
        setCategoryIdIndex(result.result[0].workout_category_id);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const WorkoutPlan = async () => {
    setLoading(true);
    try {
      const result = await GetWorkoutById(categoryIdIndex);
      if (result.status == true) {
        setWorkoutData(result.result);
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

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      nestedScrollEnabled={true}
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: AppColors.buttonText,
          borderBottomLeftRadius: responsiveWidth(4),
          borderBottomEndRadius: responsiveWidth(4),
          paddingVertical: responsiveHeight(1),
        }}>
        <Text style={[styles.signInText]}>Discover</Text>
      </View>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
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
              marginHorizontal: responsiveWidth(2),
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
              marginTop: responsiveHeight(3.4),
              marginRight: responsiveHeight(-4),
            },
          ]}>
          <FlatList
            data={category}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setSelect(index),
                    setCategoryIdIndex(item.workout_category_id);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: responsiveHeight(5),
                  paddingHorizontal: responsiveWidth(3),
                  paddingVertical: responsiveHeight(1.2),
                  marginRight: responsiveWidth(3),
                  backgroundColor:
                    selectItem == index ? AppColors.buttonText : 'transparent',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Interstate-bold',
                    color: 'white',
                    letterSpacing: 0.5,
                  }}>
                  {item.category_name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={[
            CssStyle.flexData,
            {
              backgroundColor: '#FF5100',
              borderRadius: responsiveWidth(3),
              paddingHorizontal: responsiveWidth(3),
              paddingVertical: responsiveHeight(2.8),
              marginTop: responsiveHeight(4.8),
              paddingBottom: responsiveHeight(3.8),
              height: responsiveHeight(32.6),
            },
          ]}>
          <View style={{position: 'relative', width: responsiveWidth(50)}}>
            <Image
              borderRadius={responsiveWidth(2)}
              // resizeMode="contain"
              source={require('../assets/imageFlip.png')}
              style={{
                width: responsiveHeight(25),
                height: responsiveHeight(33.5),
                position: 'absolute',
                bottom: responsiveHeight(-17),
                left: responsiveWidth(-4),
              }}
            />
          </View>
          {exerciseData[indexNumberGet] ? (
            <View style={{width: responsiveWidth(40)}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-bold',
                  fontSize: 25,
                  // width: responsiveWidth(34),
                  flexWrap: 'wrap',
                  // lineHeight: responsiveHeight(4.4),
                  // textAlign: 'center',
                }}>
                {exerciseData
                  ? exerciseData[indexNumberGet]?.workout_title?.slice(0, 22)
                  : 'Exercise Name'}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  width: responsiveWidth(34),
                  lineHeight: responsiveHeight(2.5),
                  marginVertical: responsiveHeight(1),
                }}>
                No description
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
                  {exerciseData[indexNumberGet]?.calories_burnt
                    ? exerciseData[indexNumberGet]?.calories_burnt
                    : '0'}{' '}
                  kcal
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
                  }}>
                  {exerciseData[indexNumberGet]?.time
                    ? exerciseData[indexNumberGet]?.time?.length > 10
                      ? moment(exerciseData[indexNumberGet]?.time).format(
                          'hh:mm:ss',
                        )
                      : exerciseData[indexNumberGet]?.time?.slice(0, 10)
                    : '0 sec'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  exerciseData
                    ? navigation.navigate('WorkoutDetail', {
                        item: exerciseData[indexNumberGet].workout_plan_id,
                      })
                    : ToastAndroid.show(
                        'No Exercise of the day available',
                        ToastAndroid.SHORT,
                      )
                }
                style={{
                  borderRadius: responsiveWidth(2),
                  backgroundColor: '#ffffffd1',
                  alignItems: 'center',
                  paddingVertical: responsiveHeight(1),
                  width: responsiveWidth(25),
                  marginTop: responsiveHeight(1.8),
                }}>
                <Text style={{color: '#FF5100', fontWeight: '500'}}>
                  Start Now
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-bold',
                  fontSize: 27,
                  width: responsiveWidth(34),
                  flexWrap: 'wrap',
                }}>
                Stay Fit
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-bold',
                  fontSize: 39,
                  width: responsiveWidth(43),
                  left: responsiveWidth(-6),
                }}>
                Workout
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-bold',
                  fontSize: 27,
                  width: responsiveWidth(34),
                  flexWrap: 'wrap',
                }}>
                Daily
              </Text>
            </View>
          )}
        </View>

        <ScrollView horizontal={true}>
          <FlatListData
            category={workoutData ? workoutData : category}
            navigation={navigation}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 35,
    lineHeight: responsiveHeight(5),
    opacity: 0.9,
  },
});
