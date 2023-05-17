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

const Intermediate = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  const dataFLex = [
    {item: 1},
    {item: 2},
    {item: 3},
    {item: 1},
    {item: 2},
    {item: 3},
    {item: 1},
    {item: 2},
    {item: 3},
    {item: 1},
    {item: 2},
    {item: 3},
  ];
  const [searchAdd, setSearchAdd] = useState('');
  const [intermediate, setIntermediate] = useState([]);
  const BeginnerApi = async () => {
    try {
      const result = await GetIntermediate();
      // console.log(result);
      if (result.status == true) {
        setIntermediate(result.result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    BeginnerApi();
  }, []);
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

        <View style={{marginTop: responsiveHeight(4)}}>
          <FlatList
            data={item?.itemData}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, inde}) => (
              <View
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
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Intermediate;

const styles = StyleSheet.create({});
