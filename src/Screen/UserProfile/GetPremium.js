import {
  FlatList,
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
import {TakeTrainingRest} from '../../services/RestApi';
import {useDispatch, useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import assets from '../../assets';
import {TakeCountDownApi} from '../../services/CountDownApi';
import {CustomModelCenter} from '../../component/CustomModel';
import {
  GetPremiumApi,
  GetPricingApi,
  GetProductApi,
  InitiatePaymentApi,
} from '../../services/AuthScreen';
import Loader from '../../component/Loader';
import LottieGif from '../../Helping/LottieGif';
import InAppPurchase from './InAppPurchase';
import { PaymentPrice } from '../../store/action';

const GetPremium = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [getPriceProductId, setGetPriceProductId] = useState('');

  const [premiumData, setPremiumData] = useState('');
  // const AddCountDown = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await GetPremiumApi(id);
  //     console.log(result.result.user_subscription);
  //     if (result.status == true) {
  //       setLoading(false);
  //       setPremiumData(true);
  //     } else {
  //       console.error(result.message);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  const GetProduct = async () => {
    setLoading(true);
    try {
      const result = await GetProductApi();
      console.log(result.result, 'product');
      if (result.status == true) {
        // setLoading(false);
        // setPremiumData(true);
        GetPricing(result.result[0].id);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const dispatch=useDispatch()
  const GetPricing = async price => {
    // setLoading(true);
    try {
      const result = await GetPricingApi(price);
      console.log(result, 'pricing');
      if (result.status == true) {
        setLoading(false);
        // setPremiumData(true);
        const obj = result.result;
        const itemData = obj.filter(item => item.lookup_key);
        console.log(itemData[0].id, 'filter');
        setGetPriceProductId(itemData[0].id);
        dispatch(PaymentPrice(itemData[0].id))
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // const InitiatePayment = async () => {
  //   // setLoading(true);
  //   try {
  //     const result = await InitiatePaymentApi(id, email, getPriceProductId);
  //     console.log(result, 'initiate payment');
  //     if (result.status == true) {
  //       // setLoading(false);
  //       // setPremiumData(true);
  //       const obj = result.result;
  //       const itemData = obj.filter(item => item.lookup_key);
  //       console.log(itemData[0].id, 'filter');
  //     } else {
  //       console.error(result.message);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    GetProduct();
  }, []);
  const [openRestartModel, setOpenRestartModel] = useState(false);
  const premiumQuality = [
    {item: 'Monthly', id: '$80', month: 'mon'},
    {item: 'Yearly', id: '$700', month: 'year'},
  ];
  const PaymentMethod = () => {
    navigation.navigate('PaymentScreen');
  };
  const [review, setReview] = useState('Monthly');
  const [openModel, setOpenModel] = useState(false);
  return loading ? (
    <Loader />
  ) : (
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

      <View style={{flex: 0.8}}>
        <Text style={[CssStyle.textInsideSettingComponent]}>Go Premium</Text>
        <Text style={[styles.textInfoSetting]}>
          Upgrade your fitness experience with a premium subscription and unlock
          exclusive features to take your workouts to the next level. Subscribe
          today and supercharge your fitness journey!
        </Text>
      </View>

      <View
        style={[
          CssStyle.flexJustify,
          {flex: 3, paddingHorizontal: responsiveWidth(1)},
        ]}>
        <FlatList
          data={premiumQuality}
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
                      width: responsiveWidth(84),
                    },
                  ]}
                  onPress={() => {
                    setReview(item.item), navigation.navigate('PaymentScreen');
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '500',
                      fontFamily: 'Interstate-bold',
                      fontSize: 17,
                    }}>
                    {item.item}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '500',
                      fontFamily: 'Interstate-regular',
                      marginTop: responsiveHeight(2),
                      fontSize: 16,
                      marginBottom: responsiveHeight(2),
                    }}>
                    <Text style={{fontSize: 30, fontFamily: 'Interstate-bold'}}>
                      {item.id}
                    </Text>
                    /{item.month}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 12,
                      lineHeight: responsiveHeight(2.5),
                    }}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View style={{flex: 0.5, alignItems: 'center'}}>
        <CustomButton
          onPress={() => {
            navigation.navigate('AboutFreeTrial');
          }}
          activeOpacity={1}
          buttonColor={AppColors.buttonText}
          style={{width: responsiveWidth(78)}}
          buttonText={'Free 7 DaysTrial'}
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
                  paddingVertical: responsiveHeight(2.5),
                  paddingHorizontal: responsiveWidth(6),
                  alignItems: 'center',
                }}>
                <LottieGif />
                <Text
                  style={[
                    CssStyle.modelTextStyle,
                    {
                      width: responsiveWidth(90),
                    },
                  ]}>
                  Subscription Payed Successfully
                </Text>

                <View
                  style={[
                    {alignItems: 'center', paddingBottom: responsiveHeight(2)},
                  ]}>
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
                      width: responsiveWidth(44),
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <CustomModelCenter
        openModel={openModel}
        setOpenModel={setOpenModel}
        styleBox={{height: responsiveHeight(28.3)}}>
        <Text
          style={[
            CssStyle.headerText,
            {
              paddingTop: responsiveHeight(3),
              textAlign: 'center',
              // width: responsiveWidth(60),
            },
          ]}>
          Confirm Your In-app Purchase
        </Text>
        <Text
          style={[
            CssStyle.dataReset,
            {paddingVertical: responsiveHeight(3), textAlign: 'center'},
          ]}>
          Do you want to buy one coin Doubler for $4.99?
        </Text>
        <View
          style={{
            borderBottomColor: '#00000090',
            borderBottomWidth: 1.4,
            width: responsiveWidth(70),
          }}
        />
        <View style={[CssStyle.flexJustify, {width: responsiveWidth(70)}]}>
          <CustomButton
            styleText={{
              textTransform: 'none',
              letterSpacing: 0.8,
              fontSize: 17,
            }}
            style={{
              width: responsiveWidth(33),
            }}
            colorGradient={['#00000001', '#00000001']}
            fontWeight="bold"
            buttonText={`Cancel`}
            colorText={'#cc66ff'}
            // mode="outlined"
            buttonColor={'transparent'}
            onPress={() => {
              setOpenModel(false);
            }}
          />
          <View
            style={{
              width: 1,
              height: responsiveHeight(7),
              backgroundColor: '#00000030',
            }}
          />
          <CustomButton
            styleText={{
              textTransform: 'none',
              letterSpacing: 0.8,
              fontSize: 17,
            }}
            style={{
              width: responsiveWidth(33),
            }}
            fontWeight="bold"
            buttonText={`Buy`}
            buttonColor="white"
            colorText="#cc66ff"
            // mode='outlined'
            onPress={() => {
              PaymentMethod();
            }}
          />
        </View>
      </CustomModelCenter>
    </LinearGradient>
  );
};

export default GetPremium;

const styles = StyleSheet.create({
  buttonGender: {
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveHeight(1),
    // flexDirection: "row",
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  textInfoSetting: {
    color: 'white',
    marginVertical: responsiveHeight(1),
    marginLeft: responsiveWidth(1),
    lineHeight: responsiveHeight(2.5),
    fontWeight: '400',
    fontSize: 12.37,
  },
});
