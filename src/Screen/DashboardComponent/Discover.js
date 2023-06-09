import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import {AppColors} from '../../Helping/AppColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Discover = ({navigation}) => {
  const dataFLex = [
    {item: 1},
    {item: 2},
    {item: 3},
    {item: 1},
    {item: 2},
    {item: 3},
    {item: 1},
    {item: 2},
    {item: 3},
    {item: 1},
    {item: 2},
    {item: 3},
  ];
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: AppColors.buttonText,
          borderBottomLeftRadius: responsiveWidth(4),
          borderBottomEndRadius: responsiveWidth(4),
          paddingVertical: responsiveHeight(1),
        }}>
        <Text style={[styles.signInText]}>Discover</Text>
      </View>
      <View
        style={{
          paddingTop: responsiveHeight(1.7),
          paddingHorizontal: responsiveWidth(5),
        }}>
        <FlatList
          data={dataFLex}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              style={{
                marginBottom: responsiveHeight(2),
                marginRight: responsiveWidth(5.5),
                marginTop: responsiveHeight(1),
              }}>
              <Image
                borderRadius={responsiveWidth(2)}
                source={require('../../assets/Rectangle33.png')}
                style={{
                  width: responsiveWidth(42),
                  height: responsiveHeight(19),
                }}
                resizeMode="contain"
              />
              <View
                style={{alignItems: 'center', marginTop: responsiveHeight(1)}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontFamily: 'Interstate-regular',
                    // alignSelf: 'center',
                    marginVertical: responsiveHeight(0.5),
                  }}>
                  Yoga exercise
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'Interstate-regular',
                    opacity: 0.5,
                    // alignSelf: 'center',
                  }}>
                  21 min | 400 k
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 35,
    lineHeight: responsiveHeight(5),
    opacity: 0.9,
  },
});
