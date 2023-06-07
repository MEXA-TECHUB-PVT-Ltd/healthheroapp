import {
  BackHandler,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  ToastAndroid,
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
import Input from '../../component/Input';

const NutritionGender = ({navigation, route}) => {
  const {planType, updateData, userData} = route.params ? route.params : '';
  // console.log(planType, updateData, 'helo', userData, 'hello');
  const [addData, setAddData] = useState(
    updateData ? updateData?.gender : userData ? userData?.gender : 'male',
  );
  const [age, setAge] = useState(updateData ? `${updateData?.age}` : '');
  const genderCollectionData = [
    {text: 'male', image: require('../../assets/maleGender.png')},
    {text: 'female', image: require('../../assets/FemaleGender.png')},
  ];
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{}}>
        <View
          style={[
            CssStyle.flexJustify,
            {
              marginTop: responsiveHeight(4.4),
              paddingHorizontal: responsiveWidth(5),
            },
          ]}>
          <TouchableOpacity
            style={{
              marginLeft: responsiveWidth(-1),
            }}
            onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={28}
              color={AppColors.buttonText}
            />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView behavior="position">
          <View
            style={{
              // flex: 1,
              width: responsiveWidth(100),
              paddingHorizontal: responsiveWidth(6),
            }}>
            <View style={{marginTop: responsiveHeight(6)}}>
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
                  // letterSpacing:0.,
                  lineHeight: responsiveHeight(3),
                  marginLeft: responsiveWidth(1),
                  fontSize: 14,
                  fontWeight: '400',
                  opacity: 0.9,
                }}>
                we want to know about you, follow the next steps to complete the
                information
              </Text>
            </View>
            <View
              style={[CssStyle.flexJustify, {marginTop: responsiveHeight(6)}]}>
              {genderCollectionData.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  onPress={() => setAddData(item.text)}
                  style={{
                    backgroundColor:
                      addData == item.text ? '#0A1F58' : '#626377',
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
            <View style={{marginTop: responsiveHeight(4)}}>
              <Text
                style={[
                  styles.signInText,
                  {
                    textTransform: 'capitalize',
                    fontSize: 19,
                    fontFamily: 'Interstate-regular',
                  },
                ]}>
                What's your Age?
              </Text>
              <Input
                bgColor={'#ffffff60'}
                placeholder={'Age'}
                noIcon={true}
                value={age}
                onChangeText={e => setAge(e)}
                fontSize={16}
                keyboardType="numeric"
                style={{marginTop: responsiveHeight(3)}}
              />
            </View>
          </View>
          <View
            style={{
              bottom: responsiveHeight(1 - 12),
              left: responsiveWidth(11),
              position: 'absolute',
            }}>
            <CustomButton
              onPress={() => {
                addData && age
                  ? navigation.navigate('NutritionWeight', {
                      item: {planType, age, addData},
                      updateData,
                      userData,
                    })
                  : ToastAndroid.show(
                      'Please select age and select gender',
                      ToastAndroid.SHORT,
                    );
              }}
              activeOpacity={1}
              style={{width: responsiveWidth(78)}}
              buttonText={'Continue'}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default NutritionGender;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
