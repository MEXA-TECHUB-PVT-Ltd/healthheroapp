import {
  Alert,
  FlatList,
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
import {
  GetSevenAll,
  GetSevenById,
  GetUserSevenByFour,
} from '../../services/SevenFour';
import {BaseUrl} from '../../Helping/BaseUrl';
import Loader from '../../component/Loader';
import {useSelector} from 'react-redux';

const StartNow = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  // console.log(item, 'jhela ');
  const [sevenByFourData, setSevenByFourData] = useState([]);
  const itemOfBackgroundImage = item ? item?.image : null;
  const [loading, setLoading] = useState(false);
  const id = useSelector(data => data.id);
  const [GEtUserSevenFourRes, setGetUserSevenFour] = useState([]);
  // console.log(GEtUserSevenFourRes[0]?.days_of_week);
  useEffect(() => {
    GetSeven();
    GetSevenWeeks();
  }, []);
  const GetSeven = async () => {
    setLoading(true);
    try {
      const result = await GetUserSevenByFour(
        id,
        item?.seven_by_four_challenge_id,
      );
      if (result.status == true) {
        setLoading(false);
        setGetUserSevenFour(result.result);
      } else {
        setLoading(false);
        console.error(result.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const GetSevenWeeks = async () => {
    setLoading(true);
    try {
      const result = await GetSevenAll(item?.seven_by_four_challenge_id);
      // console.log(result.result[0].weeks[1], 'afdsa');
      if (result.status == true) {
        setLoading(false);
        setSevenByFourData(result.result[0].weeks);
      } else {
        setLoading(false);
        console.error(result.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getDays = GEtUserSevenFourRes[3]?.days_of_week
    ? GEtUserSevenFourRes[3]?.days_of_week?.length
    : GEtUserSevenFourRes[2]?.days_of_week
    ? GEtUserSevenFourRes[2]?.days_of_week?.length
    : GEtUserSevenFourRes[1]?.days_of_week
    ? GEtUserSevenFourRes[1]?.days_of_week?.length
    : GEtUserSevenFourRes[0]?.days_of_week
    ? GEtUserSevenFourRes[0]?.days_of_week?.length
    : GEtUserSevenFourRes[0]?.days_of_week?.length;
  const getDayId = GEtUserSevenFourRes?.length;

  useEffect(() => {
    var mount = true;
    const listener = navigation.addListener('focus', async () => {
      setLoading(true);
      try {
        const result = await GetSevenAll(item?.seven_by_four_challenge_id);
        // console.log(result.result[0].weeks[0].week_days, 'hello sir');
        if (result.status == true) {
          setLoading(false);
          setSevenByFourData(result.result[0].weeks);
        } else {
          setLoading(false);
          console.error(result.message);
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
        const result = await GetUserSevenByFour(
          id,
          item?.seven_by_four_challenge_id,
        );
        // console.log(result.result[0], 'hello sir');
        if (result.status == true) {
          setLoading(false);
          setGetUserSevenFour(result.result);
        } else {
          setLoading(false);
          console.error(result.message);
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
  const weekData = [
    {item: 1},
    {item: 2},
    {item: 3},
    {item: 4},
    {item: 5},
    {item: 6},
    {item: 7},
  ];
  // console.log(
  //   28 -
  //     (GEtUserSevenFourRes[0]?.days_of_week?.length +
  //       GEtUserSevenFourRes[1]?.days_of_week?.length +
  //       GEtUserSevenFourRes[2]?.days_of_week?.length),
  // );
  const totalPercentage = GEtUserSevenFourRes[3]?.days_of_week
    ? (28 -
        (GEtUserSevenFourRes[0]?.days_of_week?.length +
          GEtUserSevenFourRes[1]?.days_of_week?.length +
          GEtUserSevenFourRes[2]?.days_of_week?.length +
          GEtUserSevenFourRes[3]?.days_of_week?.length)) *
      3.57151
    : GEtUserSevenFourRes[2]?.days_of_week
    ? (28 -
        (GEtUserSevenFourRes[0]?.days_of_week?.length +
          GEtUserSevenFourRes[1]?.days_of_week?.length +
          GEtUserSevenFourRes[2]?.days_of_week?.length)) *
      3.57151
    : GEtUserSevenFourRes[1]?.days_of_week
    ? (28 -
        (GEtUserSevenFourRes[0]?.days_of_week?.length +
          GEtUserSevenFourRes[1]?.days_of_week?.length)) *
      3.57151
    : GEtUserSevenFourRes[0]?.days_of_week
    ? (28 - GEtUserSevenFourRes[0]?.days_of_week?.length) * 3.57151
    : 0;
  const totalWidthLine = GEtUserSevenFourRes[3]?.days_of_week
    ? (GEtUserSevenFourRes[0]?.days_of_week?.length +
        GEtUserSevenFourRes[1]?.days_of_week?.length +
        GEtUserSevenFourRes[2]?.days_of_week?.length +
        GEtUserSevenFourRes[3]?.days_of_week?.length) *
      3.57151
    : GEtUserSevenFourRes[2]?.days_of_week
    ? (GEtUserSevenFourRes[0]?.days_of_week?.length +
        GEtUserSevenFourRes[1]?.days_of_week?.length +
        GEtUserSevenFourRes[2]?.days_of_week?.length) *
      3.57151
    : GEtUserSevenFourRes[1]?.days_of_week
    ? (GEtUserSevenFourRes[0]?.days_of_week?.length +
        GEtUserSevenFourRes[1]?.days_of_week?.length) *
      3.57151
    : GEtUserSevenFourRes[0]?.days_of_week
    ? GEtUserSevenFourRes[0]?.days_of_week?.length * 3.57151
    : 0;
  // console.log(totalWidthLine, 'wdith');
  const [selectIndex, setSelectIndex] = useState('');
  const [selectDataIndex, setSelectDataIndex] = useState('');

  return loading ? (
    <Loader />
  ) : (
    <View style={CssStyle.mainContainer}>
      <ImageBackground
        style={{width: responsiveWidth(100), height: responsiveHeight(30)}}
        source={{uri: `${BaseUrl}` + item?.image}}>
        <View
          style={[
            CssStyle.flexJustify,
            {
              paddingTop: responsiveHeight(3),
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
          // paddingBottom: responsiveHeight(3),
          flex: 1,
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            marginBottom: responsiveHeight(3),
            fontFamily: 'Interstate-bold',
            fontSize: 19,
          }}>
          7 x 4 Challenges
        </Text>
        <View style={[CssStyle.flexJustify]}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontFamily: 'Interstate-regular',
              fontSize: 12,
            }}>
            {GEtUserSevenFourRes[3]?.week_days
              ? 28 -
                (GEtUserSevenFourRes[0]?.days_of_week?.length +
                  GEtUserSevenFourRes[1]?.days_of_week?.length +
                  GEtUserSevenFourRes[2]?.days_of_week?.length +
                  GEtUserSevenFourRes[3]?.days_of_week?.length)
              : GEtUserSevenFourRes[2]?.days_of_week
              ? 28 -
                (GEtUserSevenFourRes[0]?.days_of_week?.length +
                  GEtUserSevenFourRes[1]?.days_of_week?.length +
                  GEtUserSevenFourRes[2]?.days_of_week?.length)
              : GEtUserSevenFourRes[1]?.days_of_week
              ? 28 -
                (GEtUserSevenFourRes[0]?.days_of_week?.length +
                  GEtUserSevenFourRes[1]?.days_of_week?.length)
              : GEtUserSevenFourRes[0]?.days_of_week
              ? 28 - GEtUserSevenFourRes[0]?.days_of_week?.length
              : 0}{' '}
            days left
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontFamily: 'Interstate-regular',
              fontSize: 12,
            }}>
            {totalPercentage.toFixed(0)} %
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#626377',
            width: responsiveWidth(90),
            marginBottom: responsiveHeight(4),
            borderRadius: responsiveWidth(40),
            marginTop: responsiveWidth(3),
          }}>
          <View
            style={{
              width: responsiveWidth(totalWidthLine.toFixed(0)),
              backgroundColor: AppColors.buttonText,
              borderRadius: responsiveWidth(20),
              height: responsiveHeight(0.9),
            }}
          />
        </View>
        <View style={{flex: 1, paddingBottom: responsiveHeight(7)}}>
          <FlatList
            data={sevenByFourData}
            keyExtractor={item => item.item}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#626377',
                    marginBottom: responsiveHeight(3),
                    borderRadius: responsiveWidth(3),
                    paddingHorizontal: responsiveWidth(2),
                  }}>
                  <View
                    style={[
                      CssStyle.flexJustify,
                      {
                        paddingTop: responsiveHeight(1),
                        // paddingBottom: responsiveHeight(0.6),
                      },
                    ]}>
                    <Text
                      style={{
                        // marginLeft: responsiveWidth(3),
                        color: 'white',
                        fontFamily: 'Interstate-bold',
                        fontSize: 16,
                      }}>
                      Week {item.week_no}
                    </Text>
                    <Text
                      style={{
                        // marginLeft: responsiveWidth(3),
                        color: 'white',
                        fontSize: 13,
                      }}>
                      {/* {item?.week_days == null ? 0 : item?.week_days.length}/7 */}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginVertical: responsiveHeight(1),
                      borderRadius: responsiveWidth(2),
                    }}>
                    <View
                      style={[
                        CssStyle.flexJustify,
                        {
                          paddingVertical: responsiveHeight(1.8),
                        },
                      ]}>
                      {weekData.map((itemData, indexData) => {
                        return (
                          <>
                            <TouchableOpacity
                              key={indexData}
                              onPress={() => {
                                navigation.navigate('SevenFourWorkout', {
                                  item: sevenByFourData[index].week_days[
                                    indexData
                                  ],
                                  exercise_done:
                                    GEtUserSevenFourRes[index]?.days_of_week[
                                      indexData
                                    ]?.day_id ==
                                    sevenByFourData[index]?.week_days[indexData]
                                      ?.day_id,
                                  upcomingData:
                                    indexData == 0
                                      ? true
                                      : GEtUserSevenFourRes[index]
                                          ?.days_of_week[indexData - 1]?.day_id,
                                  imageBackground: itemOfBackgroundImage,
                                });
                              }}
                              style={{
                                width: 29,
                                height: 29,
                                borderRadius: responsiveHeight(30),
                                backgroundColor:
                                  GEtUserSevenFourRes[index] &&
                                  sevenByFourData[index]
                                    ? GEtUserSevenFourRes[index]?.days_of_week[
                                        indexData
                                      ]?.day_id ==
                                      sevenByFourData[index]?.week_days[
                                        indexData
                                      ]?.day_id
                                      ? AppColors.buttonText
                                      : '#78798A'
                                    : '#78798A',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{color: 'white', fontSize: 11}}>
                                {itemData.item}
                              </Text>
                            </TouchableOpacity>
                            {indexData !== weekData.length - 1 ? (
                              <View
                                style={{
                                  backgroundColor:
                                    GEtUserSevenFourRes[index] &&
                                    sevenByFourData[index]
                                      ? GEtUserSevenFourRes[index]
                                          ?.days_of_week[indexData]?.day_id ==
                                        sevenByFourData[index]?.week_days[
                                          indexData
                                        ]?.day_id
                                        ? AppColors.buttonText
                                        : '#78798A'
                                      : '#78798A',
                                  width: responsiveWidth(5.1),
                                  height: 1,
                                  justifyContent: 'center',
                                }}
                              />
                            ) : null}
                          </>
                        );
                      })}
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
        {console.log(
          GEtUserSevenFourRes.length,
          getDayId !== undefined
            ? getDays > 6
              ? getDayId
              : getDayId - 1 == 0
              ? 0
              : getDayId - 1
            : 0,
          'between data',
          getDays,
          getDays == undefined ? 0 : getDays == 7 ? 0 : getDays,
        )}
        <View
          style={{
            position: 'absolute',
            top: responsiveHeight(64),
            width: responsiveWidth(90),
            left: responsiveWidth(5),
          }}>
          <CustomButton
            onPress={() =>
              navigation.navigate('SevenFourWorkout', {
                item: sevenByFourData[
                  getDayId !== undefined
                    ? getDays > 6
                      ? getDayId
                      : getDayId - 1 == 0
                      ? 0
                      : getDayId - 1
                    : 0
                ]?.week_days[
                  getDays == undefined ? 0 : getDays == 7 ? 0 : getDays
                ],
                exercise_done: false,
                upcomingData: true,
                imageBackground: item?.image,
              })
            }
            buttonText={'GO!'}
            fontWeight="500"
            style={{}}
          />
        </View>
      </View>
    </View>
  );
};

export default StartNow;

const styles = StyleSheet.create({});
