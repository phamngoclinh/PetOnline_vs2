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
    // padding: 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
    maxHeight: 140,
    backgroundColor: '#f5f5f5',
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef'
  },

  topWrapper: {
    width: ScreenWidth - 0.2 * ScreenWidth,
    maxHeight: 140,
  },

  middle: {
    flex: 8,
    backgroundColor: '#ffffff',
  },

  bottom: {
    flex: 1,
    flexDirection: 'row',
    // alignSelf: 'flex-end',
    borderRadius: 0,
    borderTopColor: '#efefef',
    borderLeftWidth: 0,
    backgroundColor: '#f5f5f5'
  }
});
