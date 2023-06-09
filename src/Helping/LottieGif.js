import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import assets from '../assets';

const LottieGif = () => {
  return (
    <View
      // activeOpacity={1}
      style={{
        // height: wp(28),
        width: 125,
        // backgroundColor: 'red',
        aspectRatio: 1,
        alignSelf: 'center',
      }}>
      <Lottie
        source={assets.loader}
        autoPlay
        loop={true}
        resizeMode="cover"
        speed={1}
        // style={{width}}
        colorFilter={[{color: 'red'}]}
      />
    </View>
  );
};

export default LottieGif;

const styles = StyleSheet.create({});
