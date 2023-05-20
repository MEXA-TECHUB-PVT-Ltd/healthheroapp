import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import {AppColors} from '../../Helping/AppColor';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../component/CustomButton';
import Lottie from 'lottie-react-native';
import assets from '../../assets';
import {useSelector} from 'react-redux';
import {UpdateProfileApi} from '../../services/AuthScreen';

const GenderProfile = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  const genderCollectionData = [
    {text: 'male', image: require('../../assets/maleGender.png')},
    {text: 'female', image: require('../../assets/FemaleGender.png')},
  ];
  const id = useSelector(data => data.id);
  const [openUserSuccessfully, setOpenUserSuccessfully] = useState(false);
  const [addData, setAddData] = useState('male');
  const [loadingUser, setLoadingUser] = useState(false);
  const UpdateUserName = async () => {
    setLoadingUser(true);
    try {
      const result = await UpdateProfileApi(
        id,
        item.user_name,
        item.device_id,
        addData,
        item.focused_areas,
        item.height,
        item.weight,
        item.weight_unit,
        item.height_unit,
      );
      console.log(result);
      if (result.status == true) {
        setOpenUserSuccessfully(false);
      } else {
        console.error(result.message);
        setLoadingUser(false);
      }
    } catch (error) {
      setLoadingUser(false);
      console.log(error);
    }
  };
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{flex: 1}}>
        <View
          style={[
            CssStyle.flexJustify,
            {
              marginTop: responsiveHeight(4.4),
              paddingHorizontal: responsiveWidth(5),
            },
          ]}>
          <TouchableOpacity
            style={{
              marginLeft: responsiveWidth(-1),
            }}
            onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={28}
              color={AppColors.buttonText}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            width: responsiveWidth(100),
            paddingHorizontal: responsiveWidth(6),
          }}>
          <View style={{flex: 0.5, marginTop: responsiveHeight(6.7)}}>
            <Text
              style={{
                color: 'white',
                fontSize: responsiveFontSize(4.7),
                marginBottom: responsiveHeight(2),
                fontFamily: 'Interstate-bold',
                marginLeft: responsiveWidth(1),
                width: responsiveWidth(90),
                lineHeight: responsiveHeight(6),
              }}>
              Change Gender
            </Text>
            <Text
              style={{
                width: responsiveWidth(79),
                color: 'white',
                // fontFamily: 'Interstate-regular',
                lineHeight: responsiveHeight(3),
                marginLeft: responsiveWidth(1),
                fontSize: 13,
                fontWeight: '400',
                opacity: 0.77,
              }}>
              Choose the option that best represents you from the provided
              gender options, or Select your gender
            </Text>
          </View>
          <View style={[CssStyle.flexJustify, {}]}>
            {genderCollectionData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setAddData(item.text)}
                style={{
                  backgroundColor: addData == item.text ? '#0A1F58' : '#626377',
                  paddingVertical: responsiveHeight(2),
                  width: responsiveWidth(41.3),
                  borderRadius: responsiveWidth(3),
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: responsiveHeight(22),
                  borderWidth: 1,
                  borderColor: addData == item.text ? 'white' : '#626377',
                }}>
                {addData == item.text ? (
                  <Image
                    source={require('../../assets/Group655.png')}
                    resizeMode="contain"
                    style={{
                      width: 26,
                      height: 26,
                      position: 'absolute',
                      top: responsiveHeight(1.5),
                      right: responsiveWidth(3),
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      position: 'absolute',
                      top: responsiveHeight(1.5),
                      right: responsiveWidth(3),
                      backgroundColor: '#78798A',
                      borderRadius: responsiveWidth(10),
                    }}
                  />
                )}
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={{
                    width: 103,
                    height: 103,
                    marginTop: responsiveHeight(1.7),
                  }}
                />
                <Text
                  style={[styles.signInText, {textTransform: 'capitalize'}]}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            bottom: responsiveHeight(11.7),
            alignItems: 'center',
          }}>
          <CustomButton
            loading={loadingUser}
            onPress={() => UpdateUserName()}
            activeOpacity={1}
            style={{width: responsiveWidth(78)}}
            buttonText={'Save Changes'}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openUserSuccessfully}
        onRequestClose={() => setOpenUserSuccessfully(false)}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setOpenUserSuccessfully(false)}>
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
                  paddingVertical: responsiveHeight(3.8),
                  paddingHorizontal: responsiveWidth(6),
                  alignItems: 'center',
                }}>
                <View
                  // activeOpacity={1}
                  style={{
                    // height: wp(28),
                    width: 125,
                    // backgroundColor: 'red',
                    aspectRatio: 1,
                    alignSelf: 'center',
                  }}>
                  <Lottie
                    source={assets.loader}
                    autoPlay
                    loop={true}
                    resizeMode="cover"
                    speed={1}
                    // style={{width}}
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
                    marginTop: responsiveHeight(2),
                    textTransform: 'capitalize',
                  }}>
                  Gender Changed Successfully
                </Text>

                <View style={[{alignItems: 'center'}]}>
                  <CustomButton
                    buttonText={'Go Back'}
                    onPress={() => {
                      setOpenUserSuccessfully(false), navigation.goBack();
                    }}
                    buttonColor={'transparent'}
                    mode="outlined"
                    fontWeight={'500'}
                    borderColor={'white'}
                    style={{
                      marginTop: responsiveHeight(3.7),
                      width: responsiveWidth(50),
                      marginBottom: responsiveHeight(1),
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default GenderProfile;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
