import {
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

const Report = ({navigation}) => {
  const [historyDataDate, setHistoryDataDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getUserDetail, setGetUserDetail] = useState('');
  const [buttonDataMap, setButtonData] = useState('Weekly Report');
  const id = useSelector(data => data);
  const Card = [
    {
      desc: 'Kcal',
      number: historyDataDate?.macrosTaken?.protein
        ? historyDataDate?.macrosTaken?.protein
        : '0',
    },
    {
      desc: 'Minutes',
      number: historyDataDate?.macrosTaken?.fats
        ? historyDataDate?.macrosTaken?.fats
        : '0',
    },
    {
      desc: 'workout',
      number: historyDataDate?.macrosTaken?.carbs
        ? historyDataDate?.macrosTaken?.carbs
        : 0,
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
        data: [20, 40, 60, 80],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#626377',
    backgroundGradientTo: '#626377',
    fillShadowGradient: AppColors.buttonText,
    fillShadowGradientOpacity: 1, // THIS
    color: (opacity = 1) => `white`,
    strokeWidth: 0, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
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
        // console.log(result, 'get user detail');
        if (result) {
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
      // console.log(result, 'get user detail');
      if (result.status == false) {
        setLoading(false);
        setGetUserDetail(result.result);
      } else {
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(
    getUserDetail.weight /
      ((getUserDetail.height / 3.28) * (getUserDetail.height / 3.28)),
  );

  const GetHistoryData = async () => {
    try {
      const result = await GetWeeklyReport(id.id);
      console.log(result, 'weekly report user');
      if (result.status == false) {
        setHistoryDataDate(result.result);
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
  console.log(totalBMI, 'hello');
  useEffect(() => {
    GetHistoryData();
  }, []);
  const [selected, setSelected] = useState('');
  const dayDataActive = [
    {day: 'Sun'},
    {day: 'Mon'},
    {day: 'Tue'},
    {day: 'Wed'},
    {day: 'Thu'},
    {day: 'Fri'},
    {day: 'Sat'},
  ];
  const [selectItem, setSelectItem] = useState([]);
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
                  // yAxisInterval={0}
                  // yLabelsOffset={0}
                  // yAxisLabel={0}
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
                      {getUserDetail && totalHeight ? totalBMI : 'no data'}
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
            </View>
          </>
        ) : buttonDataMap == 'History' ? (
          historyDataDate ? (
            <View>
              <Calendar
                onDayPress={day => {
                  setSelected(day.dateString);
                }}
                style={{
                  backgroundColor: '#626377',
                  borderRadius: responsiveWidth(2),
                }}
                markedDates={{
                  '2023-05-18': {
                    selected: true,
                    marked: true,
                    selectedColor: 'white',
                  },
                  '2023-05-20': {marked: true},
                  '2023-05-24': {
                    selected: true,
                    marked: true,
                    selectedColor: 'white',
                    color: '#FF6700',
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
                }}
              />
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
              </TouchableOpacity>
              <View
                style={{borderBottomColor: 'white', borderBottomWidth: 1}}
              />
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
                  onPress={() => navigation.navigate('EditWeeklyGoal')}>
                  <Text
                    style={{
                      color: 'white',
                      marginRight: responsiveWidth(2),
                    }}>
                    Edit
                  </Text>
                  <Image
                    resizeMode="contain"
                    style={{width: 13, height: 13}}
                    source={require('../assets/Health-Hero/Iconfeather-edit-3.png')}
                  />
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
                  {dayDataActive.map((item, index) => (
                    <DaysCounting
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
