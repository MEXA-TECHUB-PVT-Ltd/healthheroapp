import {
  FlatList,
  Image,
  StatusBar,
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
import {
  GetAdvance,
  GetAllWorkoutPlanAPI,
  GetBeginner,
  GetIntermediate,
  GetSearchData,
} from '../../services/WorkoutPlan';
import Logo from '../../assets/Icon3';
import NoImage from '../../assets/noImageRed';
import Timer from '../../assets/Icon';
import {HelpingComponent} from '../../Helping/HelpingComponent';
import {BaseUrl} from '../../Helping/BaseUrl';

const Search = ({navigation}) => {
  const buttonMap = [
    {text: 'Beginner', nav: 'Beginner'},
    {text: 'Intermediate', nav: 'Intermediate'},
    {text: 'Advance', nav: 'Advance'},
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
  const [getAllWorkoutPlanIdea, setGetAllWrongWorkoutPlanIdea] = useState([]);
  const GetAllWorkout = async () => {
    try {
      const result = await GetAllWorkoutPlanAPI();
      // console.log(result);
      if (result.status == true) {
        setGetAllWrongWorkoutPlanIdea(result.result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    BeginnerApi();
    GetAllWorkout();
    AdvanceApi();
    IntermediateApi();
  }, []);
  const [advance, setAdvance] = useState([]);
  const [beginner, setBeginner] = useState([]);
  const [intermediate, setIntermediate] = useState([]);
  const [status, setStatus] = useState('');
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
  const [getSearch, setGetSearch] = useState([]);
  const GetSearchApi = async () => {
    try {
      const result = await GetSearchData(search);
      // console.log(result);
      if (result.status == true) {
        setGetSearch(result.result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetSearchApi();
  }, [search]);
  return (
    <View style={[CssStyle.mainContainer, {backgroundColor: '#0B183C'}]}>
      <StatusBar hidden={true} />
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View
          style={[
            {
              marginTop: responsiveHeight(3),
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}>
          <TouchableOpacity
            style={{marginTop: responsiveHeight(2.8)}}
            onPress={() => {
              status ? (setStatus(''), setSearch('')) : navigation.goBack();
            }}>
            <Icon name="chevron-back-outline" size={23} color={'#FF5100'} />
          </TouchableOpacity>
          <View>
            <Input
              noIcon={true}
              style={{width: responsiveWidth(80)}}
              height={responsiveHeight(5)}
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
            {search.length > 1 && (
              <FlatList
                data={getSearch}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <View
                    style={[
                      CssStyle.flexJustify,
                      {
                        marginBottom: responsiveHeight(2),
                        paddingHorizontal: responsiveWidth(5),
                        borderRadius: responsiveWidth(2),
                        // borderColor: 'white',
                        // borderWidth: 1,
                        paddingVertical: responsiveHeight(1),
                      },
                    ]}>
                    <View style={CssStyle.flexData}>
                      <Icon name="search" size={23} color={'#FF5100'} />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontFamily: 'Interstate-regular',
                          opacity: 0.8,
                          marginLeft: responsiveWidth(3),
                        }}>
                        {item.workout_title}
                      </Text>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
        {status == 'Beginner' ||
        status == 'Advance' ||
        status == 'Intermediate' ? null : (
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
                  onPress={() => {
                    setStatusFilter(item.text), setSearch(item.text);
                  }}
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
        )}
        {/* <FlatList
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
        /> */}
        {status == 'Beginner' ? (
          <>
            <Text
              style={{
                fontFamily: 'Interstate-bold',
                color: 'white',
                fontSize: 35,
                marginVertical: responsiveHeight(2),
              }}>
              Beginner
            </Text>
            <View style={{marginTop: responsiveHeight(1), flex: 1}}>
              {beginner.length > 0 ? (
                <FlatList
                  data={beginner}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <View
                      style={[
                        CssStyle.flexData,
                        {marginBottom: responsiveHeight(2)},
                      ]}>
                      <View style={{width: responsiveWidth(36)}}>
                        {item.image ? (
                          <Image
                            source={{uri: `${BaseUrl}` + item.image}}
                            resizeMode="contain"
                            style={{
                              width: 130,
                              height: 130,
                              marginRight: responsiveWidth(1),
                            }}
                          />
                        ) : (
                          <NoImage width={130} height={130} />
                        )}
                      </View>
                      <View style={{width: responsiveWidth(47)}}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 15,
                            fontFamily: 'Interstate-regular',
                            opacity: 0.8,
                          }}>
                          {item.workout_title}
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 11,
                            fontFamily: 'Interstate-regular',
                            marginVertical: responsiveHeight(0.7),
                            opacity: 0.5,
                          }}>
                          {item.description}
                        </Text>
                        <View
                          style={[
                            CssStyle.flexJustify,
                            {width: responsiveWidth(45)},
                          ]}>
                          <View
                            style={[
                              CssStyle.flexData,
                              {marginVertical: responsiveHeight(0.6)},
                            ]}>
                            <Logo width={16} height={16} />
                            <Text
                              style={{
                                color: 'white',
                                fontFamily: 'Interstate-regular',
                                fontSize: 12,
                                marginLeft: responsiveWidth(2),
                                opacity: 0.5,
                              }}>
                              {item.calories_burnt} kcal
                            </Text>
                          </View>
                          <View
                            style={[
                              CssStyle.flexData,
                              {marginVertical: responsiveHeight(1)},
                            ]}>
                            <Timer width={16} height={16} />
                            <Text
                              style={{
                                color: 'white',
                                fontFamily: 'Interstate-regular',
                                fontSize: 12,
                                marginLeft: responsiveWidth(2),
                                opacity: 0.5,
                              }}>
                              {item.time}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Interstate-regular',
                      fontSize: 17,
                    }}>
                    No Workout plan available
                  </Text>
                </View>
              )}
            </View>
          </>
        ) : status == 'Advance' ? (
          <>
            <Text
              style={{
                fontFamily: 'Interstate-bold',
                color: 'white',
                fontSize: 35,
                marginVertical: responsiveHeight(2),
              }}>
              Advance
            </Text>
            <View style={{marginTop: responsiveHeight(1)}}>
              {advance.length > 0 ? (
                <FlatList
                  data={advance}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={[
                          CssStyle.flexData,
                          {marginBottom: responsiveHeight(2)},
                        ]}>
                        <View style={{width: responsiveWidth(39)}}>
                          <Image
                            source={{uri: `${BaseUrl}` + item.image}}
                            resizeMode="contain"
                            style={{
                              width: 130,
                              height: 130,
                              marginRight: responsiveWidth(2),
                            }}
                          />
                        </View>
                        <View style={{width: responsiveWidth(47)}}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 15,
                              fontFamily: 'Interstate-regular',
                              opacity: 0.8,
                            }}>
                            {item.workout_title}
                          </Text>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 11,
                              fontFamily: 'Interstate-regular',
                              marginVertical: responsiveHeight(0.7),
                              opacity: 0.5,
                            }}>
                            {item.description}
                          </Text>
                          <View
                            style={[
                              CssStyle.flexJustify,
                              {width: responsiveWidth(45)},
                            ]}>
                            <View
                              style={[
                                CssStyle.flexData,
                                {marginVertical: responsiveHeight(0.6)},
                              ]}>
                              <Logo width={16} height={16} />
                              <Text
                                style={{
                                  color: 'white',
                                  fontFamily: 'Interstate-regular',
                                  fontSize: 12,
                                  marginLeft: responsiveWidth(2),
                                  opacity: 0.5,
                                }}>
                                {item.calories_burnt} kcal
                              </Text>
                            </View>
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
                                  opacity: 0.5,
                                }}>
                                {item.time.slice(0, 3)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Interstate-regular',
                      fontSize: 17,
                    }}>
                    No Workout plan available
                  </Text>
                </View>
              )}
            </View>
          </>
        ) : (
          status == 'Intermediate' && (
            <>
              <Text
                style={{
                  fontFamily: 'Interstate-bold',
                  color: 'white',
                  fontSize: 35,
                  marginVertical: responsiveHeight(2),
                }}>
                Intermediate
              </Text>
              <View style={{marginTop: responsiveHeight(1), flex: 1}}>
                {intermediate.length > 0 ? (
                  <FlatList
                    data={intermediate}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <View
                        style={[
                          CssStyle.flexData,
                          {marginBottom: responsiveHeight(2)},
                        ]}>
                        <View style={{width: responsiveWidth(39)}}>
                          {item.image ? (
                            <Image
                              source={{uri: `${BaseUrl}` + item.image}}
                              resizeMode="contain"
                              style={{
                                width: 130,
                                height: 130,
                                marginRight: responsiveWidth(2),
                              }}
                            />
                          ) : (
                            <NoImage width={130} height={130} />
                          )}
                        </View>
                        <View style={{width: responsiveWidth(47)}}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 15,
                              fontFamily: 'Interstate-regular',
                              opacity: 0.8,
                            }}>
                            {item.workout_title}
                          </Text>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 11,
                              fontFamily: 'Interstate-regular',
                              marginVertical: responsiveHeight(0.7),
                              opacity: 0.5,
                            }}>
                            {item.description}
                          </Text>
                          <View
                            style={[
                              CssStyle.flexJustify,
                              {width: responsiveWidth(45)},
                            ]}>
                            <View
                              style={[
                                CssStyle.flexData,
                                {marginVertical: responsiveHeight(0.6)},
                              ]}>
                              <Logo width={16} height={16} />
                              <Text
                                style={{
                                  color: 'white',
                                  fontFamily: 'Interstate-regular',
                                  fontSize: 12,
                                  marginLeft: responsiveWidth(2),
                                  opacity: 0.5,
                                }}>
                                {item.calories_burnt} kcal
                              </Text>
                            </View>
                            <View
                              style={[
                                CssStyle.flexData,
                                {marginVertical: responsiveHeight(1)},
                              ]}>
                              <Timer width={16} height={16} />
                              <Text
                                style={{
                                  color: 'white',
                                  fontFamily: 'Interstate-regular',
                                  fontSize: 12,
                                  marginLeft: responsiveWidth(2),
                                  opacity: 0.5,
                                }}>
                                {item.time}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                        fontSize: 17,
                      }}>
                      No Workout plan available
                    </Text>
                  </View>
                )}
              </View>
            </>
          )
        )}
        {status ? null : (
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
              <FlatList
                data={getAllWorkoutPlanIdea}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        // setStatusFilter(item.text), setSearch(item.text);
                      }}
                      style={{
                        borderRadius: responsiveWidth(2),
                        backgroundColor: '#FF510055',
                        paddingVertical: responsiveHeight(0.9),
                        paddingHorizontal: responsiveWidth(2),
                        marginVertical: responsiveHeight(0.4),
                        width: responsiveWidth(50),
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Interstate-bold',
                          color: 'white',
                          fontSize: 13,
                          opacity: 0.8,
                        }}>
                        {item.workout_title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
