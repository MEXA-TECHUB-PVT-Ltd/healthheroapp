import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CssStyle from '../StyleSheet/CssStyle';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from './AppColor';
import moment from 'moment';

export const DayOfCount = ({item, index, selectItem, setSelectItem}) => {
  const arrayData = selectItem.map((item, index) => item.item);

  const addItem = (num, id) => {
    selectItem.push({
      item: num,
      id: id,
    });
    setSelect([...selectItem]);
  };
  const deleteItem = id => {
    const result = selectItem?.filter((item, index) => {
      return item.item !== id;
    });
    setSelectItem([...result]);
  };
  const [select, setSelect] = useState(false);
  return (
    <>
      <View style={{position: 'absolute', top: responsiveHeight(-0.9)}}>
        <Text
          style={{
            fontSize: 13,
            color: 'white',
            marginBottom: responsiveHeight(2),
            letterSpacing: 0.9,
          }}>
          Every{' '}
          {selectItem.map((item, index) => (
            <Text key={index} style={{fontSize: 12, color: '#ffffffc1'}}>
              {item.item} ,
            </Text>
          ))}
        </Text>
      </View>
      {!select ? (
        <TouchableOpacity
          onPress={() => {
            setSelect(true);
            addItem(item.day, index);
          }}
          style={{
            width: 35,
            height: 35,
            borderWidth: 1,
            borderColor: select ? AppColors.buttonText : 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveHeight(20),
          }}>
          <Text style={{fontSize: 18, color: 'white'}} key={index}>
            {item.day}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setSelect(false);
            deleteItem(item.day);
          }}
          style={{
            width: 35,
            height: 35,
            borderWidth: 1,
            borderColor: select ? AppColors.buttonText : 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveHeight(20),
          }}>
          <Text style={{fontSize: 18, color: 'white'}} key={index}>
            {item.day}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export const DaysCounting = ({item, weeklyDaysTraining, index}) => {
  // console.log(weeklyDaysTraining[index == 0 ? 0 : index + 2], index, 'hello');
  const findWeek =
    weeklyDaysTraining &&
    weeklyDaysTraining?.filter(index => index.exersise_done);
  // console.log(findWeek, 'finding weeek');
  const findDay = weeklyDaysTraining && findWeek?.filter(data => data.day);
  // console.log(weeklyDaysTraining, 'this is smith');
  // const findTrueDay =
  //   weeklyDaysTraining && weeklyDaysTraining[index].day == index + 1;
  // console.log(
  //   findDay[index],
  //   findDay[index]?.day == index+2 ? 'okai' : 'no',
  //   'old data',
  //   index + 1,
  // );
  // console.log(moment(new Date()).format('dddd'));
  return (
    <>
      {/* {!select ? ( */}
      <View
        style={{
          width: 40,
          height: 40,
          borderWidth: 1,
          borderColor:
            moment(new Date()).format('dddd').slice(0, 3) == item
              ? AppColors.buttonText
              : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: responsiveHeight(20),
          backgroundColor:
            findDay &&
            (findDay[0]?.day == index + 1 ||
              findDay[1]?.day == index + 1 ||
              findDay[2]?.day == index + 1 ||
              findDay[3]?.day == index + 1 ||
              findDay[4]?.day == index + 1 ||
              findDay[5]?.day == index + 1 ||
              findDay[6]?.day == index + 1)
              ? AppColors.buttonText
              : 'transparent',
        }}>
        <Text style={{fontSize: 14, color: 'white'}} key={index}>
          {item}
        </Text>
        {moment(new Date()).format('dddd').slice(0, 3) == item && (
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 10,
              backgroundColor: 'white',
            }}
          />
        )}
      </View>
    </>
  );
};
