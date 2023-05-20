import {
  FlatList,
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

const StartNow = ({navigation, route}) => {
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
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '500',
            marginBottom: responsiveHeight(3),
            fontFamily: 'Interstate-bold',
            fontSize: 19,
          }}>
          7 x 4 Challenges
        </Text>
        <View style={[CssStyle.flexJustify]}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontFamily: 'Interstate-regular',
              fontSize: 12,
            }}>
            20 days left
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontFamily: 'Interstate-regular',
              fontSize: 12,
            }}>
            20%
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#626377',
            width: responsiveWidth(90),
            marginBottom: responsiveHeight(4),
            borderRadius: responsiveWidth(40),
            marginTop: responsiveWidth(2),
          }}>
          <View
            style={{
              width: responsiveWidth(30),
              backgroundColor: AppColors.buttonText,
              borderRadius: responsiveWidth(20),
              height: responsiveHeight(0.9),
            }}
          />
        </View>
        <FlatList
          data={dataFlatList}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                backgroundColor: '#626377',
                marginBottom: responsiveHeight(3),
                borderRadius: responsiveWidth(3),
                paddingHorizontal: responsiveWidth(4),
              }}>
              <View
                style={[
                  CssStyle.flexJustify,
                  {
                    paddingTop: responsiveHeight(1),
                    // paddingBottom: responsiveHeight(0.6),
                  },
                ]}>
                <Text
                  style={{
                    // marginLeft: responsiveWidth(3),
                    color: 'white',
                    fontFamily: 'Interstate-bold',
                    fontSize: 16,
                  }}>
                  Week {item.number}
                </Text>
                <Text
                  style={{
                    // marginLeft: responsiveWidth(3),
                    color: 'white',
                    fontSize: 13,
                  }}>
                  1/7
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  marginVertical: responsiveHeight(1),
                  borderRadius: responsiveWidth(2),
                }}>
                <View
                  style={[
                    CssStyle.flexJustify,
                    {
                      paddingVertical: responsiveHeight(1.8),
                    },
                  ]}>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('SevenFourWorkout')}
                    style={{
                      width: 29,
                      height: 29,
                      borderRadius: responsiveHeight(30),
                      backgroundColor: '#78798A',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'white', fontSize: 11}}>1</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: responsiveWidth(5.1),
                      height: 1,
                      justifyContent: 'center',
                    }}
                  />
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('SevenFourWorkout')}
                    style={{
                      width: 29,
                      height: 29,
                      borderRadius: responsiveHeight(30),
                      backgroundColor: '#78798A',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'white', fontSize: 11}}>2</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: responsiveWidth(5.1),
                      height: 1,
                      justifyContent: 'center',
                    }}
                  />
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('SevenFourWorkout')}
                    style={{
                      width: 29,
                      height: 29,
                      borderRadius: responsiveHeight(30),
                      backgroundColor: '#78798A',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {/* {index == indexNumber ? ( */}
                    <Text style={{color: 'white', fontSize: 11}}>1</Text>
                    {/* ) : null} */}
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: responsiveWidth(5.1),
                      height: 1,
                      justifyContent: 'center',
                    }}
                  />
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('SevenFourWorkout')}
                    style={{
                      width: 29,
                      height: 29,
                      borderRadius: responsiveHeight(30),
                      backgroundColor: '#78798A',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {/* {index == indexNumber ? ( */}
                    <Text style={{color: 'white', fontSize: 11}}>1</Text>
                    {/* ) : null} */}
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: responsiveWidth(5.1),
                      height: 1,
                      justifyContent: 'center',
                    }}
                  />
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('SevenFourWorkout')}
                    style={{
                      width: 29,
                      height: 29,
                      borderRadius: responsiveHeight(30),
                      backgroundColor: '#78798A',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {/* {index == indexNumber ? ( */}
                    <Text style={{color: 'white', fontSize: 11}}>1</Text>
                    {/* ) : null} */}
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: responsiveWidth(5.1),
                      height: 1,
                      justifyContent: 'center',
                    }}
                  />
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('SevenFourWorkout')}
                    style={{
                      width: 29,
                      height: 29,
                      borderRadius: responsiveHeight(30),
                      backgroundColor: '#78798A',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {/* {index == indexNumber ? ( */}
                    <Text style={{color: 'white', fontSize: 11}}>1</Text>
                    {/* ) : null} */}
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: responsiveWidth(5.1),
                      height: 1,
                      justifyContent: 'center',
                    }}
                  />
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('SevenFourWorkout')}
                    style={{
                      width: 29,
                      height: 29,
                      borderRadius: responsiveHeight(30),
                      backgroundColor: '#78798A',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {/* {index == indexNumber ? ( */}
                    <Text style={{color: 'white', fontSize: 11}}>1</Text>
                    {/* ) : null} */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
            onPress={() => navigation.navigate('WorkoutExercise')}
            buttonText={'Go!'}
            fontWeight="500"
            style={{}}
          />
        </View>
      </View>
    </View>
  );
};

export default StartNow;

const styles = StyleSheet.create({});
