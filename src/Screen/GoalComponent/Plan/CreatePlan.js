import {
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CssStyle from '../../../StyleSheet/CssStyle';
import {AppColors} from '../../../Helping/AppColor';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../../../component/Input';
import CustomButton from '../../../component/CustomButton';

import Lottie from 'lottie-react-native';
import assets from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {CreatePlanApi} from '../../../services/UserPlan';
import {useSelector} from 'react-redux';
const CreatePlan = ({navigation}) => {
  const [planTitle, setPlanTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openModel, setOpenModel] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  const [data, setData] = useState('');
  const id = useSelector(data => data.id);
  console.log(id);
  useEffect(() => {
    setTimeout(() => {
      setData('');
    }, 2500);
  }, []);
  console.log(new Date().toLocaleDateString());
  const [loading, setLoading] = useState(false);
  const CreatePlan = async () => {
    setLoading(true);
    try {
      const result = await CreatePlanApi(
        id,
        planTitle,
        description,
        exerciseData,
        new Date().toLocaleDateString(),
      );
      console.log(result);
      if (result.status == true) {
        setOpenModel(true);
        setLoading(false);
        setDescription('');
        setPlanTitle('');
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading;
      console.log(error);
    }
  };
  return (
    <LinearGradient
      colors={['#0A1F58', AppColors.blueColor]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.6}}
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <TouchableOpacity
          style={{
            marginLeft: responsiveWidth(0),
            marginTop: responsiveHeight(3),
          }}
          onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back-outline"
            size={28}
            color={AppColors.buttonText}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: responsiveFontSize(5),
            color: 'white',
            textTransform: 'capitalize',
            fontFamily: 'Interstate-bold',
            marginTop: responsiveHeight(5),
            lineHeight: responsiveHeight(6.2),
          }}>
          Create Workout Plan
        </Text>
        <Text
          style={{
            color: 'white',
            letterSpacing: 0.9,
            fontSize: 12.6,
            lineHeight: responsiveHeight(2.6),
            marginVertical: responsiveHeight(3),
          }}>
          Welcome to the workout plan creation screen! This is where you can
          customize and create a workout plan tailored to your specific goals
          and preferences.
        </Text>
        <Input
          bgColor={'#ffffff60'}
          placeholder={'Plan title'}
          noIcon={true}
          value={planTitle}
          onChangeText={e => setPlanTitle(e)}
          fontSize={16}
          style={{marginTop: responsiveHeight(1)}}
        />
        {data && (
          <Text style={{color: AppColors.buttonText}}>Fill the fields</Text>
        )}
        <Input
          bgColor={'#ffffff60'}
          placeholder={'Description'}
          noIcon={true}
          value={description}
          onChangeText={e => setDescription(e)}
          fontSize={16}
          multiline={true}
          height={responsiveHeight(18)}
          borderRadius={responsiveWidth(6)}
          style={{
            textAlignVertical: 'top',
            //   marginTop: responsiveHeight(2),
          }}
        />
        {data && (
          <Text style={{color: AppColors.buttonText}}>Fill the fields</Text>
        )}
        <View style={{alignItems: 'center'}}>
          <CustomButton
            onPress={() =>
              planTitle && description ? CreatePlan() : setData('hello')
            }
            activeOpacity={1}
            loading={loading}
            buttonColor={AppColors.buttonText}
            paddingVertical={2}
            style={{
              width: responsiveWidth(80),
              marginTop: responsiveHeight(8),
            }}
            buttonText={'Create'}
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
                  Workout Plan Created Successfully
                </Text>
                <CustomButton
                  buttonText={'Go Back'}
                  onPress={() => {
                    setOpenModel(false), navigation.navigate('AllPlan');
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
    </LinearGradient>
  );
};

export default CreatePlan;

const styles = StyleSheet.create({});
