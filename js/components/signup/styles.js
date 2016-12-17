
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: '#FFFFFF',
  },
  top: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    borderRadius: 100,
    width: 80,
    height: 80
  },
  shadow: {
    flex: 1,
    width: null,
    height: deviceHeight + 200,
    // resizeMode: 'contain',
  },
  main: {
    flex: 1,
    // marginTop: deviceHeight / 3.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
    maxWidth: deviceWidth / 2.75,
    minWidth: 350,
    alignSelf: 'center',
  },
  forget: {
    alignSelf: 'center'
  },
  actions: {
    marginTop: 50
  },
  input: {
    marginBottom: 20,
    borderBottomColor: '#c1c1c1'
  },
  btn: {
    marginTop: 20,
    width: 200,
    height: 50,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(91,113,255,1)',
    borderWidth: 0,
    shadowOpacity : 0,
    shadowOffset : {width: 0, height: 0},
  },
});
