import {
  BackHandler,
  Dimensions,
  Image,
  StatusBar,
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
import {useFocusEffect} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';
import { AppColors } from '../../Helping/AppColor';
import CustomButton from '../../component/CustomButton';

const StartScreen = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dataImages = [
    {
      image: require('../../assets/first.png'),
      headerText: 'Lets Explore The Fitness',
      description:
        'Engage in fitness challenges designed to push your limits and provide extra motivation.',
      color: 'blue',
    },
    {
      image: require('../../assets/second.png'),
      headerText: 'Healthy workout plan',
      description:
        'Consistency is key! Set your workout schedule and choose the days and times that work best for you',
      color: 'blue',
    },
    {
      image: require('../../assets/third.png'),
      headerText: 'Get Diet & nutrition plans',
      description:
        'Track your strength gains, identify areas for improv- ement, and challenge yourself to reach new milestones',
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
  // const labels = ['Cart', 'Delivery Address', 'Order Summary'];
  const customStyles = {
    stepIndicatorSize: 6,
    currentStepIndicatorSize: 50,
    separatorStrokeWidth: 0,
    currentStepStrokeWidth: 1,
    stepStrokeCurrentColor: '#3E94A6',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#3E94A6',
    stepStrokeUnFinishedColor: '#3E94A6',
    separatorFinishedColor: '#3E94A6',
    separatorUnFinishedColor: '#3E94A6',
    stepIndicatorFinishedColor: '#3E94A6',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    // stepIndicatorLabelFontSize: 13,
    // currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#3E94A6',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#3E94A6',
  };
  return (
    <>
      <StatusBar hidden={true} backgroundColor="white" />
      <SwiperFlatList
        ref={flatNode}
        index={activeIndex}
        showPagination
        data={dataImages}
        onChangeIndex={i => setActiveIndex(i.index)}
        // scrollEnabled={false}
        renderItem={({item, index}) => (
          <View key={index} style={{flex: 1}}>
            <Image
              // resizeMode="contain"
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
                bottom: responsiveHeight(58.5),
                // paddingHorizontal: responsiveWidth(5),
                paddingBottom: responsiveHeight(20),
                paddingTop: responsiveHeight(25),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize:
                    index == 2
                      ? responsiveFontSize(5.58)
                      : responsiveFontSize(5.67),
                  marginBottom: 4,
                  fontFamily: 'Interstate-bold',
                  marginLeft: responsiveWidth(1.2),
                  width: responsiveWidth(90),
                  lineHeight: responsiveHeight(6),
                  paddingHorizontal: responsiveWidth(5),
                }}>
                {item.headerText}
              </Text>
              <Text
                style={{
                  width: responsiveWidth(98),
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  paddingHorizontal: responsiveWidth(3),
                  lineHeight: responsiveHeight(2.6),
                  fontSize:
                    index == 2
                      ? responsiveFontSize(1.77)
                      : responsiveFontSize(1.82),
                  marginLeft: responsiveWidth(2),
                }}>
                {item.description}
              </Text>
            </LinearGradient>
          </View>
        )}
        paginationStyle={{}}
        paginationTapDisabled={true}
        paginationActiveColor={AppColors.buttonText}
        paginationStyleItem={{
          width: responsiveWidth(26),
          height: responsiveHeight(0.4),
          borderRadius: responsiveHeight(30),
          top: responsiveHeight(-9.3),
        }}
        paginationDefaultColor={'white'}
        paginationStyleItemInactive={
          {
            // backgroundColor: flatNode.current == 0 ? 'yellow' : 'green',
          }
        }
      />
      <View style={{backgroundColor: '#0B183C'}}>
        <View
          style={{
            bottom: responsiveHeight(3.7),
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
                // navigation.navigate('UserNavigation', {screen: 'Gender'});
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
    </>
  );
};
// LinearGradient
//       colors={['#0B183C', 'red']}
//       start={{x: 3, y: 3}}
//       end={{x: 1, y: 1}}

export default StartScreen;

const styles = StyleSheet.create({});

{
  /* <StepIndicator
        customStyles={customStyles}
        currentPosition={0}
        // labels={labels}
        stepCount={3}
        direction="horizontal"
        renderStepIndicator={({position, stepstatus}) => (
          <Icon name={'search'} size={18} color="#fff" />
        )}
      /> */
}
// </View>
// );
