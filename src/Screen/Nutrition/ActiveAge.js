import {
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from '../../Helping/AppColor';
import Icon from 'react-native-vector-icons/Ionicons';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useFocusEffect} from '@react-navigation/native';
import CustomButton from '../../component/CustomButton';
import {FocusedComponent} from '../../Helping/HelpingComponent';
import {UpdateProfileApi} from '../../';
import {RulerPicker} from 'react-native-ruler-picker';
import Ruler from '../../Helping/Ruler';

const ActiveAge = ({navigation, route}) => {
  const {item, updateData} = route.params ? route.params : '';
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    updateData ? updateData.activity_status : '',
  );
  const activeAgeData = [
    {item: 'sedentary'},
    {item: 'light'},
    {item: 'moderate'},
    {item: 'active'},
    {item: 'extreme'},
  ];
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{flex: 1}}>
        <View
          style={[
            CssStyle.flexJustify,
            {
              marginTop: responsiveHeight(4.4),
              paddingHorizontal: responsiveWidth(5),
            },
          ]}>
          <TouchableOpacity
            style={{
              marginLeft: responsiveWidth(-1),
            }}
            onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={28}
              color={AppColors.buttonText}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            width: responsiveWidth(100),
            paddingHorizontal: responsiveWidth(6),
          }}>
          <View style={{flex: 0.31, marginTop: responsiveHeight(5.9)}}>
            <Text
              style={{
                color: 'white',
                fontSize: responsiveFontSize(4.7),
                // marginBottom: responsiveHeight(2),
                fontFamily: 'Interstate-bold',
                marginLeft: responsiveWidth(1),
                width: responsiveWidth(90),
                lineHeight: responsiveHeight(6),
                textTransform: 'capitalize',
              }}>
              How active are you?
            </Text>
            <Text
              style={{
                width: responsiveWidth(79),
                color: 'white',
                // fontFamily: 'Interstate-regular',
                lineHeight: responsiveHeight(3),
                marginLeft: responsiveWidth(1),
                fontSize: 13,
                fontWeight: '400',
                opacity: 0.77,
              }}>
              Understanding your activity level will help us tailor your fitness
              journey more effectively.
            </Text>
          </View>
          <View>
            <View
              style={[
                CssStyle.flexJustify,
                {width: responsiveWidth(90), flexWrap: 'wrap'},
              ]}>
              {activeAgeData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    paddingHorizontal: responsiveWidth(4.8),
                    backgroundColor:
                      item.item == activeIndex
                        ? AppColors.buttonText
                        : '#FF510040',
                    paddingVertical: responsiveHeight(1),
                    borderRadius: responsiveWidth(4),
                    marginBottom: responsiveHeight(2),
                  }}
                  onPress={() => setActiveIndex(item.item)}>
                  <Text
                    style={{
                      color: item.item == activeIndex ? 'white' : '#ffffffa1',
                      fontFamily: 'Interstate-regular',
                      fontSize: 13,
                    }}>
                    {item.item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#0B183C',
          }}>
          <View
            style={{
              bottom: responsiveHeight(10),
              left: responsiveWidth(11),
              position: 'absolute',
            }}>
            <CustomButton
              loading={loading}
              onPress={() => {
                activeIndex
                  ? navigation.navigate('WeekGoal', {
                      item: {item, activeIndex},
                      updateData,
                    })
                  : ToastAndroid.show('Please select one', ToastAndroid.SHORT);
              }}
              activeOpacity={1}
              style={{width: responsiveWidth(78)}}
              buttonText={'Continue'}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActiveAge;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
