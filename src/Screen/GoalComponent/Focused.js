import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../../Helping/AppColor';
import CssStyle from '../../StyleSheet/CssStyle';
import Contact from '../../Helping/FocusedData';
import CustomButton from '../../component/CustomButton';
import Lottie from 'lottie-react-native';
import assets from '../../assets';

const Focused = ({navigation}) => {
  const gender = [
    {item: 'Too Easy', id: 1},
    {item: 'A Little Easy', id: 2},
    {item: 'Just Right', id: 3},
    {item: 'A little Hard', id: 4},
    {item: 'Too Hard', id: 5},
  ];
  const [data, setData] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  return (
    <View
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{paddingHorizontal: responsiveWidth(8), flex: 1}}>
        <View style={{alignItems: 'flex-end', marginTop: responsiveHeight(2)}}>
          <CustomButton
            buttonText={'Skip review'}
            buttonColor="transparent"
            colorText={'#FF6700'}
            borderColor="transparent"
            onPress={() => navigation.navigate('DashboardHome')}
            mode="outlined"
            style={{marginRight: responsiveWidth(-3)}}
            styleText={{letterSpacing: 0.4}}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: responsiveHeight(2),
            // alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(5.5),
              color: 'white',
              fontWeight: 'bold',
              marginBottom: responsiveHeight(0.7),
              textTransform: 'capitalize',
              fontFamily: 'Interstate-bold',
            }}>
            How do you feel?
          </Text>
          <Text
            style={{
              color: 'white',
              opacity: 0.8,
              letterSpacing: 0.9,
              fontSize: 12,
              lineHeight: responsiveHeight(2.3),
            }}>
            We would love to hear about your experience with a specific
            exercise. Please take a moment to share your thoughts
          </Text>
        </View>
        <View style={{flex: 2}}>
          {/* {gender.map((item, index) => (
            <ItemData key={index} index={index} item={item} />
          ))} */}
          <FlatList
            data={gender}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View key={index} style={{}}>
                  <Contact
                    contact={item}
                    setAddedItem={setData}
                    addedItem={data}
                  />
                </View>
              );
            }}
          />
        </View>
        <View style={{flex: 0.299}}>
          <CustomButton
            onPress={() => setOpenModel(true)}
            styleText={{textTransform: 'none'}}
            paddingVertical={5}
            buttonText={'Submit'}
            style={{
              zIndex: 999,
              width: responsiveWidth(85),
              marginTop: responsiveHeight(0.2),
            }}
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
                    width: responsiveWidth(60),
                    textAlign: 'center',
                    lineHeight: responsiveHeight(3),
                    marginTop: responsiveHeight(4),
                  }}>
                  Review Submitted Successfully
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

export default Focused;

const styles = StyleSheet.create({
  buttonGender: {
    paddingVertical: responsiveHeight(2.6),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveHeight(1),
    // flexDirection: "row",
    alignItems: 'center',
    marginBottom: responsiveHeight(4),
  },
});