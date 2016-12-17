
import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, View, Icon, InputGroup, Input, List, ListItem, CheckBox, Spinner } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
  replaceAt,
} = actions;

const background = require('../../../images/background.jpg');

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
      data : null
    };
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



  signup() {
    let _this = this;

    if(this.state.email == '' || this.state.phone == '' || this.state.password == '' || this.state.firstName == '' || this.state.lastName == '') {
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
              is_loading: false
            });
            Alert.alert(
              "Lỗi",
              responseJson.errorMsg,
              [
                {text: 'Quay lại', onPress: () => console.log('Quay lại pressed'), style: 'cancel'}
              ]
            );
          } else {
            _this.setState({
              data: responseJson,
              is_loading: false
            });

            Alert.alert(
              "Đăng ký thành công",
              "Tôi hoàn toàn đồng ý với mọi quy định của ứng dụng",
              [
                {text: 'Tìm hiểu thêm', onPress: () => console.log('Ask me later pressed')},
                {text: 'OK', onPress: () => this.replaceRoute('login')},
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
                  <Image style={styles.logo} source={require('../../../images/avatar.png')}/>
              </View>
              <View style={styles.main}>
                <InputGroup style={styles.input}>
                  <Icon name="ios-person" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}}/>
                  <Input placeholder="EMAIL" onChangeText={email => this.setState({ email })}  style={{color: '#333333'}}/>
                </InputGroup>
                <InputGroup style={styles.input}>
                    <Icon name="ios-call" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}} />
                    <Input placeholder="PHONE" keyboardType="numeric"
                      onChangeText={phone => this.setState({ phone })} />
                </InputGroup>
                <InputGroup style={styles.input}>
                    <Icon name="ios-globe-outline" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}} />
                    <Input placeholder="FIRST NAME" keyboardType="numeric"
                      onChangeText={firstName => this.setState({ firstName })} />
                </InputGroup>
                <InputGroup style={styles.input}>
                    <Icon name="ios-globe-outline" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}} />
                    <Input placeholder="LAST NAME" keyboardType="numeric"
                      onChangeText={lastName => this.setState({ lastName })} />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}}/>
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                  />
                </InputGroup>

                <Button rounded style={{width: 250, height: 50, alignSelf: 'center', marginBottom: 20, marginTop: 30}} onPress={() => this.signup()}>
                  <Text style={{color:'#FFFFFF'}}>Register</Text>
                </Button>

                <Button rounded bordered danger style={{width: 250, height: 50, alignSelf: 'center', marginBottom: 30}}
                  onPress={() => this.replaceRoute('login')}>
                  Back to login
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
