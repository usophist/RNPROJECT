/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import NavigatorBar from 'sophist-navigator';
export default class rnDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigatorBar
          title1='事实客户' firstTitleFunc={()=>{}}
          title2='潜在客户' secondTitleFunc={()=>{}}
          titleTextSize={15}
           leftText='返回'  leftFunc={()=>{alert('leftBtn');}}
          rightText='登记客户'
          //rightIcon='&#xe7c0;'
          rightFunc={()=>{alert("rightButton");}}
        />
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('rnDemo', () => rnDemo);
