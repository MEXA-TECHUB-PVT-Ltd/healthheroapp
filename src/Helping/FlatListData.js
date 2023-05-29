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

export const FlatListData = ({category, navigation}) => {
  return (
    <View style={{marginTop: responsiveHeight(3)}}>
      <FlatList
        data={category}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WorkoutExercise', {item: item})
              }
              style={{
                marginRight: responsiveWidth(6),
                alignItems: 'center',
              }}>
              {item.image ? (
                <Image
                  borderRadius={responsiveWidth(2)}
                  source={
                    item.image || item.animation
                      ? {uri: `${BaseUrl}` + item.animation}
                      : require('../assets/noImage.jpeg')
                  }
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
                  // marginTop: responsiveHeight(1),
                }}>
                {item.category_name}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontFamily: 'Interstate-regular',
                }}>
                21 min | 400 k
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
