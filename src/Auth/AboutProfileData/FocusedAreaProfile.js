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
import {RulerPicker} from 'react-native-ruler-picker';
import Ruler from '../../Helping/Ruler';
import {UpdateProfileApi} from '../../services/AuthScreen';
import {useSelector} from 'react-redux';

const FocusedAreaProfile = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  const [focusedArea, setFocusedArea] = useState('Arms');
  const flatNode = useRef();
  const id = useSelector(data => data.id);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [weightValue, setWeightValue] = useState(null);
  const [heightValue, setHeightValue] = useState(null);
  const [focusedData, setFocusedData] = useState('');

  const UpdateProfile = async () => {
    setLoading(true);
    try {
      const result = await UpdateProfileApi(
        id,
        item?.itemName,
        item?.item?.itemResult.device_id,
        item.addData,
        [focusedData],
        heightValue,
        weightValue,
      );
      console.log(result);
      if (result.status == true) {
        setLoading(false);
        navigation.navigate('main');
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const focusedAreaCollection = [
    {text: 'Full Body'},
    {text: 'Arms'},
    {text: 'Abs'},
    {text: 'Legs'},
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
          <TouchableOpacity
            style={
              {
                // marginLeft: responsiveWidth(-1),
              }
            }
            onPress={() => navigation.goBack()}>
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
          </TouchableOpacity>
        </View>
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
              FocusedArea
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
              Customize your fitness journey with targeted workout programs
              tailored to your goals.
            </Text>
          </View>
          <View style={[CssStyle.flexData, {}]}>
            <View>
              {focusedAreaCollection.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setFocusedData(item.text)}
                  style={[
                    {
                      backgroundColor:
                        item.text == focusedData ? '#FF5100' : '#626377',
                      width: responsiveWidth(35),
                      paddingVertical: responsiveHeight(2),
                      borderRadius: responsiveWidth(2),
                      marginBottom: responsiveHeight(4),
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text style={[styles.signInText]}>{item.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Image
              resizeMode="contain"
              style={{
                width: 81,
                height: 77,
                position: 'absolute',
                left: responsiveWidth(31.5),
                top: responsiveHeight(4),
                zIndex: 999,
                tintColor:
                  focusedData == 'Arms' ? AppColors.buttonText : '#626377',
              }}
              source={require('../../assets/Arms.png')}
            />
            <Image
              resizeMode="contain"
              style={{
                width: 115,
                height: 91,
                position: 'absolute',
                left: responsiveWidth(34),
                top: responsiveHeight(15),
                zIndex: 999,
                tintColor:
                  focusedData == 'Abs' ? AppColors.buttonText : '#626377',
              }}
              source={require('../../assets/abs.png')}
            />
            <Image
              resizeMode="contain"
              style={{
                width: 97,
                height: 86,
                position: 'absolute',
                left: responsiveWidth(34.7),
                bottom: responsiveHeight(5.7),
                zIndex: 999,
                tintColor:
                  focusedData == 'Legs' ? AppColors.buttonText : '#626377',
              }}
              source={require('../../assets/legs.png')}
            />
            <Image
              style={{
                width: responsiveWidth(70),
                height: responsiveWidth(100),
                marginTop: responsiveHeight(-7),
                marginLeft: responsiveWidth(-6),
              }}
              resizeMode="contain"
              source={require('../../assets/bodybuilder.png')}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#0B183C',
          }}>
          <View
            style={{
              bottom: responsiveHeight(11.7),
              left: responsiveWidth(11),
              position: 'absolute',
            }}>
            <CustomButton
              onPress={() => {
                navigation.navigate('CurrentWeight', {
                  item: {item, focusedData},
                });
              }}
              activeOpacity={1}
              style={{width: responsiveWidth(78)}}
              buttonText={'Continue'}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FocusedAreaProfile;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    // lineHeight: responsiveHeight(3),
  },
});
