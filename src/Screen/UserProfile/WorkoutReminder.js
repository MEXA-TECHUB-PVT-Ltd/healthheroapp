// import {
//   FlatList,
//   Modal,
//   StyleSheet,
//   Switch,
//   Text,
//   ToastAndroid,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {AppColors} from '../../Helping/AppColor';
// import CssStyle from '../../StyleSheet/CssStyle';
// import CustomButton from '../../component/CustomButton';
// import {TakeTrainingRest} from '../../services/RestApi';
// import {useSelector} from 'react-redux';
// import Lottie from 'lottie-react-native';
// import assets from '../../assets';
// import PushNotification, {Importance} from 'react-native-push-notification';
// import {TakeCountDownApi} from '../../services/CountDownApi';
// import Octicons from 'react-native-vector-icons/Octicons';
// import {
//   ActiveReminderApi,
//   GetReminder,
//   InActiveReminderApi,
// } from '../../services/ReminderApi';
// import moment from 'moment';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const WorkoutReminder = ({navigation, route}) => {
//   const {item, itemData} = route.params ? route.params : '';
//   // console.log(itemData);
//   const [dataArrayReminder, setDataArrayReminder] = useState([]);
//   useEffect(() => {
//     GetFromLocal();
//   }, []);
//   // console.log(dataArrayReminder, 'array method');

//   const GetFromLocal = async () => {
//     const result = await AsyncStorage.getItem('dataArray');
//     console.log(result, 'data');
//     setDataArrayReminder(result);
//   };
//   console.log(dataArrayReminder, 'hello');
//   const ActiveReminder = async item => {
//     handleScheduleNotification(item);
//   };
//   const InActiveReminder = async item => {
//     PushNotification.localNotificationSchedule({});
//     PushNotification.cancelLocalNotification({id: item.id});
//   };
//   const createNotificationChannel = () => {
//     PushNotification.createChannel(
//       {
//         channelId: 'channel-id',
//         channelName: 'My channel', // (required)
//         channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
//         playSound: true, // (optional) default: true
//         importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//         vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//       },
//       created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
//     );
//   };
//   const handleScheduleNotification = item => {
//     createNotificationChannel();
//     console.log(item, 'pre defined schq');
//     PushNotification.localNotificationSchedule({
//       channelId: 'channel-id',
//       title: 'Workout Reminder',
//       id: item.id,
//       message: `Do your workout to stay healthy`, // (required)
//       date: new Date(item.time),
//       allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
//       playSound: true,
//       vibrate: true,
//       /* Android Only Properties */
//       repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
//     });
//   };

//   const [openRestartModel, setOpenRestartModel] = useState(false);
//   const toggleAll = itemFlatList => {
//     const newData = dataArrayReminder?.map(item => {
//       if (item?.id == itemFlatList?.id) {
//         if (item?.active_status) {
//           InActiveReminder(item);
//         } else {
//           ActiveReminder(item);
//         }
//         return {
//           ...item,
//           active_status: !item?.active_status,
//         };
//       } else {
//         return {
//           ...item,
//           active_status: item?.active_status,
//         };
//       }
//     });
//     setDataArrayReminder(newData);
//   };

