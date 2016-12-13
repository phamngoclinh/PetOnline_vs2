
import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
} = actions;

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

class Profile extends Component {

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
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{(name) ? this.props.name : 'Profile'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content style={{flex: 0, flexDirection: 'row', height: ScreenHeight - 80}}>
          <View style={{backgroundColor: '#0000ff', alignItems: 'center', padding: 10, flex: 1, width: ScreenWidth}}>
            <Thumbnail size={100} source={require('../../../images/avatar.png')} />
            <Text style={{color: '#ffffff'}}>Phạm Ngọc Linh</Text>
            <Text note style={{color: '#ffffff'}}>Email: pnlinh93@gmail.com</Text>
          </View>
          <View style={{backgroundColor: '#ffffff', alignItems: 'center', padding: 10, flex: 5}}>
            <ScrollView style={{width: ScreenWidth, padding: 10}}>
              <Text>Phạm Ngọc Linh</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
              <Text>Firstly, great work! I was trying out react-native-drawer and I noticed that the dim effect ( the area which is not covered by the side drawer ) is always white with opacity.</Text>
            </ScrollView>
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
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(Profile);
