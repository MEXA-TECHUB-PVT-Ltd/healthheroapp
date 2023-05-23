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
import {AppColors} from '../../Helping/AppColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../../component/Input';
import {GetIntermediate} from '../../services/WorkoutPlan';
import {BaseUrl} from '../../Helping/BaseUrl';

const Intermediate = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  // console.log(item);
  const [searchAdd, setSearchAdd] = useState('');
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View style={[CssStyle.flexJustify]}>
          {searchAdd == 'Search this' ? (
            <>
              <TouchableOpacity
                style={{
                  marginLeft: responsiveWidth(-2),
                  marginTop: responsiveHeight(2.5),
                  marginBottom: responsiveHeight(-1.9),
                }}
                onPress={() => setSearchAdd('')}>
                <Icon name="close" size={23} color={'white'} />
              </TouchableOpacity>
              <Input
                noIcon={true}
                marginVertical={0}
                style={{
                  width: responsiveWidth(80),
                  marginTop: responsiveHeight(2.5),
                  marginBottom: responsiveHeight(-1.1),
                }}
                height={responsiveHeight(5)}
                placeholder={'SEARCH ...'}
                rightIcon="search"
                offIcon={'search'}
                onChangeText={e => setSearchAdd('')}
              />
            </>
          ) : (
            <>
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
                {item.name}
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: responsiveHeight(4.2),
                }}
                onPress={() => setSearchAdd('Search this')}>
                <Icon name="search" size={23} color={'white'} />
              </TouchableOpacity>
            </>
          )}
        </View>

        {item?.itemData?.length > 0 ? (
          <View style={{marginTop: responsiveHeight(4)}}>
            <FlatList
              data={item?.itemData}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('WorkoutDetail', {item: item.workout_plan_id})
                  }
                  style={{
                    // width: responsiveWidth(50),
                    marginBottom: responsiveHeight(2),
                    marginRight: responsiveWidth(7),
                  }}>
                  <Image
                    borderRadius={responsiveWidth(2)}
                    source={{uri: `${BaseUrl}` + item.image}}
                    style={{
                      width: responsiveWidth(40),
                      height: responsiveHeight(18),
                    }}
                    // resizeMode="contain"
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
                    {item.workout_title}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      fontFamily: 'Interstate-regular',
                      opacity: 0.5,
                      alignSelf: 'center',
                    }}>
                    {item.time?.slice(0, 2)} min | {item.calories_burnt} k
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 20}}>Not Available</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Intermediate;

const styles = StyleSheet.create({});
