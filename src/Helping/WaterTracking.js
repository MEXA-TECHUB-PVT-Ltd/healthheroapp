import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import Glass from '../assets/redGlas';
import Bottle from '../assets/water';
import FillGlass from '../assets/glass-of-water';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';

export const WaterTracking = ({
  index,
  waterData,
  clicked,
  onPress,
  weeklyWaterData,
  getDailyRecordTracker,
}) => {
  // for (let n = 0; n < getDailyRecordTracker.quantity; n++) {
  //   data.push({itemValue: n});
  // }
  console.log(getDailyRecordTracker?.quantity, 'quantity of number');
  return (
    <TouchableOpacity
      disabled={index + 1 <= getDailyRecordTracker?.quantity ? true : false}
      style={{paddingVertical: responsiveHeight(0.8)}}
      onPress={onPress}>
      {waterData?.measure == 'bottle' ? (
        index + 1 <= getDailyRecordTracker?.quantity ? (
          <Image
            resizeMode="contain"
            source={require('../assets/waterRed.png')}
            style={{width: 35, height: 35}}
          />
        ) : (
          <Bottle width={36} height={36} />
        )
      ) : index + 1 <= getDailyRecordTracker?.quantity ? (
        <Glass width={36} height={36} />
      ) : (
        <FillGlass width={36} height={36} />
      )}
    </TouchableOpacity>
  );
};

export const GetWaterTracker = ({index, waterData, clicked, onPress}) => {
  const [data, setData] = useState(false);
  return (
    <TouchableOpacity
      style={{paddingVertical: responsiveHeight(0.8)}}
      onPress={onPress}>
      {/* {index == waterData?.quantity || data ? ( */}
      {/* {data ? ( */}
      <Glass width={36} height={36} />
      {/* ) : waterData?.measure == 'bottle' ? ( */}
      <Bottle width={36} height={36} />
      {/* ) : ( */}
      <FillGlass width={36} height={36} />
      {/* )} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
