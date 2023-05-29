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
import IconSvg from '../assets/Icon';
import Logo from '../assets/Icon3';
import Timer from '../assets/bodyBuilding';
import {BarChart} from 'react-native-chart-kit';
import {Calendar} from 'react-native-calendars';
import {GetHistoryApi} from '../services/DietPlan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {GetWeeklyReport} from '../services/WorkoutPlan';
import {GetUserDetailApi} from '../services/AuthScreen';
import moment from 'moment';
import Loader from '../component/Loader';
import LinearGradient from 'react-native-linear-gradient';

const Report = ({navigation}) => {
  const [historyDataDate, setHistoryDataDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const Card = [
    {
      desc: 'Protein',
      number:
        historyDataDate?.macrosTaken?.protein != '0'
          ? historyDataDate?.macrosTaken?.protein
          : '0',
    },
    {
      desc: 'Sugar',
      number:
        historyDataDate?.macrosTaken?.fats != '0'
          ? historyDataDate?.macrosTaken?.fats
          : '0',
    },
    {
      desc: 'carb',
      number:
        historyDataDate?.macrosTaken?.carbs != '0'
          ? historyDataDate?.macrosTaken?.carbs
          : 0,
    },
  ];
  const colorWeight = [
    {color: '#00DCFF', number: 14},
    {color: '#0D66DA', number: 15.0},
    {color: '#00E737', number: 16.0},
    {color: '#B7FF2A', number: 17.0},
    {color: '#FF6700', number: 18.0},
    {color: '#FE3A3A', number: 19.0},
  ];
  const ButtonData = [{item: 'Weekly Report'}, {item: 'History'}];
  const [buttonDataMap, setButtonData] = useState('Weekly Report');
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
  const id = useSelector(data => data);
  useEffect(() => {
    getWeightHeight();
  }, []);
  const [getUserDetail, setGetUserDetail] = useState('');
  useEffect(() => {
    var mount = true;
    const listener = navigation.addListener('focus', async () => {
      setLoading(true);
      try {
        const result = await GetUserDetailApi(id.id);
        console.log(result, 'get user detail');
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
      // console.log(result, 'get the history');
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
  // const heightValue = getUserDetail?.height / 3.281;
  const totalHeight = heightValue * heightValue;
  const totalBMI = getUserDetail && getUserDetail.weight / totalHeight;
  console.log(totalBMI, 'hello');
  useEffect(() => {
    GetHistoryData();
  }, []);
  const [selected, setSelected] = useState('');
  // console.log(getUserDetail.height / 3.21);
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
            CssStyle.flexData,
            {
              // alignItems: 'center',
              paddingVertical: responsiveHeight(2),
              marginTop: responsiveHeight(2),
            },
          ]}>
          {ButtonData.map((item, index) => (
            <View
              key={index}
              style={{alignItems: 'center', marginRight: responsiveWidth(4)}}>
              <TouchableOpacity
                style={{
                  marginBottom: responsiveHeight(0.7),
                }}
                onPress={() => setButtonData(item.item)}>
                <Text style={{color: 'white', fontWeight: '500', fontSize: 17}}>
                  {item.item}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 3,
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
                  {item.iconName == 'Kcal' ? (
                    <Logo width={19} height={19} />
                  ) : item.iconName == 'Minutes' ? (
                    <IconSvg width={19} height={19} />
                  ) : (
                    <Timer width={19} height={19} />
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
                      {fontSize: 18, fontFamily: 'Interstate-regular'},
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
                  {getUserDetail?.height} {getUserDetail?.height_unit}
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
                {getUserDetail?.weight} {getUserDetail?.weight_unit}
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
                      {fontSize: 18, fontFamily: 'Interstate-regular'},
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
              {/* <View
                style={[
                  CssStyle.flexData,
                  {
                    marginVertical: responsiveHeight(2),
                    borderRadius: responsiveHeight(10),
                  },
                ]}> */}
              {/* {colorWeight.map((item, index) => ( */}
              {/* <View
                  key={index}
                  style={{
                    position: 'relative',
                    marginTop: responsiveHeight(1.7),
                  }}>
                  <View
                    style={{
                      width: responsiveWidth(13.9),
                      height: responsiveHeight(7),
                      backgroundColor: item.color,
                      borderRadius: responsiveWidth(0.7),
                    }}
                  />
                  <Text style={{fontSize: 11, color: 'white'}}>
                    {item.number}
                  </Text>
                  {index == 2 && (
                    <View
                      style={{
                        position: 'absolute',
                        alignItems: 'center',
                        marginTop: responsiveHeight(-2.7),
                        marginLeft: responsiveWidth(-2),
                      }}>
                      <Text style={{fontSize: 12, color: 'white'}}>19.34</Text>
                      <View
                        style={{
                          height: responsiveHeight(7),
                          width: 4,
                          borderRadius: responsiveHeight(2),
                          backgroundColor: 'black',
                        }}
                      />
                    </View>
                  )}
                </View> */}
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
              {/* ))} */}
              {/* </View> */}
            </View>
          </>
        ) : (
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
              // markedDates={{
              //   [selected]: {
              //     selected: true,
              //     disableTouchEvent: true,
              //     selectedDotColor: 'white',
              //   },
              // }}
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
              onPress={() =>
                navigation.navigate('ExerciseDetail', {item: item})
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
  },
  dailyText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Interstate-bold',
  },
});
