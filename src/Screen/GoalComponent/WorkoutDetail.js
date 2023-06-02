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
import Logo from '../../assets/Icon';
import CustomButton from '../../component/CustomButton';
import {GetWorkoutPlanAll} from '../../services/WorkoutPlan';
import Loader from '../../component/Loader';
import {BaseUrl} from '../../Helping/BaseUrl';
import {useDispatch, useSelector} from 'react-redux';
import {DataWorkPlan, Workout_Plan_Id} from '../../store/action';

const WorkoutDetail = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  const [loading, setLoading] = useState(false);
  const [workoutPlanData, setWorkoutPlanData] = useState([]);
  const id = useSelector(data => data.workoutPlanId);
  const [loadingStarted, setLoadingStarted] = useState(false);
  const StartWorkoutPlan = async () => {
    navigation.navigate('StartExercise', {item: 0});
  };
  const dispatch = useDispatch();

  const GetWorkOutAll = async () => {
    setLoading(true);
    dispatch(Workout_Plan_Id(item));
    try {
      const result = await GetWorkoutPlanAll(item ? item : id);
      // console.log(result.result);
      if (result.status == true) {
        setWorkoutPlanData(result.result);
        dispatch(DataWorkPlan(result.result.workout_plan_exersises));
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
    item?.workout_plan_id ? {} : GetWorkOutAll();
  }, [item]);
  return loading ? (
    <Loader />
  ) : (
    <View style={[CssStyle.mainContainer, {}]}>
      <ImageBackground
        // resizeMode="contain"
        style={{width: responsiveWidth(100), height: responsiveHeight(40)}}
        source={
          item?.workout_plan_id
            ? require('../../assets/planImage.jpg')
            : {uri: `${BaseUrl}` + workoutPlanData?.image}
        }>
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
          {item?.workout_plan_id
            ? item?.plan_name
            : workoutPlanData?.workout_title}
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
            {item?.exercise_details
              ? item?.exercise_details?.length
              : workoutPlanData?.workout_plan_exersises
              ? workoutPlanData?.workout_plan_exersises?.length
              : 0}{' '}
            <Text style={{color: 'white'}}>exercises</Text>
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
            {workoutPlanData?.time ? workoutPlanData?.time : 0}
            {/* <Text style={{color: 'white'}}>min</Text> */}
          </Text>
        </View>
        <View style={{marginTop: responsiveHeight(3), flex: 1}}>
          <Text
            style={{
              color: 'white',
              fontSize: 11.6,
              opacity: 0.7,
              marginBottom: responsiveHeight(3),
              lineHeight: responsiveHeight(2.4),
            }}>
            {item?.workout_plan_id
              ? item?.description.slice(0, 29)
              : workoutPlanData.description
              ? workoutPlanData.description
              : 'No description available'}
          </Text>
          {console.log(workoutPlanData.focus_area, 'this is the')}
          <View style={{flex: 1, paddingBottom: responsiveHeight(8)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={
                item?.exercise_details
                  ? item?.exercise_details
                  : workoutPlanData?.workout_plan_exersises
              }
              renderItem={({item, index}) => {
                // console.log(item, 'flatlist');
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ExerciseDetail', {
                        item: index,
                        focus: workoutPlanData?.focus_area,
                      })
                    }
                    style={[
                      CssStyle.flexData,
                      {marginBottom: responsiveHeight(3.5)},
                    ]}>
                    <View style={{width: responsiveWidth(27)}}>
                      <Image
                        borderRadius={responsiveWidth(2)}
                        source={{
                          uri: item?.exersise_details
                            ? `${BaseUrl}` + item?.exersise_details?.animation
                            : `${BaseUrl}` + item?.animation,
                        }}
                        resizeMode="contain"
                        style={{
                          width: responsiveWidth(24),
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
                        {item?.exersise_details
                          ? item?.exersise_details?.title
                          : item?.title}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 11,
                          fontFamily: 'Interstate-regular',
                          marginTop: responsiveHeight(0.4),
                          //   opacity: 0.8,
                        }}>
                        {item?.exersise_details
                          ? item?.exersise_details?.description.slice(0, 49)
                          : item?.description.slice(0, 49)}
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
                            {item?.time}
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
      </View>
      {item?.exercise_details
        ? item?.exercise_details
        : workoutPlanData?.workout_plan_exersises && (
            <View
              style={{
                position: 'absolute',
                top: responsiveHeight(90),
                left: responsiveWidth(10),
              }}>
              <CustomButton
                loading={loadingStarted}
                onPress={() => {
                  StartWorkoutPlan();
                }}
                activeOpacity={1}
                buttonColor={AppColors.buttonText}
                paddingVertical={2}
                style={{width: responsiveWidth(80)}}
                buttonText={'Get Started'}
              />
            </View>
          )}
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
