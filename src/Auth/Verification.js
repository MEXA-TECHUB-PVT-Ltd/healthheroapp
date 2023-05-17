import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CssStyle from '../StyleSheet/CssStyle';
import Logo from '../assets/whiteLogo.png';
import Input from '../component/Input';
import CustomButton from '../component/CustomButton';
import {AppColors} from '../Helping/AppColor';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {VerifyOTP} from '../services/AuthScreen';

const Verification = ({navigation, route}) => {
  const {item} = route.params;
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [loading, setLoading] = useState(false);
  const Verify = async () => {
    setLoading(true);
    try {
      const result = await VerifyOTP(item, value);
      console.log(result);
      if (result.status == true) {
        setLoading(false);
        setValue('');
        navigation.navigate('ResetPassword', {item: result.result.email});
      } else {
        setLoading(false);
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={['#0B183FBA', '#0A1637']}
      start={{x: 0, y: -1}}
      end={{x: 0, y: 0.3}}
      style={{
        paddingHorizontal: responsiveWidth(5),
        flex: 1,
        paddingTop: responsiveHeight(3),
      }}>
      <TouchableOpacity
        style={{marginLeft: responsiveWidth(-2)}}
        onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-back-outline"
          size={30}
          color={AppColors.buttonText}
        />
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginBottom: responsiveHeight(16)}}>
        <Image
          source={Logo}
          resizeMode="contain"
          style={{
            width: responsiveWidth(24),
            height: responsiveHeight(15),
            marginBottom: responsiveHeight(-2),
          }}
        />
      </View>

      <Text
        style={[CssStyle.signInText, {marginBottom: responsiveHeight(1.7)}]}>
        Verify
      </Text>
      <Text style={CssStyle.signInInfo}>
        train and live the new experience of exercising at home
      </Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          marginTop: responsiveHeight(3),
        }}>
        <CustomButton
          loading={loading}
          buttonText={'Verify OTP'}
          onPress={() => Verify()}
          style={{}}
        />
      </View>
    </LinearGradient>
  );
};

export default Verification;

const styles = StyleSheet.create({
  codeFieldRoot: {marginTop: 20, paddingHorizontal: responsiveWidth(15)},
  cell: {
    width: 45,
    height: 50,
    // lineHeight: 38,
    fontSize: 24,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#ffffff65',
  },
  focusCell: {
    borderColor: '#fff',
  },
});
