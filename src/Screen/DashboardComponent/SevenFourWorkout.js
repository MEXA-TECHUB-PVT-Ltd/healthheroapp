import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CssStyle from '../../StyleSheet/CssStyle';
import {AppColors} from '../../Helping/AppColor';
import CustomButton from '../../component/CustomButton';
import {GetSevenById} from '../../services/SevenFour';
import Logo from '../../assets/Icon3';
import Clock from '../../assets/Icon3';

const SevenFourWorkout = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  const dataFlatList = [
    {time: '00:35', number: 1},
    {time: '00:25', number: 2},
    {time: '00:59', number: 3},
    {time: '00:59', number: 4},
    {time: '00:59', number: 5},
  ];
  const [indexNumber, setIndex] = useState('');
  const [sevenByFourData, setSevenByFourData] = useState('');
  const GetSeven = async () => {
    try {
      const result = await GetSevenById(item.seven_by_four_challenge_id);
      console.log(result);
      if (result.status == true) {
        setSevenByFourData(result.result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetSeven();
  }, []);
  return (
    <View style={CssStyle.mainContainer}>
      <ImageBackground
        style={{width: responsiveWidth(100), height: responsiveHeight(30)}}
        source={require('../../assets/Rectangle32.png')}>
        <View
          style={[
            CssStyle.flexJustify,
            {
              paddingTop: responsiveHeight(2),
              paddingHorizontal: responsiveWidth(5),
            },
          ]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={27} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          paddingTop: responsiveHeight(3),
          backgroundColor: AppColors.blueColor,
          borderTopRightRadius: responsiveWidth(5),
          borderTopLeftRadius: responsiveWidth(5),
          marginTop: responsiveHeight(-3),
          paddingBottom: responsiveHeight(3),
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontFamily: 'Interstate-bold',
            fontSize: 19,
          }}>
          Day 1
        </Text>
        <View
          style={[
            CssStyle.flexJustify,
            {
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: responsiveWidth(10),
              paddingVertical: responsiveHeight(1.8),
              paddingHorizontal: responsiveWidth(17),
              marginVertical: responsiveHeight(3),
            },
          ]}>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            16 {'  '}
            <Text style={{color: 'white'}}>workouts</Text>
          </Text>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            20{'   '}
            <Text style={{color: 'white'}}>minutes</Text>
          </Text>
        </View>
        <FlatList
          data={dataFlatList}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ExerciseDetail', {item: item})
              }
              style={[
                CssStyle.flexData,
                {
                  // width: responsiveWidth(50),
                  marginBottom: responsiveHeight(2),
                  marginRight: responsiveWidth(7),
                },
              ]}>
              <Image
                borderRadius={responsiveWidth(2)}
                source={require('../../assets/Rectangle32.png')}
                style={{
                  width: responsiveWidth(19),
                  height: responsiveHeight(9),
                  marginRight: responsiveWidth(4),
                }}
                resizeMode="contain"
              />
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontFamily: 'Interstate-regular',
                    marginVertical: responsiveHeight(0.6),
                    paddingTop: responsiveHeight(1),
                  }}>
                  Yoga Exercise
                </Text>
                <View
                  style={[CssStyle.flexJustify, {width: responsiveWidth(40)}]}>
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
                      }}>
                      400 kcal
                    </Text>
                  </View>
                  <View
                    style={[
                      CssStyle.flexData,
                      {marginVertical: responsiveHeight(1)},
                    ]}>
                    <Clock width={16} height={16} />
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                        fontSize: 12,
                        marginLeft: responsiveWidth(2),
                      }}>
                      45 sec
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <View
          style={{
            position: 'absolute',
            top: responsiveHeight(60),
            width: responsiveWidth(90),
            left: responsiveWidth(5),
          }}>
          <CustomButton
            onPress={() => navigation.navigate('StartExercise')}
            buttonText={'Get Started'}
            fontWeight="500"
            style={{}}
          />
        </View>
      </View>
    </View>
  );
};

export default SevenFourWorkout;

const styles = StyleSheet.create({});
