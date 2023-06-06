import {
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
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

const CurrentWeight = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  const weightUnitData = [{text: 'gm'}, {text: 'kg'}];
  const [weightData, setWeightData] = useState('kg');
  const [loading, setLoading] = useState(false);
  const CustomLine = [{ie: 1}, {ie: 1}, {ie: 1}, {ie: 1}];

  const [weightValue, setWeightValue] = useState(10);
  // console.log(weightValue);
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
              Current Weight
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
              Track your progress by entering your current weight, allowing us
              to monitor your achievements and help you stay on track towards
              your fitness goals
            </Text>
          </View>
          <View>
            <View
              style={[CssStyle.flexJustify, {marginTop: responsiveHeight(11)}]}>
              {weightUnitData.map((item, index) => (
                <CustomButton
                  key={index}
                  buttonText={item.text}
                  onPress={() => setWeightData(item.text)}
                  style={{width: responsiveWidth(42)}}
                  styleText={{textTransform: 'uppercase'}}
                  mode={weightData == item.text ? '' : 'outlined'}
                  borderColor={weightData == item.text ? '' : 'white'}
                  buttonColor={weightData == item.text ? '' : 'transparent'}
                />
              ))}
            </View>
            <View>
              <RulerPicker
                min={0}
                max={110}
                step={1}
                fractionDigits={0}
                initialValue={0}
                gapBetweenSteps={5}
                indicatorColor="#FF5100"
                longStepColor="#FF5100"
                indicatorHeight={75}
                longStepHeight={70}
                shortStepHeight={20}
                stepWidth={3}
                unitTextStyle={{
                  color: 'white',
                  fontSize: responsiveFontSize(2),
                }}
                valueTextStyle={{
                  color: 'white',
                  fontSize: responsiveFontSize(6),
                }}
                // onValueChange={number => console.log(number)}
                height={responsiveHeight(38)}
                onValueChangeEnd={number => setWeightValue(number)}
                unit={weightData}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#0B183C',
          }}>
          <View
            style={{
              bottom: responsiveHeight(15.7),
              left: responsiveWidth(11),
              position: 'absolute',
            }}>
            <CustomButton
              loading={loading}
              onPress={() => {
                weightData && weightValue
                  ? navigation.navigate('CurrentHeight', {
                      item: {item, weightData, weightValue},
                    })
                  : ToastAndroid.show(
                      'Please select unit and value',
                      ToastAndroid.SHORT,
                    );
              }}
              activeOpacity={1}
              style={{width: responsiveWidth(78)}}
              buttonText={'Continue'}
            />
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
                  backgroundColor:
                    index == 0 || index == 1 || index == 2
                      ? AppColors.buttonText
                      : 'white',
                  borderRadius: responsiveWidth(20),
                  marginBottom: responsiveHeight(9.4),
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CurrentWeight;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
