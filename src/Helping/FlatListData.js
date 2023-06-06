import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NoImage from '../assets/noImageRed';
import {BaseUrl} from './BaseUrl';
import CssStyle from '../StyleSheet/CssStyle';

export const FlatListData = ({category, navigation}) => {
  return (
    <View style={{marginTop: responsiveHeight(3)}}>
      {category.length > 0 ? (
        <FlatList
          data={category}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
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
            );
          }}
        />
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
