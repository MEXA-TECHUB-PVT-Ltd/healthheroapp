import {
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
import {GetSevenById} from '../../services/SevenFour';
import {BaseUrl} from '../../Helping/BaseUrl';
import Loader from '../../component/Loader';

const StartNow = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  const [sevenByFourData, setSevenByFourData] = useState([]);
  const [loading, setLoading] = useState(false);
  const GetSeven = async () => {
    setLoading(true);
    try {
      const result = await GetSevenById(item?.seven_by_four_challenge_id);
      // console.log(result.result, 'hello sir');
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
  useEffect(() => {
    GetSeven();
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
  //     (sevenByFourData[0]?.week_days?.length +
  //       sevenByFourData[1]?.week_days?.length +
  //       sevenByFourData[2]?.week_days?.length +
  //       sevenByFourData[3]?.week_days?.length),
  // );
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
              paddingTop: responsiveHeight(2),
              paddingHorizontal: responsiveWidth(5),
            },
          ]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
            {sevenByFourData[3]?.week_days
              ? 28 -
                (sevenByFourData[0]?.week_days?.length +
                  sevenByFourData[1]?.week_days?.length +
                  sevenByFourData[2]?.week_days?.length +
                  sevenByFourData[3]?.week_days?.length)
              : sevenByFourData[2]?.week_days
              ? 28 -
                (sevenByFourData[0]?.week_days?.length +
                  sevenByFourData[1]?.week_days?.length +
                  sevenByFourData[2]?.week_days?.length)
              : sevenByFourData[1]?.week_days
              ? 28 -
                (sevenByFourData[0]?.week_days?.length +
                  sevenByFourData[1]?.week_days?.length)
              : sevenByFourData[0]?.week_days
              ? 28 - sevenByFourData[0]?.week_days?.length
              : null}{' '}
            days left
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontFamily: 'Interstate-regular',
              fontSize: 12,
            }}>
            {sevenByFourData[3]?.week_days
              ? 28 -
                (sevenByFourData[0]?.week_days?.length +
                  sevenByFourData[1]?.week_days?.length +
                  sevenByFourData[2]?.week_days?.length +
                  sevenByFourData[3]?.week_days?.length)
              : sevenByFourData[2]?.week_days
              ? 28 -
                (sevenByFourData[0]?.week_days?.length +
                  sevenByFourData[1]?.week_days?.length +
                  sevenByFourData[2]?.week_days?.length)
              : sevenByFourData[1]?.week_days
              ? 28 -
                (sevenByFourData[0]?.week_days?.length +
                  sevenByFourData[1]?.week_days?.length)
              : sevenByFourData[0]?.week_days
              ? 28 - sevenByFourData[0]?.week_days?.length * 3.57151
              : sevenByFourData[0]?.week_days
              ? 28 - sevenByFourData[0]?.week_days == null
                ? null
                : sevenByFourData[0]?.week_days.length * 3.57151
              : null}
            %
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
              width: responsiveWidth(30),
              backgroundColor: AppColors.buttonText,
              borderRadius: responsiveWidth(20),
              height: responsiveHeight(0.9),
            }}
          />
        </View>
        <View style={{flex: 1, paddingBottom: responsiveHeight(7)}}>
          <FlatList
            data={sevenByFourData}
            keyExtractor={item => item.week_no}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#626377',
                    marginBottom: responsiveHeight(3),
                    borderRadius: responsiveWidth(3),
                    paddingHorizontal: responsiveWidth(4),
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
                      Week {item?.week_no}
                    </Text>
                    <Text
                      style={{
                        // marginLeft: responsiveWidth(3),
                        color: 'white',
                        fontSize: 13,
                      }}>
                      {item?.week_days == null ? 0 : item?.week_days.length}/7
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
                              disabled={
                                item?.week_days[indexData]?.day ? false : true
                              }
                              onPress={() =>
                                navigation.navigate('SevenFourWorkout', {
                                  item: item?.week_days[indexData],
                                })
                              }
                              style={{
                                width: 29,
                                height: 29,
                                borderRadius: responsiveHeight(30),
                                backgroundColor:
                                  item?.week_days == null
                                    ? '#78798A'
                                    : item?.week_days[indexData]?.day
                                    ? AppColors.buttonText
                                    : '#78798A',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{color: 'white', fontSize: 11}}>
                                {itemData.item}
                              </Text>
                            </TouchableOpacity>
                            {indexData !== -1 ? (
                              <View
                                style={{
                                  backgroundColor:
                                    item?.week_days == null
                                      ? 'white'
                                      : item?.week_days[indexData]?.day
                                      ? AppColors.buttonText
                                      : 'white',
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
        <View
          style={{
            position: 'absolute',
            top: responsiveHeight(64),
            width: responsiveWidth(90),
            left: responsiveWidth(5),
          }}>
          <CustomButton
            onPress={() => navigation.navigate('WorkoutExercise')}
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

{
  /* <View>
<TouchableOpacity
  onPress={() =>
    navigation.navigate('SevenFourWorkout', {
      item: item?.week_days,
    })
  }
  style={{
    width: 29,
    height: 29,
    borderRadius: responsiveHeight(30),
    backgroundColor:
      item?.week_days == null
        ? '#78798A'
        : item?.week_days[1]?.day
        ? AppColors.buttonText
        : '#78798A',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
  <Text style={{color: 'white', fontSize: 11}}>2</Text>
</TouchableOpacity>
<View
  style={{
    backgroundColor:
      item?.week_days == null
        ? 'white'
        : item?.week_days[1]?.day
        ? AppColors.buttonText
        : 'white',
    width: responsiveWidth(5.1),
    height: 1,
    justifyContent: 'center',
  }}
/>
<TouchableOpacity
  onPress={() =>
    navigation.navigate('SevenFourWorkout', {
      item: item?.week_days,
    })
  }
  style={{
    width: 29,
    height: 29,
    borderRadius: responsiveHeight(30),
    backgroundColor:
      item?.week_days == null
        ? '#78798A'
        : item?.week_days[2]?.day
        ? AppColors.buttonText
        : '#78798A',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
  <Text style={{color: 'white', fontSize: 11}}>3</Text>
</TouchableOpacity>
<View
  style={{
    backgroundColor:
      item?.week_days == null
        ? 'white'
        : item?.week_days[2]?.day
        ? AppColors.buttonText
        : 'white',
    width: responsiveWidth(5.1),
    height: 1,
    justifyContent: 'center',
  }}
/>
<TouchableOpacity
  onPress={() =>
    navigation.navigate('SevenFourWorkout', {
      item: item?.week_days,
    })
  }
  style={{
    width: 29,
    height: 29,
    borderRadius: responsiveHeight(30),
    backgroundColor:
      item?.week_days == null
        ? '#78798A'
        : item?.week_days[3]?.day
        ? AppColors.buttonText
        : '#78798A',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
  <Text style={{color: 'white', fontSize: 11}}>4</Text>
</TouchableOpacity>
<View
  style={{
    backgroundColor:
      item?.week_days == null
        ? 'white'
        : item?.week_days[3]?.day
        ? AppColors.buttonText
        : 'white',
    width: responsiveWidth(5.1),
    height: 1,
    justifyContent: 'center',
  }}
/>
<TouchableOpacity
  onPress={() =>
    navigation.navigate('SevenFourWorkout', {
      item: item?.week_days,
    })
  }
  style={{
    width: 29,
    height: 29,
    borderRadius: responsiveHeight(30),
    backgroundColor:
      item?.week_days == null
        ? '#78798A'
        : item?.week_days[4]?.day
        ? AppColors.buttonText
        : '#78798A',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
  <Text style={{color: 'white', fontSize: 11}}>5</Text>
</TouchableOpacity>
<View
  style={{
    backgroundColor:
      item?.week_days == null
        ? 'white'
        : item?.week_days[4]?.day
        ? AppColors.buttonText
        : 'white',
    width: responsiveWidth(5.1),
    height: 1,
    justifyContent: 'center',
  }}
/>
<TouchableOpacity
  onPress={() =>
    navigation.navigate('SevenFourWorkout', {
      item: item?.week_days,
    })
  }
  style={{
    width: 29,
    height: 29,
    borderRadius: responsiveHeight(30),
    backgroundColor:
      item?.week_days == null
        ? '#78798A'
        : item?.week_days[5]?.day
        ? AppColors.buttonText
        : '#78798A',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
  <Text style={{color: 'white', fontSize: 11}}>6</Text>
</TouchableOpacity>
<View
  style={{
    backgroundColor:
      item?.week_days == null
        ? 'white'
        : item?.week_days[5]?.day
        ? AppColors.buttonText
        : 'white',
    width: responsiveWidth(5.1),
    height: 1,
    justifyContent: 'center',
  }}
/>
<TouchableOpacity
  onPress={() =>
    navigation.navigate('SevenFourWorkout', {
      item: item?.week_days,
    })
  }
  style={{
    width: 29,
    height: 29,
    borderRadius: responsiveHeight(30),
    backgroundColor:
      item?.week_days == null
        ? '#78798A'
        : item?.week_days[6]?.day
        ? AppColors.buttonText
        : '#78798A',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
  <Text style={{color: 'white', fontSize: 11}}>7</Text>
</TouchableOpacity>
</View> */
}
