import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

export const HelpingComponent = ({item, index}) => {
  const [selectItem, setSelectItem] = useState(false);
  const deleteItem = () => {};
  return (
    <TouchableOpacity
      onPress={() => setSelectItem(!selectItem)}
      style={{
        borderRadius: responsiveWidth(5),
        backgroundColor: '#FF510055',
        marginRight: responsiveWidth(2),
        paddingVertical: responsiveHeight(0.9),
        paddingHorizontal: responsiveWidth(2.3),
        marginBottom: responsiveHeight(2),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Interstate-bold',
          color: 'white',
          fontSize: 12,
          alignSelf: 'center',
          opacity: 0.8,
        }}>
        {item.searchItem}
      </Text>
      {selectItem && (
        <TouchableOpacity
          style={{marginLeft: responsiveWidth(3)}}
          onPress={() => {
            deleteItem(), setSelectItem(false);
          }}>
          <Icon name="close" size={15} color={'white'} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export const FocusedComponent = ({item, index, dataArray, setDataArray}) => {
  const [focusedArea, setFocusedArea] = useState(false);
  return focusedArea ? (
    <TouchableOpacity
      onPress={() => {
        setFocusedArea(false), dataArray.splice(1, index);
        // setDataArray([...dataArray]);
      }}
      style={[
        {
          backgroundColor: '#FF5100',
          width: responsiveWidth(35),
          paddingVertical: responsiveHeight(2),
          borderRadius: responsiveWidth(2),
          marginBottom: responsiveHeight(4),
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Text style={[styles.signInText]}>{item.text}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        setFocusedArea(true), dataArray.push({itemArea: item.text});
      }}
      style={[
        {
          backgroundColor: '#626377',
          width: responsiveWidth(35),
          paddingVertical: responsiveHeight(2),
          borderRadius: responsiveWidth(2),
          marginBottom: responsiveHeight(4),
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Text style={[styles.signInText]}>{item.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
