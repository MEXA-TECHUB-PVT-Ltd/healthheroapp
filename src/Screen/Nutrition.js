import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from '../Helping/AppColor';
import CssStyle from '../StyleSheet/CssStyle';

const Nutrition = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  const Card = [
    {desc: 'Burnt', number: 23},
    {desc: 'Eaten', number: 345},
    {desc: 'Remaining', number: 60},
  ];
  const dailyFoodRecord = [
    {desc: 'Burnt', number: 23},
    {desc: 'Eaten', number: 345},
  ];
  const glassDay = [
    {number: 1},
    {number: 2},
    {number: 3},
    {number: 4},
    {number: 5},
    {number: 6},
    {number: 7},
    {number: 8},
  ];
  // const data = {
  //   labels: ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'],
  //   datasets: [
  //     {
  //       data: [4, 1, 3, 8, 5, 0],
  //     },
  //   ],
  // };
  // const chartConfig = {
  //   backgroundGradientFrom: '#fff',
  //   backgroundGradientTo: '#fff',
  //   fillShadowGradient: ColorsApp.normal,
  //   fillShadowGradientOpacity: 1, // THIS
  //   color: (opacity = 1) => `${ColorsApp.normal}`,
  //   strokeWidth: 0, // optional, default 3
  //   barPercentage: 0.7,
  //   useShadowColorFromDataset: false, // optional
  // };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[CssStyle.mainContainer, {backgroundColor: AppColors.blueColor}]}>
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <View
          style={{alignItems: 'flex-end', marginTop: responsiveHeight(1.8)}}>
          <View
            style={[
              CssStyle.flexJustify,
              {
                marginVertical: responsiveHeight(1.7),
                width: responsiveWidth(70),
              },
            ]}>
            <Text style={{fontWeight: '500', fontSize: 17, color: 'white'}}>
              Nutrition & Diet Plans
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('TypeOfTracker')}>
              <Text style={{color: 'white'}}>water glass</Text>
            </TouchableOpacity>
          </View>
        </View>
        {item ? (
          <>
            <Text
              style={[
                CssStyle.settingText,
                {marginVertical: responsiveHeight(3)},
              ]}>
              Daily Tracking of Calories
            </Text>
            <View
              style={[
                CssStyle.flexJustify,
                {marginVertical: responsiveHeight(0)},
              ]}>
              {Card.map((item, index) => (
                <View
                  key={index}
                  style={[
                    CssStyle.shadow,
                    {
                      alignItems: 'center',
                      backgroundColor: AppColors.normal,
                      width: responsiveWidth(25),
                      borderRadius: responsiveWidth(1.6),
                      paddingVertical: responsiveHeight(2),
                    },
                  ]}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontWeight: 'bold',
                      letterSpacing: 0.8,
                      marginBottom: responsiveHeight(0.9),
                    }}>
                    {item.number}
                  </Text>
                  <Text style={{color: 'white', fontSize: 13}}>
                    {item.desc}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={[
                CssStyle.flexJustify,
                {marginVertical: responsiveHeight(0.6)},
              ]}>
              <Text style={[CssStyle.settingText, {}]}>Daily Food Record</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('DailyFoodRecord')}>
                <Text>Feedback</Text>
              </TouchableOpacity>
            </View>
            {dailyFoodRecord.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {}}
                style={styles.dailyButton}>
                <View style={{}}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    April 18, 2023
                  </Text>
                  <Text style={styles.foodType}>Food Type</Text>
                  <View style={CssStyle.flexJustify}>
                    <Text style={styles.dailyText}>Food Eaten</Text>
                    <Text style={{color: 'white', fontWeight: '500'}}>02</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <View
              style={[
                CssStyle.flexJustify,
                {marginVertical: responsiveHeight(0.8)},
              ]}>
              <Text
                style={[
                  CssStyle.settingText,
                  {marginVertical: responsiveHeight(0)},
                ]}>
                Water consumption
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('WaterConsumption')}>
                <Text>Feedback</Text>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 12, color: AppColors.textColor}}>
              Consumption Goal
            </Text>
            <Text
              style={[
                CssStyle.settingText,
                {
                  marginVertical: responsiveHeight(1.8),
                  color: AppColors.textColor,
                },
              ]}>
              08 glass/day
            </Text>
            <View
              style={[
                {
                  flexWrap: 'wrap',
                  width: responsiveWidth(90),
                  flexDirection: 'row',
                },
              ]}>
              {glassDay.map((item, index) => (
                <Text>GlassDay</Text>
              ))}
            </View>
            <Text
              style={[
                CssStyle.settingText,
                {marginVertical: responsiveHeight(1.8)},
              ]}>
              Weekly Report
            </Text>
            <View style={{marginHorizontal: responsiveWidth(-5)}}>
              {/* <BarChart
                data={data}
                width={responsiveWidth(90)}
                height={220}
                showBarTops={false}
                yAxisInterval={0}
                yLabelsOffset={0}
                yAxisLabel={0}
                withInnerLines={false}
                chartConfig={chartConfig}
                // style={}
                // verticalLabelRotation={1}
              /> */}
              <Text>bar chart</Text>
            </View>
          </>
        ) : (
          <View
            style={[
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: responsiveHeight(37),
              },
            ]}>
            <Text style={{color: 'white'}}>Glass stick</Text>
            <Text
              style={{
                color: 'white',
                // opacity: 0.4,
                fontSize: 15,
                marginTop: responsiveHeight(2),
              }}>
              No Nutrition & Diet Plans added yet
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Nutrition;

const styles = StyleSheet.create({
  dailyButton: {
    marginBottom: responsiveHeight(2.9),
    borderWidth: 1,
    borderColor: '#00000022',
    borderRadius: 8,
    paddingHorizontal: responsiveWidth(3.7),
    paddingVertical: responsiveHeight(1.2),
  },
  dailyText: {
    color: 'white',
    fontSize: 15,
    opacity: 0.8,
    fontWeight: '500',
  },
  foodType: {
    color: AppColors.buttonText,
    fontSize: 10,
    paddingVertical: responsiveHeight(1),
  },
});
