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
import {AppColors} from '../../../Helping/AppColor';
import CssStyle from '../../../StyleSheet/CssStyle';
import CustomButton from '../../../component/CustomButton';
import {useSelector} from 'react-redux';

const SelectFood = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item, 'select food');
  const [loading, setLoading] = useState(false);
  const id = useSelector(data => data.id);
  const gender = [
    {item: 'break_fast', id: 1},
    {item: 'snacks', id: 2},
    {item: 'lunch', id: 3},
    {item: 'dinner', id: 4},
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
      <View style={{marginTop: responsiveHeight(6.6), flex: 0.43}}>
        <Text style={[CssStyle.textInsideSettingComponent, {fontSize: 37}]}>
          Select Food Type
        </Text>
        <Text
          style={[
            CssStyle.textInfoSetting,
            {
              lineHeight: responsiveHeight(3),
              paddingTop: responsiveHeight(1),
            },
          ]}>
          To personalize your nutrition recommendations, please select your
          preferred food type.
        </Text>
      </View>
      <View style={{flex: 1.1}}>
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
                      textTransform: 'capitalize',
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
          onPress={() =>
            review
              ? navigation.navigate('EnterFood', {item: {review, item}})
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

export default SelectFood;

const styles = StyleSheet.create({
  buttonGender: {
    paddingVertical: responsiveHeight(2.6),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveHeight(1),
    // flexDirection: "row",
    alignItems: 'center',
    marginBottom: responsiveHeight(2.9),
  },
});
