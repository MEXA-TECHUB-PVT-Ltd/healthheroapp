import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {
  UpdateFirstDayInWeekApi,
  AddWeeklyDataApi,
  AddFirstDayInWeekApi,
  UpdateWeeklyDataApi,
} from '../../services/WeeklyGoal';
import Lottie from 'lottie-react-native';
import assets from '../../assets';
import CssStyle from '../../StyleSheet/CssStyle';
import {AppColors} from '../../Helping/AppColor';
import {Line} from '../../component/Line';
import CustomButton from '../../component/CustomButton';
import Input from '../../component/Input';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import ToastContainer from '../../Helping/ToastContainer';
import LottieGif from '../../Helping/LottieGif';

const EditWeeklyGoal = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item, 'shle');
  const [loading, setLoading] = useState(false);
  const id = useSelector(data => data);
  const [openRestartModel, setOpenRestartModel] = useState(false);
  const foodType = [
    {item: 'Mon', id: 1},
    {item: 'Tue', id: 2},
    {item: 'Wed', id: 3},
    {item: 'Thu', id: 4},
    {item: 'Fri', id: 5},
    {item: 'Sat', id: 6},
    {item: 'Sun', id: 7},
  ];
  const filterDay = foodType?.filter(
    data => data.id == item?.first_day_of_week,
  );
  // console.log(filterDay, 'sdhf');
  const [typeDateFood, setTypeFood] = useState(
    filterDay ? filterDay[0]?.item : '',
  );
  // const measureType = [{item: 'Food 1'}, {item: 'Food 2'}, {item: 'Food 3'}];
  const [measureModel, setMeasureModel] = useState(false);
  const [foodModel, setFoodModel] = useState(false);
  const [indexNumber, setIndexNumber] = useState('');
  const [noOfDays, setNoOfDays] = useState(item ? `${item?.no_of_days}` : '');
  const [data, setData] = useState('');

  const PostWeeklyReportUser = async () => {
    setLoading(true);
    try {
      const result = await (item
        ? UpdateWeeklyDataApi(
            id.id,
            noOfDays,
            // moment(new Date()).format('YYYY-MM-DD'),
          )
        : AddWeeklyDataApi(
            id.id,
            noOfDays,
            moment(new Date()).format('YYYY-MM-DD'),
          ));
      console.log(result, 'add weekly data');
      if (result.status == true) {
        setLoading(false);
        setOpenRestartModel(true);
        SetFirstDayWeekUser();
        setNoOfDays('');
      } else {
        setData('FromSeven');
        setLoading(false);
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const SetFirstDayWeekUser = async () => {
    setLoading(true);
    try {
      const result = await (item
        ? UpdateFirstDayInWeekApi(id.id, indexNumber + 1)
        : AddFirstDayInWeekApi(id.id, indexNumber + 1));
      console.log(result, 'this is first ');
      if (result.status == true) {
        setLoading(false);
        // setData('First Week');
        // setOpenRestartModel(true);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setData('');
    }, 2500);
  }, [data]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(), setFoodModel(false);
      }}>
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
        <View style={{marginTop: responsiveHeight(3), flex: 0.5}}>
          <Text
            style={[
              CssStyle.textInsideSettingComponent,
              {fontSize: responsiveFontSize(5.4)},
            ]}>
            Edit Weekly Goal
          </Text>
          <Text
            style={[
              CssStyle.textInfoSetting,
              {
                lineHeight: responsiveHeight(3),
                paddingTop: responsiveHeight(1),
                fontSize: responsiveFontSize(1.6),
              },
            ]}>
            To accurately track your nutrition and provide personalized
            recommendations, please enter the details of the food you have
            consumed.
          </Text>
        </View>
        <View style={{flex: 0.9}}>
          <Input
            bgColor={'#515C7A'}
            placeholder={'Number of days'}
            noIcon={true}
            height={responsiveHeight(6.5)}
            value={noOfDays}
            keyboardType="numeric"
            onChangeText={e => setNoOfDays(e)}
            fontSize={16}
            style={{marginTop: responsiveHeight(1)}}
          />
          {data == 'FromSeven' && (
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontFamily: 'Interstate-regular',
              }}>
              Enter the number from 1 to 7
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setFoodModel(!foodModel), Keyboard.dismiss();
            }}
            style={[
              CssStyle.flexJustify,
              {
                backgroundColor: '#515C7A',
                borderRadius: responsiveWidth(7),
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(1.6),
                zIndex: measureModel ? 0 : 999,
                marginVertical: responsiveHeight(2),
              },
            ]}>
            <Text style={{color: 'white'}}>
              {typeDateFood ? typeDateFood : 'First day of week'}
            </Text>
            <Icon name="chevron-down-outline" size={25} color="white" />
          </TouchableOpacity>
          {foodModel ? (
            <ScrollView
              style={[
                CssStyle.shadow,
                styles.modelOpenData,
                {
                  top: responsiveHeight(15),
                },
              ]}>
              {foodType.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      setTypeFood(item.item),
                        setFoodModel(false),
                        setIndexNumber(index);
                    }}
                    style={{
                      paddingVertical: responsiveHeight(1),
                      backgroundColor:
                        item.item == typeDateFood
                          ? AppColors.buttonText
                          : 'transparent',
                    }}>
                    <Text
                      style={{
                        color:
                          item.item == typeDateFood ? 'white' : AppColors.text,
                        marginLeft: responsiveWidth(3),
                      }}>
                      {item.item}
                    </Text>
                  </TouchableOpacity>
                  <Line />
                </View>
              ))}
            </ScrollView>
          ) : null}
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingTop: responsiveHeight(2),
            flex: 0.3,
            zIndex: foodModel ? -99 : 0,
          }}>
          <CustomButton
            loading={loading}
            onPress={() =>
              indexNumber + 1 || noOfDays
                ? PostWeeklyReportUser()
                : Toast.show({text2: 'Please fill the required data'})
            }
            activeOpacity={1}
            buttonColor={AppColors.buttonText}
            style={{width: responsiveWidth(78)}}
            buttonText={item ? 'Edit' : 'Add'}
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
                  paddingVertical: responsiveHeight(4.8),
                }}>
                <LottieGif />
                <Text style={CssStyle.modelTextStyle}>
                  {data
                    ? 'First Week Added Successfully'
                    : 'Weekly Goal Added Successfully'}
                </Text>
                <CustomButton
                  buttonText={'Go Back'}
                  onPress={() => {
                    setOpenRestartModel(false), navigation.goBack();
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
              </View>
            </View>
          </View>
        </Modal>
        <ToastContainer />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default EditWeeklyGoal;

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
    borderWidth: 1,
    borderColor: '#eee',
    borderBottomEndRadius: responsiveWidth(2),
    borderBottomLeftRadius: responsiveWidth(2),
    backgroundColor: 'white',
    marginHorizontal: responsiveWidth(0.1),
    elevation: 1,
    position: 'absolute',
    width: responsiveWidth(87.8),
    top: responsiveHeight(4),
    paddingTop: responsiveHeight(4),
    paddingBottom: responsiveHeight(1),
  },
});
