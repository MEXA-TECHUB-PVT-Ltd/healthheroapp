import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CssStyle from '../../StyleSheet/CssStyle';
import {AppColors} from '../../Helping/AppColor';
import Icon from 'react-native-vector-icons/Ionicons';
import {GetFaqApi} from '../../services/faqApi';

const Faq = ({navigation}) => {
  const premiumQuality = [
    {item: 'Monthly', id: '$80', month: 'mon'},
    {item: 'Yearly', id: '$700', month: 'year'},
    {item: 'Yearly', id: '$700', month: 'year'},
  ];
  const [faqData, setFaqData] = useState([]);
  const IntermediateApi = async () => {
    try {
      const result = await GetFaqApi();
      // console.log(result);
      if (result.status == true) {
        setFaqData(result.result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    IntermediateApi();
  }, []);
  return (
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
      <TouchableOpacity
        style={{flex: 0.6, marginLeft: responsiveWidth(-3)}}
        onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-back-outline"
          size={25}
          style={{padding: '2%'}}
          color={AppColors.buttonText}
        />
      </TouchableOpacity>

      <View style={{flex: 0.9}}>
        <Text style={[CssStyle.textInsideSettingComponent]}>FAQ</Text>
        <Text
          style={[
            CssStyle.textInfoSetting,
            {
              width: responsiveWidth(80),
              opacity: 0.8,
              lineHeight: responsiveHeight(2.8),
            },
          ]}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        </Text>
      </View>
      <View
        style={[
          CssStyle.flexJustify,
          {flex: 3, paddingHorizontal: responsiveWidth(1)},
        ]}>
        <FlatList
          data={faqData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={{}}>
                <TouchableOpacity
                  style={[
                    styles.buttonGender,
                    {
                      backgroundColor: '#626377',
                      borderColor: '#626377',
                      borderWidth: 1,
                      width: responsiveWidth(85),
                    },
                  ]}
                  onPress={() => {}}>
                  <Text
                    style={{
                      fontSize: 14.6,
                      color: 'white',
                      fontFamily: 'Interstate-bold',
                      marginBottom: responsiveHeight(1),
                    }}>
                    {item.question}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 11,
                      lineHeight: responsiveHeight(2.5),
                    }}>
                    {item.answer}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default Faq;

const styles = StyleSheet.create({
  buttonGender: {
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveHeight(1),
    // flexDirection: "row",
    // alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
});
