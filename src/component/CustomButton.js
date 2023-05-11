import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppColors } from '../Helping/AppColor';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const CustomButton = ({
  onPress,
  iconColor,
  borderRadius,
  buttonText,
  style,
  iconName,
  mode,
  buttonColor,
  fontWeight,
  size,
  colorText,
  paddingVertical,
  styleText,
  borderColor,
  imageIcon,
  heightButton,
}) => {
  return (
    <Button
      icon={() =>
        imageIcon ? (
          imageIcon
        ) : (
          <Icon
            name={iconName}
            size={size ? size : 23}
            color={iconColor ? iconColor : 'green'}
          />
        )
      }
      style={[
        style,
        {
          borderRadius: borderRadius ? borderRadius : responsiveHeight(50),
          borderColor: borderColor ? borderColor : '#00000020',
          backgroundColor: buttonColor ? buttonColor : AppColors.buttonText,
          height: heightButton,
        },
      ]}
      mode={mode ? mode : 'contained'}
      labelStyle={[
        ,
        styleText,
        {
          color: colorText ? colorText : 'white',
          fontWeight: '100',
          paddingVertical: paddingVertical ? paddingVertical : 0,
          textTransform: 'capitalize',
        },
      ]}
      onPress={onPress}>
      {buttonText}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
