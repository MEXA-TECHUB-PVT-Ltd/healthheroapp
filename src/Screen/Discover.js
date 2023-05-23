import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CssStyle from '../StyleSheet/CssStyle';
import {AppColors} from '../Helping/AppColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../assets/Icon3';
import Loader from '../component/Loader';
import {ExerciseOfTheDay} from '../services/WorkoutPlan';
import {GetAllCategories} from '../services/WorkoutCategory';
import {BaseUrl} from '../Helping/BaseUrl';

const Discover = ({navigation}) => {
  const advance = [{item: 1}, {item: 2}, {item: 3}];
  const [exerciseData, setExerciseData] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const ExerciseDay = async () => {
    setLoading(true);
    try {
      const result = await ExerciseOfTheDay();
      // console.log(result);
      if (result.status == true) {
        setExerciseData(result.result);
        setLoading(false);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const GetCategory = async () => {
    setLoading(true);
    try {
      const result = await GetAllCategories();
      console.log(result);
      if (result.status == true) {
        setCategory(result.result);
        setLoading(false);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    ExerciseDay();
    GetCategory();
  }, []);
  console.log(exerciseData);
  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: AppColors.buttonText,
          borderBottomLeftRadius: responsiveWidth(4),
          borderBottomEndRadius: responsiveWidth(4),
          paddingVertical: responsiveHeight(1),
        }}>
        <Text style={[styles.signInText]}>Discover</Text>
      </View>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={[
            CssStyle.flexJustify,
            {
              backgroundColor: '#232441',
              borderRadius: responsiveHeight(20),
              paddingVertical: responsiveHeight(1),
              paddingHorizontal: responsiveWidth(5),
              marginTop: responsiveHeight(3),
              marginHorizontal: responsiveWidth(2),
            },
          ]}>
          <Text
            style={{
              fontSize: 11,
              color: 'white',
              fontFamily: 'Interstate-regular',
            }}>
            SEARCH WORKOUT
          </Text>
          <Icon name={'search'} size={19} color="white" />
        </TouchableOpacity>
        <View
          style={[
            CssStyle.flexData,
            {
              backgroundColor: '#FF5100',
              borderRadius: responsiveWidth(3),
              paddingHorizontal: responsiveWidth(3),
              paddingVertical: responsiveHeight(2.8),
              marginTop: responsiveHeight(4.8),
              paddingBottom: responsiveHeight(3.8),
              height: responsiveHeight(32.6),
            },
          ]}>
          <View style={{position: 'relative', width: responsiveWidth(50)}}>
            <Image
              resizeMode="contain"
              source={{uri: `${BaseUrl}` + exerciseData.animation}}
              style={{
                width: responsiveHeight(30),
                height: responsiveHeight(34.5),
                position: 'absolute',
                bottom: responsiveHeight(-16.8),
                left: responsiveWidth(-8),
              }}
            />
          </View>
          <View style={{}}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-bold',
                fontSize: 29,
                width: responsiveWidth(34),
                flexWrap: 'wrap',
                lineHeight: responsiveHeight(4.4),
              }}>
              {exerciseData ? exerciseData.title : 'Exercise Name'}
            </Text>
            {/* <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-bold',
                fontSize: 27,
              }}>
              Name
            </Text> */}
            <Text
              style={{
                color: 'white',
                fontFamily: 'Interstate-regular',
                width: responsiveWidth(34),
                lineHeight: responsiveHeight(2.5),
                marginVertical: responsiveHeight(1),
              }}>
              {exerciseData?.description?.slice(0, 20)}
            </Text>
            <View
              style={[
                CssStyle.flexData,
                {marginVertical: responsiveHeight(1)},
              ]}>
              <Logo width={16} height={16} />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  fontSize: 12,
                  marginLeft: responsiveWidth(2),
                }}>
                400 kcal
              </Text>
            </View>
            <View
              style={[
                CssStyle.flexData,
                {
                  overflow: 'visible',
                },
              ]}>
              <Logo width={16} height={16} />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Interstate-regular',
                  marginLeft: responsiveWidth(2),
                  fontSize: 12,
                }}>
                45 min
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WorkoutExercise', {item: exerciseData})
              }
              style={{
                borderRadius: responsiveWidth(2),
                backgroundColor: '#ffffffd1',
                alignItems: 'center',
                paddingVertical: responsiveHeight(1),
                width: responsiveWidth(25),
                marginTop: responsiveHeight(1.8),
              }}>
              <Text style={{color: '#FF5100', fontWeight: '500'}}>
                Start Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{marginTop: responsiveHeight(4)}}>
          <FlatList
            data={advance}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View
                style={{marginRight: responsiveWidth(5), alignItems: 'center'}}>
                <Image
                  borderRadius={responsiveWidth(2.7)}
                  source={require('../assets/Rectangle32.png')}
                  style={{
                    width: responsiveWidth(34),
                    height: responsiveHeight(15),
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontFamily: 'Interstate-regular',
                    marginTop: responsiveHeight(1),
                  }}>
                  Beginner
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'Interstate-regular',
                  }}>
                  21 min | 400 k
                </Text>
              </View>
            )}
          />
        </View> */}
        <View style={{marginTop: responsiveHeight(3)}}>
          <FlatList
            data={category}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('WorkoutExercise', {item: item})
                }
                style={{marginRight: responsiveWidth(5), alignItems: 'center'}}>
                <Image
                  borderRadius={responsiveWidth(2)}
                  source={require('../assets/Rectangle33.png')}
                  style={{
                    width: responsiveWidth(34),
                    height: responsiveHeight(15),
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontFamily: 'Interstate-regular',
                    marginTop: responsiveHeight(1),
                  }}>
                  {item.category_name}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'Interstate-regular',
                  }}>
                  21 min | 400 k
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 35,
    lineHeight: responsiveHeight(5),
    opacity: 0.9,
  },
});
