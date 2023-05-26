import {
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
import {AppColors} from '../../Helping/AppColor';
import CssStyle from '../../StyleSheet/CssStyle';
import CustomButton from '../../component/CustomButton';
import {GetRestTimeApi, TakeTrainingRest} from '../../services/RestApi';
import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import assets from '../../assets';

const TrainingRest = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const id = useSelector(data => data.id);
  useEffect(() => {
    getRestTime();
  }, []);

  const getRestTime = async () => {
    setLoading(true);
    try {
      const result = await GetRestTimeApi(id);
      // console.log(result);
      if (result.status == true) {
        setLoading(false);
        setTime(parseInt(result.result.time));
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading;
      console.log(error);
    }
  };
  const AddTrainingRestTime = async () => {
    setLoading(true);
    try {
      const result = await TakeTrainingRest(id, time);
      console.log(result);
      if (result.status == true) {
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
  const [openRestartModel, setOpenRestartModel] = useState(false);

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
        style={{flex: 0.38, marginLeft: responsiveWidth(-3)}}
        onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-back-outline"
          size={25}
          style={{padding: '2%'}}
          color={AppColors.buttonText}
        />
      </TouchableOpacity>

      <View style={{flex: 0.2}}>
        <Text style={[CssStyle.textInsideSettingComponent]}>Training Rest</Text>
        <Text style={[CssStyle.textInfoSetting]}>Between ( 05 - 180) secs</Text>
      </View>

      <View
        style={[
          CssStyle.flexJustify,
          {flex: 1.7, paddingHorizontal: responsiveWidth(1)},
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
            time == 0 ? {} : setTime(time - 10);
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
          <Text
            style={{
              fontSize: 15,
              color: 'white',
              fontFamily: 'Interstate-regular',
            }}>
            sec
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
          onPress={() => (time == 180 ? {} : setTime(time + 10))}>
          <Icon
            name="chevron-forward-outline"
            size={29}
            color={AppColors.buttonText}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.8, alignItems: 'center'}}>
        <CustomButton
          onPress={() => {
            AddTrainingRestTime();
          }}
          activeOpacity={1}
          buttonColor={AppColors.buttonText}
          style={{width: responsiveWidth(78)}}
          buttonText={'Set Time'}
          paddingVertical={1}
        />
      </View>
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
                  paddingVertical: responsiveHeight(4.8),
                  paddingHorizontal: responsiveWidth(6),
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
                  Time Set Successfully
                </Text>

                <View style={[{alignItems: 'center'}]}>
                  <CustomButton
                    buttonText={'Go Back'}
                    onPress={() => {
                      navigation.goBack();
                    }}
                    buttonColor={'transparent'}
                    mode="outlined"
                    fontWeight={'500'}
                    borderColor={'white'}
                    style={{
                      marginTop: responsiveHeight(3.7),
                      width: responsiveWidth(50),
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

export default TrainingRest;

const styles = StyleSheet.create({});
