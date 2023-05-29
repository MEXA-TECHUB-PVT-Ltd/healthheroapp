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
import {useSelector} from 'react-redux';

const ExerciseDetail = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  // console.log(item);
  const data = [{item: 1}, {item: 1}, {item: 1}, {item: 1}];
  const [activeIndex, setActiveIndex] = useState(0);
  const flatNode = useRef();
  const id = useSelector(data => data.workoutPlanData);
  const [staticValue, setStaticValue] = useState(
    id.workout_plan_exersises[item ? item : 0],
  );
  console.log(staticValue, 'hello ');
  const dataImages = [{item: 1}, {item: 1}, {item: 1}, {item: 1}];
  const [loading, setLoading] = useState(false);
  const StartWorkoutPlan = async () => {
    // setLoading(true);
    // try {
    //   const result = await StartWorkoutPlanApi(
    //     id.id,
    //     id.workoutPlanId,
    //     time,
    //     moment(new Date()).format('YYYY-MM-DD'),
    //   );
    //   console.log(result, 'workout plan');
    //   if (result.status == true) {
    //     setLoading(false);
    navigation.navigate('StartExercise', {item: item});
    //   } else {
    //     console.error(result.message);
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   console.log(error);
    // }
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
          data={id.workout_plan_exersises}
          scrollEnabled={false}
          renderItem={({itemData, index}) => {
            return (
              <View style={{}}>
                <Text
                  style={[styles.signInText, {marginTop: responsiveHeight(3)}]}>
                  {itemData
                    ? item.exersise_details.title
                    : staticValue.exersise_details.title}
                </Text>
                <Text
                  style={[
                    styles.signInText,
                    {fontFamily: 'Interstate-regular'},
                  ]}>
                  7 mins
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
                    onPress={() =>
                      navigation.navigate('AllPlan', {item: staticValue})
                    }
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
                    uri: `${BaseUrl}` + staticValue.exersise_details.animation,
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
                    fontSize: 12,
                    opacity: 0.7,
                    marginBottom: responsiveHeight(1.2),
                    lineHeight: responsiveHeight(2.6),
                    width: responsiveWidth(90),
                  }}>
                  {item.description}
                </Text>
                <Text style={[styles.signInText, {fontSize: 16}]}>
                  Focused Area
                </Text>
                <View
                  style={[CssStyle.flexJustify, {width: responsiveWidth(90)}]}>
                  {/* <Image
                  //   resizeMode="contain"
                  source={require('../../assets/Rectangle32.png')}
                  borderRadius={responsiveWidth(2)}
                  style={{
                    width: responsiveWidth(42),
                    height: responsiveHeight(13),
                    marginVertical: responsiveHeight(2),
                  }}
                /> */}

                  <View
                    style={{
                      width: responsiveWidth(42),
                      height: responsiveHeight(13),
                      marginVertical: responsiveHeight(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      // borderWidth: 1,
                      // borderColor: 'white',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Interstate-regular',
                        fontSize: 17,
                        color: 'white',
                      }}>
                      {/* {staticValue.focus_area[0]} */}
                    </Text>
                  </View>
                  {/* <Image
                  //   resizeMode="contain"
                  source={require('../../assets/Rectangle32.png')}
                  borderRadius={responsiveWidth(2)}
                  style={{
                    width: responsiveWidth(42),
                    height: responsiveHeight(13),
                    marginVertical: responsiveHeight(2),
                  }}
                /> */}
                  <View
                    style={{
                      width: responsiveWidth(42),
                      height: responsiveHeight(13),
                      marginVertical: responsiveHeight(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Interstate-regular',
                        fontSize: 17,
                        color: 'white',
                      }}>
                      {/* {item.focus_area[2]} */}
                    </Text>
                  </View>
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
