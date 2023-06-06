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
import {BarChart, LineChart} from 'react-native-chart-kit';
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
import PushNotification, {Importance} from 'react-native-push-notification';
import {BaseUrl} from '../Helping/BaseUrl';
import {pushLocalNotificationAndroid} from '../Helping/NotifService';

const Report = ({navigation}) => {
  const [historyDataDate, setHistoryDataDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getUserDetail, setGetUserDetail] = useState('');
  const [getWeeklyDataReport, setGetWeeklyDataReport] = useState([]);
  const [weeklyDaysTraining, setWeeklyDaysTraining] = useState();
  const [buttonDataMap, setButtonData] = useState('Weekly Report');
  const [getNoOfDay, setGetNoOfDay] = useState('');
  const id = useSelector(data => data);
  // console.log(getWeeklyDataReport, 'check the week report');
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
        ? historyDataDate[0]?.total_records_in_this_week
        : '0',
    },
  ];
  const ButtonData = [{item: 'Weekly Report'}, {item: 'History'}];
  const data = {
    labels: ['Lowest', 'Current weight', 'Highest'],
    datasets: [
      {
        data: [
          getWeeklyDataReport[0]?.lowest_weight
            ? getWeeklyDataReport[0]?.lowest_weight
            : 0,
          getWeeklyDataReport[0]?.current_weight
            ? getWeeklyDataReport[0]?.current_weight
            : 0,
          getWeeklyDataReport[0]?.highest_weight
            ? getWeeklyDataReport[0]?.highest_weight
            : 0,
        ],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#626377',
    backgroundGradientTo: '#626377',
    fillShadowGradient: `#626377`,
    fillShadowGradientOpacity: 0,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `white`,
    strokeWidth: 0, // optional, default 3
    useShadowColorFromDataset: true, // optional
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines with no dashes
    },
  };
  useEffect(() => {
    getWeightHeight();
  }, []);
  useEffect(() => {
    var mount = true;
    const listener = navigation.addListener('focus', async () => {
      setLoading(true);
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
  useEffect(() => {
    var mount = true;
    const listener = navigation.addListener('focus', async () => {
      setLoading(true);
      try {
        const result = await GetWeeklyGoalDaysApi(id.id);
        if (result.status == true) {
          setLoading(false);
          setGetNoOfDay(result.result);
        } else {
          setLoading(false);
          // navigation.navigate('SelectPlan');
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    });
    return () => {
      listener;
      mount = false;
    };
  }, []);
  useEffect(() => {
    var mount = true;
    const listener = navigation.addListener('focus', async () => {
      try {
        const result = await GetWeeklyWeightApi(id.id);
        // console.log(result,'helo');
        if (result.status == true) {
          setGetWeeklyDataReport(result.result);
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
  useEffect(() => {
    GetHistoryData();
    WeekProgressReport();
    GetWeeklyWeightDataReport();
    GetProgressNoOfDays();
  }, []);
  const GetHistoryData = async () => {
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
  };

  const WeekProgressReport = async () => {
    setLoading(true);
    try {
      const result = await GetProgressReportApi(id.id);
      // console.log(result.result[2], 'hello sir');
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

  const GetProgressNoOfDays = async () => {
    setLoading(true);
    try {
      const result = await GetWeeklyGoalDaysApi(id.id);
      if (result.status == true) {
        setLoading(false);
        setGetNoOfDay(result.result);
      } else {
        setLoading(false);
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const GetWeeklyWeightDataReport = async () => {
    try {
      const result = await GetWeeklyWeightApi(id.id);
      // console.log(result, 'sdhfs');
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

  // const findTrueDay = weeklyDaysTraining.filter(data =>
  //   data.exersise_done == true ? true : false,
  // );
  // console.log(findTrueDay[0], 'thia si');
  // console.log(getNoOfDay.first_day_of_week, 'hello');
  const getUpdatedWeekdayOrder = dataDays => {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    if (dataDays) {
      const startingDayIndex = weekdays.indexOf(dataDays);
      if (startingDayIndex !== -1) {
        const reorderedWeekdays = [
          ...weekdays.slice(startingDayIndex),
          ...weekdays.slice(0, startingDayIndex),
        ];

        return reorderedWeekdays; // Updated weekday order with adjusted starting day
      }
    }
    return weekdays;
  };
  const filteredArray = weeklyDaysTraining?.filter(
    obj => typeof obj === 'object',
  );
  const findValue = filteredArray?.filter(data => data.exersise_done);
  // console.log(findValue, 'hello sir');

  // console.log(getNoOfDay?.first_day_of_week, 'data actuallay');
  const dataFromAPI =
    getNoOfDay?.first_day_of_week == 1
      ? 'Mon'
      : getNoOfDay?.first_day_of_week == 2
      ? 'Tue'
      : getNoOfDay?.first_day_of_week == 3
      ? 'Wed'
      : getNoOfDay?.first_day_of_week == 4
      ? 'Thu'
      : getNoOfDay?.first_day_of_week == 5
      ? 'Fri'
      : getNoOfDay?.first_day_of_week == 6
      ? 'Sat'
      : 'Sun';

  const updatedWeekdays = getUpdatedWeekdayOrder(dataFromAPI);

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

  const findDay = weeklyDaysTraining?.filter(data => data.exersise_done);
  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
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
              width: responsiveWidth(63),
            },
          ]}>
          {ButtonData.map((item, index) => (
            <View key={index} style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  marginBottom: responsiveHeight(0.4),
                  // marginRight: responsiveWidth(10),
                }}
                onPress={() => setButtonData(item.item)}>
                <Text
                  style={{
                    color: buttonDataMap == item.item ? 'white' : '#ffffffb2',
                    fontWeight: '500',
                    fontSize: 18,
                    letterSpacing: 0.9,
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

            <View
              style={[
                {
                  marginBottom: responsiveHeight(2.9),
                  borderRadius: 8,
                  paddingHorizontal: responsiveWidth(3),
                  paddingVertical: responsiveHeight(1.6),
                  marginTop: responsiveHeight(0.8),
                  backgroundColor: '#626377',
                  height: responsiveHeight(14.4),
                },
              ]}>
              <>
                <View
                  style={[
                    CssStyle.flexJustify,
                    {marginBottom: responsiveHeight(1)},
                  ]}>
                  <View
                    style={[
                      CssStyle.flexJustify,
                      {width: responsiveWidth(39)},
                    ]}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'white',
                        letterSpacing: 0.9,
                        fontFamily: 'Interstate-bold',
                      }}>
                      Weekly Goal
                    </Text>
                    {weeklyDaysTraining ? (
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'white',
                          letterSpacing: 0.9,
                          fontFamily: 'Interstate-bold',
                        }}>
                        {findDay?.length}/
                        {getNoOfDay?.no_of_days ? getNoOfDay?.no_of_days : 0}
                      </Text>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '2%',
                    }}
                    onPress={() =>
                      navigation.navigate('EditWeeklyGoal', {
                        item: getNoOfDay,
                      })
                    }>
                    <Text
                      style={{
                        color: 'white',
                        marginRight: responsiveWidth(2),
                      }}>
                      {weeklyDaysTraining ? 'Edit' : ' Add'}
                    </Text>
                    {weeklyDaysTraining ? (
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
                    {updatedWeekdays.map((item, index) => (
                      <DaysCounting
                        weeklyDaysTraining={weeklyDaysTraining}
                        key={index}
                        item={item}
                        index={index}
                      />
                    ))}
                  </View>
                </View>
              </>
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
                        navigation.navigate('NutritionHeight', {
                          item: getUserDetail,
                        })
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
                  {getUserDetail?.height_unit
                    ? getUserDetail?.height_unit
                    : 'in'}
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
                      navigation.navigate('NutritionWeight', {
                        item:
                          getWeeklyDataReport.length > 0
                            ? getWeeklyDataReport
                            : 'Update',
                      })
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
                {getWeeklyDataReport[0]?.current_weight
                  ? getWeeklyDataReport[0]?.current_weight
                  : 'Not Available'}{' '}
                {getUserDetail?.weight_unit}
              </Text>

              <View style={{marginHorizontal: responsiveWidth(-3)}}>
                <LineChart
                  data={data}
                  width={responsiveWidth(81)}
                  height={responsiveHeight(28)}
                  showBarTops={false}
                  bezier
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
                  end={{x: 1, y: 0}}
                  style={{
                    width: responsiveWidth(82),
                    borderRadius: responsiveHeight(20),
                    paddingVertical: responsiveHeight(1),
                    overflow: 'hidden',
                    marginTop: responsiveHeight(2),
                  }}
                  colors={[
                    '#01A6AA',
                    '#1B9B00',
                    '#EDB000',
                    '#FF6801',
                    '#E52920',
                  ]}>
                  {/* {÷ */}
                  <View
                    style={{
                      height: responsiveHeight(4.7),
                      width: responsiveWidth(1.7),
                      backgroundColor: 'white',
                      position: 'absolute',
                      left: responsiveWidth(
                        totalBMI > 2
                          ? totalBMI > 60
                            ? 79
                            : totalBMI < 40
                            ? totalBMI * 1.33
                            : totalBMI * 1.33
                          : 1,
                      ),
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
                    fontSize: 10,
                    fontFamily: 'Interstate-regular',
                    left: responsiveWidth(
                      totalBMI > 5
                        ? totalBMI > 60
                          ? 65
                          : totalBMI < 40
                          ? totalBMI * 1.12
                          : totalBMI * 1.12
                        : 1,
                    ),
                    marginTop: responsiveHeight(0.7),
                  }}>
                  {totalBMI < 19
                    ? 'UNDERWEIGHT'
                    : totalBMI < 25
                    ? 'NORMAL'
                    : totalBMI < 30
                    ? 'OVERWEIGHT'
                    : totalBMI < 35
                    ? 'OBESE'
                    : totalBMI > 35
                    ? 'EXTREMELY OBESE'
                    : ' Healthy weight'}
                </Text>
              )}
            </View>
          </>
        ) : historyDataDate ? (
          <View>
            <Calendar
              firstDay={1}
              style={{
                backgroundColor: '#626377',
                borderRadius: responsiveWidth(2),
              }}
              markedDates={{
                [moment(
                  new Date(
                    historyDataDate[0]
                      ? historyDataDate[0]?.records[0]?.created_at
                      : '',
                  ),
                ).format('YYYY-MM-DD')]: {
                  selected: true,
                  selectedColor: AppColors.buttonText,
                },
                [moment(
                  new Date(
                    historyDataDate[0]
                      ? historyDataDate[0]?.records[1]?.created_at
                      : '',
                  ),
                ).format('YYYY-MM-DD')]: {
                  selected: true,
                  selectedColor: AppColors.buttonText,
                },
                [moment(
                  new Date(
                    historyDataDate[0]
                      ? historyDataDate[0]?.records[2]?.created_at
                      : '',
                  ),
                ).format('YYYY-MM-DD')]: {
                  selected: true,
                  selectedColor: AppColors.buttonText,
                },
                [moment(
                  new Date(
                    historyDataDate[0]
                      ? historyDataDate[0]?.records[3]?.created_at
                      : '',
                  ),
                ).format('YYYY-MM-DD')]: {
                  selected: true,
                  selectedColor: AppColors.buttonText,
                },
                [moment(
                  new Date(
                    historyDataDate[0]
                      ? historyDataDate[0]?.records[4]?.created_at
                      : '',
                  ),
                ).format('YYYY-MM-DD')]: {
                  selected: true,
                  selectedColor: AppColors.buttonText,
                },
                [moment(
                  new Date(
                    historyDataDate[0]
                      ? historyDataDate[0]?.records[5]?.created_at
                      : '',
                  ),
                ).format('YYYY-MM-DD')]: {
                  selected: true,
                  selectedColor: AppColors.buttonText,
                },
                [moment(
                  new Date(
                    historyDataDate[0]
                      ? historyDataDate[0]?.records[6]?.created_at
                      : '',
                  ),
                ).format('YYYY-MM-DD')]: {
                  selected: true,
                  selectedColor: AppColors.buttonText,
                },
                [moment(new Date()).format('YYYY-MM-DD')]: {
                  selected: true,
                  dots: [
                    {key: 'workout', color: 'red'},
                    {key: 'vacation', color: 'red', selectedDotColor: 'blue'},
                  ],
                  dotColor: 'red',
                },
              }}
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
                // todayDotColor: 'red',
                dotColor: 'yellow',
                // dotStyle: {width: 12, height: 12},
              }}
              markingType="multi-dot"
            />
            <ScrollView horizontal={true}>
              <FlatList
                showsVerticalScrollIndicator={false}
                horizontal={false}
                data={historyDataDate}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <View
                        style={[
                          CssStyle.flexJustify,
                          {
                            marginVertical: responsiveHeight(2),
                            width: responsiveWidth(90),
                          },
                        ]}>
                        <View>
                          <View style={[CssStyle.flexData, {}]}>
                            <Text
                              style={{
                                fontSize: 17,
                                fontFamily: 'Interstate-regular',
                                color: 'white',
                              }}>
                              {new Date(historyDataDate[0]?.week_start_date)
                                .toDateString()
                                .slice(4, 15)
                                .replace(' ', ', ')}
                            </Text>
                            <View
                              style={{
                                width: 13,
                                height: 4,
                                backgroundColor: 'white',
                                marginHorizontal: responsiveWidth(1),
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 17,
                                fontFamily: 'Interstate-regular',
                                color: 'white',
                                // paddingBottom: responsiveHeight(1),
                              }}>
                              {new Date(historyDataDate[0]?.week_end_date)
                                .toDateString()
                                .slice(4, 15)
                                .replace(' ', ', ')}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 13,
                              fontFamily: 'Interstate-regular',
                              color: 'white',
                            }}>
                            {item?.total_records_in_this_week
                              ? item?.total_records_in_this_week
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
                              {item.total_week_calories_burned_by_user} kcal
                            </Text>
                          </View>
                          <View
                            style={[
                              CssStyle.flexData,
                              {marginVertical: responsiveHeight(1)},
                            ]}>
                            <Timer width={16} height={16} />
                            <Text
                              style={{
                                color: 'white',
                                fontFamily: 'Interstate-regular',
                                fontSize: 12,
                                marginLeft: responsiveWidth(2),
                              }}>
                              {item.total_user_done_workout_time}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                        <FlatList
                          data={item.records}
                          showsVerticalScrollIndicator={false}
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
                                source={{
                                  uri: `${BaseUrl}` + item.workout_plan.image,
                                }}
                                style={{
                                  width: responsiveWidth(19),
                                  height: responsiveHeight(9),
                                  marginRight: responsiveWidth(3.3),
                                }}
                                resizeMode="contain"
                              />
                              <View>
                                <Text
                                  style={{
                                    color: 'white',
                                    fontSize: 10,
                                    fontFamily: 'Interstate-regular',
                                    // marginVertical: responsiveHeight(0.6),
                                    // paddingBottom: responsiveHeight(0.2),
                                    letterSpacing: 0.9,
                                  }}>
                                  {new Date(item.created_at)
                                    .toDateString()
                                    .slice(4, 15)
                                    .replace(' ', ', ')}
                                </Text>
                                <Text
                                  style={{
                                    color: 'white',
                                    // fontSize: 13,
                                    fontFamily: 'Interstate-bold',
                                    marginVertical: responsiveHeight(0.6),
                                    // paddingBottom: responsiveHeight(0.2),
                                    letterSpacing: 0.9,
                                  }}>
                                  {item.workout_plan.workout_title}
                                </Text>
                                {/* <Text
                                style={{
                                  color: 'white',
                                  fontSize: 12,
                                  fontFamily: 'Interstate-regular',
                                  // marginVertical: responsiveHeight(0.6),
                                  paddingBottom: responsiveHeight(1),
                                }}>
                                {item.workout_plan.description}
                              </Text> */}
                                <View
                                  style={[
                                    CssStyle.flexJustify,
                                    {
                                      width: responsiveWidth(50),
                                      marginVertical: responsiveHeight(0.6),
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
                                      }}>
                                      {item.calories_burned_by_user} kcal
                                    </Text>
                                  </View>
                                  <View style={[CssStyle.flexData]}>
                                    <Timer width={16} height={16} />
                                    <Text
                                      style={{
                                        color: 'white',
                                        fontFamily: 'Interstate-regular',
                                        fontSize: 12,
                                        marginLeft: responsiveWidth(2),
                                      }}>
                                      {item.time}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        />
                      </ScrollView>
                      <View
                        style={{
                          borderBottomColor: 'white',
                          borderBottomWidth: 1,
                        }}
                      />
                    </View>
                  );
                }}
              />
            </ScrollView>
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
        )}
        {/* : (
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
        ) */}
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
    overflow: 'hidden',
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
