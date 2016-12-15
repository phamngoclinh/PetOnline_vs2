import { Dimensions } from 'react-native';
const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  sidebar: {
    width: ScreenHeight,
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    backgroundColor: '#fff',
  },

  top: {
    width: ScreenWidth - 0.2 * ScreenWidth,
    flex: 2,
    maxHeight: 70,
    backgroundColor: '#333',
  },

  middle: {
    flex: 8,
    backgroundColor: '#ccc',
  },

  bottom: {
    flex: 1,
    // alignSelf: 'flex-end',
    backgroundColor: '#333'
  }
});
