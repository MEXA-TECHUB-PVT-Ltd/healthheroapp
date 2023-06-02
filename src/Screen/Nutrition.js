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
import React, {useEffect, useState} from 'react';
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

import {
  GetDailyWaterApi,
  GetWaterApi,
  GetWaterRecordApi,
  GetWeeklyWaterApi,
} from '../services/WaterTrackerApi';
import Glass from '../assets/redGlas';
import Bottle from '../assets/water';
import FillGlass from '../assets/glass-of-water';
import {Calendar} from 'react-native-calendars';
import {BarChart} from 'react-native-chart-kit';
import {Diet_Id, Water_Id} from '../store/action';
import moment from 'moment';
import {GetWaterTracker, WaterTracking} from '../Helping/WaterTracking';

const Nutrition = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  const dispatch = useDispatch();
  const id = useSelector(data => data);
  // const dataitem = useSelector(data => console.log(data));
  const [loading, setLoading] = useState(false);
  const [foodData, setFoodData] = useState([]);
  const [waterData, setWaterData] = useState('');
  const [getDailyRecordTracker, setGetDailyRecordTracker] = useState('');
  const [weeklyWaterData, setWeeklyWaterData] = useState('');
  // console.log(
  //   moment(weeklyWaterData[1]?.json_build_object?.created_at).format('dddd'),
  //   'helso',
  // );
  // console.log();
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
      try {
        const result = await GetFoodApi(id.id, id.dietPlanId);
        // console.log(result, 'Food record');
        if (result) {
          // setLoading(false);
          setFoodData(result.result.foodIntakesToday);
        } else {
          setLoading(false);
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
        // console.log(result, 'get water api');
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
          // console.log(result.result, 'get daily water api');
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

  useEffect(() => {
    id.dietPlanId ? GetDietPlan() : navigation.navigate('SelectPlan');
  }, [id.dietPlanId]);

  const GetDietPlan = async () => {
    setLoading(true);
    try {
      const result = await GetDietPlanApi(id.dietPlanId, id.id);
      // console.log(result, 'this is the');
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
  const Card = [
    {desc: 'Protein', number: dietPlanData?.macros?.protein},
    {desc: 'Sugar', number: dietPlanData?.macros?.sugar},
    {desc: 'carb', number: dietPlanData?.macros?.carb},
  ];
  const GetWaterTracking = async () => {
    setLoading(true);
    try {
      const result = await GetWaterApi(id.id);
      // console.log(result, 'get water api');
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
      console.log(result, 'Food record');
      if (result) {
        setLoading(false);
        setFoodData(result.result?.foodIntakesToday);
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
      console.log(result.result[1], 'weeky data');
      if (result) {
        setLoading(false);
        setWeeklyWaterData(result.result);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(moment(new Date() * 24 * 60 * 60 * 1000).format('dddd'), 'hello');
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
      // console.log(result, 'get daily water');
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
    GetDailyWaterRecord();
  }, []);

  useEffect(() => {
    GetFoodRecord();
    GetWaterTracking();
    id.waterTrackerId ? GetWeeklyReport() : {};
    GetDietPlan();
  }, []);
  console.log(moment('2023-06-02T00:00:00+00:00').format('dddd'));
  const idWaterTracker = useSelector(data => data.waterTrackerId);
  const AddDailyRecord = async (system, idWaterTracker, index, Text) => {
    // console.log('clicked');
    try {
      const result = await GetWaterRecordApi(
        id.id,
        id.waterTrackerId,
        getDailyRecordTracker ? getDailyRecordTracker.quantity + 1 : 1,
        moment(new Date()).format('YYYY-MM-DD'),
      );
      // console.log(result, 'daily record');
      if (result.status == true) {
        // setLoading(false);
        GetDailyWaterRecord();
        GetWeeklyReport();
      } else {
        // setLoading(false);
        console.log('record error');
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                      item: dietPlanData?.fetched_record,
                    })
                  : navigation.navigate('SelectPlan')
              }>
              <Image
                resizeMode="contain"
                style={{width: 19, height: 19}}
                source={require('../assets/Health-Hero/Iconfeather-edit-3.png')}
              />
            </TouchableOpacity>
          </View>
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
                {dietPlanData ? dietPlanData?.calories_needed_per_day : '2000'}{' '}
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
                  <>
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
                  </>
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
            {foodData?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {}}
                style={styles.dailyButton}>
                <View style={{}}>
                  <Text style={styles.dailyText}>
                    {item.food_details.food_name}
                  </Text>
                  <View style={[CssStyle.flexJustify, {}]}>
                    <Text style={styles.foodType}>
                      Yogurt with Berries and banana
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
              </TouchableOpacity>
            ))}
            {/* <FlatList
              data={foodData}
              renderItem={({item, index}) => {
                // console.log(item);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {}}
                    style={styles.dailyButton}>
                    <View style={{}}>
                      <Text style={styles.dailyText}>
                        {item.food_details.food_name}
                      </Text>
                      <View style={[CssStyle.flexJustify, {}]}>
                        <Text style={styles.foodType}>
                          Yogurt with Berries and banana
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
                  </TouchableOpacity>
                );
              }}
            /> */}
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
                  08 Glass
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
                  data={data}
                  width={responsiveWidth(88)}
                  height={responsiveHeight(28)}
                  showBarTops={false}
                  withInnerLines={false}
                  chartConfig={chartConfig}
                  withVerticalLabels={false}
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
          <View
            style={[
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: responsiveHeight(37),
              },
            ]}>
            {/* <Text style={{color: 'white'}}>No</Text> */}
            <Text
              style={{
                color: 'white',
                // opacity: 0.4,
                fontSize: 15,
                marginTop: responsiveHeight(2),
              }}>
              No Nutrition & Diet Plans added yet
            </Text>
          </View>
        )}
      </View>
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
    paddingVertical: responsiveHeight(1.2),
    backgroundColor: '#626377',
  },
  dailyText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Interstate-bold',
  },
  foodType: {
    fontSize: 12,
    paddingVertical: responsiveHeight(1),
    color: 'white',
    fontFamily: 'Interstate-regular',
    width: responsiveWidth(40),
    letterSpacing: 0.7,
    lineHeight: responsiveHeight(2.3),
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
