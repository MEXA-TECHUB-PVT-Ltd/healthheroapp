import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CssStyle from '../../StyleSheet/CssStyle';
import {AppColors} from '../../Helping/AppColor';
import CustomButton from '../../component/CustomButton';
import {GetSevenById, StartSevenByFourApi} from '../../services/SevenFour';
import NoImage from '../../assets/noImageRed';
import Clock from '../../assets/Icon';
import {BaseUrl} from '../../Helping/BaseUrl';
import {useDispatch, useSelector} from 'react-redux';
import {
  DataWorkPlan,
  SevenByFour,
  SevenByFourDay,
  SevenByFourWeek,
  TimeTakenAction,
  Workout_Plan_Id,
} from '../../store/action';
import moment from 'moment';

const SevenFourWorkout = ({navigation, route}) => {
  const {item, exercise_done, upcomingData} = route.params ? route.params : '';
  // console.log(upcomingData, 'sfsdf ');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(DataWorkPlan(item?.exercises));
    dispatch(SevenByFour(item?.seven_by_four_challenge_id));
    dispatch(SevenByFourDay(item?.day_id));
    dispatch(Workout_Plan_Id(item?.day_id));
    dispatch(SevenByFourWeek(item?.week_id));
    // dispatch(Workout_Plan_Id(item?.day_id));
  }, []);
  const id = useSelector(data => data.id);
  const GetSeven = async () => {
    setLoading(true);
    try {
      const result = await StartSevenByFourApi(
        id,
        item?.seven_by_four_challenge_id,
        item?.week_id,
        item?.day_id,
        moment(new Date()).format('hh:mm:ss'),
        moment(new Date()).format('YYYY-MM-DD'),
      );
      // console.log(result, 'hello sir');
      if (result.status == true) {
        setLoading(false);
        // setSevenByFourData(result.result[0].weeks);
      } else {
        setLoading(false);
        console.error(result.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const data = useSelector(data => data.workoutPlanData);
  // console.log(data[0]?.exercise_details[0],'this sis ');
  return (
    <View style={CssStyle.mainContainer}>
      <ImageBackground
        style={{width: responsiveWidth(100), height: responsiveHeight(30)}}
        source={{uri: `${BaseUrl}` + item?.image}}>
        <View
          style={[
            CssStyle.flexJustify,
            {
              paddingTop: responsiveHeight(4),
              paddingHorizontal: responsiveWidth(5),
            },
          ]}>
          <TouchableOpacity
            style={{backgroundColor: '#00000010'}}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={27} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          paddingTop: responsiveHeight(3),
          backgroundColor: AppColors.blueColor,
          borderTopRightRadius: responsiveWidth(5),
          borderTopLeftRadius: responsiveWidth(5),
          marginTop: responsiveHeight(-3),
          paddingBottom: responsiveHeight(3),
          flex: 1,
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontFamily: 'Interstate-bold',
            fontSize: 19,
          }}>
          Day {item?.day}
        </Text>

        <View
          style={[
            CssStyle.flexJustify,
            {
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: responsiveWidth(10),
              paddingVertical: responsiveHeight(1.8),
              paddingHorizontal: responsiveWidth(17),
              marginVertical: responsiveHeight(3),
            },
          ]}>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            {item?.exercises?.length ? item?.exercises?.length : 0} {'  '}
            <Text style={{color: 'white'}}>workouts</Text>
          </Text>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            {item?.exercises ? item?.exercises[0]?.time : 20}
          </Text>
        </View>

        <FlatList
          data={item?.exercises}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ExerciseDetail', {item: index})
                }
                style={[
                  CssStyle.flexData,
                  {
                    // width: responsiveWidth(50),
                    marginBottom: responsiveHeight(2),
                    marginRight: responsiveWidth(7),
                  },
                ]}>
                {item?.exercise_details ? (
                  <Image
                    borderRadius={responsiveWidth(2)}
                    source={{
                      uri: `${BaseUrl}` + item?.exercise_details[0]?.animation,
                    }}
                    style={{
                      width: responsiveWidth(19),
                      height: responsiveHeight(9),
                      marginRight: responsiveWidth(4),
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <NoImage
                    width={responsiveWidth(19)}
                    height={responsiveHeight(9)}
                    style={{marginRight: responsiveWidth(4)}}
                  />
                )}
                <View style={{}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 13,
                      fontFamily: 'Interstate-regular',
                      marginVertical: responsiveHeight(0.6),
                      paddingTop: responsiveHeight(1),
                    }}>
                    {item?.exercise_details
                      ? item?.exercise_details[0].title
                      : 'No title'}
                  </Text>
                  <View
                    style={[
                      CssStyle.flexJustify,
                      {width: responsiveWidth(40)},
                    ]}>
                    <View
                      style={[
                        CssStyle.flexData,
                        {marginVertical: responsiveHeight(1)},
                      ]}>
                      <Clock width={16} height={16} />
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Interstate-regular',
                          fontSize: 12,
                          marginLeft: responsiveWidth(2),
                        }}>
                        {item?.time}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => (
            <View
              style={{paddingTop: responsiveHeight(20), alignItems: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  fontSize: 17,
                }}>
                No Exercise available
              </Text>
            </View>
          )}
        />

        {!exercise_done ? (
          upcomingData ? (
            item?.exercises?.length > 0 ? (
              <View
                style={{
                  position: 'absolute',
                  top: responsiveHeight(60),
                  width: responsiveWidth(90),
                  left: responsiveWidth(5),
                }}>
                <CustomButton
                  onPress={() => navigation.navigate('StartExercise')}
                  buttonText={'Get Started'}
                  fontWeight="500"
                  style={{}}
                />
              </View>
            ) : null
          ) : null
        ) : null}
      </View>
    </View>
  );
};

export default SevenFourWorkout;

const styles = StyleSheet.create({});
