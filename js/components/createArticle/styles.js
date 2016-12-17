
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

var _uploadWrapper = deviceHeight * 0.20;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },
  imageWrapper: {
  	alignItems: 'center',
  	borderWidth: .5,
  	borderColor: '#eee',
  	backgroundColor: '#FFFFFA',
  	minHeight: _uploadWrapper
  },
  imageUploaded: {
  	alignSelf: 'center',
  	width: null,
  	height: null,
  	minHeight: _uploadWrapper,
  	minWidth: 300,
  	maxWidth: deviceWidth,
  },
  buttonUpload: {
  	position: 'absolute',
  	top: _uploadWrapper / 2 - 20,
  	left: deviceWidth / 2 - 60
  },
  myInput: {
  	marginTop: 20,
  },
  createPet: {
  	alignSelf: 'center',
  	marginTop: 35,
  	paddingLeft: 30,
  	paddingRight: 30,
  },
  wrapper: {
  	backgroundColor: '#FFFFFF'
  }
});
