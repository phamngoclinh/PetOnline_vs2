
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, View, TextInput, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Thumbnail, Spinner } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

// For REALTIME Chatimport
var petAppId = '';
window.navigator.userAgent = 'ReactNative';

import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication/client';
var io = require('../../packages/socket.io-client/socket.io');
const PLACEHOLDER = '../../../images/avatarThumbnail.png';

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
      text: '',
      messages: [],
      skip: 0,
      hasMoreMessages : false,
      loading: true
    };

    const options = {transports: ['websocket'], forceNew: true};
    const socket = io('http://192.168.43.165:3030', options);

    this.featherAPI = feathers()
        .configure(socketio(socket, {timeout: 5000}))
        .configure(hooks())
        // Use AsyncStorage to store our login toke
        .configure(authentication({
            storage: AsyncStorage
        }));

    // this.formatMessage = this.formatMessage.bind(this);
    // this.loadMessages = this.loadMessages.bind(this);
    // this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentDidMount() {
    let _this = this;

    AsyncStorage.getItem('PETAPP_ID').then((value) => {
      petAppId = value;
    });

    this.featherAPI.io.on('connect', () => {
        console.log("Connect to Socket success");

        this.featherAPI.service('messages').on('created', message => {
          const messages = this.state.messages;
          messages.push(_this.formatMessage(message));

          _this.setState({messages});
        });

        var loginInfo = {
            type: 'local',
            email: 'phamngoclinh@gmail.com',
            password: '123456',
        };

        _this.featherAPI.authenticate(loginInfo).then((response) => {
          console.log(response);
          console.log('auth ok');
          AsyncStorage.setItem('PETAPP_ID', response.data._id);
          petAppId = response.data._id;

          _this.loadMessages();

          _this.setState({loading: false});
        }).catch((error) => {
          console.log(error);
          console.log('auth fail');
          _this.setState({loading: false});
          alert("auth fail");
        });
    });

    
  }

  componentWillMount() {
    
  }

  createMessage() {
    let _this = this;

    this.featherAPI.service('messages').create({
      text: this.state.text
    }).then((result) => {
      _this.setState({text: ''});
      console.log("Tin nhắn được khởi tạo từ App: ", result);
    }).catch((error) => {
      console.log("Lỗi. Không thể tạo tin nhắn");
    });
  }

  formatMessage(message) {
    return {
      id: message._id,
      name: message.sentBy.email,
      text: message.text,
      position: message.sentBy._id === petAppId ? 'right' : 'left',
      image: {uri: message.sentBy.avatar ? message.sentBy.avatar : PLACEHOLDER },
      date: new Date(message.createdAt)
    };
  }

  loadMessages() {
    let _this = this;

    const query = {query: {$sort: {updatedAt: -1}, $limit: 15}};

    this.featherAPI.service('messages').find(query).then((response) => {
      console.log("Response: ", response);

      if(response.total > 0) {
        const messages = this.state.messages;
        result = response.data;
        console.log(response);

        result.forEach(function(message) {
          messages.push(_this.formatMessage(message));
        });

        messages.reverse();

        _this.setState({messages});
      }
    }).catch((error) => {
      console.log("error: ", error);
    });
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

          <Title>{(name) ? this.props.name : 'PHÒNG TÁN GẪU'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
            <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-between', height: ScreenHeight - 80}}>
              <View style={{flex: 9, backgroundColor: '#FFFFFF'}}>
                <ScrollView
                  ref='_scrollView' 
                  onContentSizeChange={(contentWidth, contentHeight) => {
                    this.refs._scrollView.scrollTo({x: 0, y: contentHeight, animated: true});
                  }}
                  style={{backgroundColor: '#f8f8f8'}}  >
                  <View style={styles.chatWrapper}>
                    <List style={{paddingLeft: 0}}>
                        {
                          this.state.messages ?
                            this.state.messages.map((message, index) =>  {
                              return (
                                <ListItem key={message.id} style={{paddingLeft: 0, 
                                    marginLeft: 0, 
                                    borderBottomWidth: 0, 
                                    marginBottom: 5, 
                                    marginTop: 5}}>
                                    <Thumbnail 
                                      source={require('../../../images/avatarThumbnail.png')} 
                                      style={{
                                        alignSelf:'flex-end',
                                        marginTop: 5,
                                        width: 60,
                                        height: 60
                                      }} />
                                    <Text style={{marginBottom: 5}}>{ message.name }</Text>
                                    <Text note 
                                      style={{ backgroundColor: '#12c799', 
                                        color:'#ffffff', 
                                        fontSize: 15,
                                        padding: 10, 
                                        borderRadius: 20 }} >
                                        { message.text }
                                    </Text>
                                    <Text note>
                                      { message.position }
                                    </Text>
                                </ListItem>
                              )
                            })
                            : null
                        }
                        
                    </List>
                  </View>
                </ScrollView>
              </View>
              <View style={{flex: 3, borderTopWidth: 1, borderTopColor: '#cccccc'}}>
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
                  <Button transparent onPress = {() => this.createMessage()}><Icon name='ios-send-outline' style={{fontSize: 25, color: '#333333'}}/></Button>
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
