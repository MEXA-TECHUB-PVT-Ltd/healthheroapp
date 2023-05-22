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
import Input from '../../component/Input';

const WeekGoal = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  const weightUnitData = [{text: 'cm'}, {text: 'in'}];
  const [weightData, setWeightData] = useState(null);
  const flatNode = useRef();
  const [activeIndex, setActiveIndex] = useState('');
  const [loading, setLoading] = useState(false);
  const [weightValue, setWeightValue] = useState(null);
  const [addWeeklyGoal, setAddWeeklyGoal] = useState(null);
  console.log(weightValue);
  const activeAgeData = [
    {item: '2.5 kg per week'},
    {item: '0.5 kg per week'},
    {item: '0.75 kg per week'},
    {item: '01 kg per week'},
    {item: 'other'},
  ];
  console.log(activeIndex);
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
            flex: addWeeklyGoal == 'Edit' ? 0 : 1,
            width: responsiveWidth(100),
            paddingHorizontal: responsiveWidth(6),
          }}>
          <View
            style={{
              flex: addWeeklyGoal == 'Edit' ? 0 : 0.35,
              marginTop: responsiveHeight(5.9),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: responsiveFontSize(4.7),
                marginBottom: responsiveHeight(2),
                fontFamily: 'Interstate-bold',
                marginLeft: responsiveWidth(1),
                width: responsiveWidth(90),
                lineHeight: responsiveHeight(6),
                textTransform: 'capitalize',
              }}>
              What's your weekly goal?
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
              To customize your fitness journey, we would like to know your
              desired weekly goal.
            </Text>
          </View>
          <View>
            {addWeeklyGoal == 'Edit' ? (
              <Input
                bgColor={'#ffffff60'}
                placeholder={'Weekly Goal'}
                noIcon={true}
                value={activeIndex}
                onChangeText={e => setActiveIndex(e)}
                fontSize={16}
                style={{marginTop: responsiveHeight(8)}}
              />
            ) : (
              <View
                style={[
                  CssStyle.flexJustify,
                  {width: responsiveWidth(73), flexWrap: 'wrap'},
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
                      marginBottom: responsiveHeight(2.3),
                    }}
                    onPress={() => {
                      item.item == 'other'
                        ? setAddWeeklyGoal('Edit')
                        : setActiveIndex(item.item);
                    }}>
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
            )}
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#0B183C',
          }}>
          <View
            style={{
              bottom:
                addWeeklyGoal == 'Edit'
                  ? responsiveHeight(-27)
                  : responsiveHeight(11.7),
              left: responsiveWidth(11),
              position: 'absolute',
            }}>
            <CustomButton
              loading={loading}
              onPress={() => {
                activeIndex
                  ? navigation.navigate('SetCalories', {
                      item: {item, activeIndex},
                    })
                  : ToastAndroid.show(
                      'Please enter the weekly goal',
                      ToastAndroid.SHORT,
                    );
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

export default WeekGoal;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
