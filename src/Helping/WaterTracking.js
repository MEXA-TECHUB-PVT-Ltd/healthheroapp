import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import Glass from '../assets/redGlas';
import Bottle from '../assets/water';
import FillGlass from '../assets/glass-of-water';

const WaterTracking = ({index, waterData, clicked,onPress}) => {
  const [data, setData] = useState(false);
  return (
    <TouchableOpacity
      onPress={onPress}>
      {/* {index == waterData?.quantity || data ? ( */}
      {data ? (
        <Glass width={30} height={30} />
      ) : waterData?.measure == 'bottle' ? (
        <Bottle width={30} height={30} />
      ) : (
        <FillGlass width={30} height={30} />
      )}
    </TouchableOpacity>
  );
};

export default WaterTracking;

const styles = StyleSheet.create({});
