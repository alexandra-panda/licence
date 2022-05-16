import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimationView = () => {
  return (
    <View>
      <Animatable.View
        animation="slideInDown"
        iterationCount={10}
        direction="alternate">
        <View style={{width: 200, height: 100, backgroundColor: 'red'}}></View>
      </Animatable.View>
    </View>
  );
};

export default AnimationView;

const styles = StyleSheet.create({});
