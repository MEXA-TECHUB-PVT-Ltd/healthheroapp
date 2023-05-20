import {
  FlatList,
  Modal,
  StyleSheet,
  Switch,
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
import {AppColors} from '../../Helping/AppColor';
import CssStyle from '../../StyleSheet/CssStyle';
import CustomButton from '../../component/CustomButton';
import {TakeTrainingRest} from '../../services/RestApi';
import {useSelector} from 'react-redux';
import {UpdateProfileApi} from '../../services/AuthScreen';
import Lottie from 'lottie-react-native';
import assets from '../../assets';

const MetricUnits = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  const id = useSelector(data => data.id);
  const [loadingUser, setLoadingUser] = useState(false);
  const [openRestartModel, setOpenRestartModel] = useState(false);
  const UpdateUserName = async () => {
    setLoadingUser(true);
    try {
      const result = await UpdateProfileApi(
        id,
        item.user_name,
        item.device_id,
        addData,
        item.focused_areas,
        item.height,
        item.weight,
        item.weight_unit,
        item.height_unit,
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
  const [openModel, setOpenModel] = useState(false);
  const [data, setData] = useState('');
  const [addItem, setAddItemHeight] = useState('cm');
  const buttonData = [{item: 'cm'}, {item: 'in'}];
  const buttonDataWeight = [{item: 'kg'}, {item: 'lbs'}];
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
      <View style={[CssStyle.flexJustify, {}]}>
        <TouchableOpacity
          style={{marginLeft: responsiveWidth(-3)}}
          onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back-outline"
            size={25}
            style={{padding: '2%'}}
            color={AppColors.buttonText}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.4, marginTop: responsiveHeight(5)}}>
        <Text
          style={[
            CssStyle.textInsideSettingComponent,
            {fontSize: 36, lineHeight: responsiveHeight(5)},
          ]}>
          Metric And Imperial Units
        </Text>
        <Text
          style={[
            CssStyle.textInfoSetting,
            {fontSize: 13, lineHeight: responsiveHeight(2)},
          ]}>
          Achieving your fitness goals requires consistency, and our workout
          reminder feature is designed to help you stay on track.
        </Text>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            setOpenModel(true), setData('Height');
          }}
          style={[
            {
              marginBottom: responsiveHeight(2.9),
              borderRadius: 8,
              paddingHorizontal: responsiveWidth(5),
              paddingVertical: responsiveHeight(2),
              marginTop: responsiveHeight(0.8),
              backgroundColor: '#626377',
            },
          ]}>
          <Text style={{color: 'white', fontSize: 12, opacity: 0.8}}>
            Height Unit
          </Text>
          <Text
            style={{
              color: 'white',
              paddingVertical: responsiveHeight(0.5),
              fontSize: 23,
              fontFamily: 'Interstate-bold',
            }}>
            cm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOpenModel(true), setData('Weight');
          }}
          style={[
            {
              marginBottom: responsiveHeight(2.9),
              borderRadius: 8,
              paddingHorizontal: responsiveWidth(5),
              paddingVertical: responsiveHeight(2),
              marginTop: responsiveHeight(0.8),
              backgroundColor: '#626377',
            },
          ]}>
          <Text style={{color: 'white', fontSize: 12, opacity: 0.8}}>
            Weight Unit
          </Text>
          <Text
            style={{
              color: 'white',
              paddingVertical: responsiveHeight(0.5),
              fontSize: 23,
              fontFamily: 'Interstate-bold',
            }}>
            kg
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModel}
        onRequestClose={() => setOpenModel(false)}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setOpenModel(false)}>
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
                  paddingVertical: responsiveHeight(4.2),
                  paddingHorizontal: responsiveWidth(6),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 19,
                    fontFamily: 'Interstate-regular',
                    width: responsiveWidth(75),
                    textAlign: 'center',
                    textTransform: 'capitalize',
                  }}>
                  {data == 'Weight' ? 'Weight Unit' : 'Height Unit'}
                </Text>
                <View
                  style={[
                    CssStyle.flexJustify,
                    {marginVertical: responsiveHeight(6)},
                  ]}>
                  {data == 'Height'
                    ? buttonData.map((item, index) => (
                        <CustomButton
                          buttonText={item.item}
                          onPress={() => {
                            setAddItemHeight(item.item);
                          }}
                          buttonColor={
                            addItem == item.item ? '' : 'transparent'
                          }
                          mode={addItem == item.item ? '' : 'outlined'}
                          fontWeight={'500'}
                          borderColor={addItem == item.item ? '' : 'white'}
                          styleText={{textTransform: 'uppercase'}}
                          style={{
                            width: responsiveWidth(41),
                            marginRight: responsiveWidth(6),
                          }}
                        />
                      ))
                    : buttonDataWeight.map((item, index) => (
                        <CustomButton
                          buttonText={item.item}
                          onPress={() => {
                            setAddItemHeight(item.item);
                          }}
                          buttonColor={
                            addItem == item.item ? '' : 'transparent'
                          }
                          mode={addItem == item.item ? '' : 'outlined'}
                          fontWeight={'500'}
                          borderColor={addItem == item.item ? '' : 'white'}
                          styleText={{textTransform: 'uppercase'}}
                          style={{
                            width: responsiveWidth(41),
                            marginRight: responsiveWidth(6),
                          }}
                        />
                      ))}
                </View>

                <View style={[{alignItems: 'center'}]}>
                  <CustomButton
                    buttonText={'Save Changes'}
                    onPress={() => {
                      setOpenModel(false);
                    }}
                    buttonColor={'transparent'}
                    mode="outlined"
                    fontWeight={'500'}
                    borderColor={'white'}
                    style={{
                      width: responsiveWidth(50),
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openRestartModel}
        onRequestClose={() => setOpenRestartModel(false)}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setOpenRestartModel(false)}>
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
                    width: responsiveWidth(75),
                    textAlign: 'center',
                    lineHeight: responsiveHeight(4),
                    marginTop: responsiveHeight(2),
                    textTransform: 'capitalize',
                  }}>
                  Password Updated Successfully
                </Text>
                <View style={[{alignItems: 'center'}]}>
                  <CustomButton
                    buttonText={'Go Back'}
                    onPress={() => {
                      navigation.goBack(), setOpenRestartModel(false);
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
    </LinearGradient>
  );
};

export default MetricUnits;

const styles = StyleSheet.create({});
