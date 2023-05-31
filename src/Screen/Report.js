import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
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
import Icon from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import IconSvg from '../assets/bodyBuilding';
import Logo from '../assets/Icon3';
import Timer from '../assets/Icon';
import {BarChart} from 'react-native-chart-kit';
import {Calendar} from 'react-native-calendars';
import {GetHistoryApi} from '../services/DietPlan';
import {useSelector} from 'react-redux';
import {GetWeeklyReport} from '../services/WorkoutPlan';
import {GetUserDetailApi} from '../services/AuthScreen';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {DaysCounting} from '../Helping/DayOfCount';
import Loader from '../component/Loader';
import {GetWeeklyWeightApi} from '../services/HeightApi';
import {
  GetProgressReportApi,
  GetWeeklyGoalDaysApi,
} from '../services/WeeklyGoal';
import PushNotification from 'react-native-push-notification';
import {BaseUrl} from '../Helping/BaseUrl';

const Report = ({navigation}) => {
  const [historyDataDate, setHistoryDataDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getUserDetail, setGetUserDetail] = useState('');
  const [getWeeklyDataReport, setGetWeeklyDataReport] = useState([]);
  const [selectItem, setSelectItem] = useState([]);
  const [weeklyDaysTraining, setWeeklyDaysTraining] = useState();
  const [selected, setSelected] = useState('');
  const [calendarProgressReport, setCalendarProgressReport] = useState([]);
  const [buttonDataMap, setButtonData] = useState('Weekly Report');
  const id = useSelector(data => data);
  const Card = [
    {
      desc: 'Kcal',
      number: historyDataDate[0]
        ? historyDataDate[0]?.total_week_calories_to_burn
        : '0',
    },
    {
      desc: 'Minutes',
      number: historyDataDate[0]
        ? historyDataDate[0]?.total_user_done_workout_time
        : '0',
    },
    {
      desc: 'workout',
      number: historyDataDate[0]
        ? historyDataDate[0]?.total_week_calories_burned_by_user
        : '0',
    },
  ];
  const ButtonData = [
    {item: 'Weekly Report'},
    {item: 'History'},
    {item: 'Weekly Goal'},
  ];
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [
          getWeeklyDataReport[0]?.average_weight_kg
            ? getWeeklyDataReport[0]?.average_weight_kg
            : 0,
          getWeeklyDataReport[1]?.average_weight_kg
            ? getWeeklyDataReport[1]?.average_weight_kg
            : 0,
          getWeeklyDataReport[2]?.average_weight_kg
            ? getWeeklyDataReport[2]?.average_weight_kg
            : 0,
          getWeeklyDataReport[3]?.average_weight_kg
            ? getWeeklyDataReport[3]?.average_weight_kg
            : 0,
        ],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#626377',
    backgroundGradientTo: '#626377',
    barPercentage: 0.7,
    height: 5000,
    fillShadowGradient: `rgba(1, 122, 205, 1)`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `white`,
    strokeWidth: 0, // optional, default 3
    useShadowColorFromDataset: false, // optional
  };
  useEffect(() => {
    getWeightHeight();
  }, []);
  useEffect(() => {
    var mount = true;
    const listener = navigation.addListener('focus', async () => {
      // setLoading(true);
      try {
        const result = await GetUserDetailApi(id.id);
        if (result.status == true) {
          setLoading(false);
          setGetUserDetail(result.result);
        } else {
          // navigation.navigate('SelectPlan');
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => {
      listener;
      mount = false;
    };
  }, [id.id]);
  const getWeightHeight = async () => {
    try {
      const result = await GetUserDetailApi(id.id);
      if (result.status == true) {
        setLoading(false);
        setGetUserDetail(result.result);
      } else {
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    var mount = true;
    const listener = navigation.addListener('focus', async () => {
      try {
        const result = await GetWeeklyReport(id.id);
        if (result.status == true) {
          setHistoryDataDate(result.result);
        } else {
          // navigation.navigate('SelectPlan');
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => {
      listener;
      mount = false;
    };
  }, []);
  // useEffect(() => {
  //   var mount = true;
  //   const listener = navigation.addListener('focus', async () => {
  //     try {
  //       const result = await GetWeeklyGoalDaysApi(id.id);
  //       // console.log(result, 'weekly goal days ');
  //       if (result.status == true) {
  //         setLoading(false);
  //         setWeeklyDaysTraining(result.result);
  //       } else {
  //         setLoading(false);
  //         // navigation.navigate('SelectPlan');
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //     }
  //   });
  //   return () => {
  //     listener;
  //     mount = false;
  //   };
  // }, []);
  useEffect(() => {
    GetHistoryData();
    WeekProgressReport();
    GetWeeklyWeightDataReport();
  }, []);
  const [markedDates, setMarkedDates] = useState({});

  const GetHistoryData = async () => {
    try {
      const result = await GetWeeklyReport(id.id);
      if (result.status == true) {
        setHistoryDataDate(result.result);
        const processedMarkedDates = processMarkedDates(
          result.result[0].records[0].workout_plan.created_at,
        );
        setMarkedDates(processedMarkedDates);
      } else {
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const WeekProgressReport = async () => {
    // setLoading(true);
    try {
      const result = await GetProgressReportApi(id.id);
      if (result.status == true) {
        setLoading(false);
        setWeeklyDaysTraining(result.result);
      } else {
        setLoading(false);
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // const GetWeeklyGoalDays = async () => {
  //   // setLoading(true);
  //   try {
  //     const result = await GetWeeklyGoalDaysApi(id.id);
  //     console.log(result, 'weekly goal days ');
  //     if (result.status == true) {
  //       setLoading(false);
  //       setWeeklyDaysTraining(result.result);
  //     } else {
  //       setLoading(false);
  //       // navigation.navigate('SelectPlan');
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  const GetWeeklyWeightDataReport = async () => {
    try {
      const result = await GetWeeklyWeightApi(id.id);
      if (result.status == true) {
        setGetWeeklyDataReport(result.result);
      } else {
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const heightValue =
    getUserDetail.height_unit == 'in'
      ? getUserDetail.height / 39.37
      : getUserDetail.height / 3.281;
  const totalHeight = heightValue * heightValue;
  const totalBMI = getUserDetail && getUserDetail.weight / totalHeight;
  const dayDataActive = [
    {day: 'Mon'},
    {day: 'Tue'},
    {day: 'Wed'},
    {day: 'Thu'},
    {day: 'Fri'},
    {day: 'Sat'},
    {day: 'Sun'},
  ];
  const [selectedDay, setSelectedDay] = useState(null);

  // const handleDayPress = day => {
  //   console.log(day);
  //   setSelectedDay(day);
  // };

  const getWeekFromDate = date => {
    const selectedDate = new Date(date.year, date.month - 1, date.day);
    const firstDayOfWeek = new Date(selectedDate);
    firstDayOfWeek.setDate(selectedDate.getDate());
    const lastDayOfWeek = new Date(selectedDate);
    lastDayOfWeek.setDate(selectedDate.getDate() + 6);

    const days = [];
    const currentDate = new Date(firstDayOfWeek);
    while (currentDate <= lastDayOfWeek) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      firstDayOfWeek,
      lastDayOfWeek,
      days,
    };
  };

  const dataTime = selectedDay && getWeekFromDate(selectedDay).days[0].day;
  const setTiming = selectedDay ? moment(dataTime).format('YYYY-MM-DD') : '';

  const handleDayPress = day => {
    // const selectedDate = day.dateString;

    // // Add or remove the selected date from the marked dates
    // if (markedDates[selectedDate]) {
    //   const updatedMarkedDates = {...markedDates};
    //   delete updatedMarkedDates[selectedDate];
    //   setMarkedDates(updatedMarkedDates);
    // } else {
    //   setMarkedDates({...markedDates, [selectedDate]: {selected: true}});
    // }
    PushNotification.localNotification({
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message',
      channelId: 1,
    });
  };
  const processMarkedDates = apiData => {
    // Process the API data and format it to match the required format for markedDates prop
    // The returned object should have date strings as keys and marker configurations as values
    // Example: { '2023-06-01': { marked: true, dotColor: 'blue' }, ... }
    // You may need to customize this based on your API response structure

    // Here's an example assuming the API data contains an array of date strings
    const processedDates = {};

    apiData.forEach(date => {
      processedDates[date] = {marked: true, dotColor: 'red'};
    });

    return processedDates;
  };
  const calendar = [
    {item: '2023-05-23'},
    {item: '2023-05-24'},
    {item: '2023-05-26'},
    {item: '2023-05-28'},
  ];
  // moment(
  //   new Date(historyDataDate[0].records[0].workout_plan.created_at),
  // ).format('YYYY-MM-DD');
  // let markedDay = {};

  // calendar.map(item => {
  //   markedDay[item.date] = {
  //     selected: true,
  //     marked: true,
  //     selectedColor: 'purple',
  //   };
  // });
  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          flex: 1,
          marginBottom: responsiveHeight(2),
        }}>
        <View
          style={[
            CssStyle.flexJustify,
            {
              // alignItems: 'center',
              paddingVertical: responsiveHeight(2),
              marginTop: responsiveHeight(2),
            },
          ]}>
          {ButtonData.map((item, index) => (
            <View key={index} style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  marginBottom: responsiveHeight(0.4),
                }}
                onPress={() => setButtonData(item.item)}>
                <Text
                  style={{
                    color: buttonDataMap == item.item ? 'white' : '#ffffffb2',
                    fontWeight: '500',
                    fontSize: 18,
                  }}>
                  {item.item}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 4,
                  borderBottomColor:
                    buttonDataMap == item.item
                      ? AppColors.buttonText
                      : AppColors.blueColor,
                  borderRadius: responsiveHeight(2),
                  width: responsiveWidth(11),
                }}
              />
            </View>
          ))}
        </View>

        {buttonDataMap == 'Weekly Report' ? (
          <>
            <View
              style={[
                CssStyle.flexJustify,
                {marginVertical: responsiveHeight(2)},
              ]}>
              {Card.map((item, index) => (
                <View
                  key={index}
                  style={[
                    {
                      alignItems: 'center',
                      backgroundColor: AppColors.buttonText,
                      width: responsiveWidth(25),
                      borderRadius: responsiveWidth(4),
                      paddingVertical: responsiveHeight(2),
                    },
                  ]}>
                  {item.desc == 'Kcal' ? (
                    <Logo width={19} height={19} />
                  ) : item.desc == 'Minutes' ? (
                    <Timer width={19} height={19} />
                  ) : (
                    <IconSvg width={19} height={19} />
                  )}
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Interstate-regular',
                      marginVertical: responsiveHeight(0.8),
                      letterSpacing: 0.4,
                    }}>
                    {item.number}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 11,
                      fontFamily: 'Interstate-regular',
                    }}>
                    {item.desc}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.dailyButton}>
              <View style={{}}>
                <View style={[CssStyle.flexJustify, {}]}>
                  <Text
                    style={[
                      styles.dailyText,
                      {fontSize: 18, fontFamily: 'Interstate-bold'},
                    ]}>
                    Height <Text style={{fontSize: 13}}> (cm)</Text>
                  </Text>
                  <View style={[CssStyle.flexData, {}]}>
                    <Text
                      style={[
                        styles.dailyText,
                        {
                          fontSize: 13,
                          fontFamily: 'Interstate-regular',
                          marginRight: responsiveWidth(1),
                        },
                      ]}>
                      Today's Height
                    </Text>
                    <TouchableOpacity
                      style={{padding: '2%'}}
                      onPress={() =>
                        navigation.navigate('NutritionHeight', {item: 'Update'})
                      }>
                      <Image
                        resizeMode="contain"
                        style={{width: 13, height: 13}}
                        source={require('../assets/Health-Hero/Iconfeather-edit-3.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text
                  style={[
                    styles.dailyText,
                    {
                      fontSize: 18,
                      fontFamily: 'Interstate-bold',
                      alignSelf: 'center',
                      marginBottom: responsiveHeight(1),
                      marginTop: responsiveHeight(3),
                    },
                  ]}>
                  {getUserDetail.height
                    ? getUserDetail?.height
                    : 'Not available'}{' '}
                  {getUserDetail?.height_unit}
                </Text>
                <Text
                  style={[
                    styles.dailyText,
                    {
                      fontSize: 14,
                      fontFamily: 'Interstate-regular',
                      alignSelf: 'center',
                    },
                  ]}>
                  Current Height
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#626377',
                paddingHorizontal: responsiveWidth(4),
                borderRadius: responsiveWidth(2),
                paddingTop: responsiveHeight(2),
                marginBottom: responsiveHeight(3),
              }}>
              <View style={[CssStyle.flexJustify, {}]}>
                <Text style={[styles.dailyText, {fontSize: 18}]}>
                  Weight <Text style={{fontSize: 13}}> (kg)</Text>
                </Text>
                <View style={[CssStyle.flexData, {}]}>
                  <Text
                    style={[
                      styles.dailyText,
                      {
                        fontSize: 13,
                        fontFamily: 'Interstate-regular',
                        marginRight: responsiveWidth(1),
                      },
                    ]}>
                    Today's Weight
                  </Text>
                  <TouchableOpacity
                    style={{padding: '2%'}}
                    onPress={() =>
                      navigation.navigate('NutritionWeight', {item: 'Update'})
                    }>
                    <Image
                      resizeMode="contain"
                      style={{width: 13, height: 13}}
                      source={require('../assets/Health-Hero/Iconfeather-edit-3.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={[
                  styles.dailyText,
                  {marginVertical: responsiveHeight(2)},
                ]}>
                {getUserDetail?.weight
                  ? getUserDetail?.weight
                  : 'Not Available'}{' '}
                {getUserDetail?.weight_unit}
              </Text>

              <View style={{marginHorizontal: responsiveWidth(-3)}}>
                <BarChart
                  data={data}
                  width={responsiveWidth(88)}
                  height={responsiveHeight(28)}
                  showBarTops={false}
                  withInnerLines={false}
                  chartConfig={chartConfig}
                  style={{
                    borderRadius: responsiveWidth(2),
                    // marginBottom: responsiveHeight(2.3),
                  }}
                  // verticalLabelRotation={1}
                />
              </View>
            </View>
            <View style={styles.dailyButton}>
              <View style={{}}>
                <View style={[{}]}>
                  <Text
                    style={[
                      styles.dailyText,
                      {fontSize: 18, fontFamily: 'Interstate-bold'},
                    ]}>
                    BMI Calculator
                  </Text>
                </View>
                {getUserDetail?.weight && getUserDetail?.height ? (
                  <>
                    <Text
                      style={[
                        styles.dailyText,
                        {
                          fontSize: 18,
                          fontFamily: 'Interstate-bold',
                          alignSelf: 'center',
                          marginBottom: responsiveHeight(1),
                          marginTop: responsiveHeight(3),
                        },
                      ]}>
                      {getUserDetail && totalHeight
                        ? totalBMI.toFixed(2)
                        : 'no data'}
                    </Text>
                    <Text
                      style={[
                        styles.dailyText,
                        {
                          fontSize: 12,
                          alignSelf: 'center',
                        },
                      ]}>
                      Weight {getUserDetail?.weight}
                      {getUserDetail?.weight_unit} | Height{' '}
                      {getUserDetail?.height}
                      {getUserDetail?.height_unit}
                    </Text>
                  </>
                ) : (
                  <Text
                    style={[
                      styles.dailyText,
                      {
                        fontSize: 18,
                        fontFamily: 'Interstate-bold',
                        alignSelf: 'center',
                        marginBottom: responsiveHeight(1),
                        marginTop: responsiveHeight(3),
                      },
                    ]}>
                    No height and weight available
                  </Text>
                )}
              </View>
              {getUserDetail?.weight && getUserDetail?.height && (
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  style={{
                    width: responsiveWidth(82),
                    borderRadius: responsiveHeight(20),
                    paddingVertical: responsiveHeight(1),
                    overflow: 'hidden',
                    marginTop: responsiveHeight(2),
                  }}
                  colors={[
                    '#00DCFF',
                    '#0D66DA',
                    '#00E737',
                    '#B7FF2A',
                    '#00E737',
                    '#FF6700',
                    '#FE3A3A',
                  ]}>
                  {/* {÷ */}
                  <View
                    style={{
                      height: responsiveHeight(4.7),
                      width: responsiveWidth(1.7),
                      backgroundColor: 'white',
                      position: 'absolute',
                      left: responsiveWidth(totalBMI ? totalBMI : 1),
                      top: -0.7,
                      // borderRadius: responsiveHeight(2),
                    }}
                  />
                  {/* } */}
                  <Text></Text>
                </LinearGradient>
              )}
              {getUserDetail?.weight && getUserDetail?.height && (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'Interstate-regular',
                    left: responsiveWidth(totalBMI > 2 ? totalBMI - 5 : 1),
                    marginTop: responsiveHeight(0.7),
                  }}>
                  Healthy weight
                </Text>
              )}
            </View>
          </>
        ) : buttonDataMap == 'History' ? (
          historyDataDate ? (
            <View>
              {console.log(
                historyDataDate[0],
                moment(
                  new Date(
                    historyDataDate[0].records[0].workout_plan.created_at,
                  ),
                ).format('YYYY-MM-DD'),
                ' on progress',
              )}
              <Calendar
                firstDay={1}
                onDayPress={handleDayPress}
                // onDayPress={day => {
                //   setSelected(day.dateString);
                // }}
                style={{
                  backgroundColor: '#626377',
                  borderRadius: responsiveWidth(2),
                }}
                markedDates={
                  // markedDay
                  {
                    [moment(
                      new Date(historyDataDate[0].records[0].created_at),
                    ).format('YYYY-MM-DD')]: {
                      selected: true,
                      selectedColor: 'white',
                    },
                    [moment(
                      new Date(historyDataDate[0].records[1].created_at),
                    ).format('YYYY-MM-DD')]: {
                      selected: true,
                      selectedColor: 'white',
                    },
                    // [moment(
                    //   new Date(historyDataDate[0].records[0].created_at),
                    // ).format('YYYY-MM-DD')]: {
                    //   selected: true,
                    //   selectedColor: 'white',
                    // },
                    // [moment(
                    //   new Date(historyDataDate[0].records[0].created_at),
                    // ).format('YYYY-MM-DD')]: {
                    //   selected: true,
                    //   selectedColor: 'white',
                    // },
                    // [moment(
                    //   new Date(historyDataDate[0].records[0].created_at),
                    // ).format('YYYY-MM-DD')]: {
                    //   selected: true,
                    //   selectedColor: 'white',
                    // },
                    // [moment(
                    //   new Date(historyDataDate[0].records[0].created_at),
                    // ).format('YYYY-MM-DD')]: {
                    //   selected: true,
                    //   selectedColor: 'white',
                    // },
                    // [moment(
                    //   new Date(historyDataDate[0].records[0].created_at),
                    // ).format('YYYY-MM-DD')]: {
                    //   selected: true,
                    //   selectedColor: 'white',
                    // },
                  }
                }
                theme={{
                  backgroundColor: '#626377',
                  calendarBackground: '#626377',
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: 'white',
                  selectedDayTextColor: '#FF6700',
                  todayTextColor: 'white',
                  dayTextColor: 'white',
                  textDisabledColor: 'white',
                  monthTextColor: 'white',
                  indicatorColor: 'white',
                  todayBackgroundColor: AppColors.buttonText,
                  arrowStyle: {backgroundColor: '#626377'},
                }}
              />
              <FlatList
                data={historyDataDate[0].records}
                renderItem={({item, index}) => (
                  <>
                    <View
                      style={[
                        CssStyle.flexJustify,
                        {marginVertical: responsiveHeight(2)},
                      ]}>
                      <View>
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: 'Interstate-regular',
                            color: 'white',
                            paddingBottom: responsiveHeight(1),
                          }}>
                          {new Date(item.created_at)
                            .toDateString()
                            .slice(4, 15)
                            .replace(' ', ', ')}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: 'Interstate-regular',
                            color: 'white',
                          }}>
                          {item?.workout_plan?.workout_plan_exercises?.length
                            ? item?.workout_plan?.workout_plan_exercises?.length
                            : 0}{' '}
                          exercise
                        </Text>
                      </View>
                      <View>
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
                            {item.workout_plan.calories_burnt} kcal
                          </Text>
                        </View>
                        <View
                          style={[
                            CssStyle.flexData,
                            {marginVertical: responsiveHeight(1)},
                          ]}>
                          <IconSvg width={16} height={16} />
                          <Text
                            style={{
                              color: 'white',
                              fontFamily: 'Interstate-regular',
                              fontSize: 12,
                              marginLeft: responsiveWidth(2),
                            }}>
                            {item.workout_plan.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <FlatList
                      data={item.workout_plan.workout_plan_exercises}
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          onPress={
                            () => {}
                            // navigation.navigate('ExerciseDetail', {item: item})
                          }
                          style={[
                            CssStyle.flexData,
                            {
                              // width: responsiveWidth(50),
                              marginBottom: responsiveHeight(2),
                              marginRight: responsiveWidth(7),
                            },
                          ]}>
                          <Image
                            borderRadius={responsiveWidth(2)}
                            source={{uri: `${BaseUrl}` + item.animation}}
                            style={{
                              width: responsiveWidth(19),
                              height: responsiveHeight(9),
                              marginRight: responsiveWidth(4),
                            }}
                            resizeMode="contain"
                          />
                          <View>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 13,
                                fontFamily: 'Interstate-regular',
                                marginVertical: responsiveHeight(0.6),
                                paddingBottom: responsiveHeight(1),
                              }}>
                              {item.title}
                            </Text>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 12,
                                fontFamily: 'Interstate-regular',
                                // marginVertical: responsiveHeight(0.6),
                                paddingBottom: responsiveHeight(1),
                              }}>
                              {item.description}
                            </Text>
                            {/* <View
                              style={[
                                CssStyle.flexJustify,
                                {width: responsiveWidth(40)},
                              ]}>
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
                                  {marginVertical: responsiveHeight(1)},
                                ]}>
                                <IconSvg width={16} height={16} />
                                <Text
                                  style={{
                                    color: 'white',
                                    fontFamily: 'Interstate-regular',
                                    fontSize: 12,
                                    marginLeft: responsiveWidth(2),
                                  }}>
                                  45 sec
                                </Text>
                              </View>
                            </View> */}
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                    <View
                      style={{borderBottomColor: 'white', borderBottomWidth: 1}}
                    />
                  </>
                )}
              />
              {/* <View
                style={[
                  CssStyle.flexJustify,
                  {marginVertical: responsiveHeight(2)},
                ]}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'Interstate-regular',
                      color: 'white',
                      paddingBottom: responsiveHeight(1),
                    }}>
                    {new Date().toDateString().slice(4, 15).replace(' ', ', ')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Interstate-regular',
                      color: 'white',
                    }}>
                    02 Workouts
                  </Text>
                </View>
                <View>
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
                      {marginVertical: responsiveHeight(1)},
                    ]}>
                    <IconSvg width={16} height={16} />
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                        fontSize: 12,
                        marginLeft: responsiveWidth(2),
                      }}>
                      90 sec
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={
                  () => {}
                  // navigation.navigate('ExerciseDetail', {item: item})
                }
                style={[
                  CssStyle.flexData,
                  {
                    // width: responsiveWidth(50),
                    marginBottom: responsiveHeight(2),
                    marginRight: responsiveWidth(7),
                  },
                ]}>
                <Image
                  borderRadius={responsiveWidth(2)}
                  // source={{uri: `${BaseUrl}` + item.video_link}}
                  style={{
                    width: responsiveWidth(19),
                    height: responsiveHeight(9),
                    marginRight: responsiveWidth(4),
                  }}
                  resizeMode="contain"
                />
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 13,
                      fontFamily: 'Interstate-regular',
                      marginVertical: responsiveHeight(0.6),
                      paddingTop: responsiveHeight(1),
                    }}>
                    Yoga Exercise
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
                        {marginVertical: responsiveHeight(1)},
                      ]}>
                      <IconSvg width={16} height={16} />
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Interstate-regular',
                          fontSize: 12,
                          marginLeft: responsiveWidth(2),
                        }}>
                        45 sec
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity> */}
              {/* <View
                style={{borderBottomColor: 'white', borderBottomWidth: 1}}
              /> */}
            </View>
          ) : (
            <View
              style={[CssStyle.flexCenter, {marginTop: responsiveHeight(35)}]}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  fontSize: 18,
                }}>
                First Set the weekly goal{' '}
              </Text>
            </View>
          )
        ) : (
          <View>
            <View
              style={[
                {
                  marginBottom: responsiveHeight(2.9),
                  borderRadius: 8,
                  paddingHorizontal: responsiveWidth(3),
                  paddingVertical: responsiveHeight(1.6),
                  marginTop: responsiveHeight(0.8),
                  backgroundColor: '#62637790',
                },
              ]}>
              <View style={[CssStyle.flexJustify, {}]}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    letterSpacing: 0.9,
                    fontFamily: 'Interstate-bold',
                  }}>
                  Weekly Goal
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '2%',
                  }}
                  onPress={() =>
                    navigation.navigate('EditWeeklyGoal', {
                      item: historyDataDate,
                    })
                  }>
                  <Text
                    style={{
                      color: 'white',
                      marginRight: responsiveWidth(2),
                    }}>
                    {historyDataDate ? 'Edit' : ' Add'}
                  </Text>
                  {historyDataDate ? (
                    <Image
                      resizeMode="contain"
                      style={{width: 13, height: 13}}
                      source={require('../assets/Health-Hero/Iconfeather-edit-3.png')}
                    />
                  ) : (
                    <Octicons name="diff-added" size={18} color="white" />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center'}}>
                <View
                  style={[
                    CssStyle.flexJustify,
                    {
                      paddingTop: responsiveHeight(0.7),
                      width: responsiveWidth(79),
                    },
                  ]}>
                  {console.log(weeklyDaysTraining, 'hello')}
                  {dayDataActive.map((item, index) => (
                    <DaysCounting
                      weeklyDaysTraining={weeklyDaysTraining}
                      key={index}
                      selectItem={selectItem}
                      setSelectItem={setSelectItem}
                      item={item}
                      index={index}
                    />
                  ))}
                </View>
              </View>
            </View>
            <View
              style={[
                CssStyle.flexJustify,
                {marginVertical: responsiveHeight(2)},
              ]}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Interstate-regular',
                    color: 'white',
                    paddingBottom: responsiveHeight(1),
                  }}>
                  {new Date().toDateString().slice(4, 15).replace(' ', ', ')}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Interstate-regular',
                    color: 'white',
                  }}>
                  02 Workouts
                </Text>
              </View>
              <View>
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
                    {marginVertical: responsiveHeight(1)},
                  ]}>
                  <IconSvg width={16} height={16} />
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Interstate-regular',
                      fontSize: 12,
                      marginLeft: responsiveWidth(2),
                    }}>
                    90 sec
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={
                () => {}
                // navigation.navigate('ExerciseDetail', {item: item})
              }
              style={[
                CssStyle.flexData,
                {
                  // width: responsiveWidth(50),
                  marginBottom: responsiveHeight(2),
                  marginRight: responsiveWidth(7),
                },
              ]}>
              <Image
                borderRadius={responsiveWidth(2)}
                // source={{uri: `${BaseUrl}` + item.video_link}}
                style={{
                  width: responsiveWidth(19),
                  height: responsiveHeight(9),
                  marginRight: responsiveWidth(4),
                }}
                resizeMode="contain"
              />
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontFamily: 'Interstate-regular',
                    marginVertical: responsiveHeight(0.6),
                    paddingTop: responsiveHeight(1),
                  }}>
                  Yoga Exercise
                </Text>
                <View
                  style={[CssStyle.flexJustify, {width: responsiveWidth(40)}]}>
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
                      {marginVertical: responsiveHeight(1)},
                    ]}>
                    <IconSvg width={16} height={16} />
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                        fontSize: 12,
                        marginLeft: responsiveWidth(2),
                      }}>
                      45 sec
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                () => {}
                // navigation.navigate('ExerciseDetail', {item: item})
              }
              style={[
                CssStyle.flexData,
                {
                  // width: responsiveWidth(50),
                  marginBottom: responsiveHeight(2),
                  marginRight: responsiveWidth(7),
                },
              ]}>
              <Image
                borderRadius={responsiveWidth(2)}
                // source={{uri: `${BaseUrl}` + item.video_link}}
                style={{
                  width: responsiveWidth(19),
                  height: responsiveHeight(9),
                  marginRight: responsiveWidth(4),
                }}
                resizeMode="contain"
              />
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontFamily: 'Interstate-regular',
                    marginVertical: responsiveHeight(0.6),
                    paddingTop: responsiveHeight(1),
                  }}>
                  Yoga Exercise
                </Text>
                <View
                  style={[CssStyle.flexJustify, {width: responsiveWidth(40)}]}>
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
                      {marginVertical: responsiveHeight(1)},
                    ]}>
                    <IconSvg width={16} height={16} />
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                        fontSize: 12,
                        marginLeft: responsiveWidth(2),
                      }}>
                      45 sec
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Report;

