import {
  FlatList,
  Modal,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
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
import {CreateReminder} from '../../services/ReminderApi';
import moment from 'moment';
import {DayOfCount} from '../../Helping/DayOfCount';
import DatePicker from 'react-native-date-picker';

const SetReminder = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const id = useSelector(data => data.id);
  const [date, setDate] = useState(false);
  const [takeTime, setTakeTime] = useState('');
  const [getReminderId, setGetReminderId] = useState('');
  const [apiTime, setApiTime] = useState(new Date());
  const [dataArrayReminder, setDataArrayReminder] = useState([]);
  // console.log(new Date(+32).toTimeString());
  const CreateReminderInProfile = () => {
    dataArrayReminder.push({
      time: apiTime,
      day: selectItem.map(item => item.id + 1),
    });
    setDataArrayReminder([...dataArrayReminder]);
    console.log(dataArrayReminder);
    setOpenRestartModel(true);
    // selectItem([]);
    // setLoading(true);
    // try {
    //   const result = await CreateReminder(
    //     id,
    //     apiTime?.slice(0, 8),
    //     selectItem.map(item => item.id + 1),
    //   );
    //   console.log(result);
    //   if (result.status == true) {
    //     setLoading(false);
    //     setGetReminderId(result.result);
    //     setSelectItem([]);
    //   } else {
    //     console.error(result.message);
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   setLoading;
    //   console.log(error);
    // }
    // const result = selectItem.map(item => item);
    // console.log(result);
    // console.log(id, apiTime?.slice(0, 8), [1, 2, 3]);
  };
//   const currentTime = new Date();
// const futureTime = new Date(currentTime.getTime() + 1 * 60000);

// console.log(futureTime);

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
  const dayDataActive = [
    {day: 'M'},
    {day: 'T'},
    {day: 'W'},
    {day: 'Th'},
    {day: 'F'},
    {day: 'Sa'},
    {day: 'S'},
  ];
  const [selectItem, setSelectItem] = useState([]);
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
                : ToastAndroid.show('Please select day', ToastAndroid.SHORT);
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
      {console.log(apiTime, 'asdf')}
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
                    navigation.navigate('WorkoutReminder', {
                      itemData: {
                        time: apiTime,
                        day: selectItem.map(item => item.id + 1),
                        id: Math.random() * 1,
                        active_status: false,
                      },
                    }),
                      setOpenRestartModel(false);
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
    </LinearGradient>
  );
};

export default SetReminder;

const styles = StyleSheet.create({});
