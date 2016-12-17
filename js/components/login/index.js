
import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View, Text, Spinner } from 'native-base';

import { setUser } from '../../actions/user';
import styles from './styles';

const {
  replaceAt,
} = actions;

const background = require('../../../images/background.jpg');

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
      name: '',
      username: '',
      password: '',
      is_loading: true,
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
                    <Text button style={styles.forget}>Quên mật khẩu?</Text>
                    <Text style={{alignSelf: 'center'}}>hoặc</Text>
                    <Text button style={styles.forget} onPress={() => this.replaceRoute('signup')}>Tạo tài khoản mới</Text>
                </View>

                {this.state.is_loading ? <Spinner color='blue' visible={this.state.is_loading} /> : null}

              </View>
            </Image>
          </Content>
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
