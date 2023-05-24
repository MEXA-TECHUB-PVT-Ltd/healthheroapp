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
import Clock from '../../assets/Icon';
import {BaseUrl} from '../../Helping/BaseUrl';
import {useSelector} from 'react-redux';
import {GetCountDownApi} from '../../services/CountDownApi';

const SevenFourWorkout = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item.exercises, 'param');
  const [sevenByFourData, setSevenByFourData] = useState('');
  const id = useSelector(data => data.id);
  const [loading, setLoading] = useState(false);
  
  const GetCategory = async () => {
    setLoading(true);
    try {
      const result = await GetCountDownApi(id);
      console.log(result);
      if (result.status == true) {
        setSevenByFourData(result.result.time);
        setLoading(false);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    GetCategory();
  }, []);
  // const GetSeven = async () => {
  //   try {
  //     const result = await GetSevenById(item.seven_by_four_challenge_id);
  //     console.log(result);
  //     if (result.status == true) {
  //       setSevenByFourData(result.result);
  //     } else {
  //       console.error(result.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   GetSeven();
  // }, []);
  return (
    <View style={CssStyle.mainContainer}>
      <ImageBackground
        style={{width: responsiveWidth(100), height: responsiveHeight(30)}}
        source={{uri: `${BaseUrl}` + item.image}}>
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
          flex: 1,
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            fontFamily: 'Interstate-bold',
            fontSize: 19,
          }}>
          Day {item.day}
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
            {item?.exercises?.length} {'  '}
            <Text style={{color: 'white'}}>workouts</Text>
          </Text>
          <Text style={{color: '#FF5100', fontFamily: 'Interstate-regular'}}>
            {item?.exercises ? item?.exercises[0]?.time : 20}
            {'   '}
            <Text style={{color: 'white'}}>minutes</Text>
          </Text>
        </View>
        <FlatList
          data={item.exercises}
          renderItem={({item, index}) => {
            return (
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
                  source={{uri: `${BaseUrl}` + item.video_link}}
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
                    {item.title}
                  </Text>
                  <View
                    style={[
                      CssStyle.flexJustify,
                      {width: responsiveWidth(40)},
                    ]}>
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
            );
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: responsiveHeight(60),
            width: responsiveWidth(90),
            left: responsiveWidth(5),
          }}>
          <CustomButton
            onPress={() =>
              navigation.navigate('StartExercise', {
                item: {item, sevenByFourData},
              })
            }
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
