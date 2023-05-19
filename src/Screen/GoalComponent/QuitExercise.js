import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../Helping/AppColor';

const QuitExercise = ({navigation}) => {
  const quitExerciseData = [
    {text: 'Just take a look'},
    {text: 'Too hard'},
    {text: `Don't know how to do it`},
    {text: `Quit`},
  ];
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      imageStyle={{paddingTop: responsiveHeight(3),}}
      //   resizeMode="contain"
      source={require('../../assets/Health-Hero/backgroundOther.png')}>
      <LinearGradient
        colors={['#0B183C00', '#0B183Ce1']}
        start={{x: 1, y: 0.1}}
        end={{x: 1, y: 0.5}}
        style={{
          paddingHorizontal: responsiveWidth(2),
          flex: 1,
        }}>
        <View style={{flex: 0.27}} />
        <View style={{alignItems: 'center', flex: 0.56}}>
          <Text
            style={[
              styles.signInText,
              {
                marginTop: responsiveHeight(4.7),
              },
            ]}>
            Quit Exercise
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          {quitExerciseData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.buttonGender,
                {
                  backgroundColor: '#626377b1',
                  width: responsiveWidth(90),
                },
              ]}
              onPress={() => {navigation.navigate('WorkoutDetail')}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-bold',
                }}>
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default QuitExercise;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: responsiveFontSize(5),
  },
  buttonGender: {
    paddingVertical: responsiveHeight(2.6),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveHeight(1),
    // flexDirection: "row",
    alignItems: 'center',
    marginBottom: responsiveHeight(3.7),
    width: responsiveWidth(85),
  },
});
