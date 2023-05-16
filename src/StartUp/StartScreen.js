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
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SwiperFlatList from 'react-native-swiper-flatlist';
import CssStyle from '../StyleSheet/CssStyle';
import {useFocusEffect} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../assets/icon1';
import CustomButton from '../component/CustomButton';
import {AppColors} from '../Helping/AppColor';

const StartScreen = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dataImages = [
    {
      image: require('../assets/first.png'),
      headerText: 'Lets Explore The Fitness',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elitr, sed diam nonumy',
      color: 'blue',
    },
    {
      image: require('../assets/second.png'),
      headerText: 'Lets Explore The Fitness',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elitr, sed diam nonumy',
      color: 'blue',
    },
    {
      image: require('../assets/third.png'),
      headerText: 'Lets Explore The Fitness',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elitr, sed diam nonumy',
      color: 'blue',
    },
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
    <View style={[CssStyle.mainContainer, {backgroundColor: '#0B183C'}]}>
      <SwiperFlatList
        ref={flatNode}
        index={activeIndex}
        showPagination
        data={dataImages}
        // scrollEnabled={false}
        renderItem={({item, index}) => (
          <View key={index} style={{flex: 1}}>
            <Image
              resizeMode="contain"
              source={item.image}
              style={{
                width: responsiveWidth(100),
                height: responsiveHeight(100),
              }}
            />
            <LinearGradient
              colors={['#0B183C00', '#0B183C']}
              start={{x: 1, y: 0}}
              end={{x: 1, y: 0.68}}
              style={{
                // position: 'absolute',
                bottom: responsiveHeight(61.5),
                paddingHorizontal: responsiveWidth(5),
                paddingBottom: responsiveHeight(20),
                paddingTop: responsiveHeight(26),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: responsiveFontSize(4),
                  marginBottom: 12,
                  fontFamily: 'Interstate-bold',
                  width: responsiveWidth(60),
                  lineHeight: responsiveHeight(5.5),
                }}>
                {item.headerText}
              </Text>
              <Text
                style={{
                  width: width - 60,
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  lineHeight: responsiveHeight(3),
                  fontSize: 16,
                }}>
                {item.description}
              </Text>
            </LinearGradient>
          </View>
        )}
        paginationStyle={{}}
        paginationActiveColor={AppColors.buttonText}
        paginationStyleItem={{
          width: responsiveWidth(23),
          height: responsiveHeight(0.4),
          borderRadius: responsiveHeight(30),
          top: responsiveHeight(-7),
        }}
        paginationDefaultColor={'white'}
      />
      <View style={{backgroundColor: '#0B183C'}}>
        <View
          style={{
            bottom: responsiveHeight(2),
            left: responsiveWidth(10),
          }}>
          <CustomButton
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
            style={{width: responsiveWidth(80)}}
            buttonText={
              activeIndex !== dataImages.length - 1 ? 'Next' : 'Continue'
            }
          />
        </View>
      </View>
    </View>
  );
};
// LinearGradient
//       colors={['#0B183C', 'red']}
//       start={{x: 3, y: 3}}
//       end={{x: 1, y: 1}}

export default StartScreen;

const styles = StyleSheet.create({});
