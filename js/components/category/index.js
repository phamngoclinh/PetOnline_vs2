
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, Grid, Col, InputGroup, Input } from 'native-base';
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

  constructor(props) {
      super(props);
      this.state = {
          is_search: false
      };

      this.search = this.search.bind(this);
  }


  search() {
    // Set loading to true when the search starts to display a Spinner
    this.setState({
        loading: true,
        is_loading_data: true
    });
    this.pushRoute('search', 1);
    var that = this;
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
        {

          this.state.is_search ?
            (
              <Header searchBar rounded>
                  <InputGroup>
                      <Icon name="ios-search" />
                      <Input placeholder="Tìm kiếm thú cưng..." value={this.state.search}  onChangeText={(text) => this.setState({search:text})} onSubmitEditing={()=>this.search()}/>
                      <Button transparent onPress={()=> this.setState({is_search: false})}><Icon style={{color: '#333333'}} name='ios-close-circle' /></Button>
                  </InputGroup>
                  <Button transparent>Search</Button>
              </Header>
            )
            : null
        }

        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{(name) ? this.props.name : 'Danh mục'}</Title>

          <Button transparent onPress={() => this.setState({is_search: true})}>
              <Icon name="ios-search" />
          </Button>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
          <View style={{flex: 0, flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'column', height: ScreenHeight - 100, justifyContent: 'space-between', paddingRight: 5}}>
                  <Button block large style={{height: ((ScreenHeight - 100) / 3) - 5}} onPress={() => this.pushRoute('detail', 3)}>
                    
                    CHÓ
                  </Button>
                  <Button block large style={{height: ((ScreenHeight - 100) / 3) - 5}} onPress={() => this.pushRoute('detail', 3)}>MÈO</Button>
                  <Button block large style={{height: ((ScreenHeight - 100) / 3) - 5}} onPress={() => this.pushRoute('detail', 3)}>CHIM</Button>
              </View>
              <View style={{flex: 1, flexDirection: 'column', height: ScreenHeight - 100, justifyContent: 'space-between', paddingLeft: 5}}>
                  <Button block large style={{height: ((ScreenHeight - 100) / 3) - 5}} onPress={() => this.pushRoute('detail', 3)}>CÁ</Button>
                  <Button block large style={{height: ((ScreenHeight - 100) / 3) - 5}} onPress={() => this.pushRoute('detail', 3)}>BÒ SÁT</Button>
                  <Button block warning bordered large style={{height: ((ScreenHeight - 100) / 3) - 5}} onPress={() => this.pushRoute('detail', 3)}>KHÁC</Button>
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
