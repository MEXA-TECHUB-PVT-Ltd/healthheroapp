import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NoImage from '../assets/noImageRed';
import {BaseUrl} from './BaseUrl';
import CssStyle from '../StyleSheet/CssStyle';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

export const FlatListData = ({category, navigation}) => {
  let firstArray = [];
  let secondArray = [];
  if (category.length > 3) {
    firstArray = category.slice(0, 4);
    secondArray = category.slice(4, category.length);
  }
  return (
    <View style={{marginTop: responsiveHeight(3)}}>
      {category.length > 0 ? (
        <>
          <FlatList
            data={firstArray}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ListFooterComponent={
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: responsiveHeight(2),
                }}>
                <BannerAd
                  unitId={TestIds.BANNER}
                  size={BannerAdSize.LARGE_BANNER}
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                  }}
                />
              </View>
            }
            renderItem={({item, index}) => {
              return (
                <Fragment>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('WorkoutDetail', {
                        item: item.workout_plan_id,
                      })
                    }
                    style={{
                      marginRight: responsiveWidth(6),
                      alignItems: 'center',
                      marginBottom: responsiveHeight(2),
                    }}>
                    {item.image ? (
                      <Image
                        borderRadius={responsiveWidth(2)}
                        source={{uri: `${BaseUrl}` + item.image}}
                        style={{
                          width: responsiveWidth(42),
                          height: responsiveHeight(20),
                        }}
                        resizeMode="contain"
                      />
                    ) : (
                      <NoImage
                        width={responsiveWidth(42)}
                        height={responsiveHeight(20)}
                      />
                    )}
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontFamily: 'Interstate-regular',
                        marginTop: responsiveHeight(1),
                      }}>
                      {item.workout_title}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontFamily: 'Interstate-regular',
                        marginTop: responsiveHeight(0.3),
                      }}>
                      {item?.time?.length > 10
                        ? item?.time?.slice(0, 10)
                        : item?.time}
                      | {item.calories_burnt} k
                    </Text>
                  </TouchableOpacity>
                </Fragment>
              );
            }}
          />
          <FlatList
            data={secondArray}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <Fragment>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('WorkoutDetail', {
                        item: item.workout_plan_id,
                      })
                    }
                    style={{
                      marginRight: responsiveWidth(6),
                      alignItems: 'center',
                      marginBottom: responsiveHeight(2),
                    }}>
                    {item.image ? (
                      <Image
                        borderRadius={responsiveWidth(2)}
                        source={{uri: `${BaseUrl}` + item.image}}
                        style={{
                          width: responsiveWidth(42),
                          height: responsiveHeight(20),
                        }}
                        resizeMode="contain"
                      />
                    ) : (
                      <NoImage
                        width={responsiveWidth(42)}
                        height={responsiveHeight(20)}
                      />
                    )}
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        fontFamily: 'Interstate-regular',
                        marginTop: responsiveHeight(1),
                      }}>
                      {item.workout_title}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontFamily: 'Interstate-regular',
                        marginTop: responsiveHeight(0.3),
                      }}>
                      {item?.time?.length > 10
                        ? item?.time?.slice(0, 10)
                        : item?.time}
                      | {item.calories_burnt} k
                    </Text>
                  </TouchableOpacity>
                </Fragment>
              );
            }}
          />
        </>
      ) : (
        <View
          style={{
            paddingTop: responsiveWidth(30),
            paddingLeft: responsiveWidth(25),
          }}>
          <Text style={{fontFamily: 'Interstate-regular', color: 'white'}}>
            No Workout plan available
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
