import {
  FlatList,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
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
import PushNotification, {Importance} from 'react-native-push-notification';
import CustomButton from '../../component/CustomButton';
import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import assets from '../../assets';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {DayOfCount} from '../../Helping/DayOfCount';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastContainer from '../../Helping/ToastContainer';

const SetReminder = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  // console.log(item, 'helo');
  const [date, setDate] = useState(false);
  const [takeTime, setTakeTime] = useState(item?.time ? item?.time : '');
  const [apiTime, setApiTime] = useState(item?.time ? item?.item : new Date());

  const [openRestartModel, setOpenRestartModel] = useState(false);
  const dayDataActive = [
    {day: 'M'},
    {day: 'T'},
    {day: 'W'},
    {day: 'Th'},
    {day: 'F'},
    {day: 'Sa'},
    {day: 'S'},
  ];
  const [selectItem, setSelectItem] = useState(item ? item?.day : []);

  const getExistingData = async () => {
    try {
      const existingData = await AsyncStorage.getItem('data');
      return existingData !== null ? JSON.parse(existingData) : [];
    } catch (error) {
      console.log('Error retrieving existing data:', error);
      return [];
    }
  };
  const storeData = async newData => {
    console.log(newData);
    try {
      const existingData = await getExistingData();
      const updatedData = [...existingData, newData];
      await AsyncStorage.setItem('data', JSON.stringify(updatedData));
      console.log('Data stored successfully.');
      navigation.goBack();
      handleScheduleNotification(newData);
    } catch (error) {
      console.log('Error storing data:', error);
    }
  };

  const createNotificationChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id',
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  const handleScheduleNotification = item => {
    createNotificationChannel();
    // console.log(new Date(`${item.time}`), 'pre defined schq');
    PushNotification.localNotificationSchedule({
      channelId: 'channel-id',
      title: 'Workout Reminder',
      id: item.id,
      message: `Do your workout to stay healthy`, // (required)
      date: new Date(item.time),
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      playSound: true,
      vibrate: true,
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  };
  const updateData = async (id, updatedProperties) => {
    // console.log(id, updatedProperties, 'hello');
    try {
      const existingData = await getExistingData();
      // Find the item with the same ID
      const updatedData = existingData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedProperties,
          };
        }
        return item;
      });
      await AsyncStorage.setItem('data', JSON.stringify(updatedData));
      console.log('Data updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.log('Error updating data:', error);
    }
  };
  // useEffect(() => {
  //   getAsyncDat();
  // }, []);
  // const getAsyncDat = async () => {
  //   const result = await AsyncStorage.getItem('data');
  //   console.log(result, 'shdasdfs sdf');
  // };

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
      <View style={{flex: 0.32, marginTop: responsiveHeight(5)}}>
        <Text style={[CssStyle.textInsideSettingComponent, {fontSize: 39}]}>
          Set Reminder
        </Text>
        <Text style={[CssStyle.textInfoSetting, {fontSize: 13}]}>
          Choose how often you want to receive workout reminders. Whether you
          prefer daily reminders, every other day, or a custom frequency, we've
          got you covered.
        </Text>
      </View>
      <View>
        {/* <CustomButton buttonText={'Pick time'} onPress={() => setDate(true)} /> */}
        <TouchableOpacity
          onPress={() => setDate(true)}
          style={[
            {
              marginBottom: responsiveHeight(2.9),
              borderRadius: 8,
              paddingHorizontal: responsiveWidth(5),
              paddingVertical: responsiveHeight(2),
              marginTop: responsiveHeight(3),
              backgroundColor: '#62637790',
              alignItems: 'center',
            },
          ]}>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
            }}>
            {/* {moment(takeTime).format('hh:mm:ss a')} */}
            {takeTime
              ? moment(takeTime).format('hh:mm:ss a')
              : new Date().toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.7}}>
        <View
          style={[
            {
              marginBottom: responsiveHeight(2.9),
              borderRadius: 8,
              paddingHorizontal: responsiveWidth(5),
              paddingVertical: responsiveHeight(2),
              marginTop: responsiveHeight(0.8),
              backgroundColor: '#62637790',
            },
          ]}>
          <View
            style={[CssStyle.flexJustify, {paddingTop: responsiveHeight(1.9)}]}>
            {dayDataActive.map((item, index) => (
              <DayOfCount
                key={index}
                selectItem={selectItem}
                setSelectItem={setSelectItem}
                item={item}
                index={index}
              />
            ))}
          </View>
        </View>

        <View style={[{alignItems: 'center'}]}>
          <CustomButton
            buttonText={'Set Reminder'}
            onPress={() => {
              apiTime && selectItem.length > 0
                ? setOpenRestartModel(true)
                : Toast.show({text2: 'Select Day to set reminder'});
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
      <DatePicker
        modal
        open={date}
        date={new Date()}
        mode="time"
        onCancel={() => setDate(false)}
        onConfirm={date => {
          console.log(moment(date).format('hh:mm:ss a'));
          setTakeTime(date);
          setDate(false);
          setApiTime(date);
          moment(date).format('hh:mm:ss');
        }}
      />
      {/* {console.log(apiTime, 'asdf')} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={openRestartModel}
        // onRequestClose={() => setOpenRestartModel(false)}
      >
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
                  fontSize: 21,
                  fontFamily: 'Interstate-regular',
                  width: responsiveWidth(75),
                  textAlign: 'center',
                  lineHeight: responsiveHeight(4),
                  marginTop: responsiveHeight(4),
                  textTransform: 'capitalize',
                }}>
                Workout Reminder Set Successfully
              </Text>
              <View style={[{alignItems: 'center'}]}>
                <CustomButton
                  buttonText={'Go Back'}
                  onPress={() => {
                    // navigation.navigate('WorkoutReminder', {
                    //   itemData: {
                    //     time: apiTime,
                    //     day: selectItem.map(item => item.id + 1),
                    //     id: Math.floor(Math.random() * 10),
                    //     active_status: false,
                    //   },
                    // }),
                    setOpenRestartModel(false),
                      !item
                        ? storeData({
                            time: apiTime,
                            day: selectItem.map(item => item.id + 1),
                            id: Math.floor(Math.random() * 10),
                            active_status: true,
                          })
                        : updateData(item.id, {
                            time: apiTime,
                            day: selectItem.map(item => item.id + 1),
                            id: item?.id
                              ? item?.id
                              : Math.floor(Math.random() * 10),
                            active_status: true,
                          });
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
      </Modal>
      <ToastContainer />
    </LinearGradient>
  );
};

export default SetReminder;

const styles = StyleSheet.create({});
