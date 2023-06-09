import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {Fragment, useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from '../Helping/AppColor';
import CssStyle from '../StyleSheet/CssStyle';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../component/Loader';
import {GetDietPlanApi, GetFoodApi} from '../services/DietPlan';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  GetDailyWaterApi,
  GetWaterApi,
  GetWaterRecordApi,
  GetWeeklyWaterApi,
} from '../services/WaterTrackerApi';
import {BarChart} from 'react-native-chart-kit';
import {Diet_Id, Water_Id} from '../store/action';
import moment from 'moment';
import {GetWaterTracker, WaterTracking} from '../Helping/WaterTracking';
import CustomButton from '../component/CustomButton';
import {GetUserDetailApi} from '../services/AuthScreen';
import ToastContainer from '../Helping/ToastContainer';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const Nutrition = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  const dispatch = useDispatch();
  const id = useSelector(data => data);
  const [loading, setLoading] = useState(false);
  const [foodData, setFoodData] = useState([]);
  const [waterData, setWaterData] = useState('');
  const [getDailyRecordTracker, setGetDailyRecordTracker] = useState('');
  const [weeklyWaterData, setWeeklyWaterData] = useState('');

  const chartConfig = {
    backgroundGradientFrom: '#626377',
    backgroundGradientTo: '#626377',
    barPercentage: 0.7,
    height: 5000,
    fillShadowGradient: AppColors.buttonText,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
    labelColor: (opacity = 1) => `white`,

    style: {
      borderRadius: 16,
      fontFamily: 'Interstate-regular',
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: '#e3e3e3',
      strokeDasharray: '0',
    },
    propsForLabels: {
      fontFamily: 'Interstate-regular',
    },
    // backgroundGradientFrom: '#626377',
    // backgroundGradientTo: '#626377',
    // fillShadowGradient: AppColors.buttonText,
    // fillShadowGradientOpacity: 1, // THIS
    // color: (opacity = 1) => `white`,
    // strokeWidth: 0, // optional, default 3
    // barPercentage: 0.8,
    // useShadowColorFromDataset: false,prop
  };

  useEffect(() => {
    var mount = true;
    const listener = navigation.addListener('focus', async () => {
      setLoading(true);
      try {
        const result = await GetFoodApi(id.id, id.dietPlanId);
        if (result) {
          setLoading(false);
          setFoodData(result.result);
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
      setLoading(true);
      try {
        const result = await GetDietPlanApi(id.dietPlanId, id.id);
        if (result) {
          setDietPlanData(result.result);
          setLoading(false);
        } else {
          setLoading(false);
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
  }, [id.dietPlanId]);
  useEffect(() => {
    var mount = true;
    const listener = navigation.addListener('focus', async () => {
      try {
        const result = await GetWaterApi(id.id);
        if (result) {
          setWaterData(result.result);
        } else {
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
      // setLoading(true);
      try {
        const result = await GetDailyWaterApi(id.waterTrackerId, id.id);
        if (result) {
          setLoading(false);
          setGetDailyRecordTracker(result.result);
        } else {
          // setLoading(false);
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
  const [dietPlanData, setDietPlanData] = useState('');
  const [dietPlanConsumption, setDietPlanConsumption] = useState('');

  useEffect(() => {
    id.dietPlanId
      ? GetDietPlan()
      : navigation.navigate('SelectPlan', {userData: getUserDetailData});
    GetUserDetail();
  }, [id.dietPlanId]);

  useEffect(() => {
    GetFoodRecord();
  }, [id.dietPlanId, foodData == null]);
  const GetDietPlan = async () => {
    setLoading(true);
    try {
      const result = await GetDietPlanApi(id.dietPlanId, id.id);
      if (result) {
        // setLoading(false);
        setDietPlanData(result.result);
      } else {
        // setLoading(false);
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(foodData, 'hello');
  const remainingCalories =
    foodData?.caloreis_required - foodData?.calories_consumed;
  const Card = [
    {desc: 'Protein', number: foodData?.macrosTaken?.protein},
    {desc: 'Eaten Calories', number: foodData?.calories_consumed},
    {
      desc: 'Remaining Calories',
      number: remainingCalories ? remainingCalories?.toFixed(2) : 0,
    },
  ];
  const GetWaterTracking = async () => {
    setLoading(true);
    try {
      const result = await GetWaterApi(id.id);
      if (result.status == true) {
        dispatch(Water_Id(result.result.water_tracker_id));
        await AsyncStorage.setItem(
          'WaterTrackerId',
          `${result.result.water_tracker_id}`,
        );
        setLoading(false);
        setWaterData(result.result);
        // GetWeeklyReport(result.result.water_tracker_id, id);
      } else {
        setLoading(false);
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const GetFoodRecord = async () => {
    try {
      const result = await GetFoodApi(id.id, id.dietPlanId);
      console.log(result.result, 'sdfj');
      if (result) {
        // setLoading(false);
        setFoodData(result.result);
      } else {
        setLoading(false);
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const GetWeeklyReport = async () => {
    // setLoading(true);
    try {
      const result = await GetWeeklyWaterApi(id.waterTrackerId, id.id);
      if (result) {
        setLoading(false);
        setWeeklyWaterData(result.result);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [chartData, setChartData] = useState([]);
  const [getUserDetailData, setGetUserDetailData] = useState('');
  const GetUserDetail = async () => {
    // setLoading(true);
    try {
      const result = await GetUserDetailApi(id.id);
      if (result.status == true) {
        // setLoading(false);
        setGetUserDetailData(result.result);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [
          weeklyWaterData
            ? weeklyWaterData[0]
              ? weeklyWaterData[0]?.json_build_object?.quantity
              : 0
            : 0,
          weeklyWaterData
            ? weeklyWaterData[1]
              ? weeklyWaterData[1]?.json_build_object?.quantity
              : 0
            : 0,
          weeklyWaterData
            ? weeklyWaterData[2]
              ? weeklyWaterData[2]?.json_build_object?.quantity
              : 0
            : 0,
          weeklyWaterData
            ? weeklyWaterData[3]
              ? weeklyWaterData[3]?.json_build_object?.quantity
              : 0
            : 0,
          weeklyWaterData
            ? weeklyWaterData[4]
              ? weeklyWaterData[4]?.json_build_object?.quantity
              : 0
            : 0,
          weeklyWaterData
            ? weeklyWaterData[5]
              ? weeklyWaterData[5]?.json_build_object?.quantity
              : 0
            : 0,
          weeklyWaterData
            ? weeklyWaterData[6]
              ? weeklyWaterData[6]?.json_build_object?.quantity
              : 0
            : 0,
        ],
      },
    ],
  };
  const GetDailyWaterRecord = async () => {
    try {
      const result = await GetDailyWaterApi(id.waterTrackerId, id.id);
      if (result) {
        setLoading(false);
        setGetDailyRecordTracker(result.result);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHistoryOfWeek();
  }, []);

  const getHistoryOfWeek = async () => {
    const result = await GetWeeklyWaterApi(id.waterTrackerId, id.id);
    if (result.status == true) {
      let responseList = result.result ? result.result : [];

      let week_days_list = await getWeekDays();
      let list = [];
      week_days_list?.map(element => {
        let filter = responseList?.filter(
          item =>
            moment(item?.json_build_object?.updated_at).format('YYYY-MM-DD') ==
            moment(element?.date).format('YYYY-MM-DD'),
        );
        let steps = filter[0]?.json_build_object?.quantity
          ? parseInt(filter[0]?.json_build_object?.quantity)
          : 0;

        let obj = {
          label: element?.name,
          value: steps,
        };
        list.push(steps);
      });
      setChartData(list);
      console.log(list, 'list description');
    } else {
    }
  };
  const getWeekDays = () => {
    return new Promise((resolve, reject) => {
      let daysList = [];
      Array.from(Array(7).keys()).map(idx => {
        const d = new Date();
        d.setDate(d.getDate() - d.getDay() + idx);
        let obj = {
          name: moment(d).format('ddd'),
          date: moment(d).format('YYYY-MM-DD'),
        };
        daysList.push(obj);
        resolve(daysList);
      });
    });
  };

  useEffect(() => {
    GetDailyWaterRecord();
    GetWaterTracking();
    id.waterTrackerId ? GetWeeklyReport() : {};
    GetDietPlan();
  }, [id.dietPlanId]);
  const idWaterTracker = useSelector(data => data.waterTrackerId);
  const AddDailyRecord = async (system, idWaterTracker, index, Text) => {
    try {
      const result = await GetWaterRecordApi(
        id.id,
        id.waterTrackerId,
        getDailyRecordTracker ? getDailyRecordTracker.quantity + 1 : 1,
        moment(new Date()).format('YYYY-MM-DD'),
      );
      if (result.status == true) {
        // setLoading(false);
        GetDailyWaterRecord();
        getHistoryOfWeek();
      } else {
        // setLoading(false);
        console.log('record error');
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const gender = [
    {item: 'balance', id: 1},
    {item: 'mildWeightLoss', id: 2},
    {item: 'mildWeightGain', id: 3},
  ];
  const [review, setReview] = useState(item ? item?.purpose : '');
  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View
          style={{alignItems: 'flex-end', marginTop: responsiveHeight(1.8)}}>
          {id.dietPlanId && (
            <View
              style={[
                CssStyle.flexJustify,
                {
                  marginVertical: responsiveHeight(3.7),
                  width: responsiveWidth(70),
                },
              ]}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 20,
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                }}>
                Nutrition & Diet Plan
              </Text>
              <TouchableOpacity
                style={{marginRight: responsiveWidth(2)}}
                onPress={() =>
                  id.dietPlanId
                    ? navigation.navigate('SelectPlan', {
                        item: foodData?.diet_plan_details,
                      })
                    : navigation.navigate('SelectPlan', {
                        userData: getUserDetailData,
                      })
                }>
                <Image
                  resizeMode="contain"
                  style={{width: 19, height: 19}}
                  source={require('../assets/Health-Hero/Iconfeather-edit-3.png')}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {id.dietPlanId ? (
          <>
            <View
              style={[
                {
                  marginVertical: responsiveHeight(0),
                  backgroundColor: AppColors.buttonText,
                  alignItems: 'center',
                  paddingVertical: responsiveHeight(3),
                  borderRadius: responsiveWidth(4),
                },
              ]}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  fontSize: 27,
                }}>
                {foodData ? foodData?.caloreis_required : '0'}{' '}
                <Text style={{fontSize: 12}}>Kcal</Text>
              </Text>
              <View
                style={{
                  borderBottomColor: '#ffffff50',
                  borderBottomWidth: 1,
                  width: responsiveWidth(90),
                  marginVertical: responsiveHeight(2),
                }}
              />
              <View style={[CssStyle.flexJustify]}>
                {Card.map((item, index) => (
                  <Fragment key={index}>
                    <View
                      key={index}
                      style={[
                        {
                          alignItems: 'center',
                          backgroundColor: AppColors.normal,
                          width: responsiveWidth(30),
                          borderRadius: responsiveWidth(1.6),
                          // paddingVertical: responsiveHeight(2),
                        },
                      ]}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 23,
                          fontFamily: 'Interstate-regular',
                          letterSpacing: 0.8,
                          marginBottom: responsiveHeight(2.3),
                        }}>
                        {item.number}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 11,
                          fontWeight: '400',
                          fontFamily: 'Interstate-regular',
                        }}>
                        {item.desc}
                      </Text>
                    </View>
                    {Card.length - 1 !== index && (
                      <View
                        style={{
                          width: 1,
                          height: responsiveHeight(5.8),
                          backgroundColor: '#ffffff50',
                        }}
                      />
                    )}
                  </Fragment>
                ))}
              </View>
            </View>
            <View
              style={[
                CssStyle.flexJustify,
                {
                  color: 'white',
                  marginTop: responsiveHeight(2),
                },
              ]}>
              <Text style={[CssStyle.settingText, {color: 'white'}]}>
                Food Record
              </Text>
              <TouchableOpacity
                style={{marginRight: responsiveWidth(2)}}
                onPress={() => navigation.navigate('SelectFood')}>
                <Octicons name="diff-added" size={23} color={'white'} />
              </TouchableOpacity>
            </View>
            {foodData?.foodIntakesToday?.map((item, index) => {
              return (
                <View key={index} style={[styles.dailyButton]}>
                  <View
                    style={[
                      CssStyle.flexJustify,
                      // {width: responsiveWidth(100)},
                    ]}>
                    <View style={{}}>
                      <Text style={styles.dailyText}>
                        {item.food_details.food_name}
                      </Text>
                      <Text style={styles.foodType}>{item.meal_time}</Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Interstate-regular',
                          marginBottom: responsiveHeight(1),
                        }}>
                        {item.quantity} {item.unit}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Interstate-regular',
                        }}>
                        {item.food_details.energy_calories} Kcal
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
            <View
              style={{alignItems: 'center', marginBottom: responsiveHeight(4)}}>
              <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.LARGE_BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
              />
            </View>
            <View
              style={[
                CssStyle.flexJustify,
                {marginVertical: responsiveHeight(0.8), color: 'white'},
              ]}>
              <Text
                style={[
                  CssStyle.settingText,
                  {
                    marginBottom: responsiveHeight(2.2),
                    marginTop: responsiveHeight(1.1),
                    color: 'white',
                  },
                ]}>
                Water Record
              </Text>
              <TouchableOpacity
                style={{marginRight: responsiveWidth(2)}}
                onPress={() =>
                  navigation.navigate('TypeOfTracker', {item: waterData})
                }>
                <Octicons name="diff-added" size={23} color={'white'} />
              </TouchableOpacity>
            </View>
            <View style={styles.dailyButton}>
              <View style={{}}>
                <Text
                  style={[
                    styles.dailyText,
                    {fontSize: 13, fontFamily: 'Interstate-regular'},
                  ]}>
                  {waterData?.quantity} Glass
                </Text>
                {id.waterTrackerId ? (
                  <>
                    <View
                      style={[
                        CssStyle.flexData,
                        {
                          paddingVertical: responsiveHeight(1.7),
                          width: responsiveWidth(80),
                          flexWrap: 'wrap',
                        },
                      ]}>
                      {waterData ? (
                        Array.from(
                          {length: waterData?.quantity},
                          (v, i) => i,
                        ).map((item, index) => {
                          return (
                            <WaterTracking
                              key={index}
                              getDailyRecordTracker={getDailyRecordTracker}
                              weeklyWaterData={weeklyWaterData}
                              onPress={() =>
                                AddDailyRecord(
                                  id.id,
                                  id.water_tracker_id,
                                  index + 1,
                                  moment(new Date()).format('YYYY-MM-DD'),
                                )
                              }
                              index={index}
                              waterData={waterData}
                            />
                          );
                        })
                      ) : (
                        <View style={{justifyContent: 'center'}}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 17,
                              fontFamily: 'Interstate-regular',
                              alignSelf: 'center',
                            }}>
                            No Water Record Available
                          </Text>
                        </View>
                      )}
                    </View>
                  </>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: responsiveHeight(24),
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                        fontSize: 20,
                      }}>
                      No Water Data Available
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View
              style={[styles.dailyButton, {marginBottom: responsiveHeight(6)}]}>
              <Text
                style={[styles.dailyText, {marginBottom: responsiveHeight(1)}]}>
                Weekly Record
              </Text>
              {id.waterTrackerId ? (
                <BarChart
                  // data={data}
                  data={{
                    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
                    datasets: [
                      {
                        data:
                          chartData !== [] ? chartData : [0, 1, 0, 0, 0, 0, 0],
                      },
                    ],
                  }}
                  width={responsiveWidth(88)}
                  height={responsiveHeight(28)}
                  showBarTops={false}
                  fromNumber={waterData ? waterData?.quantity : 32}
                  withInnerLines={false}
                  chartConfig={chartConfig}
                  // withVerticalLabels={false}
                  style={{
                    borderRadius: responsiveWidth(2),
                    marginLeft: responsiveHeight(-1.7),
                  }}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    height: responsiveHeight(28),
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 19,
                      fontFamily: 'Interstate-regular',
                    }}>
                    No Weekly Report Available
                  </Text>
                </View>
              )}
            </View>
          </>
        ) : (
          <View style={{paddingTop: responsiveHeight(3)}}>
            <TouchableOpacity
              style={{marginLeft: responsiveWidth(-3)}}
              onPress={() => navigation.goBack()}>
              <Icon
                name="chevron-back"
                size={29}
                style={{padding: '2%'}}
                color={AppColors.buttonText}
              />
            </TouchableOpacity>
            <View style={{marginTop: responsiveHeight(4), flex: 0.4}}>
              <Text
                style={[CssStyle.textInsideSettingComponent, {fontSize: 41}]}>
                Select Plan Type
              </Text>
              <Text
                style={[
                  CssStyle.textInfoSetting,
                  {
                    lineHeight: responsiveHeight(3),
                    paddingTop: responsiveHeight(1),
                    fontSize: 13,
                    letterSpacing: 0.4,
                  },
                ]}>
                To help you reach your fitness goals, we offer a variety of
                workout plan types tailored to different objectives and
                preferences.
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              style={{flex: 0.7, paddingTop: responsiveHeight(2)}}>
              <FlatList
                data={gender}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <View key={index} style={{width: responsiveWidth(90)}}>
                      <TouchableOpacity
                        style={[
                          styles.buttonGender,
                          {
                            backgroundColor:
                              review !== item.item ? '#626377' : '#0A1F58',
                            borderColor:
                              review !== item.item
                                ? '#626377'
                                : AppColors.buttonText,
                            borderWidth: 1,
                          },
                        ]}
                        onPress={() => {
                          setReview(item.item);
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: 'Interstate-regular',
                            fontSize: 16,
                          }}>
                          {item.item}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </ScrollView>
            <View
              style={{
                alignItems: 'center',
                paddingTop: responsiveHeight(2),
                flex: 0.3,
              }}>
              <CustomButton
                onPress={() =>
                  review
                    ? navigation.navigate('NutritionGender', {
                        planType: {review},
                        updateData: item,
                      })
                    : Toast.show({text2: 'Please Select One'})
                }
                activeOpacity={1}
                buttonColor={AppColors.buttonText}
                style={{width: responsiveWidth(78)}}
                buttonText={'Continue'}
                paddingVertical={1}
              />
            </View>
          </View>
        )}
      </View>
      <ToastContainer />
    </ScrollView>
  );
};

export default Nutrition;

const styles = StyleSheet.create({
  dailyButton: {
    marginBottom: responsiveHeight(2.2),
    borderWidth: 1,
    borderColor: '#00000022',
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(3.7),
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: '#626377',
  },
  dailyText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Interstate-bold',
  },
  foodType: {
    fontSize: 14,
    paddingTop: responsiveHeight(1),
    color: 'white',
    fontFamily: 'Interstate-regular',
    // width: responsiveWidth(40),
    letterSpacing: 0.7,
    lineHeight: responsiveHeight(2.3),
  },
  buttonGender: {
    paddingVertical: responsiveHeight(2.6),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveHeight(1),
    // flexDirection: "row",
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
});

// <View
//                       style={[
//                         CssStyle.flexJustify,
//                         {paddingVertical: responsiveHeight(1.7)},
//                       ]}>
//                       {glassDay.map((item, index) => (
//                         <WaterTracking
//                           key={index}
//                           onPress={() =>
//                             AddDailyRecord(
//                               id.id,
//                               id.water_tracker_id,
//                               index,
//                               moment(new Date()).format('YYYY-MM-DD'),
//                             )
//                           }
//                           index={index}
//                           waterData={waterData}
//                         />
//                       ))}
//                     </View>
//                     <View
//                       style={[
//                         CssStyle.flexJustify,
//                         {paddingVertical: responsiveHeight(1.7)},
//                       ]}>
//                       {glassDay.map((item, index) => (
//                         <WaterTracking
//                           key={index}
//                           onPress={() =>
//                             AddDailyRecord(
//                               id.id,
//                               id.water_tracker_id,
//                               index,
//                               moment(new Date()).format('YYYY-MM-DD'),
//                             )
//                           }
//                           index={index}
//                           waterData={waterData}
//                         />
//                       ))}
//                     </View>
//                     <View
//                       style={[
//                         CssStyle.flexJustify,
//                         {paddingVertical: responsiveHeight(1.7)},
//                       ]}>
//                       {glassDay.map((item, index) => (
//                         <WaterTracking
//                           key={index}
//                           onPress={() =>
//                             AddDailyRecord(
//                               id.id,
//                               id.water_tracker_id,
//                               index,
//                               moment(new Date()).format('YYYY-MM-DD'),
//                             )
//                           }
//                           index={index}
//                           waterData={waterData}
//                         />
//                       ))}
//                     </View>
