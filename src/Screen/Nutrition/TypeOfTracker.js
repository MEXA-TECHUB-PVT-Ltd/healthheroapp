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

const TypeOfTracker = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(13);
  const id = useSelector(data => data.id);
  const [oldPassword, setOldPassword] = useState('');
  const [openRestartModel, setOpenRestartModel] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState('');
  const [emailValidError, setEmailValidError] = useState('');

  const gender = [
    {item: 'Maintain Weight', id: 1},
    {item: 'Loose Weight', id: 2},
    {item: 'Gain Weight', id: 3},
  ];
  const [review, setReview] = useState('');

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
      <View style={{marginTop: responsiveHeight(2), flex: 0.5}}>
        <Text style={[CssStyle.textInsideSettingComponent, {fontSize: 41}]}>
          Type of Tracker
        </Text>
        <Text
          style={[
            CssStyle.textInfoSetting,
            {
              lineHeight: responsiveHeight(3),
              paddingTop: responsiveHeight(1),
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
          loading={loading}
          onPress={() => {}}
          activeOpacity={1}
          buttonColor={AppColors.buttonText}
          style={{width: responsiveWidth(78)}}
          buttonText={'Add'}
          paddingVertical={1}
        />
      </View>
    </LinearGradient>
  );
};

export default TypeOfTracker;

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
