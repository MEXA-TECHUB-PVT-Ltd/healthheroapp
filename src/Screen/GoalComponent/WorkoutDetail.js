import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import {
  GetWorkoutById,
  GetWorkoutPlanAll,
  GetWorkoutPlanById,
} from '../../services/WorkoutPlan';
import Loader from '../../component/Loader';
import {BaseUrl} from '../../Helping/BaseUrl';

const WorkoutDetail = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item, 'workout id');
  const [loading, setLoading] = useState(false);
  const [workoutPlanData, setWorkoutPlanData] = useState([]);

  // const GetWorkoutId = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await GetWorkoutPlanById(item?.workout_plan_id);
  //     // console.log(result, 'getworkoutid');
  //     if (result.status == true) {
  //       // setWorkoutPlanData(result.result);
  //       setLoading(false);
  //     } else {
  //       console.error(result.message);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading;
  //     console.log(error);
  //   }
  // };
  const GetWorkOutAll = async () => {
    setLoading(true);
    try {
      const result = await GetWorkoutPlanAll(item);
      console.log(result, 'after reesponse');
      if (result.status == true) {
        setWorkoutPlanData(result.result);
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
  useEffect(() => {
    // GetWorkoutId();
    GetWorkOutAll();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <View style={[CssStyle.mainContainer, {}]}>
      <ImageBackground
        // resizeMode="contain"
        style={{width: responsiveWidth(100), height: responsiveHeight(40)}}
        source={{uri: `${BaseUrl}` + workoutPlanData?.image}}>
        <TouchableOpacity
          style={{
            marginLeft: responsiveWidth(3),
            paddingTop: responsiveHeight(3),
          }}
          onPress={() => navigation.goBack()}>
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
          paddingTop: responsiveHeight(2.7),
        }}>
        <Text style={[styles.signInText]}>
          {workoutPlanData?.workout_title}
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
              marginTop: responsiveHeight(2.6),
            },
          ]}>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            {workoutPlanData?.workout_plan_exersises
              ? workoutPlanData?.workout_plan_exersises?.length
              : 0}{' '}
            <Text style={{color: 'white'}}>workouts</Text>
          </Text>
          <Text
            style={{
              color: '#FF5100',
              fontFamily: 'Interstate-bold',
              textTransform: 'capitalize',
            }}>
            {workoutPlanData?.level_of_workout}
          </Text>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            {workoutPlanData?.time?.slice(0, 2)}{' '}
            <Text style={{color: 'white'}}>min</Text>
          </Text>
        </View>
        <View style={{marginTop: responsiveHeight(3)}}>
          <Text
            style={{
              color: 'white',
              fontSize: 11.6,
              opacity: 0.7,
              marginBottom: responsiveHeight(3),
              lineHeight: responsiveHeight(2.4),
            }}>
            {workoutPlanData.d}
          </Text>
          <FlatList
            data={workoutPlanData?.workout_plan_exersises}
            renderItem={({item, index}) => {
              // console.log(item);
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ExerciseDetail', {item: item})
                  }
                  style={[
                    CssStyle.flexData,
                    {marginBottom: responsiveHeight(3.5)},
                  ]}>
                  <View style={{width: responsiveWidth(27)}}>
                    <Image
                      source={{
                        uri: `${BaseUrl}` + item.exersise_details.animation,
                      }}
                      resizeMode="contain"
                      style={{
                        width: 99,
                        height: 69,
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
                        //   opacity: 0.8,
                      }}>
                      {item.exersise_details.title}
                    </Text>
                    <View
                      style={[
                        CssStyle.flexJustify,
                        {
                          width: responsiveWidth(45),
                          marginTop: responsiveHeight(2),
                        },
                      ]}>
                      <View style={[CssStyle.flexData]}>
                        <Logo width={16} height={16} />
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: 'Interstate-regular',
                            fontSize: 12,
                            marginLeft: responsiveWidth(2),
                            opacity: 0.8,
                          }}>
                          {item.calories_burnt} kcal
                        </Text>
                      </View>
                      <View style={[CssStyle.flexData]}>
                        <Logo width={16} height={16} />
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: 'Interstate-regular',
                            fontSize: 12,
                            marginLeft: responsiveWidth(2),
                            opacity: 0.8,
                          }}>
                          {item.time.slice(0, 5)} min
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: responsiveHeight(90),
          left: responsiveWidth(10),
        }}>
        <CustomButton
          onPress={() =>
            navigation.navigate('StartExercise', {item: workoutPlanData})
          }
          activeOpacity={1}
          buttonColor={AppColors.buttonText}
          paddingVertical={2}
          style={{width: responsiveWidth(80)}}
          buttonText={'Get Started'}
        />
      </View>
    </View>
  );
};

export default WorkoutDetail;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: responsiveFontSize(2.6),
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
