import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppColors} from '../../Helping/AppColor';
import CssStyle from '../../StyleSheet/CssStyle';
import CustomButton from '../../component/CustomButton';
import {TakeTrainingRest} from '../../services/RestApi';
import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import assets from '../../assets';
import {TakeCountDownApi} from '../../services/CountDownApi';
import LottieGif from '../../Helping/LottieGif';

const AboutFreeTrial = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(13);
  const id = useSelector(data => data.id);
  const AddCountDown = async () => {
    setLoading(true);
    try {
      const result = await TakeCountDownApi(id, time);
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
  const freeTrial = [{item: 1}, {item: 1}, {item: 1}, {item: 1}, {item: 1}];
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
        <TouchableOpacity style={{}} onPress={() => navigation.navigate('Faq')}>
          <AntDesign
            name="questioncircleo"
            size={25}
            style={{padding: '2%'}}
            color={AppColors.buttonText}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginTop: responsiveHeight(5)}}>
        <Text style={[CssStyle.textInsideSettingComponent]}>
          About Free Trial
        </Text>
        <Text
          style={[CssStyle.textInfoSetting, {lineHeight: responsiveHeight(3)}]}>
          Experience all the premium features and benefits of our app with a
          free trial. Take advantage of this opportunity to kickstart your
          fitness journey.
        </Text>
      </View>
      <View style={[{flex: 1.3, paddingHorizontal: responsiveWidth(1)}]}>
        <Text
          style={{
            fontSize: 22,
            color: 'white',
            fontFamily: 'Interstate-bold',
            marginBottom: responsiveHeight(1.8),
          }}>
          Features
        </Text>
        {freeTrial.map((item, index) => (
          <View
            style={[{flexDirection: 'row', marginBottom: responsiveHeight(1)}]}>
            <View
              style={{
                width: 9,
                height: 9,
                borderRadius: 13,
                marginTop: responsiveHeight(0.8),
                backgroundColor: AppColors.buttonText,
                marginRight: responsiveWidth(2),
              }}
            />
            <Text style={{color: 'white', fontSize: 12, opacity: 0.7}}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et
            </Text>
          </View>
        ))}
      </View>
      <View style={{flex: 0.8, alignItems: 'center'}}>
        <CustomButton
          onPress={() => {
            AddCountDown();
          }}
          activeOpacity={1}
          buttonColor={AppColors.buttonText}
          style={{width: responsiveWidth(78)}}
          buttonText={'Free 7 Days Trial'}
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
                  alignItems: 'center',
                }}>
                <LottieGif />
                <Text
                  style={CssStyle.modelTextStyle}>
                  Free trial subscribed Successfully
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

export default AboutFreeTrial;

const styles = StyleSheet.create({});
