import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import {AppColors} from '../../Helping/AppColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Input from '../../component/Input';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/Icon3';
import {GetBeginner} from '../../services/WorkoutPlan';

const Beginner = ({navigation}) => {
  const dataFLex = [
    {item: 1},
    {item: 2},
    {item: 3},
    {item: 1},
    {item: 2},
    {item: 3},
    {item: 1},
    {item: 2},
    {item: 3},
    {item: 1},
    {item: 2},
    {item: 3},
  ];
  const [beginner, setBeginner] = useState([]);
  const BeginnerApi = async () => {
    try {
      const result = await GetBeginner();
      // console.log(result);
      if (result.status == true) {
        setBeginner(result.result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    BeginnerApi();
  }, []);
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View style={[CssStyle.flexJustify, {marginTop: responsiveHeight(3)}]}>
          <TouchableOpacity
            style={{marginLeft: responsiveWidth(-2)}}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={23} color={'#FF5100'} />
          </TouchableOpacity>
          <Input
            noIcon={true}
            style={{width: responsiveWidth(80)}}
            height={responsiveHeight(5)}
            placeholder={'SEARCH ...'}
            rightIcon="search"
            offIcon={'search'}
          />
        </View>
        <Text
          style={{
            fontFamily: 'Interstate-bold',
            color: 'white',
            fontSize: 35,
            marginVertical: responsiveHeight(2),
          }}>
          Beginner
        </Text>

        <View style={{marginTop: responsiveHeight(1)}}>
          <FlatList
            data={beginner}
            showsVerticalScrollIndicator={false}
            renderItem={({item, inde}) => (
              <View
                style={[
                  CssStyle.flexData,
                  {marginBottom: responsiveHeight(2)},
                ]}>
                <View style={{width: responsiveWidth(39)}}>
                  <Image
                    source={require('../../assets/Rectangle32.png')}
                    resizeMode="contain"
                    style={{
                      width: 130,
                      height: 130,
                      marginRight: responsiveWidth(2),
                    }}
                  />
                </View>
                <View style={{width: responsiveWidth(47)}}>
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
                    }}>
                    Lorem ipsum dolor sit emet , consectetur amet elitr dolor
                    sit emet , consectetur amet elitr dolor sit emet ,
                    consectetur amet elitr
                  </Text>
                  <View
                    style={[
                      CssStyle.flexJustify,
                      {width: responsiveWidth(45)},
                    ]}>
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
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Beginner;

const styles = StyleSheet.create({});
