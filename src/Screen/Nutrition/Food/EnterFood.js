import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../../../Helping/AppColor';
import CssStyle from '../../../StyleSheet/CssStyle';
import CustomButton from '../../../component/CustomButton';
import {useSelector} from 'react-redux';
import {Line} from '../../../component/Line';

import Lottie from 'lottie-react-native';
import assets from '../../../assets';
import { AddFoodUserApi } from '../../../services/FoodApi';

const EnterFood = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(1);
  const id = useSelector(data => data.id);
  const [oldPassword, setOldPassword] = useState('');
  const [openRestartModel, setOpenRestartModel] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState('');
  const [emailValidError, setEmailValidError] = useState('');

  const gender = [
    {item: 'Breakfast', id: 1},
    {item: 'Snack', id: 2},
    {item: 'Lucnh', id: 3},
    {item: 'Dinner', id: 4},
  ];
  const [review, setReview] = useState('');
  const foodType = [{item: 'Scoops'}, {item: 'Grams'}, {item: 'oz'}];
  const [typeDate, setType] = useState('');
  const [typeDateFood, setTypeFood] = useState('');
  
  const measureType = [{item: 'Food 1'}, {item: 'Food 2'}, {item: 'Food 3'}];
  const [measureModel, setMeasureModel] = useState(false);
  const [foodModel, setFoodModel] = useState(false);
  const AddFood=async()=>{
    setLoading(true);
    try {
      const result = await AddFoodUserApi();
      console.log(result, 'this is the');
      if (result) {
        setLoading(false);
      } else {
        setLoading(false);
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <LinearGradient
      colors={['#0A1F58', '#0A1637']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.4}}
      style={{
        paddingHorizontal: responsiveWidth(6),
        flex: 1,
        paddingTop: responsiveHeight(3),
        backgroundColor: '#0A1F58',
      }}>
      <TouchableOpacity
        style={{marginLeft: responsiveWidth(-3)}}
        onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-back"
          size={29}
          style={{padding: '2%'}}
          color={AppColors.buttonText}
        />
      </TouchableOpacity>
      <View style={{marginTop: responsiveHeight(6), flex: 0.5}}>
        <Text style={[CssStyle.textInsideSettingComponent, {fontSize: 41}]}>
          Enter Food
        </Text>
        <Text
          style={[
            CssStyle.textInfoSetting,
            {
              lineHeight: responsiveHeight(3),
              paddingTop: responsiveHeight(1),
              fontSize: 13,
            },
          ]}>
          To accurately track your nutrition and provide personalized
          recommendations, please enter the details of the food you have
          consumed.
        </Text>
      </View>
      <View style={{flex: 0.9}}>
        <View
          style={[
            CssStyle.flexJustify,
            {
              backgroundColor: '#515C7A',
              borderRadius: responsiveWidth(7),
              paddingHorizontal: responsiveWidth(4),
              paddingVertical: responsiveHeight(1.6),
              marginBottom: responsiveHeight(4),
              zIndex: 999,
            },
          ]}>
          <Text style={{color: 'white'}}>
            {typeDate ? typeDate : 'Select Food'}
          </Text>
          <TouchableOpacity onPress={() => setMeasureModel(!measureModel)}>
            <Icon name="chevron-down-outline" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={[
            CssStyle.flexJustify,
            {
              backgroundColor: '#515C7A',
              borderRadius: responsiveWidth(7),
              paddingHorizontal: responsiveWidth(4),
              paddingVertical: responsiveHeight(1.6),
              zIndex: measureModel ? 0 : 999,
              marginBottom: responsiveHeight(2),
            },
          ]}>
          <Text style={{color: 'white'}}>
            {typeDateFood ? typeDateFood : 'Food Unit'}
          </Text>
          <TouchableOpacity onPress={() => setFoodModel(!foodModel)}>
            <Icon name="chevron-down-outline" size={25} color="white" />
          </TouchableOpacity>
        </View>
        {measureModel ? (
          <View style={[CssStyle.shadow, styles.modelOpenData]}>
            {measureType.map((item, index) => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setType(item.item), setMeasureModel(false);
                  }}
                  style={{
                    paddingVertical: responsiveHeight(1.5),
                  }}>
                  <Text
                    style={{
                      color: AppColors.textColor,
                      marginLeft: responsiveWidth(3),
                    }}>
                    {item.item}
                  </Text>
                </TouchableOpacity>
                <Line />
              </>
            ))}
          </View>
        ) : null}
        {foodModel ? (
          <View
            style={[
              CssStyle.shadow,
              styles.modelOpenData,
              {
                top: responsiveHeight(13.9),
              },
            ]}>
            {foodType.map((item, index) => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setTypeFood(item.item), setFoodModel(false);
                  }}
                  style={{
                    paddingVertical: responsiveHeight(1),
                  }}>
                  <Text
                    style={{
                      color: AppColors.textColor,
                      marginLeft: responsiveWidth(3),
                    }}>
                    {item.item}
                  </Text>
                </TouchableOpacity>
                <Line />
              </>
            ))}
          </View>
        ) : null}
        <Text
          style={[
            CssStyle.textInfoSetting,
            {
              fontSize: 24,
              fontFamily: 'Interstate-regular',
              letterSpacing: 0.6,
              zIndex: -1,
            },
          ]}>
          Food Quality
        </Text>
        <View
          style={[
            CssStyle.flexJustify,
            {paddingHorizontal: responsiveWidth(1), zIndex: -999},
          ]}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF510050',
              borderRadius: responsiveHeight(10),
              width: 39,
              height: 39,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              time == 0 ? {} : setTime(time - 2);
            }}>
            <Icon
              name="chevron-back-outline"
              size={29}
              color={AppColors.buttonText}
            />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 36,
                color: 'white',
                fontFamily: 'Interstate-regular',
              }}>
              {time}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF510050',
              borderRadius: responsiveHeight(10),
              width: 39,
              height: 39,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => (time == 180 ? {} : setTime(time + 2))}>
            <Icon
              name="chevron-forward-outline"
              size={29}
              color={AppColors.buttonText}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          paddingTop: responsiveHeight(2),
          flex: 0.3,
        }}>
        <CustomButton
          loading={loading}
          onPress={() => setOpenRestartModel(true)}
          activeOpacity={1}
          buttonColor={AppColors.buttonText}
          style={{width: responsiveWidth(78)}}
          buttonText={'Add'}
          paddingVertical={1}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openRestartModel}
        onRequestClose={() => setOpenRestartModel(false)}>
        <View style={{flex: 1, backgroundColor: '#00000060'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: AppColors.blueColor,
                alignItems: 'center',
                borderTopEndRadius: responsiveHeight(3),
                borderTopLeftRadius: responsiveHeight(3),
                paddingVertical: responsiveHeight(4.8),
              }}>
              <View
                // activeOpacity={1}
                style={{
                  // height: wp(28),
                  width: 90,
                  // backgroundColor: 'red',
                  aspectRatio: 1,
                  alignSelf: 'center',
                  marginTop: responsiveHeight(1),
                }}>
                <Lottie
                  source={assets.loader}
                  autoPlay
                  loop={true}
                  resizeMode="cover"
                  speed={1}
                  colorFilter={[{color: 'red'}]}
                />
              </View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 23,
                  fontFamily: 'Interstate-regular',
                  width: responsiveWidth(75),
                  textAlign: 'center',
                  lineHeight: responsiveHeight(4),
                  marginTop: responsiveHeight(4),
                  textTransform: 'capitalize',
                }}>
                Food Added Successfully
              </Text>
              <CustomButton
                buttonText={'Go Back'}
                onPress={() => {
                  setOpenRestartModel(false), navigation.navigate('main');
                }}
                buttonColor={'transparent'}
                mode="outlined"
                fontWeight={'500'}
                borderColor={'white'}
                style={{
                  marginTop: responsiveHeight(3.7),
                  width: responsiveWidth(46),
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default EnterFood;

const styles = StyleSheet.create({
  buttonGender: {
    paddingVertical: responsiveHeight(2.6),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveHeight(1),
    // flexDirection: "row",
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  modelOpenData: {
    paddingHorizontal: responsiveWidth(3),
    borderWidth: 1,
    borderColor: '#eee',
    borderBottomEndRadius: responsiveWidth(2),
    borderBottomLeftRadius: responsiveWidth(2),
    backgroundColor: 'white',
    marginHorizontal: responsiveWidth(0.1),
    elevation: 1,
    position: 'absolute',
    width: responsiveWidth(87.8),
    top: responsiveHeight(4),
    paddingTop: responsiveHeight(3),
  },
});
