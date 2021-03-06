
import React, { Component } from 'react';
import { Image, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, View, Icon, InputGroup, Input, List, ListItem, CheckBox, Spinner } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import template from '../../themes/style-template';
import styles from './styles';

import GLOBAL from '../../storage/global';

const {
  popRoute,
  replaceAt,
} = actions;

import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication/client';
var io = require('../../packages/socket.io-client/socket.io');
const PLACEHOLDER = '../../../images/avatarThumbnail.png';

const background = require('../../../images/background-signup.jpg');

class Signup extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),

    username: React.PropTypes.string,
    phone: React.PropTypes.number,
    password: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      password: '',
      is_loading: true,
      data : null,
      registerMessage: ''
    };


    const options = {transports: ['websocket'], forceNew: true};
    const socket = io('192.168.56.1:3030', options);

    this.featherAPI = feathers()
        .configure(socketio(socket, {timeout: 50000}))
        .configure(hooks())
        // Use AsyncStorage to store our login toke
        .configure(authentication({
            storage: AsyncStorage
        }));
  }

  componentDidMount() {
    let _this = this;

    _this.setState({
      is_loading: false
    });
  }

  replaceRoute(route) {
    this.props.replaceAt('signup', { key: route }, this.props.navigation.key);
  }

  _saveUserInfo(user) {
    try {
      AsyncStorage.multiSet([
        [GLOBAL.USER_FULL_NAME, user.userEntity.firstName + user.userEntity.lastName],
        [GLOBAL.USER_FIRST_NAME, user.userEntity.firstName],
        [GLOBAL.USER_LAST_NAME, user.userEntity.lastName],
        [GLOBAL.USER_EMAIL, user.userEntity.email],
        [GLOBAL.USER_LOCATION, user.userEntity.nationality]
      ], (error) => {
        console.log("Error: ", error);
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  signup() {
    let _this = this;

    if(this.state.email == '' || this.state.phone == '' || this.state.password == '' || this.state.firstName == '' || this.state.lastName == '') {
      _this.setState({
        registerMessage: 'Vui lòng nhập đầy đủ thông tin đăng ký'
      })
    } else {
      _this.setState({
        is_loading: true
      });
      // ...
      fetch('http://210.211.118.178/PetsAPI/api/userauthinfos', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": this.state.email,
          "phone": this.state.phone,
          "firstName": this.state.firstName,
          "lastName": this.state.lastName,
          "passwordHash": this.state.password
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          // Store the results in the state variable results and set loading to
          console.log(responseJson);

          if(responseJson.errorCode) {
            console.log("Code: "+ responseJson.errorMsg);
            _this.setState({
              is_loading: false,
              registerMessage: responseJson.errorMsg
            });
          } else {
            _this.setState({
              data: responseJson,
              is_loading: false
            });

            _this.featherAPI.service('users').create({
              email: this.state.email,
              password: this.state.password
            }).then((result) => {
              if(result.length > 0) {
                console.log("Tạo tài khoản thành công. ", result);
              }
            }).catch((error) => {
              console.log("Lỗi. Không thể tạo tài khoản Chát. ", error);
            });

            _this._saveUserInfo(responseJson);

            Alert.alert(
              "Đăng ký thành công",
              "Tôi hoàn toàn đồng ý với mọi quy định của ứng dụng",
              [
                {text: 'Đồng ý', onPress: () => this.replaceRoute('login')},
              ]
            );
          }
      })
      .catch((error) => {
          _this.setState({
              is_loading: false
          });
          Alert.alert(
            "Lỗi",
            "Lỗi phát sinh trong quá trình đăng ký. Vui lòng thử lại!",
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          );
          console.error(error);
      });

    }
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.top}>
                  <Image style={styles.logo} source={require('../../../images/logo-5.png')}/>
              </View>
              <View style={styles.main}>
                <InputGroup style={styles.input}>
                  <Icon name="ios-mail-outline" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}}/>
                  <Input placeholder="Email" onChangeText={email => this.setState({ email })}  style={{color: '#333333'}}/>
                </InputGroup>
                <InputGroup style={styles.input}>
                    <Icon name="ios-call-outline" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}} />
                    <Input placeholder="Số điện thoại" keyboardType="numeric"
                      onChangeText={phone => this.setState({ phone })} />
                </InputGroup>
                <InputGroup style={styles.input}>
                    <Icon name="ios-person-outline" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}} />
                    <Input placeholder="Tên"
                      onChangeText={firstName => this.setState({ firstName })} />
                </InputGroup>
                <InputGroup style={styles.input}>
                    <Icon name="ios-person-outline" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}} />
                    <Input placeholder="Họ"
                      onChangeText={lastName => this.setState({ lastName })} />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}}/>
                  <Input
                    placeholder="Mật khẩu"
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                  />
                </InputGroup>

                {this.state.registerMessage ? <Text style={{ color: template.danger, alignSelf: 'center' }}>{this.state.registerMessage}</Text> : null}

                <Button rounded style={{width: 250, height: 50, alignSelf: 'center', marginBottom: 20, marginTop: 30}} onPress={() => this.signup()}>
                  <Text style={{color:'#FFFFFF'}}>ĐĂNG KÝ</Text>
                </Button>

                <Button rounded bordered danger style={{width: 250, height: 50, alignSelf: 'center', marginBottom: 30}}
                  onPress={() => this.replaceRoute('login')}>
                  QUAY VỀ
                </Button>

                {this.state.is_loading ? <Spinner color='blue' visible={this.state.is_loading} /> : null}

              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(Signup);
