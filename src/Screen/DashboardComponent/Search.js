import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import {AppColors} from '../../Helping/AppColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../../component/Input';

const Search = ({navigation}) => {
  const buttonMap = [
    {text: 'Beginner', nav: 'Beginner'},
    {text: 'Advance', nav: 'Advance'},
    {text: 'Intermediate', nav: 'Intermediate'},
  ];
  const workoutPlan = [
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
    {text: 'Lorem ', nav: 'WorkoutPlan'},
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
    {text: 'Lorem ', nav: 'WorkoutPlan'},
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
  ];
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View style={[CssStyle.flexJustify, {marginTop: responsiveHeight(3)}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={23} color={'#FF5100'} />
          </TouchableOpacity>
          <Input
            noIcon={true}
            style={{width: responsiveWidth(80)}}
            height={responsiveHeight(5)}
            placeholder={'SEARCH ...'}
            rightIcon="search"
          />
        </View>
        <View style={{marginTop: responsiveHeight(2)}}>
          <Text
            style={{
              fontFamily: 'Interstate-bold',
              color: 'white',
              fontSize: 37,
              marginBottom: responsiveHeight(2),
            }}>
            Category
          </Text>
          <View style={[CssStyle.flexData, {}]}>
            {buttonMap.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate(item.nav)}
                style={{
                  width: responsiveWidth(24),
                  borderRadius: responsiveWidth(2),
                  backgroundColor: '#232441',
                  marginRight: responsiveWidth(2),
                  paddingVertical: responsiveHeight(0.6),
                  paddingHorizontal: responsiveWidth(1),
                }}>
                <Text
                  style={{
                    fontFamily: 'Interstate-bold',
                    color: 'white',
                    fontSize: 12,
                    alignSelf: 'center',
                    opacity: 0.6,
                  }}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{marginTop: responsiveHeight(3)}}>
          <Text
            style={{
              fontFamily: 'Interstate-bold',
              color: 'white',
              fontSize: 37,
              marginBottom: responsiveHeight(2),
            }}>
            Workout Plans
          </Text>
          <View style={[CssStyle.flexData, {flexWrap: 'wrap'}]}>
            {workoutPlan.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate(item.nav)}
                style={{
                  width: responsiveWidth(24),
                  borderRadius: responsiveWidth(2),
                  backgroundColor: '#232441',
                  marginRight: responsiveWidth(2),
                  paddingVertical: responsiveHeight(0.6),
                  paddingHorizontal: responsiveWidth(1),
                  marginBottom: responsiveHeight(2),
                }}>
                <Text
                  style={{
                    fontFamily: 'Interstate-bold',
                    color: 'white',
                    fontSize: 12,
                    alignSelf: 'center',
                    opacity: 0.6,
                  }}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