//   return (
//     <LinearGradient
//       colors={['#0A1F58', '#0A1637']}
//       start={{x: 0, y: 0}}
//       end={{x: 0, y: 0.4}}
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         flex: 1,
//         paddingTop: responsiveHeight(3),
//         backgroundColor: '#0A1F58',
//       }}>
//       <View style={[CssStyle.flexJustify, {}]}>
//         <TouchableOpacity
//           style={{marginLeft: responsiveWidth(-3)}}
//           onPress={() => navigation.goBack()}>
//           <Icon
//             name="chevron-back-outline"
//             size={25}
//             style={{padding: '2%'}}
//             color={AppColors.buttonText}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{marginRight: responsiveWidth(2)}}
//           onPress={() => navigation.navigate('SetReminder')}>
//           <Octicons name="diff-added" size={23} color={'white'} />
//         </TouchableOpacity>
//       </View>
//       <View style={{flex: 0.3, marginTop: responsiveHeight(5)}}>
//         <Text
//           style={[
//             CssStyle.textInsideSettingComponent,
//             {fontSize: 33, width: responsiveWidth(90)},
//           ]}>
//           Workout Reminder
//         </Text>
//         <Text style={[CssStyle.textInfoSetting]}>
//           Achieving your fitness goals requires consistency, and our workout
//           reminder feature is designed to help you stay on track.
//         </Text>
//       </View>
//       <View style={{flex: 1}}>
//         {dataArrayReminder?.length > 0 ? (
//           <FlatList
//             data={dataArrayReminder}
//             renderItem={({item, index}) => {
//               return (
//                 <TouchableOpacity
//                   onLongPress={() => {
//                     // dataArrayReminder?.splice(index, 1),
//                     // setDataArrayReminder([...dataArrayReminder]),
//                     ToastAndroid.show('Reminder deleted', ToastAndroid.SHORT);
//                   }}
//                   style={[
//                     CssStyle.flexJustify,
//                     {
//                       marginBottom: responsiveHeight(2.9),
//                       borderRadius: 8,
//                       paddingHorizontal: responsiveWidth(5),
//                       paddingVertical: responsiveHeight(2),
//                       marginTop: responsiveHeight(0.8),
//                       backgroundColor: '#62637790',
//                     },
//                   ]}>
//                   {/* <Text
//                     style={{
//                       color: 'white',
//                       paddingBottom: responsiveHeight(0.5),
//                       fontSize: 21,
//                       fontFamily: 'Interstate-bold',
//                     }}>
//                     {moment(item?.time).format('hh:mm:ss a')}
//                   </Text>
//                   <View style={CssStyle.flexData}>
//                     <View style={CssStyle.flexData}>
//                       {item?.day?.map((itemDay, index) => (
//                         <Text
//                           style={{fontSize: 10, color: 'white'}}
//                           key={index}>
//                           {itemDay == 1
//                             ? 'M'
//                             : itemDay == 2
//                             ? 'T'
//                             : itemDay == 3
//                             ? 'W'
//                             : itemDay == 4
//                             ? 'Th'
//                             : itemDay == 5
//                             ? 'F'
//                             : itemDay == 6
//                             ? 'Sa'
//                             : itemDay == 7
//                             ? 'S'
//                             : itemDay}
//                           ,
//                         </Text>
//                       ))}
//                     </View>
//                     <Switch
//                       style={{marginLeft: responsiveWidth(1)}}
//                       trackColor={{false: '#D8D8D880', true: '#006FFF40'}}
//                       thumbColor={
//                         item?.active_status ? AppColors.buttonText : '#D8D8D8'
//                       }
//                       ios_backgroundColor="#3e3e3e"
//                       onValueChange={() => toggleAll(item)}
//                       value={item?.active_status}
//                     />
//                   </View> */}
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         ) : null}
//       </View>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={openRestartModel}
//         onRequestClose={() => setOpenRestartModel(false)}>
//         <TouchableWithoutFeedback
//           style={{flex: 1}}
//           onPress={() => setOpenRestartModel(false)}>
//           <View style={{flex: 1, backgroundColor: '#00000090'}}>
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'flex-end',
//               }}>
//               <View
//                 style={{
//                   backgroundColor: AppColors.blueColor,
//                   borderTopEndRadius: responsiveHeight(3),
//                   borderTopLeftRadius: responsiveHeight(3),
//                   paddingVertical: responsiveHeight(4.8),
//                   paddingHorizontal: responsiveWidth(6),
//                   alignItems: 'center',
//                 }}>
//                 <View
//                   // activeOpacity={1}
//                   style={{
//                     // height: wp(28),
//                     width: 90,
//                     // backgroundColor: 'red',
//                     aspectRatio: 1,
//                     alignSelf: 'center',
//                     marginTop: responsiveHeight(1),
//                   }}>
//                   <Lottie
//                     source={assets.loader}
//                     autoPlay
//                     loop={true}
//                     resizeMode="cover"
//                     speed={1}
//                     colorFilter={[{color: 'red'}]}
//                   />
//                 </View>
//                 <Text
//                   style={{
//                     color: 'white',
//                     fontSize: 23,
//                     fontFamily: 'Interstate-regular',
//                     width: responsiveWidth(75),
//                     textAlign: 'center',
//                     lineHeight: responsiveHeight(4),
//                     marginTop: responsiveHeight(4),
//                     textTransform: 'capitalize',
//                   }}>
//                   Time Set Successfully
//                 </Text>

