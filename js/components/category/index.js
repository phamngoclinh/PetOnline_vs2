
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, Grid, Col } from 'native-base';
import { View, Dimensions } from 'react-native';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import styles from './styles';

const {
  popRoute,
  pushRoute
} = actions;

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

class Category extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{(name) ? this.props.name : 'Category'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
          <View style={{flex: 0, flexDirection: 'row'}}>
              <View style={{ backgroundColor: '#D954D7', flex: 1, flexDirection: 'column', height: null}}>
                  <Button block style={{height: 150}} onPress={() => this.pushRoute('detail', 1)}>CATEGORY #1</Button>
                  <Button block style={{height: 150}} onPress={() => this.pushRoute('detail', 1)}>CATEGORY #3</Button>
                  <Button block style={{height: 150}} onPress={() => this.pushRoute('detail', 1)}>CATEGORY #5</Button>
                  <Button block style={{height: 150}} onPress={() => this.pushRoute('detail', 1)}>CATEGORY #7</Button>
              </View>
              <View style={{ backgroundColor: '#D93735', flex: 1, height: null}}>
                  <Button block style={{height: 150}} onPress={() => this.pushRoute('detail', 1)}>CATEGORY #2</Button>
                  <Button block style={{height: 150}} onPress={() => this.pushRoute('detail', 1)}>CATEGORY #3</Button>
                  <Button block style={{height: 150}} onPress={() => this.pushRoute('detail', 1)}>CATEGORY #4</Button>
                  <Button block style={{height: 150}} onPress={() => this.pushRoute('detail', 1)}>CATEGORY #8</Button>
              </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    setIndex: index => dispatch(setIndex(index)),
    // openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(Category);
