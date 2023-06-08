import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
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
import Toast from 'react-native-toast-message';
import {AppColors} from '../../Helping/AppColor';
import CssStyle from '../../StyleSheet/CssStyle';
import CustomButton from '../../component/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {Line} from '../../component/Line';

import Lottie from 'lottie-react-native';
import assets from '../../assets';
import {AddWaterApi, UpdateWaterApi} from '../../services/WaterTrackerApi';
import {Water_Id} from '../../store/action';
import moment from 'moment';
import ToastContainer from '../../Helping/ToastContainer';

const TypeOfTracker = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  // console.log(item);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(item ? item.quantity : 12);
  const id = useSelector(data => data);
  const [openRestartModel, setOpenRestartModel] = useState(false);
  const [addData, setAddData] = useState(item ? item.measure : 'glass');
  const [typeDate, setType] = useState(item ? item.measuring_unit : '');
  const measureType = [{item: 'ml'}, {item: 'fl'}, {item: 'oz'}];
  const [measureModel, setMeasureModel] = useState(false);

  const genderCollectionData = [
    {text: 'glass', image: require('../../assets/glass-of-water.png')},
    {text: 'bottle', image: require('../../assets/water.png')},
  ];
  // console.log(item);
  const dispatch = useDispatch();
  const AddTracker = async () => {
    setLoading(true);
    try {
      const result = id.waterTrackerId
        ? await UpdateWaterApi(
            id.waterTrackerId,
            id.id,
            addData,
            typeDate,
            time,
            moment(new Date()).format('YYYY-MM-DD'),
          )
        : await AddWaterApi(
            id.id,
            addData,
            typeDate,
            time,
            moment(new Date()).format('YYYY-MM-DD'),
          );
      console.log(result);
      if (result.status == true) {
        dispatch(Water_Id(result.result.water_tracker_id));
        setLoading(false);
        setOpenRestartModel(true);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading;
      console.log(error);
    }
  };
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
      <View style={{marginTop: responsiveHeight(5.5), flex: 0.3}}>
        <Text style={[CssStyle.textInsideSettingComponent, {fontSize: 41}]}>
          Type of Tracker
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
          To track your water intake and ensure optimal hydration, please
          provide the details of the water you have consumed.
        </Text>
      </View>
      <View style={[CssStyle.flexJustify, {marginTop: responsiveHeight(6)}]}>
        {genderCollectionData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setAddData(item.text)}
            style={{
              backgroundColor: addData == item.text ? '#0A1F58' : '#626377',
              paddingVertical: responsiveHeight(2),
              width: responsiveWidth(38),
              borderRadius: responsiveWidth(3),
              justifyContent: 'center',
              alignItems: 'center',
              height: responsiveHeight(22),
              borderWidth: 1,
              marginHorizontal: responsiveWidth(3),
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
            <Text style={[styles.signInText, {textTransform: 'capitalize'}]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{flex: 0.34, marginTop: responsiveHeight(5)}}>
        <Text
          style={[
            CssStyle.textInfoSetting,
            {
              fontSize: 20,
              fontFamily: 'Interstate-regular',
              letterSpacing: 0.6,
            },
          ]}>
          What's Your Daily Goal?
        </Text>
        <View
          style={[
            CssStyle.flexJustify,
            {paddingHorizontal: responsiveWidth(1)},
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
              time == 0 ? {} : setTime(time - 1);
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
            onPress={() => (time == 32 ? {} : setTime(time + 1))}>
            <Icon
              name="chevron-forward-outline"
              size={29}
              color={AppColors.buttonText}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 0.3, marginTop: responsiveHeight(6)}}>
        <TouchableOpacity
          onPress={() => {
            setMeasureModel(!measureModel), setOpenRestartModel(true);
          }}
          style={[
            CssStyle.flexJustify,
            {
              backgroundColor: '#515C7A',
              borderRadius: responsiveWidth(7),
              paddingHorizontal: responsiveWidth(4),
              paddingVertical: responsiveHeight(1.2),
              marginBottom: responsiveHeight(4),
              zIndex: 999,
            },
          ]}>
          <Text style={{color: 'white'}}>
            {typeDate ? typeDate : 'Measures'}
          </Text>
          <Icon name="chevron-down-outline" size={25} color="white" />
        </TouchableOpacity>
        {/* </View> */}
        {/* {measureModel ? (
          <View style={[CssStyle.shadow, styles.modelOpenData]}>
            {measureType.map((item, index) => (
              <>
                <TouchableOpacity
                  key={index}
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
        ) : null} */}
      </View>
      <View
        style={{
          alignItems: 'center',
          // flex: 0.1,
          zIndex: measureModel ? -99 : 0,
        }}>
        <CustomButton
          loading={loading}
          onPress={() =>
            typeDate && time
              ? AddTracker()
              : Toast.show({text2: 'Please select all option'})
          }
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
                paddingVertical: responsiveHeight(3.8),
              }}>
              {measureModel ? (
                <View style={[styles.modelOpenData]}>
                  {measureType.map((item, index) => (
                    <View>
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setType(item.item),
                            setMeasureModel(false),
                            setOpenRestartModel(false);
                        }}
                        style={{
                          paddingVertical: responsiveHeight(1.5),
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: responsiveWidth(3),
                          }}>
                          {item.item}
                        </Text>
                      </TouchableOpacity>
                      <Line />
                    </View>
                  ))}
                </View>
              ) : (
                <>
                  <View
                    // activeOpacity={1}
                    style={{
                      // height: wp(28),
                      width: 120,
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
                    water consumption added successfully
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
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <ToastContainer />
    </LinearGradient>
  );
};

export default TypeOfTracker;

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
    // borderWidth: 1,
    // borderColor: '#eee',
    // borderBottomEndRadius: responsiveWidth(2),
    // borderBottomLeftRadius: responsiveWidth(2),
    // backgroundColor: 'white',
    marginHorizontal: responsiveWidth(0.1),
    // elevation: 1,
    // position: 'absolute',
    width: responsiveWidth(87.8),
    // top: responsiveHeight(4),
    paddingBottom: responsiveHeight(3),
  },
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
