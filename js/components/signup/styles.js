
const React = require('react-native');

const { StyleSheet } = React;

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
    marginTop: 100,
    marginBottom: 50,
  },
  logo: {
    borderRadius: 100,
  },
  shadow: {
    flex: 1,
    width: null,
    // height: deviceHeight,
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
    maxWidth: 500,
    minWidth: 400,
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
