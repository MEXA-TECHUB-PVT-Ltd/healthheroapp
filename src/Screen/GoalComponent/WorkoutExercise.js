import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from '../../Helping/AppColor';
import Icon from 'react-native-vector-icons/Ionicons';
import {GetWorkoutById} from '../../services/WorkoutPlan';

const WorkoutExercise = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  const [loading, setLoading] = useState(false);
  const [workoutData, setWorkoutData] = useState([]);
  const WorkoutPlan = async () => {
    setLoading(true);
    try {
      const result = await GetWorkoutById(item?.workout_category_id);
      console.log(result, 'workout plan');
      if (result.status == true) {
        setWorkoutData(result.result);
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
    WorkoutPlan();
  }, []);
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View style={[CssStyle.flexJustify]}>
          <TouchableOpacity
            style={{
              marginLeft: responsiveWidth(-2),
              marginTop: responsiveHeight(4.2),
            }}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={23} color={'white'} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Interstate-regular',
              color: 'white',
              marginTop: responsiveHeight(4.2),
              fontSize: 18,
            }}>
            {item?.category_name ? item.category_name : 'Workout'}
          </Text>
          <TouchableOpacity
            style={{
              marginTop: responsiveHeight(4.2),
            }}
            onPress={() => {}}>
            <Icon name="search" size={23} color={'white'} />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: responsiveHeight(4)}}>
          <FlatList
            data={workoutData}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('WorkoutDetail', {item: item})
                }
                style={{
                  // width: responsiveWidth(50),
                  marginBottom: responsiveHeight(2),
                  marginRight: responsiveWidth(7),
                }}>
                <Image
                  borderRadius={responsiveWidth(2)}
                  source={require('../../assets/Rectangle32.png')}
                  style={{
                    width: responsiveWidth(40),
                    height: responsiveHeight(18),
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontFamily: 'Interstate-regular',
                    alignSelf: 'center',
                    marginVertical: responsiveHeight(0.6),
                    paddingTop: responsiveHeight(1),
                  }}>
                  Yoga exercise
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'Interstate-regular',
                    opacity: 0.5,
                    alignSelf: 'center',
                  }}>
                  21 min | 400 k
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default WorkoutExercise;

const styles = StyleSheet.create({});
