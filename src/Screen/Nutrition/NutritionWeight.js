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
import {RulerPicker} from 'react-native-ruler-picker';
import Ruler from '../../Helping/Ruler';
import {GetUserDetailApi, UpdateProfileApi} from '../../services/AuthScreen';
import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import assets from '../../assets';

const NutritionWeight = ({navigation, route}) => {
  const {item, updateData} = route.params ? route.params : '';
  console.log(updateData);
  const weightUnitData = [{text: 'gm'}, {text: 'kg'}];
  const [weightData, setWeightData] = useState('kg');
  const flatNode = useRef();
  const id = useSelector(data => data);
  const [activeIndex, setActiveIndex] = useState(
    updateData ? updateData.weight : 35,
  );
  const [updateDataChanges, setUpdateDataChanges] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getWeightHeight();
  }, []);
  const getWeightHeight = async () => {
    setLoading(true);
    try {
      const result = await GetUserDetailApi(id.id);
      console.log(result, 'get user detail');
      if (result.status == true) {
        setLoading(false);
        setUpdateDataChanges(result.result);
      } else {
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(updateDataChanges);

  const [weightValue, setWeightValue] = useState(null);
  console.log(weightValue);
  const [loadingUser, setLoadingUser] = useState(false);
  const [openUserSuccessfully, setOpenUserSuccessfully] = useState(false);
  const UpdateUserName = async () => {
    setLoadingUser(true);
    try {
      const result = await UpdateProfileApi(
        id.id,
        updateDataChanges.user_name,
        updateDataChanges.device_id,
        updateDataChanges.gender,
        updateDataChanges.focused_areas,
        updateDataChanges.height,
        weightValue,
        updateDataChanges.weight_unit,
        updateDataChanges.height_unit,
      );
      console.log(result);
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
              {item == 'Update' ? item : 'Current'} Weight
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
                  buttonText={item.text}
                  onPress={() => setWeightData(item.text)}
                  style={{width: responsiveWidth(42)}}
                  styleText={{textTransform: 'uppercase'}}
                  mode={weightData == item.text ? '' : 'outlined'}
                  borderColor={weightData == item.text ? '' : 'white'}
                  buttonColor={weightData == item.text ? '' : 'transparent'}
                />
              ))}
            </View>
            <RulerPicker
              min={0}
              max={110}
              step={1}
              fractionDigits={0}
              initialValue={activeIndex}
              gapBetweenSteps={5}
              indicatorColor="#FF5100"
              longStepColor="#FF5100"
              indicatorHeight={75}
              longStepHeight={70}
              shortStepHeight={20}
              stepWidth={3}
              unitTextStyle={{
                color: 'white',
                fontSize: responsiveFontSize(2),
              }}
              valueTextStyle={{
                color: 'white',
                fontSize: responsiveFontSize(6),
              }}
              // onValueChange={number => console.log(number)}
              height={responsiveHeight(38)}
              onValueChangeEnd={number => setWeightValue(number)}
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
              onPress={() => {
                weightValue
                  ? item == 'Update'
                    ? UpdateUserName()
                    : navigation.navigate('NutritionTargeted', {
                        item: {item, weightValue},
                        updateData,
                      })
                  : ToastAndroid.show(
                      'Please select weight value',
                      ToastAndroid.SHORT,
                    );
              }}
              activeOpacity={1}
              style={{width: responsiveWidth(78)}}
              buttonText={item == 'Update' ? 'Save Changes' : 'Continue'}
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

export default NutritionWeight;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
