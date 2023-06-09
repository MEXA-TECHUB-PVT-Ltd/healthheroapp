import {StyleSheet, Text, View} from 'react-native';
import React, { memo } from 'react';
import { RulerPicker } from 'react-native-ruler-picker';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const Ruler = ({weightData,setWeightValue,}) => {
  return (
    <RulerPicker
      min={0}
      max={110}
      step={1}
      fractionDigits={0}
    //   initialValue={50}
      gapBetweenSteps={5}
      indicatorColor="#FF5100"
      longStepColor="#FF5100"
      indicatorHeight={75}
      longStepHeight={70}
      shortStepHeight={20}
      stepWidth={3}
      unitTextStyle={{color: 'white', fontSize: responsiveFontSize(2)}}
      valueTextStyle={{
        color: 'white',
        fontSize: responsiveFontSize(6),
      }}
      // onValueChange={number => console.log(number)}
      height={responsiveHeight(38)}
      onValueChangeEnd={number => setWeightValue(number)}
      unit={weightData}
    />
  );
};

export default memo(Ruler);

const styles = StyleSheet.create({});
