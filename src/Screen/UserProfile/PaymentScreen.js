import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  initStripe,
  StripeProvider,
  usePaymentSheet,
} from '@stripe/stripe-react-native';
import {CardField, createToken, useStripe} from '@stripe/stripe-react-native';
// import {get_stripe_payment_detail} from '../../../api/StripeApis';
// import Loader from '../../../components/Loader/Loader';
import {useSelector} from 'react-redux';
// import {Snackbar} from 'react-native-paper';
// import {appImages} from '../../../constant/images';
// import TranslationStrings from '../../../utills/TranslationStrings';
// import CustomHeader from '../../../components/Header/CustomHeader';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import CustomModal from '../../../components/Modal/CustomModal';
// import {
//   create_order_Listings,
//   create_order_Listings_new,
//   create_order_Transcation_Listings,
// } from '../../../api/Offer';
// import {
//   post_Promotions_new,
//   post_verification_detail,
//   send_new_banner_req_to_admin,
//   send_new_verification_req_to_admin,
// } from '../../../api/Sales&Promotions';
// import {get_specific_user_detail} from '../../../api/GetApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InitiatePaymentApi} from '../../services/AuthScreen';
import {AppColors} from '../../Helping/AppColor';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../component/Loader';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LottieGif from '../../Helping/LottieGif';
import CssStyle from '../../StyleSheet/CssStyle';
import CustomButton from '../../component/CustomButton';
// import {BASE_URL} from '../../../utills/ApiRootUrl';
// import Colors from '../../../utills/Colors';

// import {'pk_test_51Ml3wJGui44lwdb4K6apO4rnFrF2ckySwM1TfDcj0lVdSekGOVGrB1uHNlmaO7wZPxwHfRZani73KlHQKOiX4JmK00E0l7opJO'} from '../../../utills/paymentKeys';
// import {async} from 'regenerator-runtime';
// import {
//   store_subscription_history,
//   updateListingDetails,
// } from '../../../api/PostApis';
// import firestore from '@react-native-firebase/firestore';

const PaymentScreen = ({navigation, route}) => {
  const [loading1, setLoading1] = useState(false);
  const {priceId} = route.params ? route.params : '';
  const [openRestartModel, setOpenRestartModel] = useState(false);
  const id = useSelector(data => data.id);
  const email = useSelector(data => data.EmailRegisteredId);
  const InitiatePayment = async () => {
    // setLoading(true);
    try {
      const result = await InitiatePaymentApi(id, email, priceId);
      console.log(result, 'initiate payment');
      if (result.status == true) {
        // setLoading(false);
        // setPremiumData(true);
        const obj = result.result;
        const itemData = obj.filter(item => item.lookup_key);
        console.log(itemData[0].id, 'filter');
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const [currentPaymentIntent, setCurrentPaymentIntent] = useState('');

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  //__________________________Strip Payment______________________________________________
  const {confirmPayment} = useStripe();
  const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();
  var STRIPE_SECRET =
    'sk_test_51LBHZlD3bKBAJ7JYAZ0srL3kzolrDimk4jkf1wdlTg7UDbdW6qeXIiEq39LPXMTtBWy9fbKtH4MRJplQ8WUHenk200sOQNhoia';
  var STRIPE_PUBLISHABLE =
    'pk_test_51LBHZlD3bKBAJ7JYR7mdm55rp8g7UHvTPANhR2wih3CYqoAGit0GRwrDVBrGQ9yGh5IJsfWRgLaDYMaRZo3SckBr00JyR1Ydbt';
  const initializePaymentSheet = async item => {
    try {
      setLoading1(true);
      initStripe({
        publishableKey: STRIPE_PUBLISHABLE,
      });
      const {paymentIntent, ephemeralKey, customer} =
        await fetchPaymentSheetParams(item);
      const {error} = await initPaymentSheet({
        appearance: {
          shapes: {
            borderRadius: 12,
            borderWidth: 0.5,
          },
          primaryButton: {
            shapes: {
              borderRadius: 20,
            },
          },
          colors: {
            primary: '#000000',
            background: AppColors.blueColor,
            componentBackground: AppColors.blueColor,
            componentBorder: '#ffffff',
            componentDivider: '#ffffff',
            primaryText: '#ffffff',
            secondaryText: '#ffffff',
            componentText: '#ffffff',
            placeholderText: '#ffffff',
          },
        },
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: 'HealthHero',
      }).catch(err => {
        console.log('err : ', err);
      });

      if (error) {
        console.log('Error Code : ', error.code, error.message);
      } else {
        console.log('ready');
        openPaymentSheet();
      }
      // setLoading1(false);
    } catch (error) {
      console.log('Error catch : ', error);
    }
  };
  const fetchPaymentSheetParams = async item => {
    try {
      let obj = {
        id,
        email,
        priceId,
      };

      console.log('obj : ', obj);

      let response = await InitiatePaymentApi(obj);
      //   console.log(response, 'this is the response');
      let response1 = await response?.result;
      let paymentIntent = await response1?.subscription_client_secret;
      let ephemeralKey = await response1?.ephemeralKey;
      let customer = await response1?.customer_Stripe_Id;

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.log('error :::::::::::::::::::::: :: ', error);
      setLoading1(false);
      //   setsnackbarValue({
      //     value: 'Something went wrong',
      //     color: 'red',
      //   });
    //   setVisible(true);
    }
  };

  const openPaymentSheet = async item => {
    const res = await presentPaymentSheet();
    setLoading1(false);
    const {error} = res;
    console.log('res  :  ', res);
    if (error?.code == 'Canceled') {
        console.log('user cancel .......');
        navigation?.goBack();
    } else if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
        setOpenRestartModel(true);

      // Alert.alert("Success", "Your order is confirmed!");
      // navigation.goBack();
    }
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
      {loading1 ? <Loader /> : null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={openRestartModel}
        onRequestClose={() => setOpenRestartModel(false)}>
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
      </Modal>
    </LinearGradient>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
