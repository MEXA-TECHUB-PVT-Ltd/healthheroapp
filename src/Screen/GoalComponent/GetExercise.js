import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from '../../Helping/AppColor';
import {Countdown} from 'react-native-element-timer';
import ProgressCircle from 'react-native-progress-circle';
import Logo from '../../assets/Icon3';
import CustomButton from '../../component/CustomButton';

const GetExercise = ({navigation, route}) => {
  const countdownRef = useRef();
  const [completedModel, setCompletedModel] = useState(false);
  return (
    <ScrollView style={[CssStyle.mainContainer, {}]}>
      <ImageBackground
        // resizeMode="contain"
        style={{width: responsiveWidth(100), height: responsiveHeight(40)}}
        source={
          completedModel
            ? require('../../assets/Rectangle33.png')
            : require('../../assets/Rectangle32.png')
        }>
        <TouchableOpacity
          style={{
            marginLeft: responsiveWidth(3),
            paddingTop: responsiveHeight(3),
          }}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={25} color={'white'} />
        </TouchableOpacity>
      </ImageBackground>
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.blueColor,
          borderTopLeftRadius: responsiveWidth(5),
          borderTopRightRadius: responsiveWidth(5),
          paddingHorizontal: responsiveWidth(6),
          marginTop: responsiveHeight(-3),
          paddingTop: responsiveHeight(5),
        }}>
        <Text style={[styles.signInText]}>
          {completedModel ? 'Yoga' : ' Puss Press'}
        </Text>
        <View
          style={[
            CssStyle.flexJustify,
            {
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: responsiveWidth(10),
              paddingVertical: responsiveHeight(1.8),
              paddingHorizontal: responsiveWidth(8),
              marginTop: responsiveHeight(3.6),
            },
          ]}>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            16 <Text style={{color: 'white'}}>moves</Text>
          </Text>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-bold'}}>
            Beginner
          </Text>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            {completedModel ? '25' : '30'}{' '}
            <Text style={{color: 'white'}}>sec</Text>
          </Text>
        </View>
        <View
          style={[CssStyle.flexJustify, {marginTop: responsiveHeight(5.4)}]}>
          {/* <Text style={styles.watchTime}>00:{<Countdown ref={countdownRef} style={styles.timer} textStyle={styles.watchTime} initialSeconds={30} onTimes={(e) => {}} onPause={(e) => {}} onEnd={(e) => navigation.navigate("Rest")} />}</Text> */}
          <TouchableOpacity
            style={{
              backgroundColor: '#FF510050',
              borderRadius: responsiveHeight(10),
              width: 39,
              height: 39,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() =>
              completedModel
                ? setCompletedModel(false)
                : navigation.navigate('ExerciseDetail')
            }>
            <Icon
              name="chevron-back-outline"
              size={29}
              color={AppColors.buttonText}
            />
          </TouchableOpacity>
          <ProgressCircle
            percent={30 * 3.34}
            radius={60}
            borderWidth={4}
            // outerCircleStyle={{backgroundColor: 'yellow', aspectRatio: 1,}}
            // outerCircleStyle
            color={'#FF7B27'}
            shadowColor="#C6C6C6"
            bgColor={AppColors.blueColor}>
            <View style={CssStyle.flexData}>
              {/* <Text style={styles.watchTime}></Text> */}
              <Countdown
                ref={countdownRef}
                style={styles.timer}
                textStyle={styles.watchTime}
                initialSeconds={completedModel ? 6 : 30}
                onTimes={e => {
                  //   setDataNumber(e);
                }}
                onPause={e => {}}
                onEnd={
                  e => {}
                  //   e == 0
                  // ? navigation.navigate('Completed')
                  // : console.log(e, 'end')
                }
              />
            </View>
            {/* } */}
            {/* </Text> */}
          </ProgressCircle>
          {completedModel ? (
            <Text style={{marginLeft: responsiveWidth(9)}}></Text>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: '#FF510050',
                borderRadius: responsiveHeight(10),
                width: 39,
                height: 39,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setCompletedModel(true)}>
              <Icon
                name="chevron-forward-outline"
                size={29}
                color={AppColors.buttonText}
              />
            </TouchableOpacity>
          )}
        </View>
        {completedModel ? (
          <View
            style={{
              alignItems: 'center',
              marginVertical: responsiveHeight(6),
              paddingBottom: responsiveHeight(7),
            }}>
            <CustomButton
              onPress={() => navigation.navigate('Focused')}
              activeOpacity={1}
              buttonColor={AppColors.buttonText}
              paddingVertical={3}
              style={{width: responsiveWidth(80)}}
              iconName="checkmark"
              iconColor={'white'}
              buttonText={'Complete Workout'}
            />
          </View>
        ) : (
          <View style={{marginTop: responsiveHeight(6)}}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-regular',
                fontSize: 17,
                marginBottom: responsiveHeight(2),
              }}>
              Next Exercise
            </Text>
            <View
              style={[CssStyle.flexData, {marginBottom: responsiveHeight(2)}]}>
              <View style={{width: responsiveWidth(29)}}>
                <Image
                  source={require('../../assets/Rectangle33.png')}
                  resizeMode="contain"
                  style={{
                    width: 99,
                    height: 90,
                    //   marginRight: responsiveWidth(2),
                  }}
                />
              </View>
              <View style={{width: responsiveWidth(53)}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    fontFamily: 'Interstate-regular',
                    opacity: 0.8,
                  }}>
                  Yoga Exercise
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 11,
                    fontFamily: 'Interstate-regular',
                    marginVertical: responsiveHeight(0.7),
                    opacity: 0.5,
                    lineHeight: responsiveHeight(2),
                  }}>
                  Lorem ipsum dolor sit emet , consectetur amet elitr dolor sit,
                  emit as
                </Text>
                <View
                  style={[CssStyle.flexJustify, {width: responsiveWidth(45)}]}>
                  <View
                    style={[
                      CssStyle.flexData,
                      {marginVertical: responsiveHeight(0.6)},
                    ]}>
                    <Logo width={16} height={16} />
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                        fontSize: 12,
                        marginLeft: responsiveWidth(2),
                        opacity: 0.5,
                      }}>
                      400 kcal
                    </Text>
                  </View>
                  <View
                    style={[
                      CssStyle.flexData,
                      {marginVertical: responsiveHeight(1)},
                    ]}>
                    <Logo width={16} height={16} />
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                        fontSize: 12,
                        marginLeft: responsiveWidth(2),
                        opacity: 0.5,
                      }}>
                      45 min
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default GetExercise;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: responsiveFontSize(5),
    alignSelf: 'center',
  },
  armText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: responsiveWidth(2),
    textTransform: 'uppercase',
  },
  watchTime: {
    color: 'white',
    fontSize: responsiveWidth(6),
    fontWeight: 'bold',
  },
  timer: {
    // marginVertical: 10,
  },
});
