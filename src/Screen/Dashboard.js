import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CssStyle from '../StyleSheet/CssStyle';
import {AppColors} from '../Helping/AppColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Input from '../component/Input';
import Logo from '../assets/Icon3';
import CustomButton from '../component/CustomButton';

const Dashboard = ({navigation}) => {
  const dataGym = [
    {image: require('../assets/second.png')},
    {image: require('../assets/third.png')},
    {image: require('../assets/first.png')},
  ];
  return (
    <ScrollView
      style={[
        CssStyle.mainContainer,
        {
          backgroundColor: AppColors.blueColor,
        },
      ]}>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View style={[CssStyle.flexJustify, {marginTop: responsiveHeight(4)}]}>
          <View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-bold',
                fontSize: 22,
              }}>
              Hi, Dominic
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-regular',
                fontSize: 12,
                marginVertical: responsiveHeight(2),
              }}>
              Today, Oct 14, 2022
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-regular',
                fontSize: 12,
              }}>
              Suitable for indoor activities
            </Text>
          </View>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Interstate-bold',
              fontSize: 30,
            }}>
            30°C
          </Text>
        </View>
        <Input
          noIcon={true}
          height={responsiveHeight(5)}
          placeholder={'SEARCH WORKOUT'}
          rightIcon="search"
        />
        <View
          style={[
            CssStyle.flexData,
            {
              backgroundColor: '#FF5100',
              borderRadius: responsiveWidth(3),
              paddingHorizontal: responsiveWidth(3),
              paddingVertical: responsiveHeight(2.7),
              marginTop: responsiveHeight(1.8),
            },
          ]}>
          <View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-bold',
                fontSize: 50,
              }}>
              7 X 4
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-bold',
                fontSize: 30,
              }}>
              Challenge
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-regular',
                width: responsiveWidth(30),
                lineHeight: responsiveHeight(2.5),
              }}>
              Lorem ipsum dolor sit amet, consetute sadipcing
            </Text>
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
                {
                  overflow: 'visible',
                },
              ]}>
              <Logo width={16} height={16} />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  marginLeft: responsiveWidth(2),
                  fontSize: 12,
                }}>
                45 min
              </Text>
            </View>
            <TouchableOpacity
              style={{
                borderRadius: responsiveWidth(2),
                backgroundColor: 'white',
                alignItems: 'center',
                paddingVertical: responsiveHeight(1),
                width: responsiveWidth(25),
                marginTop: responsiveHeight(1.4),
              }}>
              <Text style={{color: '#FF5100'}}>Start Now</Text>
            </TouchableOpacity>
          </View>
          <View style={{position: 'relative'}}>
            <Image
              resizeMode="contain"
              source={require('../assets/Image7.png')}
              style={{
                width: responsiveHeight(33.4),
                height: responsiveHeight(43.4),
                marginVertical: responsiveWidth(-2),
                position: 'absolute',
                bottom: responsiveHeight(-19.7),
                left: responsiveWidth(-10),
              }}
            />
          </View>
        </View>
        <View
          style={[CssStyle.flexJustify, {marginVertical: responsiveHeight(2)}]}>
          <Text
            style={{
              fontFamily: 'Interstate-bold',
              color: 'white',
              fontSize: 37,
            }}>
            Beginner
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                color: AppColors.buttonText,
                fontFamily: 'Interstate-regular',
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={dataGym}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              style={{marginRight: responsiveWidth(5), alignItems: 'center'}}>
              <Image
                borderRadius={responsiveWidth(2)}
                source={item.image}
                style={{
                  width: responsiveWidth(34),
                  height: responsiveHeight(15),
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontFamily: 'Interstate-regular',
                }}>
                Yoga exercise
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontFamily: 'Interstate-regular',
                }}>
                21 min | 400 k
              </Text>
            </View>
          )}
        />
        <View
          style={[CssStyle.flexJustify, {marginVertical: responsiveHeight(2)}]}>
          <Text
            style={{
              fontFamily: 'Interstate-bold',
              color: 'white',
              fontSize: 37,
            }}>
            Intermediate
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                color: AppColors.buttonText,
                fontFamily: 'Interstate-regular',
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={dataGym}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              style={{marginRight: responsiveWidth(5), alignItems: 'center'}}>
              <Image
                borderRadius={responsiveWidth(2)}
                source={item.image}
                style={{
                  width: responsiveWidth(34),
                  height: responsiveHeight(15),
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontFamily: 'Interstate-regular',
                }}>
                Yoga exercise
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontFamily: 'Interstate-regular',
                }}>
                21 min | 400 k
              </Text>
            </View>
          )}
        />
        <View
          style={[CssStyle.flexJustify, {marginVertical: responsiveHeight(2)}]}>
          <Text
            style={{
              fontFamily: 'Interstate-bold',
              color: 'white',
              fontSize: 37,
            }}>
            Advance
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                color: AppColors.buttonText,
                fontFamily: 'Interstate-regular',
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={dataGym}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              style={{marginRight: responsiveWidth(5), alignItems: 'center'}}>
              <Image
                borderRadius={responsiveWidth(2)}
                source={item.image}
                style={{
                  width: responsiveWidth(34),
                  height: responsiveHeight(15),
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontFamily: 'Interstate-regular',
                }}>
                Yoga exercise
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontFamily: 'Interstate-regular',
                }}>
                21 min | 400 k
              </Text>
            </View>
          )}
        />
        <View
          style={{marginVertical: responsiveHeight(2), alignItems: 'center'}}>
          <CustomButton
            buttonText={'Explore More'}
            mode="outlined"
            style={{width: responsiveWidth(70)}}
            buttonColor={'transparent'}
            colorText="white"
            onPress={() => navigation.navigate('Search')}
            borderColor={'#FF5100'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
