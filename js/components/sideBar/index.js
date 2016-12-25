
import React, { Component } from 'react';
import { Image, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Content, Text, List, View, ListItem, Card, CardItem, Thumbnail, Button, Icon, Badge } from 'native-base';

import { setIndex } from '../../actions/list';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';

import { closeDrawer } from '../../actions/drawer';

import GLOBAL from '../../storage/global';

import styles from './style';

const {
  replaceAt,
} = actions;

const apiLink = 'http://210.211.118.178/PetsAPI/';
const petAlbum = 'http://210.211.118.178/PetsAPI/Images/PetThumbnails/';
const userAlbum = 'http://210.211.118.178/PetsAPI/Images/UserThumbnails/';

var avatarThumbnail = '';
var coverThumbnail = '';

var authToken = '';

class SideBar extends Component {

  static propTypes = {
    // setIndex: React.PropTypes.func,
    drawerState: React.PropTypes.string,
    navigateTo: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      avatar : '',
      username: '',
      email: '',
      phone: '',
      avatarThumbnail: '../../../images/avatar.png',
      coverThumbnail: '../../../images/avatar.png'
    };
  }

  componentDidMount() {
    let _this = this;

    this._loadInitialState();
  }

  componentWillMount() {
    // let _this = this;
  }

  _loadInitialState = async () => {
    let _this = this;
    try {
      var authToken = await AsyncStorage.getItem('AUTH_TOKEN');
      if (authToken !== null){
        console.log("GET AUTH_TOKEN IN SIDEBAR: ", authToken );
        // this.replaceRoute('home');
        // alert("Check authToken is exist. authToken = " + authToken);

        _this.getUserInformation();
      } else {
        try {
          console.log("Check authToken is NOT exist yet");
        } catch (error) {
          //
        }
      }
    } catch (error) {
      //
    }
  };

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  replaceRoute(route) {
    this.props.replaceAt('home', { key: route }, this.props.navigation.key);
  }

  logout() {
    let _this = this;
    _this._removeToken().done();
    _this.closeDrawer();
    _this.replaceRoute('signin');
  }

  getUserInformation() {
    let _this = this;
    AsyncStorage.getItem('USER_ID').then((value) => {
      console.log("UserId in sidebar: ", value);
      // alert("UserId in sidebar: ", value);

      fetch('http://210.211.118.178/PetsAPI/api/userauthinfos/'+value, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': authToken
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
          // Store the results in the state variable results and set loading to
          _this.setState({
            user: responseJson,
            username: responseJson.firstName + " " + responseJson.lastName,
            email: responseJson.email,
            phone: responseJson.phone,
            is_loading_data: false
          });

          avatarThumbnail = responseJson.avatarThumbnail;
          coverThumbnail = responseJson.coverThumbnail;

          if(avatarThumbnail == null || avatarThumbnail == '') {
            avatarThumbnail = '../../../images/avatar.png';
          }

          if(coverThumbnail == null || coverThumbnail == '') {
            coverThumbnail = '../../../images/avatar.png';
          }

          console.log("Get USER from server: ", responseJson);
      })
      .catch((error) => {
          _this.setState({
            loading: false
        });
          console.error(error);
      });
    });
  }

  _removeToken = async () => {
    try {
      await AsyncStorage.removeItem('AUTH_TOKEN');
    } catch (error) {

    }
  };

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  render() {
    return (
      <Content theme={myTheme} style={styles.sidebar} >
          <View style={styles.top}>
              <Image
                  style={styles.topWrapper}
                  source={require('../../../images/avatar.png')} >
                  <Card style={{backgroundColor: '#f5f5f5', borderWidth: 0, padding: 20}}>
                      <CardItem style={{borderBottomWidth: 0}}>
                          {
                            avatarThumbnail != '../../../images/avatar.png' ? (
                              <Thumbnail style={{width: 70, height: 70, borderRadius: 100, marginRight: 10}} source={{uri : userAlbum + avatarThumbnail}} />
                            ) : (
                              <Thumbnail style={{width: 70, height: 70, borderRadius: 100, marginRight: 10}} source={require('../../../images/avatar.png')} />
                            )
                          }
                          {
                            this.state.username ? <Text style={{color: '#384850', fontSize: 25}}>{this.state.username}</Text> : (<Text>Anonymous</Text>)
                          }
                          {
                            this.state.email ? <Text note style={{color: '#384850', fontSize: 17}}>{this.state.email}</Text> : (<Text>anonymous@gmail.com</Text>)
                          }
                      </CardItem>
                  </Card>
              </Image>
          </View>

        <ScrollView style={styles.middle}>
            <List>
                <ListItem button iconLeft onPress={() => this.navigateTo('home')} style={{marginTop: 10, marginBottom: 10, borderBottomColor: '#f3f3f3', paddingBottom: 20}}>
                    <Icon name="ios-home-outline" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                    <Text style={{fontSize: 19, color: '#384850'}}>TRANG CHỦ</Text>
                </ListItem>
                <ListItem button iconLeft onPress={() => this.navigateTo('category')} style={{marginTop: 10, marginBottom: 10, borderBottomColor: '#f3f3f3', paddingBottom: 20}}>
                    <Icon name="ios-bookmarks-outline" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                    <Text style={{fontSize: 19, color: '#384850'}}>DANH MỤC</Text>
                    <Badge primary>6</Badge>
                </ListItem>
                <ListItem button iconLeft onPress={() => this.navigateTo('createPet')} style={{marginTop: 10, marginBottom: 10, borderBottomColor: '#f3f3f3', paddingBottom: 20}}>
                    <Icon name="ios-add-circle-outline" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                    <Text style={{fontSize: 19, color: '#384850'}}>TẠO THÚ CƯNG</Text>
                </ListItem>
                <ListItem button iconLeft onPress={() => this.navigateTo('createArticle')} style={{marginTop: 10, marginBottom: 10, borderBottomColor: '#f3f3f3', paddingBottom: 20}}>
                    <Icon name="ios-book-outline" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                    <Text style={{fontSize: 19, color: '#384850'}}>TẠO BÀI VIẾT</Text>
                </ListItem>
                {
                  /*
                  <ListItem button iconLeft onPress={() => this.navigateTo('signin')} style={{marginTop: 10, marginBottom: 10, borderBottomColor: '#f3f3f3', paddingBottom: 20}}>
                      <Icon name="ios-log-in" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                      <Text style={{fontSize: 19, color: '#384850'}}>Sign In</Text>
                  </ListItem>
                  <ListItem button iconLeft onPress={() => this.navigateTo('signup')} style={{marginTop: 10, marginBottom: 10, borderBottomColor: '#f3f3f3', paddingBottom: 20}}>
                      <Icon name="ios-log-in" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                      <Text style={{fontSize: 19, color: '#384850'}}>Sign Up</Text>
                  </ListItem>
                  */
                }
                
                {
                  /*
                  <ListItem button iconLeft onPress={() => this.navigateTo('forgetPassword')}>
                      <Icon name="ios-plane" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                      <Text style={{fontSize: 19, color: '#384850'}}>Forget Password</Text>
                      <Text note>Off</Text>
                  </ListItem>
                  */
                }
                {
                  /*
                  <ListItem button iconLeft onPress={() => this.navigateTo('detail')} style={{marginTop: 10, marginBottom: 10, borderBottomColor: '#f3f3f3', paddingBottom: 20}}>
                      <Icon name="ios-settings-outline" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                      <Text style={{fontSize: 19, color: '#384850'}}>Detail</Text>
                      <Badge style={{ backgroundColor: '#8C97B5' }}>2</Badge>
                  </ListItem>
                  */
                }
                <ListItem button iconLeft onPress={() => this.navigateTo('profile')} style={{marginTop: 10, marginBottom: 10, borderBottomColor: '#f3f3f3', paddingBottom: 20}}>
                    <Icon name="ios-contact-outline" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                    <Text style={{fontSize: 19, color: '#384850'}}>THÔNG TIN CÁ NHÂN</Text>
                </ListItem>
                {
                  /*
                  <ListItem button iconLeft onPress={() => this.navigateTo('search')} style={{marginTop: 10, marginBottom: 10, borderBottomColor: '#f3f3f3', paddingBottom: 20}}>
                      <Icon name="ios-settings-outline" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                      <Text style={{fontSize: 19, color: '#384850'}}>Search</Text>
                      <Badge style={{ backgroundColor: '#8C97B5' }}>2</Badge>
                  </ListItem>
                  <ListItem button iconLeft onPress={() => this.navigateTo('blankPage')} style={{marginTop: 10, marginBottom: 10, borderBottomColor: '#f3f3f3', paddingBottom: 20}}>
                      <Icon name="ios-settings-outline" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                      <Text style={{fontSize: 19, color: '#384850'}}>Blank Page</Text>
                  </ListItem>
                  */
                }
                <ListItem button iconLeft onPress={() => this.logout()} style={{marginTop: 10, marginBottom: 10, borderBottomColor: '#f3f3f3', paddingBottom: 20}}>
                    <Icon name="ios-log-out-outline" style={{ color: '#0A69FE', fontSize: 26, marginRight: 15 }} />
                    <Text style={{fontSize: 19, color: '#384850'}}>ĐĂNG XUẤT</Text>
                </ListItem>
            </List>
        </ScrollView>

        <Card style={styles.bottom}>
            <CardItem style={{borderBottomWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, borderRadius: 0, borderTopColor: '#fdfdfd', alignSelf: 'flex-end'}}>
                <Text note>Copyright 2016...</Text>
            </CardItem>
       </Card>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    closeDrawer: () => dispatch(closeDrawer()),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
