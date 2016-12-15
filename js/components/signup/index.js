
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, View, Icon, InputGroup, Input, List, ListItem, CheckBox } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
} = actions;

const background = require('../../../images/background.jpg');

class Signup extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
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
                  <Input placeholder="EMAIL" onChangeText={name => this.setState({ name })}  style={{color: '#333333'}}/>
                </InputGroup>
                <InputGroup style={styles.input}>
                    <Icon name="ios-call" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}} />
                    <Input placeholder="PHONE" keyboardType="numeric" />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" style={{marginTop: -10, marginRight: 20, color: "#5b71ff"}}/>
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry
                  />
                </InputGroup>

                <Button style={styles.btn} bordered onPress={() => this.replaceRoute('login')}>
                  <Text style={{color:'#FFFFFF'}}>Register</Text>
                </Button>

                <View style={styles.actions}>
                    <Text button style={styles.forget}>
                      Quay về Trang chủ
                    </Text>
                </View>

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
