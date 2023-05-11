import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import {AppColors} from '../../Helping/AppColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../../component/Input';

const Intermediate = ({navigation}) => {
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
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View style={[CssStyle.flexJustify, {marginTop: responsiveHeight(3)}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={23} color={'#FF5100'} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Interstate-bold',
              color: 'white',
              fontSize: 16,
              // marginVertical: responsiveHeight(2),
            }}>
            Intermediate
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon name="search" size={23} color={'#FF5100'} />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: responsiveHeight(4)}}>
          <FlatList
            data={dataFLex}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, inde}) => (
              <View
                style={{
                  width: responsiveWidth(50),
                  marginBottom: responsiveHeight(2),
                }}>
                <Image
                  borderRadius={responsiveWidth(2)}
                  source={require('../../assets/Rectangle32.png')}
                  style={{
                    width: responsiveWidth(40),
                    height: responsiveHeight(18),
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontFamily: 'Interstate-regular',
                    alignSelf: 'center',
                    marginVertical: responsiveHeight(0.3),
                  }}>
                  Yoga exercise
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'Interstate-regular',
                    alignSelf: 'center',
                  }}>
                  21 min | 400 k
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Intermediate;

const styles = StyleSheet.create({});
