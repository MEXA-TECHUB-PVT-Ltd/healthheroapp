import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../../../Helping/AppColor';
import CssStyle from '../../../StyleSheet/CssStyle';
import CustomButton from '../../../component/CustomButton';
import {useSelector} from 'react-redux';
import {Line} from '../../../component/Line';

import Lottie from 'lottie-react-native';
import assets from '../../../assets';
import {AddFoodUserApi} from '../../../services/DietPlan';
import {CreateFoodApi} from '../../../services/FoodApi';
import Input from '../../../component/Input';

const CreateFood = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  const [loading, setLoading] = useState(false);
  const id = useSelector(data => data);
  const [openRestartModel, setOpenRestartModel] = useState(false);
  const foodType = [{item: 'cup'}, {item: 'gram'}, {item: 'lb'}];
  const [typeDateFood, setTypeFood] = useState('');
  const [foodModel, setFoodModel] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [energy, setEnergy] = useState('');
  const [unit, setUnit] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [monoFats, setMonoFats] = useState('');
  const [saturatedFat, setSaturatedFat] = useState('');
  const [sugar, setSugar] = useState('');
  const [fiber, setFiber] = useState('');
  const [sodium, setSodium] = useState('');
  const [calcium, setCalcium] = useState('');
  const [iron, setIron] = useState('');
  const [vitaminA, setVitaminA] = useState('');
  const [vitaminB, setVitaminB] = useState('');
  const [vitaminC, setVitaminC] = useState('');
  const [cholestrol, setCholestrol] = useState('');

  const AddFood = async () => {
    setLoading(true);
    try {
      const result = await CreateFoodApi(
        'user',
        id.id,
        foodName,
        energy,
        typeDateFood,
        unit,
        protein,
        carbs,
        fats,
        monoFats,
        saturatedFat,
        sugar,
        fiber,
        sodium,
        calcium,
        iron,
        vitaminA,
        vitaminB,
        vitaminC,
        cholestrol,
      );
      console.log(result, 'this is the');
      // Alert.alert('Hy', result);
      if (result) {
        setLoading(false);
        setOpenRestartModel(true);
      } else {
        setLoading(false);
        // navigation.navigate('SelectPlan');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={['#0A1F58', '#0A1637']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.4}}
        style={{
          paddingHorizontal: responsiveWidth(6),
          flex: 1,
          paddingTop: responsiveHeight(3),
          backgroundColor: '#0A1F58',
        }}>
        <View style={{marginTop: responsiveHeight(4), flex: 0.5}}>
          <Text style={[CssStyle.textInsideSettingComponent, {fontSize: 41}]}>
            Add Food
          </Text>
          <Text
            style={[
              CssStyle.textInfoSetting,
              {
                lineHeight: responsiveHeight(3),
                paddingTop: responsiveHeight(1),
                fontSize: 13,
              },
            ]}>
            To accurately track your nutrition and provide personalized
            recommendations, please enter the details of the food you have
            consumed.
          </Text>
        </View>
        <View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Food Name'}
              noIcon={true}
              value={foodName}
              onChangeText={e => {
                setFoodName(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Energy'}
              noIcon={true}
              value={energy}
              keyboardType="numeric"
              onChangeText={e => {
                setEnergy(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setFoodModel(true), setOpenRestartModel(true);
            }}
            style={[
              CssStyle.flexJustify,
              {
                backgroundColor: '#ffffff60',
                borderRadius: responsiveWidth(7),
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(1.6),
                marginBottom: responsiveHeight(0.8),
                marginTop: responsiveHeight(1.8),
              },
            ]}>
            <Text style={{color: 'white'}}>
              {typeDateFood ? typeDateFood : 'Measures'}
            </Text>
            <Icon name="chevron-down-outline" size={25} color="white" />
          </TouchableOpacity>
          {/* </View> */}
          {/* {foodModel ? (
            <View
              style={[
                CssStyle.shadow,
                styles.modelOpenData,
                {
                  top: responsiveHeight(24.9),
                },
              ]}>
              {foodType.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setTypeFood(item.item), setFoodModel(false);
                    }}
                    style={{
                      paddingVertical: responsiveHeight(1),
                    }}>
                    <Text
                      style={{
                        color: AppColors.textColor,
                        marginLeft: responsiveWidth(3),
                      }}>
                      {item.item}
                    </Text>
                  </TouchableOpacity>
                  <Line />
                </View>
              ))}
            </View>
          ) : null} */}
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Units'}
              noIcon={true}
              value={unit}
              keyboardType="numeric"
              onChangeText={e => {
                setUnit(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Protein'}
              noIcon={true}
              value={protein}
              keyboardType="numeric"
              onChangeText={e => {
                setProtein(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Carbs'}
              noIcon={true}
              value={carbs}
              keyboardType="numeric"
              onChangeText={e => {
                setCarbs(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Fats'}
              noIcon={true}
              value={fats}
              keyboardType="numeric"
              onChangeText={e => {
                setFats(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Monosaturated Fats (Optional)'}
              noIcon={true}
              value={monoFats}
              keyboardType="numeric"
              onChangeText={e => {
                setMonoFats(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Saturated Fat (Optional)'}
              noIcon={true}
              value={saturatedFat}
              keyboardType="numeric"
              onChangeText={e => {
                setSaturatedFat(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Sugar (optional)'}
              noIcon={true}
              keyboardType="numeric"
              value={sugar}
              onChangeText={e => {
                setSugar(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Fiber (optional)'}
              noIcon={true}
              value={fiber}
              keyboardType="numeric"
              onChangeText={e => {
                setFiber(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Sodium (optional)'}
              noIcon={true}
              value={sodium}
              keyboardType="numeric"
              onChangeText={e => {
                setSodium(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Calcium (optional)'}
              noIcon={true}
              value={calcium}
              keyboardType="numeric"
              onChangeText={e => {
                setCalcium(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Iron (optional)'}
              noIcon={true}
              keyboardType="numeric"
              value={iron}
              onChangeText={e => {
                setIron(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Vitamin A (optional)'}
              noIcon={true}
              value={vitaminA}
              keyboardType="numeric"
              onChangeText={e => {
                setVitaminA(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Vitamin B (optional)'}
              noIcon={true}
              value={vitaminB}
              keyboardType="numeric"
              onChangeText={e => {
                setVitaminB(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Vitamin C (optional)'}
              noIcon={true}
              value={vitaminC}
              keyboardType="numeric"
              onChangeText={e => {
                setVitaminC(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
          <View>
            <Input
              height={responsiveHeight(6.5)}
              bgColor={'#ffffff60'}
              placeholder={'Cholestrol (optional)'}
              noIcon={true}
              keyboardType="numeric"
              value={cholestrol}
              onChangeText={e => {
                setCholestrol(e);
              }}
              fontSize={16}
              style={{marginTop: responsiveHeight(1)}}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingTop: responsiveHeight(4),
            paddingBottom: responsiveHeight(8),
            // flex: 0.3,
          }}>
          <CustomButton
            loading={loading}
            onPress={() =>
              foodName && energy && unit && protein && carbs && fats
                ? AddFood()
                : ToastAndroid.show(
                    'Please fill the required data',
                    ToastAndroid.SHORT,
                  )
            }
            activeOpacity={1}
            buttonColor={AppColors.buttonText}
            style={{width: responsiveWidth(78)}}
            buttonText={'Add'}
            paddingVertical={1}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={openRestartModel}
          onRequestClose={() => setOpenRestartModel(false)}>
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
                {foodModel ? (
                  <View
                    style={[
                      // CssStyle.shadow,
                      styles.modelOpenData,
                      {
                        top: responsiveHeight(-0.8),
                      },
                    ]}>
                    {foodType.map((item, index) => (
                      <View key={index}>
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setTypeFood(item.item),
                              setFoodModel(false),
                              setOpenRestartModel(false);
                          }}
                          style={{
                            paddingVertical: responsiveHeight(1),
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              marginLeft: responsiveWidth(3),
                            }}>
                            {item.item}
                          </Text>
                        </TouchableOpacity>
                        <Line />
                      </View>
                    ))}
                  </View>
                ) : (
                  <>
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
                      Food Added Successfully
                    </Text>
                    <CustomButton
                      buttonText={'Go Back'}
                      onPress={() => {
                        setOpenRestartModel(false), navigation.goBack();
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
                  </>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </ScrollView>
  );
};

export default CreateFood;

const styles = StyleSheet.create({
  buttonGender: {
    paddingVertical: responsiveHeight(2.6),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveHeight(1),
    // flexDirection: "row",
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  modelOpenData: {
    paddingHorizontal: responsiveWidth(3),
    // borderWidth: 1,
    // borderColor: '#eee',
    // borderBottomEndRadius: responsiveWidth(2),
    // borderBottomLeftRadius: responsiveWidth(2),
    // borderRadius: responsiveWidth(2),
    // backgroundColor: 'white',
    marginHorizontal: responsiveWidth(0.1),
    // elevation: 1,
    // position: 'absolute',
    width: responsiveWidth(87.8),
    // top: responsiveHeight(4),
    paddingTop: responsiveHeight(1),
    // zIndex: 999,
  },
});
