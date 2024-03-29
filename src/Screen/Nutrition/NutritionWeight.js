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
import CustomButton from '../../component/CustomButton';
import {RulerPicker} from 'react-native-ruler-picker';
import {useDispatch, useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import assets from '../../assets';
import {AddWeightWithoutProfileApi} from '../../services/HeightApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WeightReviewId} from '../../store/action';
import LottieGif from '../../Helping/LottieGif';

const NutritionWeight = ({navigation, route}) => {
  const {item, updateData, userData, getUserDetail} = route.params
    ? route.params
    : '';
  // console.log(item, updateData, userData);
  const weightUnitData = [{text: 'gm'}, {text: 'kg'}];
  const [weightData, setWeightData] = useState('kg');
  const flatNode = useRef();
  const id = useSelector(data => data);
  const [activeIndex, setActiveIndex] = useState(
    item[0]?.current_weight
      ? item[0]?.current_weight
      : updateData?.weight
      ? updateData?.weight
      : userData?.weight
      ? userData?.weight
      : getUserDetail?.weight
      ? getUserDetail?.weight
      : 22,
  );
  // console.log(updateData);

  const [weightValue, setWeightValue] = useState(
    item[0]?.current_weight
      ? item[0]?.current_weight
      : userData
      ? userData?.weight
      : updateData
      ? updateData?.weight
      : 22,
  );
  // console.log(weightValue);
  const [loadingUser, setLoadingUser] = useState(false);
  const [openUserSuccessfully, setOpenUserSuccessfully] = useState(false);
  // console.log(weightValue, 'hello');
  const dispatch = useDispatch();

  const UpdateWeight = async () => {
    setLoadingUser(true);
    try {
      const result = await AddWeightWithoutProfileApi(
        id.id,
        weightValue,
        weightData,
      );
      console.log(result, 'shdfle');
      if (result.status == true) {
        setOpenUserSuccessfully(true);
        setLoadingUser(false);
        await AsyncStorage.setItem(
          'WeightReviewId',
          `${result.result[0].weight_review_id}`,
        );
        dispatch(WeightReviewId(result.result[0].weight_review_id));
      } else {
        console.error(result.message);
        setLoadingUser(false);
      }
    } catch (error) {
      setLoadingUser(false);
      console.log(error);
    }
  };
  // console.log(id.id, weightValue, weightData);
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
              {item[0]?.user_id || item == 'Update' ? 'Update' : 'Current'}{' '}
              Weight
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
            <RulerPicker
              min={0}
              max={weightData == 'kg' ? 150 : 5000}
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
              decelerationRate="fast"
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
                  ? item[0]?.user_id || item == 'Update'
                    ? UpdateWeight()
                    : navigation.navigate('NutritionTargeted', {
                        item: {item, weightValue},
                        updateData,
                        userData,
                      })
                  : ToastAndroid.show(
                      'Please select weight value',
                      ToastAndroid.SHORT,
                    );
              }}
              activeOpacity={1}
              style={{width: responsiveWidth(78)}}
              buttonText={
                item[0]?.user_id || item == 'Update'
                  ? 'Save Changes'
                  : 'Continue'
              }
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
                <LottieGif />
                <Text
                  style={[
                    CssStyle.modelTextStyle,
                    {
                      width: responsiveWidth(60),
                      marginTop: responsiveHeight(2),
                    },
                  ]}>
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
