import {
  BackHandler,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import Input from '../../component/Input';

import Lottie from 'lottie-react-native';
import assets from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {AddDietPlan, UpdateDietPlanApi} from '../../services/DietPlan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Diet_Id} from '../../store/action';
import moment from 'moment';

const SetCalories = ({navigation, route}) => {
  const {item, updateData} = route.params ? route.params : '';
  const [weightData, setWeightData] = useState(
    updateData ? updateData.diet_budget : '',
  );
  // console.log(updateData);
  const [loading, setLoading] = useState(false);
  const [successfully, setSuccessfully] = useState(false);
  const [openRestartModel, setOpenRestartModel] = useState(false);
  const id = useSelector(data => data);
  const dispatch = useDispatch();

  const MakePlan = async () => {
    setOpenRestartModel(true);
    // setSuccessfully(true);
    try {
      const result = updateData
        ? await UpdateDietPlanApi(
            id.dietPlanId,
            id.id,
            item.item.item.heightValue,
            item.item.item.item.item.weightValue,
            item.item.item.item.weightTargeted,
            item.item.item.item.item.item.age,
            item.item.item.item.item.item.addData,
            weightData,
            item.item.activeIndex,
            item.item.item.item.item.item.planType.review,
            moment(new Date()).format('YYYY-MM-DD'),
          )
        : await AddDietPlan(
            id.id,
            item.item.item.heightValue,
            item.item.item.item.item.weightValue,
            item.item.item.item.weightTargeted,
            item.item.item.item.item.item.age,
            item.item.item.item.item.item.addData,
            weightData,
            item.item.activeIndex,
            item.item.item.item.item.item.planType.review,
            moment(new Date()).format('YYYY-MM-DD'),
          );
      console.log(result, 'helo');
      if (result.status == true) {
        setWeightData('');
        {
          updateData
            ? await AsyncStorage.setItem(
                'DietPlanId',
                `${result.result.updated_record.diet_plan_id}`,
              )
            : await AsyncStorage.setItem(
                'DietPlanId',
                `${result.result.addedRecord.diet_plan_id}`,
              );
        }
        updateData
          ? dispatch(Diet_Id(`${result.result.updated_record.diet_plan_id}`))
          : dispatch(Diet_Id(`${result.result.addedRecord.diet_plan_id}`));
        // setOpenRestartModel(false);
        setSuccessfully(true);
      } else {
        setOpenRestartModel(false);
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setOpenRestartModel(false);
      console.log(error);
    }
  };
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
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
      <KeyboardAvoidingView
        style={{
          // flex: 1,
          width: responsiveWidth(100),
          paddingHorizontal: responsiveWidth(6),
        }}>
        <View style={{marginTop: responsiveHeight(6.7)}}>
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(4.7),
              marginBottom: responsiveHeight(0.8),
              fontFamily: 'Interstate-bold',
              marginLeft: responsiveWidth(1),
              width: responsiveWidth(90),
              lineHeight: responsiveHeight(6),
              textTransform: 'capitalize',
            }}>
            Set your calories budget
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
              opacity: 0.8,
            }}>
            To better assist you in achieving your fitness goals, please specify
            your desired daily calorie budget.
          </Text>
        </View>
        <View>
          <Input
            bgColor={'#ffffff60'}
            placeholder={'Calories Budget'}
            noIcon={true}
            keyboardType="numeric"
            value={weightData}
            onChangeText={e => setWeightData(e)}
            fontSize={16}
            style={{marginTop: responsiveHeight(7)}}
          />
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          backgroundColor: '#0B183C',
        }}>
        <View
          style={{
            bottom: responsiveHeight(-20.7),
            left: responsiveWidth(11),
            // position: 'absolute',
          }}>
          <CustomButton
            loading={loading}
            onPress={() => {
              weightData
                ? MakePlan()
                : ToastAndroid.show(
                    'Please enter calories budget',
                    ToastAndroid.SHORT,
                  );
            }}
            activeOpacity={1}
            style={{width: responsiveWidth(78)}}
            buttonText={'Continue'}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openRestartModel}
        onRequestClose={() => setOpenRestartModel(false)}>
        <View style={{flex: 1, backgroundColor: '#00000090'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              // onPress={() => console.log('hello')}
              style={{
                backgroundColor: AppColors.blueColor,
                borderTopEndRadius: responsiveHeight(3),
                borderTopLeftRadius: responsiveHeight(3),
                paddingVertical: responsiveHeight(2.5),
                paddingHorizontal: responsiveWidth(6),
                alignItems: 'center',
              }}>
              {!successfully ? (
                <>
                  <View
                    // activeOpacity={1}
                    style={{
                      // height: wp(28),
                      width: 110,
                      // backgroundColor: 'red',
                      aspectRatio: 1,
                      alignSelf: 'center',
                    }}>
                    <Lottie
                      source={assets.loaderCreating}
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
                      width: responsiveWidth(90),
                      textAlign: 'center',
                      lineHeight: responsiveHeight(4),
                      marginTop: responsiveHeight(4),
                      textTransform: 'capitalize',
                    }}>
                    Creating your plan
                  </Text>
                </>
              ) : (
                <>
                  <View
                    // activeOpacity={1}
                    style={{
                      // height: wp(28),
                      width: 110,
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
                      colorFilter={[{color: 'red'}]}
                    />
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 23,
                      fontFamily: 'Interstate-regular',
                      width: responsiveWidth(90),
                      textAlign: 'center',
                      lineHeight: responsiveHeight(4),
                      marginTop: responsiveHeight(4),
                      textTransform: 'capitalize',
                    }}>
                    Nutrition & Diet plan added successfully
                  </Text>
                  <View
                    style={[
                      {
                        alignItems: 'center',
                        paddingBottom: responsiveHeight(2),
                      },
                    ]}>
                    <CustomButton
                      buttonText={'Go to Plan'}
                      onPress={() => {
                        navigation.navigate('main'),
                          setSuccessfully(false),
                          setOpenRestartModel(false);
                      }}
                      buttonColor={'transparent'}
                      mode="outlined"
                      fontWeight={'500'}
                      borderColor={'white'}
                      style={{
                        marginTop: responsiveHeight(3.7),
                        width: responsiveWidth(44),
                      }}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={successfully}
        onRequestClose={() => setSuccessfully(false)}>
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
                paddingVertical: responsiveHeight(2.5),
                paddingHorizontal: responsiveWidth(6),
                alignItems: 'center',
              }}></View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default SetCalories;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
