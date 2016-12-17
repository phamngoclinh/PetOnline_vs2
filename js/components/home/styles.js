
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    // backgroundColor: '#FFFBFB',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },

  mainPicture: {
    zIndex: 0,
    resizeMode: 'cover',
    width: null,
    maxHeight: 300
  },

  socialSection: {
    position: 'absolute',
    top:10,
    right:10,
    width: null,
    height: null,
    zIndex: 1,
    flex: 1,
    flexWrap:'wrap',
    flexDirection: 'row'
  },
  socialButton: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 40,
    height: 40,
    marginBottom: 5,
    alignSelf: 'flex-end',
    borderColor: '#FFFFFF',
    borderWidth: .5
  }


});
