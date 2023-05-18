import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from '../../../Helping/AppColor';
import CssStyle from '../../../StyleSheet/CssStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../../../component/CustomButton';
import Lottie from 'lottie-react-native';
import assets from '../../../assets';
import {GetPlanApi} from '../../../services/UserPlan';
import {useSelector} from 'react-redux';
import Loader from '../../../component/Loader';

const AllPlan = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  const [selectItem, setSelectItem] = useState('');
  const dataPlan = [
    {indoor: 'Beginner', lesson: 'Exercises', text: 'hello'},
    {indoor: 'Indoor', lesson: 'lessons', text: 'sarkar'},
    {indoor: 'Indoor', lesson: 'lessons', text: 'laro'},
  ];
  const [openModel, setOpenModel] = useState(false);
  const data = useSelector(data => data.id);
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(false);
  const GetPlan = async () => {
    setLoading(true);
    try {
      const result = await GetPlanApi(data);
      console.log(result);
      if (result.status == true) {
        setPlanData(result.result);
        setLoading(false);
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading;
      console.log(error);
    }
  };
  useEffect(() => {
    GetPlan();
  }, [data]);
  return loading ? (
    <Loader />
  ) : (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View
          style={[CssStyle.flexJustify, {marginTop: responsiveHeight(4.2)}]}>
          <TouchableOpacity
            style={{
              marginLeft: responsiveWidth(0),
            }}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={28} color={'white'} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Interstate-regular',
              color: 'white',
              fontSize: 22,
            }}>
            Select Plan
          </Text>
          <TouchableOpacity
            style={{marginRight: responsiveWidth(2)}}
            onPress={() => navigation.navigate('CreatePlan', {id: item})}>
            <Octicons name="diff-added" size={23} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: responsiveHeight(6)}}>
          <FlatList
            data={planData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => setSelectItem(item.text)}
                style={[
                  CssStyle.flexData,
                  {
                    marginBottom: responsiveHeight(1.9),
                    borderWidth: 1,
                    borderColor:
                      selectItem == item.text
                        ? AppColors.buttonText
                        : '#00000022',
                    borderRadius: 12,
                    backgroundColor:
                      selectItem == item.text ? '#0A1F58' : '#626377',
                    paddingHorizontal: responsiveWidth(3),
                    paddingVertical: responsiveHeight(1.5),
                  },
                ]}>
                <View style={{width: responsiveWidth(28)}}>
                  <Image
                    source={require('../../../assets/Rectangle33.png')}
                    resizeMode="contain"
                    style={{
                      width: 99,
                      height: 90,
                      //   marginRight: responsiveWidth(2),
                    }}
                  />
                </View>
                <View style={{width: responsiveWidth(57)}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontFamily: 'Interstate-regular',
                      opacity: 1,
                    }}>
                    {item.plan_name.slice(0, 29)}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 11,
                      fontFamily: 'Interstate-regular',
                      marginTop: responsiveHeight(0.7),
                      opacity: 0.8,
                      lineHeight: responsiveHeight(2),
                      letterSpacing: 0.4,
                    }}>
                    {item.description.slice(0, 39)}
                  </Text>
                  <View
                    style={{
                      borderBottomColor: 'white',
                      borderBottomWidth: 1,
                      marginVertical: responsiveHeight(1),
                    }}
                  />
                  <View
                    style={[
                      CssStyle.flexJustify,
                      {width: responsiveWidth(48)},
                    ]}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                        fontSize: 12,
                        opacity: 0.8,
                      }}>
                      12 lesson
                    </Text>
                    <View
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 10,
                        backgroundColor: 'white',
                      }}
                    />

                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                        fontSize: 12,
                        opacity: 0.8,
                      }}>
                      45 min
                    </Text>
                    <View
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 10,
                        backgroundColor: 'white',
                      }}
                    />

                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Interstate-regular',
                        fontSize: 12,
                        opacity: 0.8,
                      }}>
                      Beginner
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: responsiveHeight(90),
            left: responsiveWidth(10),
          }}>
          <CustomButton
            onPress={() =>
              selectItem
                ? setOpenModel(true)
                : ToastAndroid.show(
                    'Please select one option',
                    ToastAndroid.SHORT,
                  )
            }
            activeOpacity={1}
            buttonColor={AppColors.buttonText}
            paddingVertical={2}
            style={{width: responsiveWidth(80)}}
            buttonText={'Add Exercise'}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModel}
        onRequestClose={() => setOpenModel(false)}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => setOpenModel(false)}>
          <View style={{flex: 1, backgroundColor: '#00000060'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  backgroundColor: AppColors.blueColor,
                  alignItems: 'center',
                  borderTopEndRadius: responsiveHeight(3),
                  borderTopLeftRadius: responsiveHeight(3),
                  paddingVertical: responsiveHeight(4.8),
                }}>
                <View
                  // activeOpacity={1}
                  style={{
                    // height: wp(28),
                    width: 90,
                    // backgroundColor: 'red',
                    aspectRatio: 1,
                    alignSelf: 'center',
                    marginTop: responsiveHeight(1),
                  }}>
                  <Lottie
                    source={assets.loader}
                    autoPlay
                    loop={true}
                    resizeMode="cover"
                    speed={1}
                    colorFilter={[{color: 'red'}]}
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 23,
                    fontFamily: 'Interstate-regular',
                    width: responsiveWidth(75),
                    textAlign: 'center',
                    lineHeight: responsiveHeight(4),
                    marginTop: responsiveHeight(4),
                    textTransform: 'capitalize',
                  }}>
                  Exercise added to my plans Successfully
                </Text>
                <CustomButton
                  buttonText={'Go Back'}
                  onPress={() => {
                    setOpenModel(false), navigation.navigate('WorkoutExercise');
                  }}
                  buttonColor={'transparent'}
                  mode="outlined"
                  fontWeight={'500'}
                  borderColor={'white'}
                  style={{
                    marginTop: responsiveHeight(3.7),
                    width: responsiveWidth(46),
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AllPlan;

const styles = StyleSheet.create({});
