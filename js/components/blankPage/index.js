
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, View, TextInput, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

// For REALTIME Chatimport
import hooks from 'feathers-hooks';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client/dist/socket.io';
// import localstorage from 'feathers-localstorage';
// import authentication from 'feathers-authentication/client';
import auth from 'feathers-authentication-client';

if(!global._babelPolyfill) { require('babel-polyfill'); }

// This is required for socket.io-client due to a bug in React Native debugger
window.navigator.userAgent = 'ReactNative';

const socket = io('http://192.168.56.1:3030', { transports: ['websocket'] });

// Set up Feathers client side
const app = feathers();
// Register hooks module
app.configure(hooks());
// Register socket.io
app.configure(socketio(socket));
// Set up authentication with a store to cache your auth token
// app.configure(authentication({ storage: AsyncStorage }));
app.configure(auth({ storage: AsyncStorage }));

// Authenticating using a email and password
app.authenticate({
  type: 'local',
  'email': 'phamngoclinh@gmail.com',
  'password': '123456'
}).then(function(result){
  console.log('Authenticated!', result);
  // Find our users on the server via sockets
  app.service('users').find({}).then(function(users){
    console.log('Users!', users);
    alert("Authenticated");
  });
}).catch(function(error){
  // console.error('Error authenticating!', error);
  // alert('Error authenticating!');
});

const messageService = app.service('messages');

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
      hasMoreMessages : false
    };

    // this.formatMessage = this.formatMessage.bind(this);
    // this.loadMessages = this.loadMessages.bind(this);
    // this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentDidMount() {
    let _this = this;

    // _this.loadMessages();

    // messageService.on('created', message => {
    //   const messages = this.state.messages;
    //   messages.push(this.formatMessage(message));

    //   this.setState({messages});
    // });

    // messageService.on('removed', result => {
    //   this.deleteMessage(result);
    // });

    messageService.on('created', message => {
      const messages = this.state.messages;
      messages.push(message);

      _this.setState({messages});
    });
  }

  componentWillMount() {
    // socket.on('connect', () => {
    //   console.log('connected!');
    // });

    messageService.on('created', message => console.log('Someone created a message', message));
  }

  // formatMessage(message) {
  //   return {
  //     id: message._id,
  //     name: message.sentBy.username,
  //     text: message.text,
  //     position: message.sentBy._id === this.app.get('user')._id ? 'left' : 'right',
  //     image: {uri: message.sentBy.avatar ? message.sentBy.avatar : PLACEHOLDER },
  //     date: new Date(message.createdAt)
  //   };
  // }

  // deleteMessage(messageToRemove) {
  //   console.log(messageToRemove);
  //   let messages = this.state.messages;
  //   let idToRemove = messageToRemove.id ? messageToRemove.id : messageToRemove._id;

  //   console.log(idToRemove);
  //   messages = messages.filter(function (message) {
  //     return message.id !== idToRemove;
  //   });

  //   console.log(messageToRemove);

  //   this.setState({messages});
  // }

  // loadMessages(oldestMessage, callback) {
  //   const query = {query: {$sort: {updatedAt: -1}, $skip: this.state.skip}};

  //   return this.app.service('messages').find(query).then(response => {
  //     const messages = [];
  //     const skip = response.skip + response.limit;

  //     for (var message of response.data) {
  //       messages.unshift(this.formatMessage(message));
  //     }

  //     // This was fired from the load earlier messages button
  //     if (callback) {
  //       this.setState({skip, hasMoreMessages: response.skip + response.limit < response.total});
  //       callback(messages, false);
  //     } else {
  //       this.setState({messages, skip, hasMoreMessages: response.skip + response.limit < response.total});
  //     }
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // }

  // sendMessage(message = {}, rowID = null) {
  //   this.app.service('messages').create({text: message.text}).then(result => {
  //     console.log('message created!');
  //   }).catch((error) => {
  //     console.log('ERROR creating message');
  //     console.log(error);
  //   });
  // }

  // promptToDeleteMessage(messageData, rowId) {
  //   //TODO: Validate that this is a message created by this user before showing alert
  //   Alert.alert(
  //     'Delete Message',
  //     'Are you sure you want to delete this message?',
  //     [
  //       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  //       {
  //         text: 'Yes, Delete It!', onPress: () => {
  //         this.app.service('messages').remove(messageData.id).then(result => {
  //           this.deleteMessage(messageData);
  //         }).catch((error) => {
  //           console.log('ERROR deleting message');
  //           console.log(error);
  //         });
  //       }
  //       }
  //     ]
  //   )
  // }

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
                        {
                          this.state.messages ?
                            this.state.messages.map((message, index) =>  {
                              return (
                                <ListItem key={message._id} style={{paddingLeft: 0, 
                                    marginLeft: 0, 
                                    borderBottomWidth: 0, 
                                    marginBottom: 5, 
                                    marginTop: 5}}>
                                    <Thumbnail 
                                      source={require('../../../images/avatar.png')} 
                                      style={{alignSelf:'flex-start', marginTop: 5}} />
                                    <Text style={{marginBottom: 5}}>{ message.sentBy.email }</Text>
                                    <Text note 
                                      style={{ backgroundColor: '#12c799', 
                                        color:'#ffffff', 
                                        padding: 10, 
                                        borderRadius: 20 }} >
                                        { message.text }
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
