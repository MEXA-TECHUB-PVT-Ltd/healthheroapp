import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

const Input = ({
  placeholder,
  value,
  onChangeText,
  paddingVertical,
  leftIcon,
  rightIcon,
  style,
  enableIcon,
  offIcon,
  noIcon,
  disabled,
  fontWeight,
  numLine,
  keyboardType,
  multiline,
  height,
  onPressRightIcon,
  bgColor,
  fontSize,
}) => {
  const [showIcon, setShowIcon] = useState(true);
  return (
    <View>
      <TextInput
        keyboardType={keyboardType}
        numberOfLines={numLine}
        disabled={disabled}
        multiline={multiline}
        placeholder={placeholder}
        value={value}
        outlineStyle={{
          borderRadius: responsiveHeight(20),
          borderColor: '#00000001',
        }}
        mode="outlined"
        secureTextEntry={enableIcon && showIcon ? true : false}
        onChangeText={onChangeText}
        style={[
          style,
          {
            backgroundColor: bgColor ? bgColor : '#232441',
            marginVertical: 7,
            paddingVertical: paddingVertical ? paddingVertical : 0,
            fontWeight: fontWeight ? fontWeight : '500',
            height: height ? height : responsiveHeight(6),
            fontSize: fontSize ? fontSize : 11,
            fontFamily: 'Interstate-regular',
            letterSpacing: 0.4,paddingLeft:responsiveWidth(1.4)
          },
        ]}
        textColor="white"
        placeholderTextColor={'white'}
        left={
          !noIcon && (
            <TextInput.Icon
              icon={() => <Icon name={leftIcon} size={23} color="white" />}
            />
          )
        }
        right={
          rightIcon ? (
            <TextInput.Icon
              icon={() => (
                <View style={{marginTop: responsiveHeight(1.5)}}>
                  <TouchableOpacity
                    onPress={
                      onPressRightIcon
                        ? onPressRightIcon
                        : () => setShowIcon(!showIcon)
                    }>
                    <Icon
                      name={!showIcon ? offIcon : rightIcon}
                      size={23}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : null
        }
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
