import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Children} from 'react';
import CssStyle from '../StyleSheet/CssStyle';
const {width, height} = Dimensions.get('screen');

export const CustomModel = ({show, children, hide}) => {
  return (
    <Modal visible={show} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback
        onPress={hide}
        style={{
          flex: 1,
          backgroundColor: 'red',
        }}>
        <View style={{flex: 1, backgroundColor: '#00000040'}}>{children}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const CustomModelCenter = ({
  openModel,
  setOpenModel,
  children,
  styleBox,
}) => {
  return (
    <Modal
      onRequestClose={setOpenModel}
      visible={openModel}
      animationType="fade"
      transparent={true}>
      <View style={CssStyle.mainContainerModelCopied}>
        <View style={[CssStyle.successBox, styleBox]}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});
