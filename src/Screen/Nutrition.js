import {
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
import {GetDietPlanApi} from '../services/DietPlan';
import {useSelector} from 'react-redux';
import {GetFoodApi} from '../services/FoodApi';
import { GetWaterApi } from '../services/WaterTrackerApi';

const Nutrition = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  // console.log(item);
  const Card = [
    {desc: 'Burnt', number: 1520},
    {desc: 'Eaten', number: 500},
    {desc: 'Remaining', number: 112},
  ];
  const dailyFoodRecord = [
    {desc: 'Burnt', number: 23},
    {desc: 'Eaten', number: 345},
  ];
  const glassDay = [
    {number: 1},
    {number: 2},
    {number: 3},
    {number: 4},
    {number: 5},
    {number: 6},
    {number: 7},
    {number: 8},
  ];
  const id = useSelector(data => data.id);
  const [loading, setLoading] = useState(false);
  const [dietId, setDietId] = useState('');

  const GetDietId = async () => {
    setLoading(true);
    try {
      const result = await AsyncStorage.getItem('DietPlanId');
      console.log(result, 'diet id');
      if (result) {
        setDietId(result);
        setLoading(false);
      } else {
        setLoading(false);
        navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetDietPlan = async () => {
    setLoading(true);
    try {
      const result = await GetDietPlanApi(3000302, id);
      // console.log(result, 'this is the');
      if (result) {
        setLoading(false);
      } else {
        setLoading(false);
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [waterData, setWaterData] = useState('');
  const GetWaterTracking = async () => {
    setLoading(true);
    try {
      const result = await GetWaterApi(id);
      console.log(result, 'this is the');
      if (result) {
        setLoading(false);
        setWaterData(result.result);
      } else {
        setLoading(false);
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [foodData, setFoodData] = useState([]);
  const GetFoodRecord = async () => {
    setLoading(true);
    try {
      const result = await GetFoodApi();
      // console.log(result, '');
      if (result) {
        setLoading(false);
        setFoodData(result.result);
      } else {
        setLoading(false);
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetFoodRecord();
    GetWaterTracking();
  }, []);

  useEffect(() => {
    GetDietId();
  }, [dietId]);

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
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
              onPress={() => navigation.navigate('SelectPlan')}>
              <Image
                resizeMode="contain"
                style={{width: 19, height: 19}}
                source={require('../assets/Health-Hero/Iconfeather-edit-3.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {!item ? (
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
                7400 <Text style={{fontSize: 12}}>Kcal</Text>
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
            {foodData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {}}
                style={styles.dailyButton}>
                <View style={{}}>
                  <Text style={styles.dailyText}>{item.food_name}</Text>
                  <View style={[CssStyle.flexJustify, {}]}>
                    <Text style={styles.foodType}>
                      Yogurt with Berries and banana
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                      }}>
                      {item.energy_calories} Kcal
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
                onPress={() => navigation.navigate('TypeOfTracker')}>
                <Octicons name="diff-added" size={23} color={'white'} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {}} style={styles.dailyButton}>
              <View style={{}}>
                <Text
                  style={[
                    styles.dailyText,
                    {fontSize: 13, fontFamily: 'Interstate-regular'},
                  ]}>
                  08 Glass
                </Text>
                <View style={[CssStyle.flexJustify, {}]}></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.dailyButton}>
              <View style={{}}>
                <Text style={styles.dailyText}>Weekly Report</Text>
                <View style={[CssStyle.flexJustify, {}]}>
                  <Text style={styles.foodType}>
                    Yogurt with Berries and banana
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '500',
                      fontFamily: 'Interstate-regular',
                    }}>
                    250 Kcal
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
            <Text style={{color: 'white'}}>Glass stick</Text>
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