const styles = StyleSheet.create({
  dailyButton: {
    marginBottom: responsiveHeight(3),
    borderWidth: 1,
    borderColor: '#00000022',
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(2.8),
    paddingVertical: responsiveHeight(2),
    backgroundColor: '#626377',
    flex: 1,
  },
  dailyText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Interstate-bold',
  },
});

// import React, { useState, useEffect } from 'react';
// import { View } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const CalendarComponent = () => {
//   const [markedDates, setMarkedDates] = useState({});

//   useEffect(() => {
//     fetchMarkedDates(); // Fetch marked dates from the API when the component mounts
//   }, []);

//   const fetchMarkedDates = async () => {
//     try {
//       // Make an API request to fetch the marked dates
//       const response = await fetch('YOUR_API_ENDPOINT');
//       const data = await response.json();

//       // Process the API data and update the marked dates state
//       const processedMarkedDates = processMarkedDates(data);
//       setMarkedDates(processedMarkedDates);
//     } catch (error) {
//       console.error('Error fetching marked dates:', error);
//     }
//   };

//   const processMarkedDates = (apiData) => {
//     // Process the API data and format it to match the required format for markedDates prop
//     // The returned object should have date strings as keys and marker configurations as values
//     // Example: { '2023-06-01': { marked: true, dotColor: 'blue' }, ... }
//     // You may need to customize this based on your API response structure

//     // Here's an example assuming the API data contains an array of date strings
//     const processedDates = {};
//     apiData.forEach((date) => {
//       processedDates[date] = { marked: true, dotColor: 'blue' };
//     });

//     return processedDates;
//   };

//   return (
//     <View>
//       <Calendar markedDates={markedDates} />
//     </View>
//   );
// };

// export default CalendarComponent;
