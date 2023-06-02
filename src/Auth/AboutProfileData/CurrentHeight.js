import {
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from '../../Helping/AppColor';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../component/CustomButton';
import {RulerPicker} from 'react-native-ruler-picker';
import {UpdateProfileApi} from '../../services/AuthScreen';
import {useSelector} from 'react-redux';

const CurrentHeight = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item.item.item.item);
  const [addData, setAddData] = useState('male');
  const [focusedArea, setFocusedArea] = useState('Arms');
  const [dataArray, setDataArray] = useState([]);
  const CustomLine = [{ie: 1}, {ie: 1}, {ie: 1}, {ie: 1}];

  const heightUnitData = [{text: 'ft'}, {text: 'in'}];
  const [heightData, setHeightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [heightValue, setHeightValue] = useState(null);
  const id = useSelector(data => data.id);
  const UpdateProfile = async () => {
    setLoading(true);
    try {
      const result = await UpdateProfileApi(
        id,
        item?.item?.item?.item.itemName,
        item?.item?.item?.item.itemResult.device_id,
        item.item.item.addData,
        [item.item.focusedData],
        heightValue,
        item.weightValue,
        item.weightData,
        heightData,
      );
      console.log(result);
      if (result.status == true) {
        setLoading(false);
        navigation.navigate('main');
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <View style={[CssStyle.mainContainer, {backgroundColor: '#0B183C'}]}>
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
              Current Height
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
              Enter your height to unlock a personalized fitness experience.
              Lets embark on this transformative fitness journey together, one
              inch at a time.
            </Text>
          </View>
          <View>
            <View
              style={[CssStyle.flexJustify, {marginTop: responsiveHeight(11)}]}>
              {heightUnitData.map((item, index) => (
                <CustomButton
                  key={index}
                  buttonText={item.text}
                  onPress={() => setHeightData(item.text)}
                  style={{width: responsiveWidth(42)}}
                  styleText={{textTransform: 'uppercase'}}
                  mode={heightData == item.text ? '' : 'outlined'}
                  borderColor={heightData == item.text ? '' : 'white'}
                  buttonColor={heightData == item.text ? '' : 'transparent'}
                />
              ))}
            </View>
            <RulerPicker
              min={0}
              max={210}
              step={1}
              fractionDigits={0}
              initialValue={0}
              decelerationRate={0.3}
              gapBetweenSteps={5}
              indicatorColor="#FF5100"
              longStepColor="#FF5100"
              indicatorHeight={75}
              longStepHeight={70}
              shortStepHeight={20}
              stepWidth={3}
              width={responsiveWidth(90)}
              unitTextStyle={{color: 'white', fontSize: responsiveFontSize(2)}}
              valueTextStyle={{
                color: 'white',
                fontSize: responsiveFontSize(6),
              }}
              // onValueChange={number => console.log(number)}
              height={responsiveHeight(38)}
              onValueChangeEnd={number => setHeightValue(number)}
              unit={heightData}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#0B183C',
          }}>
          <View
            style={{
              bottom: responsiveHeight(6.4),
              left: responsiveWidth(11),
              position: 'absolute',
            }}>
            <CustomButton
              loading={loading}
              onPress={() => {
                UpdateProfile();
              }}
              activeOpacity={1}
              style={{width: responsiveWidth(78)}}
              buttonText={'Continue'}
            />
          </View>
        </View>
        <View
          style={[
            CssStyle.flexJustify,
            {paddingHorizontal: responsiveWidth(10)},
          ]}>
          {CustomLine.map((item, index) => (
            <View
              key={index}
              style={{
                width: responsiveWidth(18),
                height: responsiveHeight(0.5),
                backgroundColor: AppColors.buttonText,
                borderRadius: responsiveWidth(20),
                marginBottom: responsiveHeight(9.4),
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CurrentHeight;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    // lineHeight: responsiveHeight(3),
  },
});
