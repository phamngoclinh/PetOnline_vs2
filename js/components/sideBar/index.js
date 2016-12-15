
import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Card, CardItem, Thumbnail, Button, Icon, Badge } from 'native-base';

import { setIndex } from '../../actions/list';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';

import styles from './style';

class SideBar extends Component {

  static propTypes = {
    // setIndex: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }



  render() {
    return (
      <Content theme={myTheme} style={styles.sidebar} >
          <Card style={styles.top}>
              <CardItem>
                  <Thumbnail source={require('../../../images/avatar.png')} />
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
              </CardItem>
         </Card>

        <ScrollView style={styles.middle}>
            <List>
                <ListItem button iconLeft onPress={() => this.navigateTo('home')}>
                    <Icon name="ios-home" style={{ color: '#0A69FE' }} />
                    <Text>Home</Text>
                </ListItem>
                <ListItem button iconLeft onPress={() => this.navigateTo('signin')}>
                    <Icon name="ios-log-in" style={{ color: '#0A69FE' }} />
                    <Text>Sign In</Text>
                </ListItem>
                <ListItem button iconLeft onPress={() => this.navigateTo('signup')}>
                    <Icon name="ios-log-in" style={{ color: '#0A69FE' }} />
                    <Text>Sign Up</Text>
                </ListItem>
                <ListItem button iconLeft >
                    <Icon name="ios-log-out" style={{ color: '#0A69FE' }} />
                    <Text>Sign Out</Text>
                </ListItem>
                <ListItem button iconLeft onPress={() => this.navigateTo('forgetPassword')}>
                    <Icon name="ios-plane" style={{ color: '#0A69FE' }} />
                    <Text>Forget Password</Text>
                    <Text note>Off</Text>
                </ListItem>
                <ListItem button iconLeft onPress={() => this.navigateTo('category')}>
                    <Icon name="ios-settings-outline" style={{ color: '#0A69FE' }} />
                    <Text>Category</Text>
                    <Badge style={{ backgroundColor: '#8C97B5' }}>2</Badge>
                </ListItem>
                <ListItem button iconLeft onPress={() => this.navigateTo('detail')}>
                    <Icon name="ios-settings-outline" style={{ color: '#0A69FE' }} />
                    <Text>Detail</Text>
                    <Badge style={{ backgroundColor: '#8C97B5' }}>2</Badge>
                </ListItem>
                <ListItem button iconLeft onPress={() => this.navigateTo('profile')}>
                    <Icon name="ios-settings-outline" style={{ color: '#0A69FE' }} />
                    <Text>User profile</Text>
                    <Badge style={{ backgroundColor: '#8C97B5' }}>2</Badge>
                </ListItem>
                <ListItem button iconLeft onPress={() => this.navigateTo('search')}>
                    <Icon name="ios-settings-outline" style={{ color: '#0A69FE' }} />
                    <Text>Search</Text>
                    <Badge style={{ backgroundColor: '#8C97B5' }}>2</Badge>
                </ListItem>
                <ListItem button iconLeft onPress={() => this.navigateTo('blankPage')}>
                    <Icon name="ios-settings-outline" style={{ color: '#0A69FE' }} />
                    <Text>Blank Page</Text>
                </ListItem>
            </List>
        </ScrollView>

        <Card style={styles.bottom}>
            <CardItem>
                <Text>Copyright 2016...</Text>
            </CardItem>
       </Card>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
