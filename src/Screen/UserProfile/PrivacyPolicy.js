import {
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
import {GetPrivacyApi} from '../../services/PrivacyApi';

const PrivacyPolicy = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  // const GetPrivacy = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await GetPrivacyApi();
  //     // console.log(result);
  //     if (result.status == true) {
  //       setLoading(false);
  //     } else {
  //       console.error(result.message);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading;
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   GetPrivacy();
  // }, []);

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
      <TouchableOpacity
        style={{flex: 0.1, marginLeft: responsiveWidth(-3)}}
        onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-back-outline"
          size={25}
          style={{padding: '2%'}}
          color={AppColors.buttonText}
        />
      </TouchableOpacity>

      <View style={{flex: 1}}>
        <Text style={[CssStyle.textInsideSettingComponent]}>
          Privacy Policy
        </Text>
        <Text
          style={{
            color: 'white',
            marginTop: responsiveHeight(2),
            lineHeight: responsiveHeight(2.6),fontSize:13
          }}>
          At mtechub llc, accessible from https://mtechub.com, one of our main
          priorities is the privacy of our visitors. This Privacy Policy
          document contains types of information that is collected and recorded
          by mtechub llc and how we use it.
        </Text>
        <Text
          style={{
            color: 'white',
            marginTop: responsiveHeight(2),
            lineHeight: responsiveHeight(2.6),fontSize:13
          }}>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </Text>
        <Text
          style={{
            color: 'white',
            marginTop: responsiveHeight(2),
            lineHeight: responsiveHeight(2.6),fontSize:13
          }}>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in mtechub llc. This policy is not applicable to
          any information collected offline or via channels other than this
          website.
        </Text>
      </View>
    </LinearGradient>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
