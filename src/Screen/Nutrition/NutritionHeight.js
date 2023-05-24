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

const NutritionHeight = ({navigation, route}) => {
  const {item, updateData} = route.params ? route.params : '';
  console.log(updateData);
  const weightUnitData = [{text: 'cm'}, {text: 'in'}];
  const [weightData, setWeightData] = useState('in');
  const [heightValue, setHeightValue] = useState();
  const [activeIndex, setActiveIndex] = useState(
    updateData ? updateData.height : 55,
  );
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
          <View style={{flex: 0.4, marginTop: responsiveHeight(6)}}>
            <Text
              style={{
                color: 'white',
                fontSize: responsiveFontSize(4.7),
                marginBottom: responsiveHeight(2),
                fontFamily: 'Interstate-bold',
                marginLeft: responsiveWidth(1),
                width: responsiveWidth(90),
                lineHeight: responsiveHeight(6),
              }}>
              Current Height
            </Text>
            <Text
              style={{
                width: responsiveWidth(86),
                color: 'white',
                lineHeight: responsiveHeight(3),
                fontSize: 13,
                fontWeight: '400',
                opacity: 0.8,
              }}>
              Track your progress by entering your current weight, allowing us
              to monitor your achievements and help you stay on track towards
              your fitness goals
            </Text>
          </View>
          <View>
            <View
              style={[CssStyle.flexJustify, {marginTop: responsiveHeight(11)}]}>
              {weightUnitData.map((item, index) => (
                <CustomButton
                  key={index}
                  buttonText={item.text}
                  onPress={() => setWeightData(item.text)}
                  style={{width: responsiveWidth(42)}}
                  styleText={{textTransform: 'uppercase'}}
                  mode={weightData == item.text ? '' : 'outlined'}
                  borderColor={weightData == item.text ? '' : 'white'}
                  buttonColor={weightData == item.text ? '' : 'transparent'}
                />
              ))}
            </View>
            <RulerPicker
              min={0}
              max={110}
              step={1}
              fractionDigits={0}
              initialValue={activeIndex}
              gapBetweenSteps={5}
              indicatorColor="#FF5100"
              longStepColor="#FF5100"
              indicatorHeight={75}
              longStepHeight={70}
              shortStepHeight={20}
              stepWidth={3}
              unitTextStyle={{
                color: 'white',
                fontSize: responsiveFontSize(2),
              }}
              valueTextStyle={{
                color: 'white',
                fontSize: responsiveFontSize(6),
              }}
              // onValueChange={number => console.log(number)}
              height={responsiveHeight(38)}
              onValueChangeEnd={number => setHeightValue(number)}
              unit={weightData}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#0B183C',
          }}>
          <View
            style={{
              bottom: responsiveHeight(16.7),
              left: responsiveWidth(11),
              position: 'absolute',
            }}>
            <CustomButton
              onPress={() => {
                heightValue
                  ? navigation.navigate('ActiveAge', {
                      item: {item, heightValue},
                      updateData,
                    })
                  : ToastAndroid.show(
                      'Please select the current height',
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

export default NutritionHeight;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
