
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
    marginTop: 50,
    marginBottom: 50,
  },
  logo: {
    borderRadius: 100,
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
    maxWidth: deviceWidth / 1.75,
    minWidth: 400,
    alignSelf: 'center',
  },
  forget: {
    alignSelf: 'center',
    width: 300,
    height: 50,
    marginBottom: 20
  },
  actions: {
    marginTop: 20
  },
  input: {
    marginBottom: 20,
    borderBottomColor: '#c1c1c1'
  },
  btn: {
    marginTop: 20,
    width: 300,
    height: 50,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(91,113,255,1)',
    borderWidth: 0,
    shadowOpacity : 0,
    shadowOffset : {width: 0, height: 0},
  },

  modal: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // paddingTop: 20,
    // backgroundColor: '#FFFFFF'
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,.6)',
    width: deviceWidth

  },
  forgetForm: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // flex: 1,
    // marginTop: deviceHeight / 3.55,
    alignSelf: 'center',
    width: deviceWidth / 1.25,
    minWidth: 250,
    padding: 20,
    backgroundColor: '#FFFFFF'
  },

  wrapperFormForget: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: deviceWidth / 1.25,
    minWidth: 250,
    alignItems: 'center'
  }

});
