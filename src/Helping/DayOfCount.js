import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CssStyle from '../StyleSheet/CssStyle';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from './AppColor';

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

export const DaysCounting = ({
  item,
  weeklyDaysTraining,
  index,
  selectItem,
  setSelectItem,
}) => {
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
      {!select ? (
        <TouchableOpacity
          onPress={() => {
            setSelect(true);
            addItem(item.day, index);
          }}
          style={{
            width: 40,
            height: 40,
            // borderWidth: 1,
            // borderColor:
            //   weeklyDaysTraining[index].day == [index - 1]
            //     ? AppColors.buttonText
            //     : 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveHeight(20),
            backgroundColor:
              weeklyDaysTraining[index+1].exersise_done == true
                ? AppColors.buttonText
                : 'transparent',
          }}>
          <Text style={{fontSize: 14, color: 'white'}} key={index}>
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
            width: 40,
            height: 40,
            borderWidth: 1,
            borderColor: select ? AppColors.buttonText : 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveHeight(20),
            backgroundColor: select ? AppColors.buttonText : 'transparent',
          }}>
          <Text style={{fontSize: 14, color: 'white'}} key={index}>
            {item.day}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};
