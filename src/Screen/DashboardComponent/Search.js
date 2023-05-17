import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CssStyle from '../../StyleSheet/CssStyle';
import {AppColors} from '../../Helping/AppColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../../component/Input';
import {
  GetAdvance,
  GetBeginner,
  GetIntermediate,
} from '../../services/WorkoutPlan';
import {HelpingComponent} from '../../Helping/HelpingComponent';

const Search = ({navigation}) => {
  const buttonMap = [
    {text: 'Beginner', nav: 'Beginner'},
    {text: 'Advance', nav: 'Advance'},
    {text: 'Intermediate', nav: 'Intermediate'},
  ];
  const workoutPlan = [
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
    {text: 'Lorem', nav: 'WorkoutPlan'},
    {text: 'Lorem ', nav: 'WorkoutPlan'},
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
    {text: 'Lorem ', nav: 'WorkoutPlan'},
    {text: 'Lorem ipsum', nav: 'WorkoutPlan'},
  ];
  const [dataSearch, setDataSearch] = useState([]);
  const BeginnerApi = async () => {
    try {
      const result = await GetBeginner();
      // console.log(result);
      if (result.status == true) {
        setBeginner(result.result);
        setDataSearch(result.result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const AdvanceApi = async () => {
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
  const IntermediateApi = async () => {
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
    AdvanceApi();
    IntermediateApi();
  }, []);
  const [advance, setAdvance] = useState([]);
  const [beginner, setBeginner] = useState([]);
  const [intermediate, setIntermediate] = useState([]);
  const [status, setStatus] = useState('Beginner');
  const setStatusFilter = status => {
    if (status === 'Beginner') {
      setDataSearch([...beginner]);
    }
    if (status === 'Advance') {
      setDataSearch([...advance]);
    }
    if (status === 'Intermediate') {
      setDataSearch([...intermediate]);
    } else {
    }
    setStatus(status);
  };
  const [search, setSearch] = useState('');
  const filteredData = search
    ? dataSearch.filter(x =>
        x.workout_title.toLowerCase().includes(search.toLowerCase()),
      )
    : dataSearch;
  const [dataArray, setDataArray] = useState([]);
  const [selectItem, setSelectItem] = useState(false);
  return (
    <View style={[CssStyle.mainContainer, {backgroundColor: '#0b183c'}]}>
      <View style={{paddingHorizontal: responsiveWidth(5)}}>
        <View style={[CssStyle.flexJustify, {marginTop: responsiveHeight(3)}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={23} color={'#FF5100'} />
          </TouchableOpacity>
          <Input
            noIcon={true}
            style={{width: responsiveWidth(80)}}
            height={responsiveHeight(6)}
            fontSize={14}
            placeholder={'SEARCH ...'}
            rightIcon="search"
            offIcon={'search'}
            onPressRightIcon={() => {
              dataArray.push({searchItem: search}), setSearch('');
              setDataArray([...dataArray]);
            }}
            value={search}
            onChangeText={e => setSearch(e)}
          />
        </View>
        <View
          style={{
            marginTop: responsiveHeight(1),
            marginBottom: responsiveHeight(2),
          }}>
          <Text
            style={{
              fontFamily: 'Interstate-bold',
              color: 'white',
              fontSize: 37,
              marginBottom: responsiveHeight(2),
            }}>
            Category
          </Text>
          <View style={[CssStyle.flexData, {}]}>
            {buttonMap.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setStatusFilter(item.text)}
                style={{
                  width: responsiveWidth(24),
                  borderRadius: responsiveWidth(2),
                  backgroundColor: '#FF510055',
                  marginRight: responsiveWidth(2),
                  paddingVertical: responsiveHeight(0.6),
                  paddingHorizontal: responsiveWidth(1),
                }}>
                <Text
                  style={{
                    fontFamily: 'Interstate-bold',
                    color: 'white',
                    fontSize: 12,
                    alignSelf: 'center',
                    opacity: 0.8,
                  }}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <FlatList
          data={filteredData}
          renderItem={({item, index}) => {
            // console.log(item, 'hellu');
            return (
              <View
                style={{
                  paddingVertical: responsiveHeight(1),
                  borderColor: 'white',
                  borderWidth: 1,
                  paddingHorizontal: responsiveWidth(3),
                  borderRadius: responsiveWidth(2),
                }}>
                <Text style={{color: 'white'}}>{item.description}</Text>
                <Text style={{color: 'white', fontSize: 12}}>
                  {item.workout_title}
                </Text>
              </View>
            );
          }}
        />

        <View style={{marginTop: responsiveHeight(3)}}>
          <Text
            style={{
              fontFamily: 'Interstate-bold',
              color: 'white',
              fontSize: 37,
              marginBottom: responsiveHeight(1),
            }}>
            Workout Plans
          </Text>
          <View style={[CssStyle.flexData, {flexWrap: 'wrap'}]}>
            {dataArray.map((item, index) => (
              <HelpingComponent item={item} index={index} key={index} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
