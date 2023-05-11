import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CssStyle from '../StyleSheet/CssStyle';

const CustomModel = ({openModel, setOpenModel, children, styleBox}) => {
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

export default CustomModel;

const styles = StyleSheet.create({});