//                 <View style={[{alignItems: 'center'}]}>
//                   <CustomButton
//                     buttonText={'Go Back'}
//                     onPress={() => {
//                       navigation.goBack();
//                     }}
//                     buttonColor={'transparent'}
//                     mode="outlined"
//                     fontWeight={'500'}
//                     borderColor={'white'}
//                     style={{
//                       marginTop: responsiveHeight(3.7),
//                       width: responsiveWidth(50),
//                     }}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </LinearGradient>
//   );
// };

// export default WorkoutReminder;

// const styles = StyleSheet.create({});




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
import PushNotification, {Importance} from 'react-native-push-notification';
import {TakeCountDownApi} from '../../services/CountDownApi';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  ActiveReminderApi,
  GetReminder,
  InActiveReminderApi,
} from '../../services/ReminderApi';
import moment from 'moment';

const WorkoutReminder = ({navigation, route}) => {
  const {item, itemData} = route.params ? route.params : '';
  // console.log(itemData);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(13);
  const id = useSelector(data => data.id);
  const [reminderData, setReminderData] = useState([]);
  const [dataArrayReminder, setDataArrayReminder] = useState([]);
  useEffect(() => {
    itemData == undefined
      ? setDataArrayReminder([])
      : dataArrayReminder.push(itemData);
    setDataArrayReminder([...dataArrayReminder]);
  }, [itemData]);
  console.log(dataArrayReminder, 'array method');
  // useEffect(() => {
  //   var mount = true;
  //   const listener = navigation.addListener('focus', async () => {
  //     setLoading(true);
  //     try {
  //       const result = await GetReminder(id);
  //       // console.log(result, 'get reminder');
  //       if (result.status == true) {
  //         setLoading(false);
  //         setReminderData(result.result);
  //         // setOpenRestartModel(true);
  //       } else {
  //         console.error(result.message);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       setLoading;
  //       console.log(error);
  //     }
  //   });
  //   return () => {
  //     listener;
  //     mount = false;
  //   };
  // }, []);
  // const GetReminderProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await GetReminder(id);
  //     // console.log(result.result, 'get reminder');
  //     if (result.status == true) {
  //       setLoading(false);
  //       setReminderData(result.result);
  //       // setOpenRestartModel(true);
  //     } else {
  //       console.error(result.message);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading;
  //     console.log(error);
  //   }
  // };
  const ActiveReminder = async item => {
    handleScheduleNotification(item);
  };
  const InActiveReminder = async item => {
    PushNotification.localNotificationSchedule({});
    PushNotification.cancelLocalNotification({id: item.id});
  };
  // useEffect(() => {
  //   GetReminderProfile();
  // }, []);
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
  // localNotification
  const handleScheduleNotification = item => {
    createNotificationChannel();
    console.log(new Date(`${item.time}`), 'pre defined schq');
    PushNotification.localNotificationSchedule({
      channelId: 'channel-id',
      title: 'Workout Reminder',
      id: '9',
      message: `Do your workout to stay healthy`, // (required)
      date: new Date(item.time),
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      playSound: true,
      vibrate: true,
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  };

  const [openRestartModel, setOpenRestartModel] = useState(false);
  const toggleAll = itemFlatList => {
    const newData = dataArrayReminder?.map(item => {
      if (item?.id == itemFlatList?.id) {
        if (item?.active_status) {
          InActiveReminder(item);
        } else {
          ActiveReminder(item);
        }
        return {
          ...item,
          active_status: !item?.active_status,
        };
      } else {
        return {
          ...item,
          active_status: item?.active_status,
        };
      }
    });
    setDataArrayReminder(newData);
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
        {dataArrayReminder.length > 0 ? (
          <FlatList
            data={dataArrayReminder}
            renderItem={({item, index}) => {
              console.log(item);
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
                    {moment(item.time).format('hh:mm:ss a')}
                  </Text>
                  <View style={CssStyle.flexData}>
                    <View style={CssStyle.flexData}>
                      {item?.day.map((itemDay, index) => (
                        <Text
                          style={{fontSize: 10, color: 'white'}}
                          key={index}>
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
                        item?.active_status ? AppColors.buttonText : '#D8D8D8'
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => toggleAll(item)}
                      value={item?.active_status}
                    />
                  </View>
                </View>
              );
            }}
          />
        ) : null}
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