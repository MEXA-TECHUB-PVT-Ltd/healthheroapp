import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
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
import {useSelector} from 'react-redux';
import {GetUserDetailApi} from '../../services/AuthScreen';
import Loader from '../../component/Loader';

const SelectPlan = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  const [loading, setLoading] = useState(false);
  const id = useSelector(data => data.id);
  const [userData, setGetUserDetailData] = useState('');

  useEffect(() => {
    item?.activity_status ? item?.activity_status : GetUserDetail();
  }, []);
  const GetUserDetail = async () => {
    setLoading(true);
    try {
      const result = await GetUserDetailApi(id);
      console.log(result,'this is the performance');
      if (result.status == true) {
        setLoading(false);
        setGetUserDetailData(result.result);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const gender = [
    {item: 'balance', id: 1},
    {item: 'mildWeightLoss', id: 2},
    {item: 'mildWeightGain', id: 3},
  ];
  const [review, setReview] = useState(item ? item?.purpose : '');

  return loading ? (
    <Loader />
  ) : (
    <LinearGradient
      colors={['#0A1F58', '#0A1637']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.4}}
      style={{
        paddingHorizontal: responsiveWidth(5),
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
      <View style={{marginTop: responsiveHeight(4), flex: 0.4}}>
        <Text style={[CssStyle.textInsideSettingComponent, {fontSize: 41}]}>
          Select Plan Type
        </Text>
        <Text
          style={[
            CssStyle.textInfoSetting,
            {
              lineHeight: responsiveHeight(3),
              paddingTop: responsiveHeight(1),
              fontSize: 13,
              letterSpacing: 0.4,
            },
          ]}>
          To help you reach your fitness goals, we offer a variety of workout
          plan types tailored to different objectives and preferences.
        </Text>
      </View>
      <View style={{flex: 0.7}}>
        <FlatList
          data={gender}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={{}}>
                <TouchableOpacity
                  style={[
                    styles.buttonGender,
                    {
                      backgroundColor:
                        review !== item.item ? '#626377' : '#0A1F58',
                      borderColor:
                        review !== item.item ? '#626377' : AppColors.buttonText,
                      borderWidth: 1,
                    },
                  ]}
                  onPress={() => {
                    setReview(item.item);
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Interstate-regular',
                      fontSize: 16,
                    }}>
                    {item.item}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          paddingTop: responsiveHeight(2),
          flex: 0.3,
        }}>
        <CustomButton
          onPress={() =>
            review
              ? navigation.navigate('NutritionGender', {
                  planType: {review},
                  updateData: item,
                  userData,
                })
              : ToastAndroid.show('Please Select One', ToastAndroid.SHORT)
          }
          activeOpacity={1}
          buttonColor={AppColors.buttonText}
          style={{width: responsiveWidth(78)}}
          buttonText={'Continue'}
          paddingVertical={1}
        />
      </View>
    </LinearGradient>
  );
};

export default SelectPlan;

const styles = StyleSheet.create({
  buttonGender: {
    paddingVertical: responsiveHeight(2.6),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveHeight(1),
    // flexDirection: "row",
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
});
