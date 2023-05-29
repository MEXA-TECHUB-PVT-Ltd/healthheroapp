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
import Lottie from 'lottie-react-native';
import assets from '../../assets';
import {TakeCountDownApi} from '../../services/CountDownApi';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  ActiveReminderApi,
  GetReminder,
  InActiveReminderApi,
} from '../../services/ReminderApi';
import moment from 'moment';

const WorkoutReminder = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(13);
  const id = useSelector(data => data.id);
  const [reminderData, setReminderData] = useState([]);
  useEffect(() => {
    var mount = true;
    const listener = navigation.addListener('focus', async () => {
      setLoading(true);
      try {
        const result = await GetReminder(id);
        // console.log(result, 'get reminder');
        if (result.status == true) {
          setLoading(false);
          setReminderData(result.result);
          // setOpenRestartModel(true);
        } else {
          console.error(result.message);
          setLoading(false);
        }
      } catch (error) {
        setLoading;
        console.log(error);
      }
    });
    return () => {
      listener;
      mount = false;
    };
  }, []);
  const GetReminderProfile = async () => {
    setLoading(true);
    try {
      const result = await GetReminder(id);
      console.log(result.result, 'get reminder');
      if (result.status == true) {
        setLoading(false);
        setReminderData(result.result);
        // setOpenRestartModel(true);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading;
      console.log(error);
    }
  };
  const ActiveReminder = async id => {
    // console.log(id);
    setLoading(true);
    try {
      const result = await ActiveReminderApi(id);
      // console.log(result, 'active to indicatore', id);
      if (result.status == true) {
        setLoading(false);
        // setReminderData(result.result);
        // setOpenRestartModel(true);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading;
      console.log(error);
    }
  };
  const InActiveReminder = async id => {
    // console.log(id);
    // setLoading(true);
    try {
      const result = await InActiveReminderApi(id);
      console.log(result, 'in active to statuc');
      if (result.status == true) {
        // setLoading(false);
        // setReminderData(result.result);
        // setOpenRestartModel(true);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading;
      console.log(error);
    }
  };
  useEffect(() => {
    GetReminderProfile();
  }, []);

  const [openRestartModel, setOpenRestartModel] = useState(false);
  const [dataItem, setDataItem] = useState([{item: 1}, {item: 2}]);
  const dayDataActive = [{day: 'M'}, {day: 'W'}, {day: 'Th'}, {day: 'F'}];
  const [checked, setChecked] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  // const Pickup = () => {};
  // console.log('not allowed');
  const toggleAll = itemFlatList => {
    // console.log(itemFlatList.reminder_id);
    const newData = reminderData?.map(item => {
      // if (item.id == id) {
      if (item?.reminder_id == itemFlatList.reminder_id) {
        if (item.active_status) {
          InActiveReminder(item.reminder_id);
        } else {
          ActiveReminder(item.reminder_id);
          // console.log('false and switch');
        }
        return {
          ...item,
          active_status: !item.active_status,
        };
      } else {
        // console.log(' else wala');
        return {
          ...item,
          active_status: item.active_status,
        };
      }
    });
    setReminderData(newData);
    // console.log(newData);
    // console.log(newData,'fsajdf');
    // setMuteAll(true);

    // item.active_status
    //   ? (setMuteAll(false), InActiveReminder(item.reminder_id))
    //   : (setMuteAll(true), ActiveReminder(item.reminder_id));
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
        <Text
          style={[
            CssStyle.textInsideSettingComponent,
            {fontSize: 33, width: responsiveWidth(90)},
          ]}>
          Workout Reminder
        </Text>
        <Text style={[CssStyle.textInfoSetting]}>
          Achieving your fitness goals requires consistency, and our workout
          reminder feature is designed to help you stay on track.
        </Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={reminderData}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  CssStyle.flexJustify,
                  {
                    marginBottom: responsiveHeight(2.9),
                    borderRadius: 8,
                    paddingHorizontal: responsiveWidth(5),
                    paddingVertical: responsiveHeight(2),
                    marginTop: responsiveHeight(0.8),
                    backgroundColor: '#62637790',
                  },
                ]}>
                <Text
                  style={{
                    color: 'white',
                    paddingBottom: responsiveHeight(0.5),
                    fontSize: 21,
                    fontFamily: 'Interstate-bold',
                  }}>
                  {new Date(
                    new Date().toLocaleDateString().replace(/['/']/g, '-') +
                      'T' +
                      item.time,
                  ).toLocaleTimeString()}
                </Text>
                <View style={CssStyle.flexData}>
                  <View style={CssStyle.flexData}>
                    {item?.days.map((itemDay, index) => (
                      <Text style={{fontSize: 10, color: 'white'}} key={index}>
                        {itemDay == 1
                          ? 'M'
                          : itemDay == 2
                          ? 'T'
                          : itemDay == 3
                          ? 'W'
                          : itemDay == 4
                          ? 'Th'
                          : itemDay == 5
                          ? 'F'
                          : itemDay == 6
                          ? 'Sa'
                          : itemDay == 7
                          ? 'S'
                          : itemDay}
                        ,
                      </Text>
                    ))}
                  </View>
                  <Switch
                    style={{marginLeft: responsiveWidth(1)}}
                    trackColor={{false: '#D8D8D880', true: '#006FFF40'}}
                    thumbColor={
                      item.active_status ? AppColors.buttonText : '#D8D8D8'
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleAll(item)}
                    value={item.active_status}
                  />
                </View>
              </View>
            );
          }}
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

export default WorkoutReminder;

const styles = StyleSheet.create({});
