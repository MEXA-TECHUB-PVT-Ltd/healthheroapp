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
        <Text style={{color: 'white', marginTop: responsiveHeight(2)}}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea.
        </Text>
      </View>
    </LinearGradient>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
