import {
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from '../../Helping/AppColor';
import Icon from 'react-native-vector-icons/Ionicons';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useFocusEffect} from '@react-navigation/native';
import CustomButton from '../../component/CustomButton';
import {FocusedComponent} from '../../Helping/HelpingComponent';
import {UpdateProfileApi} from '../../';
import {RulerPicker} from 'react-native-ruler-picker';
import Ruler from '../../Helping/Ruler';

const Gender = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item, 'hello');
  const [addData, setAddData] = useState('male');
  // console.log(item);
  // console.log(
  //   item.itemResult.user_id,
  //   item.itemName,
  //   addData,
  //   focusedArea,
  //   weightData,
  //   heightData,
  //   heightValue,
  //   weightValue,
  //   'dummy',
  // );
  const CustomLine = [{ie: 1}, {ie: 1}, {ie: 1}, {ie: 1}];
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        // console.log('hello sir');
        BackHandler.exitApp();
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );
  const genderCollectionData = [
    {text: 'male', image: require('../../assets/maleGender.png')},
    {text: 'female', image: require('../../assets/FemaleGender.png')},
  ];
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{flex: 1}}>
        <View
          style={[
            CssStyle.flexJustify,
            {
              marginTop: responsiveHeight(4.4),
              paddingHorizontal: responsiveWidth(5),
            },
          ]}>
          {/* <TouchableOpacity
              style={{
                marginLeft: responsiveWidth(-1),
              }}
              onPress={() =>
                flatNode.current.scrollToIndex({
                  index: activeIndex - 1,
                  animated: true,
                })
              }>
              <Icon
                name="chevron-back-outline"
                size={28}
                color={AppColors.buttonText}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginLeft: responsiveWidth(-1),
              }}
              onPress={() => UpdateProfile()}>
              <Text
                style={{
                  color: AppColors.buttonText,
                  fontSize: 14,
                  marginRight: responsiveWidth(2),
                }}>
                Skip Intro
              </Text>
            </TouchableOpacity> */}
        </View>
        {/* <SwiperFlatList
          ref={flatNode}
          index={activeIndex}
          showPagination
          data={dataImages}
          initialNumToRender={4}
          scrollEnabled={false}
          renderItem={({item, index}) => ( */}
        <View
          style={{
            flex: 1,
            width: responsiveWidth(100),
            paddingHorizontal: responsiveWidth(6),
          }}>
          <View style={{flex: 0.5, marginTop: responsiveHeight(6.7)}}>
            <Text
              style={{
                color: 'white',
                fontSize: responsiveFontSize(4.7),
                marginBottom: responsiveHeight(2),
                fontFamily: 'Interstate-bold',
                marginLeft: responsiveWidth(1),
                width: responsiveWidth(90),
                lineHeight: responsiveHeight(6),
              }}>
              About You
            </Text>
            <Text
              style={{
                width: responsiveWidth(79),
                color: 'white',
                // fontFamily: 'Interstate-regular',
                lineHeight: responsiveHeight(3),
                marginLeft: responsiveWidth(1),
                fontSize: 13,
                fontWeight: '400',
                opacity: 0.77,
              }}>
              we want to know about you, follow the next steps to complete the
              information
            </Text>
          </View>
          <View style={[CssStyle.flexJustify, {}]}>
            {genderCollectionData.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                onPress={() => setAddData(item.text)}
                style={{
                  backgroundColor: addData == item.text ? '#0A1F58' : '#626377',
                  paddingVertical: responsiveHeight(2),
                  width: responsiveWidth(41),
                  borderRadius: responsiveWidth(3),
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: responsiveHeight(22),
                  borderWidth: 1,
                  borderColor: addData == item.text ? 'white' : '#626377',
                }}>
                {addData == item.text ? (
                  <Image
                    source={require('../../assets/Group655.png')}
                    resizeMode="contain"
                    style={{
                      width: 26,
                      height: 26,
                      position: 'absolute',
                      top: responsiveHeight(1.5),
                      right: responsiveWidth(3),
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      position: 'absolute',
                      top: responsiveHeight(1.5),
                      right: responsiveWidth(3),
                      backgroundColor: '#78798A',
                      borderRadius: responsiveWidth(10),
                    }}
                  />
                )}
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={{
                    width: 103,
                    height: 103,
                    marginTop: responsiveHeight(1.7),
                  }}
                />
                <Text
                  style={[styles.signInText, {textTransform: 'capitalize'}]}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* )}
          paginationStyle={{}}
          paginationActiveColor={AppColors.buttonText}
          paginationStyleItem={{
            width: responsiveWidth(17.7),
            height: responsiveHeight(0.4),
            borderRadius: responsiveHeight(30),
            bottom: responsiveHeight(3),
          }}
          paginationDefaultColor={'white'}
          paginationStyleItemInactive={
            {
              // backgroundColor: flatNode.current == 0 ? 'yellow' : 'green',
            }
          }
        /> */}
        <View
          style={{
            backgroundColor: '#0B183C',
          }}>
          <View
            style={{
              bottom: responsiveHeight(9.7),
              left: responsiveWidth(11),
              position: 'absolute',
            }}>
            <CustomButton
              onPress={() => {
                navigation.navigate('FocusedAreaProfile', {
                  item: {addData, item},
                });
              }}
              activeOpacity={1}
              style={{width: responsiveWidth(78)}}
              buttonText={'Continue'}
            />
          </View>
        </View>
        <View
          style={[
            CssStyle.flexJustify,
            {paddingHorizontal: responsiveWidth(10)},
          ]}>
          {CustomLine.map((item, index) => (
            <View
              key={index}
              style={{
                width: responsiveWidth(18),
                height: responsiveHeight(0.5),
                backgroundColor: index == 0 ? AppColors.buttonText : 'white',
                borderRadius: responsiveWidth(20),
                marginBottom: responsiveHeight(9.4),
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Gender;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
