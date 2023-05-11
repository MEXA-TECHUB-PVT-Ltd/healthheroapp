import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SwiperFlatList from 'react-native-swiper-flatlist';
import CssStyle from '../StyleSheet/CssStyle';
import {useFocusEffect} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');

import Icon from '../assets/icon1';
const StartScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dataImages = [
    {
      image: require('../assets/first.png'),
      headerText: 'Generate QR Code',
      description:
        'Some versions of Microsoft Word also generate the text using the function. Jus',
      color: 'blue',
    },
    // {
    //   image: require('../../Assets/Second.png'),
    //   headerText: 'Manage Long Links',
    //   description:
    //     'Some versions of Microsoft Word also generate the text using the function. Jus',
    //   color: 'blue',
    // },
    // {
    //   image: require('../../Assets/Third.png'),
    //   headerText: 'Modify Links/QR Codes',
    //   description:
    //     'Some versions of Microsoft Word also generate the text using the function. Jus',
    //   color: 'blue',
    // },
  ];
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        // console.log('hello sir');
        BackHandler.exitApp();
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );
  const flatNode = useRef();

  const backgroundColor = isLight => (isLight ? 'black' : 'lightblue');
  const color = isLight => backgroundColor(!isLight);
  return (
    <View style={[CssStyle.mainContainer]}>
      <SwiperFlatList
        ref={flatNode}
        index={activeIndex}
        showPagination
        data={dataImages}
        renderItem={({item, index}) => (
          <View
            key={index}
            style={{
            }}>
            <Image
              resizeMode="contain"
              source={item.image}
              style={{
                width: responsiveWidth(100),
                height: responsiveHeight(100),
              }}
            />
            <View style={{}}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  fontSize: 17,
                  marginBottom: 12,
                }}>
                {item.headerText}
              </Text>
              <Text style={{width: width - 60, color: 'black'}}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
        paginationStyle={{alignSelf: 'flex-start'}}
        paginationActiveColor="#022D94"
        paginationStyleItem={{
          width: 22,
          height: 8,
          borderRadius: 5,
          marginHorizontal: responsiveWidth(-4),
          marginLeft: responsiveWidth(5),
          // margin: 0,
          // alignItems: 'flex-start',
        }}
        paginationDefaultColor="#00000050"
        paginationStyleItemActive={{width: 22}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 22,
        }}>
        <TouchableOpacity
          onPress={() => {
            {
              if (activeIndex !== 0) {
                flatNode.current.scrollToIndex({
                  animated: true,
                  index: activeIndex - 1,
                });
                setActiveIndex(activeIndex - 1);
              } else {
              }
            }
          }}
          activeOpacity={1}
          style={{
            borderRadius: 8,
            paddingVertical: 13,
            marginLeft: 10,
            backgroundColor: activeIndex == 0 ? '#00000020' : '#022D94',
            paddingHorizontal: 19,
          }}>
          <Icon
            name="chevron-back-outline"
            size={22}
            color={activeIndex == 0 ? 'black' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (activeIndex !== dataImages.length - 1) {
              setActiveIndex(activeIndex + 1);
              flatNode.current.scrollToIndex({
                animated: true,
                index: activeIndex + 1,
              });
            } else {
              navigation.navigate('Login');
            }
          }}
          activeOpacity={1}
          style={{
            borderRadius: 8,
            // paddingHorizontal: 7,
            paddingVertical: 13,
            marginLeft: 10,
            backgroundColor: '#022D94',
            paddingHorizontal: 19,
          }}>
          <Icon name="chevron-forward-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({});
