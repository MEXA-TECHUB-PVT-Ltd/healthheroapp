import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import {AppColors} from '../../Helping/AppColor';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../component/CustomButton';
import SwiperFlatList from 'react-native-swiper-flatlist';

const ExerciseDetail = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  const data = [{item: 1}, {item: 1}, {item: 1}, {item: 1}];
  const [activeIndex, setActiveIndex] = useState(0);
  const flatNode = useRef();
  const dataImages = [{item: 1}, {item: 1}, {item: 1}, {item: 1}];
  const PaginationComponent = () => (
    <View style={CssStyle.flexData}>
      {data.map((item, index) => (
        <View
          style={{
            width: index == activeIndex ? 29 : 7,
            height: 7,
            backgroundColor:
              index == activeIndex ? AppColors.buttonText : 'white',
            borderRadius: responsiveWidth(5),
            marginRight: responsiveWidth(2.6),
          }}
        />
      ))}
    </View>
  );
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
          marginTop: responsiveHeight(3.5),
        }}>
        <View
          style={[
            CssStyle.flexJustify,
            {width: responsiveWidth(50), alignSelf: 'flex-end'},
          ]}>
          <PaginationComponent />
          <TouchableOpacity
            style={{
              marginLeft: responsiveWidth(3),
            }}
            onPress={() => navigation.goBack()}>
            <Icon name="close" size={25} color={'white'} />
          </TouchableOpacity>
        </View>
        <SwiperFlatList
          ref={flatNode}
          index={activeIndex}
          showPagination
          data={dataImages}
          scrollEnabled={false}
          renderItem={({itemData, index}) => (
            <View style={{width: responsiveWidth(100)}}>
              <Text
                style={[styles.signInText, {marginTop: responsiveHeight(3)}]}>
                Puss Press
              </Text>
              <Text
                style={[styles.signInText, {fontFamily: 'Interstate-regular'}]}>
                7 mins
              </Text>
              <View
                style={[CssStyle.flexData, {marginTop: responsiveHeight(2)}]}>
                <CustomButton
                  onPress={() =>
                    navigation.navigate('StartExercise', {item: item})
                  }
                  activeOpacity={1}
                  buttonColor={AppColors.buttonText}
                  style={{width: responsiveWidth(30)}}
                  buttonText={'Start'}
                />
                <CustomButton
                  onPress={() => navigation.navigate('AllPlan', {item: item})}
                  activeOpacity={1}
                  buttonColor={'transparent'}
                  style={{
                    width: responsiveWidth(40),
                    marginLeft: responsiveWidth(4),
                  }}
                  buttonText={'Add to My Plans'}
                  mode="outlined"
                  borderColor={'white'}
                />
              </View>
              <Image
                //   resizeMode="contain"
                source={require('../../assets/Rectangle33.png')}
                borderRadius={responsiveWidth(3)}
                style={{
                  width: responsiveWidth(90),
                  height: responsiveHeight(30),
                  marginTop: responsiveHeight(2),
                  marginBottom: responsiveHeight(1),
                }}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  opacity: 0.7,
                  marginBottom: responsiveHeight(1.2),
                  lineHeight: responsiveHeight(2.6),
                  width: responsiveWidth(90),
                }}>
                Start in a standing position, then quickly drop into a push-up
                position. From there, jump your feet forward and stand up,
                reaching your arms overhead. Repeat for several reps.Start in a
                standing position, then quickly drop into a push-up position.
                From there, jump your feet forward and stand up, reaching your
                arms overhead. Repeat for several reps
              </Text>
              <Text style={[styles.signInText, {fontSize: 16}]}>
                Focused Area
              </Text>
              <View
                style={[CssStyle.flexJustify, {width: responsiveWidth(90)}]}>
                <Image
                  //   resizeMode="contain"
                  source={require('../../assets/Rectangle32.png')}
                  borderRadius={responsiveWidth(2)}
                  style={{
                    width: responsiveWidth(42),
                    height: responsiveHeight(13),
                    marginVertical: responsiveHeight(2),
                  }}
                />
                <Image
                  //   resizeMode="contain"
                  source={require('../../assets/Rectangle32.png')}
                  borderRadius={responsiveWidth(2)}
                  style={{
                    width: responsiveWidth(42),
                    height: responsiveHeight(13),
                    marginVertical: responsiveHeight(2),
                  }}
                />
              </View>
            </View>
          )}
          paginationStyle={{}}
          paginationActiveColor={'transparent'}
          paginationStyleItem={{}}
          paginationDefaultColor={'transparent'}
          paginationStyleItemInactive={{}}
        />
        <View style={[CssStyle.flexJustify, {}]}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF510050',
              borderRadius: responsiveHeight(10),
              width: 39,
              height: 39,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              if (activeIndex !== 0) {
                setActiveIndex(activeIndex - 1);
                flatNode.current.scrollToIndex({
                  animated: true,
                  index: activeIndex - 1,
                });
              } else {
                console.log('back');
              }
            }}>
            <Icon
              name="chevron-back-outline"
              size={29}
              color={AppColors.buttonText}
            />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 12}}>
            <Text style={{fontSize: 17}}>0{activeIndex + 1}</Text>/0
            {dataImages.length}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF510050',
              borderRadius: responsiveHeight(10),
              width: 39,
              height: 39,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              if (activeIndex !== dataImages.length - 1) {
                setActiveIndex(activeIndex + 1);
                flatNode.current.scrollToIndex({
                  animated: true,
                  index: activeIndex + 1,
                });
              } else {
                console.log('sdf');
              }
            }}>
            <Icon
              name="chevron-forward-outline"
              size={29}
              color={AppColors.buttonText}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ExerciseDetail;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: responsiveFontSize(4),
  },
});
