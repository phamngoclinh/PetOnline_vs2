
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, View, TextInput, ScrollView, Dimensions } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

const {
  popRoute,
} = actions;

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props}
        editable = {true}
        maxLength = {350} />
    );
  }
}

class BlankPage extends Component {

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

  constructor(props) {
    super(props);
    this.state = {
      // text: 'Enter your content here...',
      text: '',
    };
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

          <Title>{(name) ? this.props.name : 'Chát Chít'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>          
            <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-between', height: ScreenHeight - 80}}>
              <View style={{flex: 10, backgroundColor: '#FFFFFF'}}>
                <ScrollView>
                  <View style={styles.chatWrapper}>
                    <List style={{paddingLeft: 0}}>
                        <ListItem style={{paddingLeft: 0, marginLeft: 0, borderBottomWidth: 0, marginBottom: 5, marginTop: 5}}>
                            <Thumbnail source={require('../../../images/avatar.png')} style={{alignSelf:'flex-start', marginTop: 5}}/>
                            <Text style={{marginBottom: 5}}>Phạm Ngọc Linh</Text>
                            <Text note style={{backgroundColor: '#12c799', color:'#ffffff', padding: 10, borderRadius: 5}}>Các bông tuyết giấy sẽ trông rất đẹp khi được treo lên cửa sổ hoặc trên tường phòng bạn. Làm bông tuyết giấy dễ dàng vừa tạo sự hứng thú cho cả trẻ em lẫn người lớn. Dùng bông tuyết để trang trí cho Lễ Giáng Sinh hay bất cứ dịp nào cũng đều là một ý tưởng tuyệt vời!</Text>
                        </ListItem>
                        <ListItem style={{paddingLeft: 0, marginLeft: 0, borderBottomWidth: 0, marginBottom: 5, marginTop: 5}}>
                            <Thumbnail source={require('../../../images/avatar.png')} style={{alignSelf:'flex-start', marginTop: 5}}/>
                            <Text style={{marginBottom: 5}}>Phạm Ngọc Linh</Text>
                            <Text note style={{backgroundColor: '#12c799', color:'#ffffff', padding: 10, borderRadius: 5}}>Các bông tuyết giấy sẽ trông rất đẹp khi được treo lên cửa sổ hoặc trên tường phòng bạn. Làm bông tuyết giấy dễ dàng vừa tạo sự hứng thú cho cả trẻ em lẫn người lớn. Dùng bông tuyết để trang trí cho Lễ Giáng Sinh hay bất cứ dịp nào cũng đều là một ý tưởng tuyệt vời!</Text>
                        </ListItem>
                        <ListItem style={{paddingLeft: 0, marginLeft: 0, borderBottomWidth: 0, marginBottom: 5, marginTop: 5}}>
                            <Thumbnail source={require('../../../images/avatar.png')} style={{alignSelf:'flex-start', marginTop: 5}}/>
                            <Text style={{marginBottom: 5}}>Phạm Ngọc Linh</Text>
                            <Text note style={{backgroundColor: '#12c799', color:'#ffffff', padding: 10, borderRadius: 5}}>Các bông tuyết giấy sẽ trông rất đẹp khi được treo lên cửa sổ hoặc trên tường phòng bạn. Làm bông tuyết giấy dễ dàng vừa tạo sự hứng thú cho cả trẻ em lẫn người lớn. Dùng bông tuyết để trang trí cho Lễ Giáng Sinh hay bất cứ dịp nào cũng đều là một ý tưởng tuyệt vời!</Text>
                        </ListItem>
                        <ListItem style={{paddingLeft: 0, marginLeft: 0, borderBottomWidth: 0, marginBottom: 5, marginTop: 5}}>
                            <Thumbnail source={require('../../../images/avatar.png')} style={{alignSelf:'flex-start', marginTop: 5}}/>
                            <Text style={{marginBottom: 5}}>Phạm Ngọc Linh</Text>
                            <Text note style={{backgroundColor: '#12c799', color:'#ffffff', padding: 10, borderRadius: 5}}>Các bông tuyết giấy sẽ trông rất đẹp khi được treo lên cửa sổ hoặc trên tường phòng bạn. Làm bông tuyết giấy dễ dàng vừa tạo sự hứng thú cho cả trẻ em lẫn người lớn. Dùng bông tuyết để trang trí cho Lễ Giáng Sinh hay bất cứ dịp nào cũng đều là một ý tưởng tuyệt vời!</Text>
                        </ListItem>
                        <ListItem style={{paddingLeft: 0, marginLeft: 0, borderBottomWidth: 0, marginBottom: 5, marginTop: 5}}>
                            <Thumbnail source={require('../../../images/avatar.png')} style={{alignSelf:'flex-start', marginTop: 5}}/>
                            <Text style={{marginBottom: 5}}>Phạm Ngọc Linh</Text>
                            <Text note style={{backgroundColor: '#12c799', color:'#ffffff', padding: 10, borderRadius: 5}}>Các bông tuyết giấy sẽ trông rất đẹp khi được treo lên cửa sổ hoặc trên tường phòng bạn. Làm bông tuyết giấy dễ dàng vừa tạo sự hứng thú cho cả trẻ em lẫn người lớn. Dùng bông tuyết để trang trí cho Lễ Giáng Sinh hay bất cứ dịp nào cũng đều là một ý tưởng tuyệt vời!</Text>
                        </ListItem>
                        <ListItem style={{paddingLeft: 0, marginLeft: 0, borderBottomWidth: 0, marginBottom: 5, marginTop: 5}}>
                            <Thumbnail source={require('../../../images/avatar.png')} style={{alignSelf:'flex-start', marginTop: 5}}/>
                            <Text style={{marginBottom: 5}}>Phạm Ngọc Linh</Text>
                            <Text note style={{backgroundColor: '#12c799', color:'#ffffff', padding: 10, borderRadius: 5}}>Các bông tuyết giấy sẽ trông rất đẹp khi được treo lên cửa sổ hoặc trên tường phòng bạn. Làm bông tuyết giấy dễ dàng vừa tạo sự hứng thú cho cả trẻ em lẫn người lớn. Dùng bông tuyết để trang trí cho Lễ Giáng Sinh hay bất cứ dịp nào cũng đều là một ý tưởng tuyệt vời!</Text>
                        </ListItem>
                        <ListItem style={{paddingLeft: 0, marginLeft: 0, borderBottomWidth: 0, marginBottom: 5, marginTop: 5}}>
                            <Thumbnail source={require('../../../images/avatar.png')} style={{alignSelf:'flex-start', marginTop: 5}}/>
                            <Text style={{marginBottom: 5}}>Phạm Ngọc Linh</Text>
                            <Text note style={{backgroundColor: '#12c799', color:'#ffffff', padding: 10, borderRadius: 5}}>Các bông tuyết giấy sẽ trông rất đẹp khi được treo lên cửa sổ hoặc trên tường phòng bạn. Làm bông tuyết giấy dễ dàng vừa tạo sự hứng thú cho cả trẻ em lẫn người lớn. Dùng bông tuyết để trang trí cho Lễ Giáng Sinh hay bất cứ dịp nào cũng đều là một ý tưởng tuyệt vời!</Text>
                        </ListItem>
                    </List>
                  </View>
                </ScrollView>
              </View>
              <View style={{flex: 2, borderTopWidth: 1, borderTopColor: '#cccccc'}}>
                <UselessTextInput
                  placeholder="Soạn tin nhắn..."
                   multiline = {true}
                   numberOfLines = {4}
                   onChangeText={(text) => this.setState({text})}
                   value={this.state.text} 
                   style={{paddingLeft: 10, paddingRight: 10}}/>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
                  <Button transparent><Icon name='ios-heart-outline' style={{fontSize: 25, color: '#333333'}}/></Button>
                  <Button transparent><Icon name='ios-contact-outline' style={{fontSize: 25, color: '#333333'}}/></Button>
                  <Button transparent><Icon name='ios-microphone-outline' style={{fontSize: 25, color: '#333333'}}/></Button>
                  <Button transparent><Icon name='ios-photos-outline' style={{fontSize: 25, color: '#333333'}}/></Button>
                  <Button transparent><Icon name='ios-send-outline' style={{fontSize: 25, color: '#333333'}}/></Button>
                </View>
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
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(BlankPage);
