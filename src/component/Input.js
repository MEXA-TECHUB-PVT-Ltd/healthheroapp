import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
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
  keyboardType,multiline
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
        outlineStyle={{borderRadius: 8, borderColor: '#00000001'}}
        mode="outlined"
        secureTextEntry={enableIcon && showIcon ? true : false}
        onChangeText={onChangeText}
        style={[
          style,
          {
            backgroundColor: '#00000009',
            marginVertical: 7,
            paddingVertical: paddingVertical ? paddingVertical : 0,
            fontWeight: fontWeight ? fontWeight : '500',
          },
        ]}
        placeholderTextColor={'#00000090'}
        left={
          !noIcon && (
            <TextInput.Icon
              icon={() => <Icon name={leftIcon} size={23} color="#00000090" />}
            />
          )
        }
        right={
          rightIcon ? (
            <TextInput.Icon
              icon={() => (
                <Icon
                  onPress={() => setShowIcon(!showIcon)}
                  name={!showIcon ? offIcon : rightIcon}
                  size={23}
                  color="#00000090"
                />
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
