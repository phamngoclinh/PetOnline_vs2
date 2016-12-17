
import React, { Component } from 'react';
import { Image, Alert, Modal } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View, Text, Spinner, Card, CardItem } from 'native-base';

import { setUser } from '../../actions/user';
import styles from './styles';

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
      otpcode : '',
      newPassword: '',
      is_submit_forget: false,
      data: null,
      authToken: ''
    };
  }

  componentDidMount() {
    let _this = this;
    _this.setState({
      is_loading: false
    });
  }

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
      Alert.alert(
        "Cảnh báo",
        "Vui lòng nhập đầy đủ các ô trên màn hình!",
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
        ]
      );
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
              is_loading: false
            });
            Alert.alert(
              "Thông báo",
              responseJson.errorMsg,
              [
                {text: 'Quay lại', onPress: () => console.log('Quay lại pressed'), style: 'cancel'}
              ]
            );            
          } else {
            _this.setState({
              data: responseJson,
              authToken : responseJson.authToken,
              is_loading: false
            });

            Alert.alert(
              "Đăng nhập thành công",
              "Welcome to PetOnline",
              [
                {text: 'Go next', onPress: () => this.replaceRoute('home')},
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
              {text: 'Tìm hiểu thêm', onPress: () => console.log('Tìm hiểu thêm pressed')},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          );
          console.error(error);
      });

    }
  }

  // get Opt code form forget password form (in popup)
  getOptCode() {
    let _this = this;

    if(this.state.emailForget == '') {
      Alert.alert(
        "Cảnh báo",
        "Vui lòng nhập đầy đủ các ô trên màn hình!",
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
        ]
      );
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
              is_submit_forget: false
            });
            Alert.alert(
              "Thông báo",
              responseJson.errorMsg,
              [
                {text: 'Thử lại', onPress: () => console.log('Quay lại pressed'), style: 'cancel'}
              ]
            );            
          } else {
            _this.setState({
              // modalVisible: false,
              confirmotp: false,
              is_submit_forget: false
            });

            Alert.alert(
              "Gửi thành công",
              "Yêu cầu quên mật khẩu đã được gửi đi"
            );
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
              {text: 'Tìm hiểu thêm', onPress: () => console.log('Tìm hiểu thêm pressed')},
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

      if(this.state.otpcode == '' || this.state.newPassword == '') {
        Alert.alert(
          "Cảnh báo",
          "Vui lòng nhập đầy đủ các ô trên màn hình!",
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
          ]
        );
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
            "oTPCode": this.state.otpcode,
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
                is_submit_forget: false
              });
              Alert.alert(
                "Thông báo",
                responseJson.errorMsg,
                [
                  {text: 'Thử lại', onPress: () => console.log('Quay lại pressed'), style: 'cancel'}
                ]
              );            
            } else {
              _this.setState({
                modalVisible: false,
                confirmotp: true,
                is_submit_forget: false
              });

              Alert.alert(
                "Reset thành công",
                "Mật khẩu của bạn đã được cập nhật"
              );
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
                {text: 'Tìm hiểu thêm', onPress: () => console.log('Tìm hiểu thêm pressed')},
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
                  <Image style={styles.logo} source={require('../../../images/avatar.png')}/>
              </View>
              <View style={styles.main}>
                <InputGroup style={styles.input}>
                  <Icon name="ios-person" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}}/>
                  <Input placeholder="EMAIL or PHONE" onChangeText={username => this.setState({ username })}  style={{color: '#333333'}}/>
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}}/>
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                  />
                </InputGroup>

                <Button style={styles.btn} bordered onPress={() => this.signin()}>
                  <Text style={{color:'#FFFFFF'}}>Login</Text>
                </Button>

                <View style={styles.actions}>
                    <Text button style={styles.forget} onPress={() => {this.setModalVisible(true)}}>Quên mật khẩu?</Text>
                    <Text style={{alignSelf: 'center'}}>hoặc</Text>
                    <Text button style={styles.forget} onPress={() => this.replaceRoute('signup')}>Tạo tài khoản mới</Text>
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
                          <Text>
                            Forget password
                          </Text>

                          {this.state.is_submit_forget ? <Spinner color='blue' visible={this.state.is_submit_forget} /> : null}

                          <InputGroup borderType='underline' style={{marginTop: 30}}>
                              <Icon name='ios-mail' style={{color:'#384850', marginTop: -5, marginRight: 15}}/>
                              <Input
                                placeholder='Enter your email or phone...'
                                onChangeText={emailForget => this.setState({ emailForget })} />
                          </InputGroup>

                          <View style={{ marginTop: 30, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                              <Button bordered danger onPress={() => {
                                this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
                                 }}>
                                  Go Back
                              </Button>
                            </View>

                            <View>
                              <Button success style={{alignSelf: 'flex-end'}} onPress={() => this.getOptCode()}>
                                  Submit
                              </Button>
                            </View>
                          </View>
                      </View>
                    ) : (
                      <View style={styles.forgetForm}>
                          <Text>
                              Enter your password
                          </Text>

                          {this.state.is_submit_forget ? <Spinner color='blue' visible={this.state.is_submit_forget} /> : null}

                          <InputGroup borderType='underline' style={{marginTop: 30}}>
                              <Icon name='ios-key-outline' style={{color:'#384850', marginTop: -5, marginRight: 15}}/>
                              <Input
                                placeholder='OTP Code'
                                onChangeText={otpcode => this.setState({ otpcode })} />
                          </InputGroup>

                          <InputGroup borderType='underline' style={{marginTop: 30}}>
                              <Icon name='ios-unlock-outline' style={{color:'#384850', marginTop: -5, marginRight: 15}}/>
                              <Input
                                placeholder='New Password'
                                onChangeText={newPassword => this.setState({ newPassword })} />
                          </InputGroup>

                          <View style={{ marginTop: 30, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                              <Button bordered danger onPress={() => this.setState({confirmotp : true})}>
                                  Go Back
                              </Button>
                            </View>

                            <View>
                              <Button success style={{alignSelf: 'flex-end'}} onPress={() => this.resetPassword()}>
                                  Reset password
                              </Button>
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
