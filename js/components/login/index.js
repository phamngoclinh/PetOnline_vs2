
import React, { Component } from 'react';
import { Image, Alert, Modal, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View, Text, Spinner, Card, CardItem } from 'native-base';

import { setUser } from '../../actions/user';
import template from '../../themes/style-template';
import styles from './styles';

import GLOBAL from '../../storage/global';

const {
  replaceAt,
} = actions;

const background = require('../../../images/loading.jpg');

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
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
      modalVisible: false,
      name: '',
      username: '',
      password: '',
      emailForget: '',
      confirmotp: true,
      is_loading: true,
      otpCode : '',
      newPassword: '',
      is_submit_forget: false,
      data: null,
      authToken: '',
      getOptMessage: '',
      confirmOtpMessage: '',
      loginMessage: ''
    };
  }

  componentDidMount() {
    let _this = this;

    // _this._removeToken().done();

    _this._loadInitialState().done();


    _this.setState({
      is_loading: false
    });

    _this._getUserId().done();
  }

  _loadInitialState = async () => {
    try {
      var authToken = await AsyncStorage.getItem(GLOBAL.AUTH_TOKEN);
      if (authToken !== null){
        // alert(authToken);
        this.replaceRoute('home');
        // alert("Check authToken is exist. authToken = " + authToken);
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

  _authenticate = async (token) => {
    // alert(token);
    try {
      await AsyncStorage.setItem(GLOBAL.AUTH_TOKEN, token)
    } catch (error) {
      //
    }
  };

  _removeToken = async () => {
    try {
      await AsyncStorage.removeItem(GLOBAL.AUTH_TOKEN);
    } catch (error) {

    }
  };

  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    // this.setUser(this.state.name);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  signin() {
    let _this = this;

    if(this.state.username == '' || this.state.password == '') {
      _this.setState({
        loginMessage: 'Vui lòng nhập đầy đủ thông tin trước khi đăng nhập'
      });
    } else {
      _this.setState({
        is_loading: true
      });
      // ...
      fetch('http://210.211.118.178/PetsAPI/api/sessions/verify', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "info": this.state.username,
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
              loginMessage: responseJson.errorMsg
            });          
          } else {
            _this.setState({
              data: responseJson,
              authToken : responseJson.authToken,
              is_loading: false
            });

            _this._saveUserId(responseJson.userAuthInfoId);
            _this._authenticate(responseJson.authToken).done();

            // alert("Authenticate successfully: " + AsyncStorage.getItem(AUTH_TOKEN));

            _this.replaceRoute('home');
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

  _saveUserId(userId) {
    try {
      AsyncStorage.setItem(GLOBAL.USER_ID, userId);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  _getUserId = async () => {
    try {
      var x = await AsyncStorage.getItem(GLOBAL.USER_ID);
    } catch (error) {
      console.log("Error: ", error);
      alert(error);
    }

    // try {
    //   const value = await AsyncStorage.getItem('AUTH_TOKEN');
    //   if (value !== null){
    //     // We have data!!
    //     console.log(value);
    //   }
    // } catch (error) {
    //   // Error retrieving data
    // }
  }

  _saveUserInfo(userId, userEmail = '', userPhone = '', userFirstName = '', userLastName = '') {
    alert("userId: " + userId);

    try {
      AsyncStorage.multiSet([
        ['USER_ID', userId],
        ['USER_FIRST_NAME', userFirstName],
        ['USER_LAST_NAME', userLastName],
        ['USER_EMAIL', userEmail],
        ['USER_PHONE', userPhone]
      ], (error) => {
        console.log("Error: ", error);
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // get Opt code form forget password form (in popup)
  getOptCode() {
    let _this = this;

    _this.setState({
      otpCode: ''
    });

    if(this.state.emailForget == '') {
      _this.setState({
        getOptMessage : 'Vui lòng nhập vào địa chỉ email của bạn'
      })
    } else {
      _this.setState({
        is_submit_forget: true
      });
      // ...
      fetch('http://210.211.118.178/PetsAPI/api/userauthinfos/requestotp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": this.state.emailForget
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          // Store the results in the state variable results and set loading to
          console.log(responseJson);

          if(responseJson.errorCode) {
            console.log("Code: "+ responseJson.errorMsg);
            _this.setState({
              is_submit_forget: false,
              getOptMessage : responseJson.errorMsg
            });
          } else {
            _this.setState({
              getOptMessage: 'Yêu cầu đổi mật khẩu gửi thành công',
              confirmotp: false,
              otpCode: '',
              is_submit_forget: false
            });
          }
      })
      .catch((error) => {
          _this.setState({
              is_loading: false
          });
          Alert.alert(
            "Lỗi",
            "Lỗi phát sinh trong quá trình gửi yêu cầu. Vui lòng thử lại!",
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          );
          console.error(error);
      });

    }
  }

  // Reset passoword in Forget Password Form (in Popup)
  resetPassword() {
      let _this = this;

      if(this.state.otpCode == '' || this.state.newPassword == '') {
        _this.setState({
          confirmOtpMessage: 'Vui lòng điền đầy đủ thông tin'
        });
      } else {
        _this.setState({
          is_submit_forget: true
        });
        
        fetch('http://210.211.118.178/PetsAPI/api/userauthinfos/resetpassword', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": this.state.emailForget,
            "oTPCode": this.state.otpCode,
            "passwordHash": this.state.newPassword
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // Store the results in the state variable results and set loading to
            console.log(responseJson);

            if(responseJson.errorCode) {
              console.log("Code: "+ responseJson.errorMsg);
              _this.setState({
                is_submit_forget: false,
                confirmOtpMessage: responseJson.errorMsg
              });          
            } else {
              _this.setState({
                modalVisible: false,
                confirmotp: true,
                is_submit_forget: false,
                confirmOtpMessage: 'Cập nhật mật khẩu thành công'
              });
            }
        })
        .catch((error) => {
            _this.setState({
                is_loading: false
            });
            Alert.alert(
              "Lỗi",
              "Lỗi phát sinh trong quá trình gửi yêu cầu. Vui lòng thử lại!",
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]
            );
            console.error(error);
        });

      }
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.top}>
                  <Image style={styles.logo} source={require('../../../images/logo-2.png')}/>
              </View>
              <View style={styles.main}>
                <InputGroup style={styles.input}>
                  <Icon name="ios-person" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}}/>
                  <Input placeholder="Email / Số điện thoại" onChangeText={username => this.setState({ username })}  style={{color: '#333333'}}/>
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}}/>
                  <Input
                    placeholder="Mật khẩu"
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                  />
                </InputGroup>

                {this.state.loginMessage ? <Text style={{ color: template.danger, alignSelf: 'center' }}>{this.state.loginMessage}</Text> : null}

                <Button style={styles.btn} bordered onPress={() => this.signin()}>
                  <Text style={{color:'#FFFFFF'}}>ĐĂNG NHẬP</Text>
                </Button>

                <View style={styles.actions}>
                    <Button bordered rounded warning style={styles.forget} onPress={() => {this.setModalVisible(true)}}><Text style={{color: '#f0ad4e'}}>Quên mật khẩu?</Text></Button>
                    <Button bordered rounded success style={styles.forget} onPress={() => this.replaceRoute('signup')}><Text style={{color: '#5cb85c'}}>Tạo tài khoản mới</Text></Button>
                </View>

                {this.state.is_loading ? <Spinner color='blue' visible={this.state.is_loading} /> : null}

              </View>
            </Image>
          </Content>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
            }}
          >
            <View style={styles.modal}>
                 {
                    this.state.confirmotp ? (
                      <View style={styles.forgetForm}>
                          <View style={styles.wrapperFormForget}>
                              <Text style={{marginBottom: 15}}>
                                QUÊN MẬT KHẨU
                              </Text>

                              {this.state.is_submit_forget ? <Spinner color='blue' visible={this.state.is_submit_forget} /> : null}
                              {this.state.getOptMessage ? <Text style={{ color: template.warning }}>{this.state.getOptMessage}</Text> : null}
                              <InputGroup borderType='underline' style={{marginTop: 30}}>
                                  <Icon name='ios-mail' style={{color:'#384850', marginTop: -5, marginRight: 15}}/>
                                  <Input
                                    placeholder='Nhập email hoặc số điện thoại'
                                    onChangeText={emailForget => this.setState({ emailForget })} />
                              </InputGroup>

                              <View style={{ marginTop: 30, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                  <Button bordered danger onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
                                     }}>
                                      Thoát
                                  </Button>
                                </View>

                                <View>
                                  <Button success style={{alignSelf: 'flex-end'}} onPress={() => this.getOptCode()}>
                                      Gửi yêu cầu
                                  </Button>
                                </View>
                              </View>
                          </View>
                      </View>
                    ) : (
                      <View style={styles.forgetForm}>
                          <View style={styles.wrapperFormForget}>
                              <Text style={{marginBottom: 15}}>
                                  CẬP NHẬT MẬT KHẨU
                              </Text>

                              {this.state.is_submit_forget ? <Spinner color='blue' visible={this.state.is_submit_forget} /> : null}
                              {this.state.confirmOtpMessage ? <Text style={{ color: template.warning }}>{this.state.confirmOtpMessage}</Text> : null}
                              <InputGroup borderType='underline' style={{marginTop: 30}}>
                                  <Icon name='ios-key-outline' style={{color:'#384850', marginTop: -5, marginRight: 15}}/>
                                  <Input
                                    placeholder='Nhập mã OTP'
                                    onChangeText={otpCode => this.setState({ otpCode })} />
                              </InputGroup>

                              <InputGroup borderType='underline' style={{marginTop: 30}}>
                                  <Icon name='ios-unlock-outline' style={{color:'#384850', marginTop: -5, marginRight: 15}}/>
                                  <Input
                                    placeholder='Nhập mật khẩu mới'
                                    secureTextEntry
                                    onChangeText={newPassword => this.setState({ newPassword })} />
                              </InputGroup>

                              <View style={{ marginTop: 30, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                  <Button bordered danger onPress={() => this.setState({confirmotp : true})}>
                                      Quay lại
                                  </Button>
                                </View>

                                <View>
                                  <Button success style={{alignSelf: 'flex-end'}} onPress={() => this.resetPassword()}>
                                      Cập nhật
                                  </Button>
                                </View>
                              </View>
                          </View>
                      </View>
                    )
                 }
            </View>
        </Modal>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
