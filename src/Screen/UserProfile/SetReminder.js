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
import React, {useState} from 'react';
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
import Lottie from 'lottie-react-native';
import assets from '../../assets';
import {TakeCountDownApi} from '../../services/CountDownApi';
import Octicons from 'react-native-vector-icons/Octicons';
import DayOfCount from '../../Helping/DayOfCount';
import {CreateReminder} from '../../services/ReminderApi';

const SetReminder = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const id = useSelector(data => data.id);

  const AddCountDown = async () => {
    setLoading(true);
    try {
      const result = await CreateReminder(id, time, [1, 2, 3]);
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
  const [dataItem, setDataItem] = useState([
    {item: 1},
    {item: 2},
    {item: 1},
    {item: 2},
    {item: 1},
    {item: 2},
    {item: 1},
    {item: 2},
  ]);
  const dayDataActive = [{day: 'M'}, {day: 'W'}, {day: 'Th'}, {day: 'F'}];

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
        <TouchableOpacity
          style={{marginRight: responsiveWidth(2)}}
          onPress={() => navigation.navigate('SetReminder')}>
          <Octicons name="diff-added" size={23} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.3, marginTop: responsiveHeight(5)}}>
        <Text style={[CssStyle.textInsideSettingComponent, {fontSize: 39}]}>
          Set Reminder
        </Text>
        <Text style={[CssStyle.textInfoSetting, {fontSize: 13}]}>
          Choose how often you want to receive workout reminders. Whether you
          prefer daily reminders, every other day, or a custom frequency, we've
          got you covered.
        </Text>
      </View>
      <View style={{flex: 1}}>
        <DayOfCount />
        <View style={[{alignItems: 'center'}]}>
          <CustomButton
            buttonText={'Set Reminder'}
            onPress={() => {
              AddCountDown();
            }}
            fontWeight={'500'}
            borderColor={'white'}
            style={{
              marginTop: responsiveHeight(3.7),
              width: responsiveWidth(75),
              marginBottom: responsiveHeight(1),
            }}
          />
        </View>
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

export default SetReminder;

const styles = StyleSheet.create({});
