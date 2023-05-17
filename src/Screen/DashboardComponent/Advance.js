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
import { GetAdvance } from '../../services/WorkoutPlan';

const Advance = ({navigation}) => {
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
  const [advance,setAdvance]=useState([])
  const BeginnerApi = async () => {
    try {
      const result = await GetAdvance();
      // console.log(result);
      if (result.status == true) {
        setAdvance(result.result);
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
  const [searchAdd, setSearchAdd] = useState('');
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View style={[CssStyle.flexJustify, {marginTop: responsiveHeight(3)}]}>
          <TouchableOpacity
            style={{marginLeft: responsiveWidth(-2)}}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={23} color={'#FF5100'} />
          </TouchableOpacity>
          {searchAdd == 'Search this' ? (
            <Input
              noIcon={true}
              style={{width: responsiveWidth(80)}}
              // height={responsiveHeight(5)}
              placeholder={'SEARCH ...'}
              rightIcon="search"
              onChangeText={e => setSearchAdd('')}
            offIcon={'search'}
            />
          ) : (
            <>
              <Text
                style={{
                  fontFamily: 'Interstate-bold',
                  color: 'white',
                  fontSize: 16,
                  // marginVertical: responsiveHeight(2),
                }}>
                Advance
              </Text>
              <TouchableOpacity onPress={() => setSearchAdd('Search this')}>
                <Icon name="search" size={23} color={'white'} />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={{marginTop: responsiveHeight(4)}}>
          <FlatList
            data={advance}
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
                    marginVertical: responsiveHeight(0.4),
                    paddingTop: responsiveHeight(1),
                  }}>
                  Yoga exercise
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'Interstate-regular',
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

export default Advance;

const styles = StyleSheet.create({});
