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
import {BaseUrl} from '../../Helping/BaseUrl';
import {useDispatch, useSelector} from 'react-redux';
import {PlanDataExercise} from '../../store/action';

const ExerciseDetail = ({navigation, route}) => {
  const {item, focus} = route.params ? route.params : '';
  // console.log(item);
  const data = [{item: 1}, {item: 1}, {item: 1}, {item: 1}];
  const [activeIndex, setActiveIndex] = useState(0);
  const flatNode = useRef();
  const id = useSelector(data => data.workoutPlanData);
  const [staticValue, setStaticValue] = useState(id[item ? item : 0]);
  const dataImages = [{item: 1}, {item: 1}, {item: 1}, {item: 1}];
  const [loading, setLoading] = useState(false);
  const StartWorkoutPlan = async () => {
    navigation.navigate('StartExercise', {item: item});
  };
  const PaginationComponent = () =>
    !staticValue ? (
      <View style={CssStyle.flexData}>
        {data.map((item, index) => (
          <View
            key={index}
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
    ) : (
      <Text></Text>
    );
  const dispatch = useDispatch();
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
          data={id}
          scrollEnabled={false}
          renderItem={({item: itemData, index}) => {
            // console.log(itemData, 'item data');
            return (
              <View style={{}}>
                <Text
                  style={[styles.signInText, {marginTop: responsiveHeight(3)}]}>
                  {itemData?.exersise_details
                    ? itemData?.exersise_details?.title
                    : staticValue?.exersise_details
                    ? staticValue?.exersise_details?.title
                    : staticValue?.exercise_details
                    ? staticValue?.exercise_details[0]?.title
                    : itemData?.title
                    ? itemData?.title
                    : 'no title'}
                </Text>
                <Text
                  style={[
                    styles.signInText,
                    {fontFamily: 'Interstate-regular'},
                  ]}>
                  {!staticValue?.reps
                    ? staticValue?.time
                      ? staticValue?.time
                      : '0'
                    : staticValue?.reps}
                </Text>
                <View
                  style={[CssStyle.flexData, {marginTop: responsiveHeight(2)}]}>
                  <CustomButton
                    loading={loading}
                    onPress={() => {
                      StartWorkoutPlan();
                    }}
                    activeOpacity={1}
                    buttonColor={AppColors.buttonText}
                    style={{width: responsiveWidth(30)}}
                    buttonText={'Start'}
                  />
                  <CustomButton
                    onPress={() => {
                      navigation.navigate('AllPlan', {item: staticValue}),
                        dispatch(PlanDataExercise(staticValue));
                    }}
                    activeOpacity={1}
                    buttonColor={'transparent'}
                    style={{
                      width: responsiveWidth(40),
                      marginLeft: responsiveWidth(4),
                    }}
                    buttonText={'Add to My Plans'}
                    mode="outlined"
                    styleText={{width: responsiveWidth(30)}}
                    borderColor={'white'}
                  />
                </View>
                <Image
                  //   resizeMode="contain"
                  source={{
                    uri: staticValue?.exercise_details
                      ? `${BaseUrl}` +
                        staticValue?.exercise_details[0]?.animation
                      : `${BaseUrl}` + staticValue?.exersise_details?.animation,
                  }}
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
                    fontSize: 13,
                    opacity: 0.7,
                    lineHeight: responsiveHeight(2.6),
                    width: responsiveWidth(90),
                    marginVertical: responsiveHeight(2),
                  }}>
                  {staticValue.exercise_details
                    ? staticValue.exercise_details[0]?.description
                    : staticValue.exersise_details?.description}
                </Text>
                <Text style={[styles.signInText, {fontSize: 16}]}>
                  Focused Area
                </Text>
                <View
                  style={[
                    CssStyle.flexData,
                    {width: responsiveWidth(100), flexWrap: 'wrap'},
                  ]}>
                  {focus ? (
                    focus.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          marginVertical: responsiveHeight(2),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#FF510055',
                          paddingVertical: responsiveHeight(0.9),
                          paddingHorizontal: responsiveWidth(2),
                          marginVertical: responsiveHeight(1),
                          marginRight: responsiveWidth(4),
                          borderRadius: responsiveWidth(10),
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Interstate-regular',
                            fontSize: 17,
                            color: 'white',
                          }}>
                          {item}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <View
                      style={{
                        marginVertical: responsiveHeight(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FF510055',
                        paddingVertical: responsiveHeight(0.9),
                        paddingHorizontal: responsiveWidth(2),
                        marginVertical: responsiveHeight(1),
                        marginRight: responsiveWidth(4),
                        borderRadius: responsiveWidth(10),
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Interstate-regular',
                          fontSize: 17,
                          color: 'white',
                        }}>
                        Not Specified
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }}
          paginationStyle={{}}
          paginationActiveColor={'transparent'}
          paginationStyleItem={{}}
          paginationDefaultColor={'transparent'}
          paginationStyleItemInactive={{}}
        />
        {staticValue ? null : (
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
                staticValue
                  ? {}
                  : activeIndex == 0
                  ? (setActiveIndex(activeIndex - 1),
                    flatNode.current.scrollToIndex({
                      animated: true,
                      index: activeIndex - 1,
                    }))
                  : console.log('sdf');
              }}>
              <Icon
                name="chevron-back-outline"
                size={29}
                color={AppColors.buttonText}
              />
            </TouchableOpacity>
            {!staticValue && (
              <Text style={{color: 'white', fontSize: 12}}>
                <Text style={{fontSize: 17}}>0{activeIndex + 1}</Text>/0
                {dataImages.length}
              </Text>
            )}
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
                staticValue
                  ? {}
                  : activeIndex !== id.workout_plan_exersises.length - 1
                  ? (setActiveIndex(activeIndex + 1),
                    flatNode.current.scrollToIndex({
                      animated: true,
                      index: activeIndex + 1,
                    }))
                  : console.log('sdf');
              }}>
              <Icon
                name="chevron-forward-outline"
                size={29}
                color={AppColors.buttonText}
              />
            </TouchableOpacity>
          </View>
        )}
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
