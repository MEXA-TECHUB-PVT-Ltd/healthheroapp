import {
  BackHandler,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {GetUserDetailApi, UpdateProfileApi} from '../../services/AuthScreen';
import {useSelector} from 'react-redux';

import Lottie from 'lottie-react-native';
import assets from '../../assets';
import Loader from '../../component/Loader';

const NutritionHeight = ({navigation, route}) => {
  const {item, updateData, userData} = route.params ? route.params : '';
  const weightUnitData = [{text: 'ft'}, {text: 'in'}];
  const [weightData, setWeightData] = useState('ft');
  const [heightValueItem, setHeightValue] = useState(
    updateData ? updateData?.height : item ? item?.height : 9,
  );
  const id = useSelector(data => data);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [openUserSuccessfully, setOpenUserSuccessfully] = useState(false);
  const [inchNumber, setInchNumber] = useState(0);
  const [startIndex, setStartIndex] = useState(3);
  // console.log(parseInt(updateData?.height), 'heig');

  const UpdateUserName = async () => {
    setLoadingUser(true);
    try {
      const result = await UpdateProfileApi(
        id.id,
        item?.user_name,
        item?.device_id,
        item?.gender,
        item?.focused_areas,
        heightValueItem + '.' + inchNumber,
        item?.weight,
        item?.weight_unit,
        'ft',
      );
      if (result.status == true) {
        setOpenUserSuccessfully(true);
        setLoadingUser(false);
      } else {
        console.error(result.message);
        setLoadingUser(false);
      }
    } catch (error) {
      setLoadingUser(false);
      console.log(error);
    }
  };
  const heightValue = heightValueItem + '.' + inchNumber;
  // console.log(updateData?.height);
  // console.log(heightValue, 'index');
  // Function to generate a random number using the current date and time as a seed
  // useEffect(() => {
  //   generateRandomNumber();
  // }, []);
  // function generateRandomNumber() {
  //   const currentDate = new Date('2023-06-08T06:05:54.746Z');
  //   const day = currentDate.getDate();
  //   const month = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
  //   const year = currentDate.getFullYear();

  //   const uniqueNumber = (day + month + year) % 31; // Remainder after dividing by 21
  //   return uniqueNumber;
  // }

  // // Generate and display the unique number
  // const uniqueNum = generateRandomNumber();
  // console.log(uniqueNum);

  return loading ? (
    <Loader />
  ) : (
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
        <View
          style={{
            flex: 1,
            width: responsiveWidth(100),
            paddingHorizontal: responsiveWidth(6),
          }}>
          <View style={{flex: 0.4, marginTop: responsiveHeight(6)}}>
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
              {item?.email ? 'Update' : 'Current'} Height
            </Text>
            <Text
              style={{
                width: responsiveWidth(86),
                color: 'white',
                lineHeight: responsiveHeight(3),
                fontSize: 13,
                fontWeight: '400',
                opacity: 0.8,
              }}>
              Track your progress by entering your current weight, allowing us
              to monitor your achievements and help you stay on track towards
              your fitness goals
            </Text>
          </View>
          <View>
            <View
              style={[CssStyle.flexJustify, {marginTop: responsiveHeight(11)}]}>
              {weightUnitData.map((item, index) => (
                <CustomButton
                  key={index}
                  buttonText={item?.text}
                  onPress={() => setWeightData(item?.text)}
                  style={{width: responsiveWidth(42)}}
                  styleText={{textTransform: 'uppercase'}}
                  mode={weightData == item?.text ? '' : 'outlined'}
                  borderColor={weightData == item?.text ? '' : 'white'}
                  buttonColor={weightData == item?.text ? '' : 'transparent'}
                />
              ))}
            </View>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontSize: responsiveFontSize(5),
                fontWeight: 'bold',
                marginTop: responsiveHeight(7),
                marginBottom: responsiveHeight(-10),
                marginLeft: responsiveWidth(7),
              }}>
              {heightValue !== '0.0'
                ? heightValue
                : item?.height
                ? item?.height
                : updateData
                ? updateData?.height
                : userData
                ? userData?.height
                : heightValue}
              <Text style={{fontSize: 23}}> {'ft'}</Text>
            </Text>
            <RulerPicker
              min={0}
              max={weightData == 'ft' ? 15 : 12}
              step={1}
              fractionDigits={0}
              initialValue={startIndex}
              gapBetweenSteps={15}
              indicatorColor="#FF5100"
              longStepColor="#FF5100"
              indicatorHeight={75}
              longStepHeight={70}
              shortStepHeight={20}
              stepWidth={3}
              decelerationRate={0.1}
              unitTextStyle={{
                color: 'transparent',
                fontSize: responsiveFontSize(2),
              }}
              valueTextStyle={{
                color: 'transparent',
                fontSize: responsiveFontSize(6),
              }}
              height={responsiveHeight(38)}
              onValueChange={number => {
                weightData == 'ft'
                  ? setHeightValue(number)
                  : setInchNumber(number);
              }}
              unit={weightData}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#0B183C',
          }}>
          <View
            style={{
              bottom: responsiveHeight(16.7),
              left: responsiveWidth(11),
              position: 'absolute',
            }}>
            <CustomButton
              loading={loadingUser}
              onPress={() => {
                heightValueItem
                  ? item?.email
                    ? UpdateUserName()
                    : navigation.navigate('ActiveAge', {
                        item: {item, heightValue},
                        updateData,
                        // userData,
                      })
                  : ToastAndroid.show(
                      'Please select the current height',
                      ToastAndroid.SHORT,
                    );
              }}
              activeOpacity={1}
              style={{width: responsiveWidth(78)}}
              buttonText={item?.email ? 'Save Changes' : 'Continue'}
            />
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openUserSuccessfully}
        onRequestClose={() => setOpenUserSuccessfully(false)}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setOpenUserSuccessfully(false)}>
          <View style={{flex: 1, backgroundColor: '#00000090'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  backgroundColor: AppColors.blueColor,
                  borderTopEndRadius: responsiveHeight(3),
                  borderTopLeftRadius: responsiveHeight(3),
                  paddingVertical: responsiveHeight(3.8),
                  paddingHorizontal: responsiveWidth(6),
                  alignItems: 'center',
                }}>
                <View
                  // activeOpacity={1}
                  style={{
                    // height: wp(28),
                    width: 125,
                    // backgroundColor: 'red',
                    aspectRatio: 1,
                    alignSelf: 'center',
                  }}>
                  <Lottie
                    source={assets.loader}
                    autoPlay
                    loop={true}
                    resizeMode="cover"
                    speed={1}
                    // style={{width}}
                    colorFilter={[{color: 'red'}]}
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 23,
                    fontFamily: 'Interstate-regular',
                    width: responsiveWidth(60),
                    textAlign: 'center',
                    lineHeight: responsiveHeight(4),
                    marginTop: responsiveHeight(2),
                    textTransform: 'capitalize',
                  }}>
                  Changes saved Successfully
                </Text>

                <View style={[{alignItems: 'center'}]}>
                  <CustomButton
                    buttonText={'Go Back'}
                    onPress={() => {
                      setOpenUserSuccessfully(false), navigation.goBack();
                    }}
                    buttonColor={'transparent'}
                    mode="outlined"
                    fontWeight={'500'}
                    borderColor={'white'}
                    style={{
                      marginTop: responsiveHeight(3.7),
                      width: responsiveWidth(50),
                      marginBottom: responsiveHeight(1),
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default NutritionHeight;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
