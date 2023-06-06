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
  // console.log(findDay,'sfs');
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

  // console.log(ChangeToDayName, 'hello si');
  const filteredArray = weeklyDaysTraining?.filter(
    obj => typeof obj === 'object',
  );

  for (let i = 0; i < filteredArray?.length; i++) {
    const element = filteredArray[i];
    if (element.day == 1) {
      element.dayName = 'Mon';
    }
    if (element.day == 2) {
      element.dayName = 'Tue';
    }
    if (element.day == 3) {
      element.dayName = 'Wed';
    }
    if (element.day == 4) {
      element.dayName = 'Thu';
    }
    if (element.day == 5) {
      element.dayName = 'Fri';
    }
    if (element.day == 6) {
      element.dayName = 'Sat';
    }
    if (element.day == 7) {
      element.dayName = 'Sun';
    }
  }
  // console.log(filteredArray);
  const findValue = filteredArray?.filter(data => data.exersise_done);
  // console.log(findValue, 'sdfjs');
  // const ChangeToDayName =
  //   filteredArray[index].day == 1
  //     ? 'Mon'
  //     : filteredArray[index].day == 2
  //     ? 'Tue'
  //     : filteredArray[index].day == 3
  //     ? 'Wed'
  //     : filteredArray[index].day == 4
  //     ? 'Thu'
  //     : filteredArray[index].day == 5
  //     ? 'Fri'
  //     : filteredArray[index].day == 6
  //     ? 'Sat'
  //     : filteredArray[index].day == 7
  //     ? 'Sun'
  //     : '';
  // console.log(ChangeToDayName, 'last finall');
  // console.log(filteredArray, 'ur data');
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
          // backgroundColor:
          // findDay &&
          // (findDay[0]?.day == index + 1 ||
          //   findDay[1]?.day == index + 1 ||
          //   findDay[2]?.day == index + 1 ||
          //   findDay[3]?.day == index + 1 ||
          //   findDay[4]?.day == index + 1 ||
          //   findDay[5]?.day == index + 1 ||
          //   findDay[6]?.day == index + 1)
          //   ? AppColors.buttonText
          //   : 'transparent',
          backgroundColor:
            findValue &&
            (findValue[0]?.dayName == item ||
              findValue[1]?.dayName == item ||
              findValue[2]?.dayName == item ||
              findValue[3]?.dayName == item ||
              findValue[4]?.dayName == item ||
              findValue[5]?.dayName == item ||
              findValue[6]?.dayName == item)
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
