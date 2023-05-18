import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import CssStyle from '../StyleSheet/CssStyle';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from '../Helping/AppColor';
import Icon from 'react-native-vector-icons/Ionicons';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useFocusEffect} from '@react-navigation/native';
import CustomButton from '../component/CustomButton';
import {FocusedComponent} from '../Helping/HelpingComponent';
import {UpdateProfileApi} from '../services/AuthScreen';
import {RulerPicker} from 'react-native-ruler-picker';

const Gender = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  const [addData, setAddData] = useState('male');
  const [focusedArea, setFocusedArea] = useState('Arms');
  const [dataArray, setDataArray] = useState([]);
  const weightUnitData = [{text: 'gm'}, {text: 'kg'}];
  const [weightData, setWeightData] = useState('gm');
  const heightUnitData = [{text: 'ft'}, {text: 'in'}];
  const [heightData, setHeightData] = useState('ft');
  const flatNode = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [weightValue, setWeightValue] = useState('');
  const [heightValue, setHeightValue] = useState(0);
  // console.log(item);
  // console.log(
  //   item.itemResult.user_id,
  //   item.itemName,
  //   addData,
  //   focusedArea,
  //   weightData,
  //   heightData,
  //   heightValue,
  //   weightValue,
  //   'dummy',
  // );

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        // console.log('hello sir');
        BackHandler.exitApp();
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );
  const UpdateProfile = async () => {
    setLoading(true);
    try {
      const result = await UpdateProfileApi(
        item?.itemResult.user_id,
        item?.itemName,
        item?.itemResult.device_id,
        addData,
        ['arms', 'abs'],
        heightValue,
        weightValue,
        weightData,
        heightData,
      );
      console.log(result);
      if (result.status == true) {
        setLoading(false);
        navigation.navigate('main');
      } else {
        console.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const genderCollectionData = [
    {text: 'male', image: require('../assets/maleGender.png')},
    {text: 'female', image: require('../assets/FemaleGender.png')},
  ];
  const GenderCollection = () => (
    <View style={[CssStyle.flexJustify, {}]}>
      {genderCollectionData.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setAddData(item.text)}
          style={{
            backgroundColor: addData == item.text ? '#0A1F58' : '#626377',
            paddingVertical: responsiveHeight(2),
            width: responsiveWidth(41),
            borderRadius: responsiveWidth(3),
            justifyContent: 'center',
            alignItems: 'center',
            height: responsiveHeight(22),
            borderWidth: 1,
            borderColor: addData == item.text ? 'white' : '#626377',
          }}>
          {addData == item.text ? (
            <Image
              source={require('../assets/Group655.png')}
              resizeMode="contain"
              style={{
                width: 26,
                height: 26,
                position: 'absolute',
                top: responsiveHeight(1.5),
                right: responsiveWidth(3),
              }}
            />
          ) : (
            <View
              style={{
                width: 26,
                height: 26,
                position: 'absolute',
                top: responsiveHeight(1.5),
                right: responsiveWidth(3),
                backgroundColor: '#78798A',
                borderRadius: responsiveWidth(10),
              }}
            />
          )}
          <Image
            source={item.image}
            resizeMode="contain"
            style={{width: 103, height: 103, marginTop: responsiveHeight(1.7)}}
          />
          <Text style={[styles.signInText, {textTransform: 'capitalize'}]}>
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  const focusedAreaCollection = [
    {text: 'Full Body'},
    {text: 'Arms'},
    {text: 'Abs'},
    {text: 'Legs'},
  ];

  const FocusedArea = () => (
    <View style={[CssStyle.flexData, {}]}>
      <View>
        {focusedAreaCollection.map((item, index) => (
          <FocusedComponent
            dataArray={dataArray}
            setDataArray={setDataArray}
            item={item}
            index={index}
            key={index}
          />
        ))}
      </View>
      {/* <View style={{width: responsiveWidth(60)}}> */}
      <Image
        style={{
          width: responsiveWidth(70),
          height: responsiveWidth(100),
          marginTop: responsiveHeight(-7),
          marginLeft: responsiveWidth(-6),
        }}
        resizeMode="contain"
        source={require('../assets/bodybuilder.png')}
      />
      {/* </View> */}
    </View>
  );
  const WeightArea = () => (
    <View>
      <View style={[CssStyle.flexJustify, {marginTop: responsiveHeight(11)}]}>
        {weightUnitData.map((item, index) => (
          <CustomButton
            key={index}
            buttonText={item.text}
            onPress={() => setWeightData(item.text)}
            style={{width: responsiveWidth(42)}}
            styleText={{textTransform: 'uppercase'}}
            mode={weightData == item.text ? '' : 'outlined'}
            borderColor={weightData == item.text ? '' : 'white'}
            buttonColor={weightData == item.text ? '' : 'transparent'}
          />
        ))}
      </View>
      <RulerPicker
        min={0}
        max={110}
        step={1}
        fractionDigits={0}
        initialValue={0}
        gapBetweenSteps={5}
        indicatorColor="#FF5100"
        longStepColor="#FF5100"
        indicatorHeight={75}
        longStepHeight={70}
        shortStepHeight={20}
        stepWidth={3}
        unitTextStyle={{color: 'white', fontSize: responsiveFontSize(2)}}
        valueTextStyle={{
          color: 'white',
          fontSize: responsiveFontSize(6),
        }}
        // onValueChange={number => console.log(number)}
        height={responsiveHeight(38)}
        onValueChangeEnd={number => setWeightValue(number)}
        unit={weightData}
      />
    </View>
  );
  const HeightArea = () => (
    <View>
      <View style={[CssStyle.flexJustify, {marginTop: responsiveHeight(11)}]}>
        {heightUnitData.map((item, index) => (
          <CustomButton
            key={index}
            buttonText={item.text}
            onPress={() => setHeightData(item.text)}
            style={{width: responsiveWidth(42)}}
            styleText={{textTransform: 'uppercase'}}
            mode={heightData == item.text ? '' : 'outlined'}
            borderColor={heightData == item.text ? '' : 'white'}
            buttonColor={heightData == item.text ? '' : 'transparent'}
          />
        ))}
      </View>
      <RulerPicker
        min={0}
        max={210}
        step={1}
        fractionDigits={0}
        initialValue={0}
        decelerationRate={0.3}
        gapBetweenSteps={5}
        indicatorColor="#FF5100"
        longStepColor="#FF5100"
        indicatorHeight={75}
        longStepHeight={70}
        shortStepHeight={20}
        stepWidth={3}
        width={responsiveWidth(90)}
        unitTextStyle={{color: 'white', fontSize: responsiveFontSize(2)}}
        valueTextStyle={{
          color: 'white',
          fontSize: responsiveFontSize(6),
        }}
        // onValueChange={number => console.log(number)}
        height={responsiveHeight(38)}
        onValueChangeEnd={number => setHeightValue(number)}
        unit={heightData}
      />
    </View>
  );
  const dataImages = [
    {
      image: require('../assets/first.png'),
      headerText: 'About You',
      description:
        'we want to know about you, follow the next steps to complete the information',
      genderData: <GenderCollection />,
    },
    {
      image: require('../assets/second.png'),
      headerText: 'Focused Area',
      description:
        'Customize your fitness journey with targeted workout programs tailored to your goals.',
      genderData: <FocusedArea />,
    },
    {
      image: require('../assets/third.png'),
      headerText: 'Current Weight',
      description:
        'Track your progress by entering your current weight, allowing us to monitor your achievements and help you stay on track towards your fitness goals',
      genderData: <WeightArea />,
    },
    {
      image: require('../assets/third.png'),
      headerText: 'Current Height',
      description:
        'Enter your height to unlock a personalized fitness experience. Lets embark on this transformative fitness journey together, one inch at a time.',
      genderData: <HeightArea />,
    },
  ];
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{flex: 1}}>
        <View
          style={[
            CssStyle.flexJustify,
            {
              marginTop: responsiveHeight(4.4),
              paddingHorizontal: responsiveWidth(5),
            },
          ]}>
          <TouchableOpacity
            style={{
              marginLeft: responsiveWidth(-1),
            }}
            onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-back-outline"
              size={28}
              color={AppColors.buttonText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate('main')}>
            <Text
              style={{
                // fontFamily: 'Interstate-regular',
                color: AppColors.buttonText,
                letterSpacing: 0.4,
              }}>
              Skip intro
            </Text>
          </TouchableOpacity>
        </View>
        <SwiperFlatList
          ref={flatNode}
          index={activeIndex}
          showPagination
          data={dataImages}
          scrollEnabled={false}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                width: responsiveWidth(100),
                paddingHorizontal: responsiveWidth(6),
              }}>
              <View style={{flex: 0.5, marginTop: responsiveHeight(6.7)}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: responsiveFontSize(4.7),
                    marginBottom: responsiveHeight(2),
                    fontFamily: 'Interstate-bold',
                    marginLeft: responsiveWidth(1),
                    width: responsiveWidth(90),
                    lineHeight: responsiveHeight(6),
                  }}>
                  {item.headerText}
                </Text>
                <Text
                  style={{
                    width:
                      item.headerText == 'Current Height'
                        ? responsiveWidth(85)
                        : responsiveWidth(79),
                    color: 'white',
                    // fontFamily: 'Interstate-regular',
                    lineHeight: responsiveHeight(3),
                    marginLeft: responsiveWidth(1),
                    fontSize: 13,
                    fontWeight: '400',
                    opacity: 0.77,
                  }}>
                  {item.description}
                </Text>
              </View>
              {item.genderData}
            </View>
          )}
          paginationStyle={{}}
          paginationActiveColor={AppColors.buttonText}
          paginationStyleItem={{
            width: responsiveWidth(17.7),
            height: responsiveHeight(0.4),
            borderRadius: responsiveHeight(30),
            bottom: responsiveHeight(3),
          }}
          paginationDefaultColor={'white'}
          paginationStyleItemInactive={
            {
              // backgroundColor: flatNode.current == 0 ? 'yellow' : 'green',
            }
          }
        />
        <View
          style={{
            backgroundColor: '#0B183C',
          }}>
          <View
            style={{
              bottom: responsiveHeight(11.7),
              left: responsiveWidth(11),
              position: 'absolute',
            }}>
            <CustomButton
              loading={loading}
              onPress={() => {
                if (activeIndex !== dataImages.length - 1) {
                  setActiveIndex(activeIndex + 1);
                  flatNode.current.scrollToIndex({
                    animated: true,
                    index: activeIndex + 1,
                  });
                } else {
                  UpdateProfile();
                }
              }}
              activeOpacity={1}
              style={{width: responsiveWidth(78)}}
              buttonText={'Continue'}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Gender;

const styles = StyleSheet.create({
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 17,
    lineHeight: responsiveHeight(3),
  },
});
