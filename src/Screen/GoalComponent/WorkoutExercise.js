import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const WorkoutExercise = ({navigation, route}) => {
  const {item} = route.params ? route.params : '';
  console.log(item);
  return (
    <View>
      <Text>WorkoutExercise</Text>
    </View>
  );
};

export default WorkoutExercise;

const styles = StyleSheet.create({});
