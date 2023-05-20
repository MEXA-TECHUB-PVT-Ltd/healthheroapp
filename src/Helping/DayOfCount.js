import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CssStyle from '../StyleSheet/CssStyle';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from './AppColor';

const DayOfCount = () => {
  const dayDataActive = [
    {day: 'S'},
    {day: 'M'},
    {day: 'W'},
    {day: 'Th'},
    {day: 'F'},
    {day: 'S '},
  ];
  const [selectItem, setSelectItem] = useState('');
  return (
    <View
      style={[
        // CssStyle.flexJustify,
        {
          marginBottom: responsiveHeight(2.9),
          borderRadius: 8,
          paddingHorizontal: responsiveWidth(5),
          paddingVertical: responsiveHeight(2),
          marginTop: responsiveHeight(0.8),
          backgroundColor: '#62637790',
        },
      ]}>
      <Text
        style={{
          fontSize: 12,
          color: 'white',
          marginBottom: responsiveHeight(2),
        }}>
        Every {selectItem}
      </Text>
      <View style={CssStyle.flexJustify}>
        {dayDataActive.map((item, index) => (
          <TouchableOpacity
            onPress={() => setSelectItem(item.day)}
            style={{
              width: 40,
              height: 40,
              borderWidth: 1,
              borderColor:
                item.day == selectItem ? AppColors.buttonText : 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: responsiveHeight(20),
            }}>
            <Text style={{fontSize: 21, color: 'white'}} key={index}>
              {item.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DayOfCount;

const styles = StyleSheet.create({});
