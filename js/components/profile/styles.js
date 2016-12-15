import { Dimensions } from 'react-native';
const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },

  top: {
    flex: 1,
    backgroundColor: '#0000ff',
    alignItems: 'center',
    padding: 10,
    width: ScreenWidth,
    minHeight: 150
  },
});
