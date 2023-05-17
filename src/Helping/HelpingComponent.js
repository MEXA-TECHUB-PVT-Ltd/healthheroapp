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

const styles = StyleSheet.create({});
