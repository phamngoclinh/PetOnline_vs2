
import React, { Component } from 'react';
import { TouchableOpacity, Linking, Image, Modal, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, H1, H2, H3, H4, Card, CardItem, Text, Button, Icon, InputGroup, Input, Thumbnail, List, ListItem, Spinner, Footer, FooterTab, Badge } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { setUser } from '../../actions/user';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import GLOBAL from '../../storage/global';

const {
  reset,
  pushRoute,
  replaceAt,
} = actions;

var authToken = '';
var artId = '';

const apiLink = 'http://210.211.118.178/PetsAPI/';
const petAlbum = 'http://210.211.118.178/PetsAPI/Images/PetThumbnails/';
const userAlbum = 'http://210.211.118.178/PetsAPI/Images/UserThumbnails/';

class Home extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
      super(props);
      this.state = {
        data: null,
        categoryType : 0,
        pipePage: [],
        currentPage: 'startup',
        results: {},
        modalVisible: false,
        selectedItem: {},
        search: '',
        loading: false,
        is_loading_data: false,
        is_search: false,
        skip: 0,
        limit: 10,
        authenticateToken : ''
      };

      this.search = this.search.bind(this);
  }

  componentDidMount() {
      let _this = this;

      // var x = _this._getStorageValue();

      AsyncStorage.getItem('USER_ID').then( (value) => {
      	console.log("USER_ID IN HOME: ", value);
      });

      AsyncStorage.getItem('AUTH_TOKEN').then( (value) => {
        authToken = value;

        _this.setState({
          is_loading_data: true
        });

        fetch('http://210.211.118.178/PetsAPI/api/articles/'+_this.state.categoryType+'/'+_this.state.skip+'/'+_this.state.limit, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Auth-Token': authToken
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // Store the results in the state variable results and set loading to
            _this.setState({
              data: responseJson,
              is_loading_data: false
            });
        })
        .catch((error) => {
            _this.setState({
              loading: false
          });
            console.error(error);
        });

      });
      
      // _this._loadInitialState().done(function(){
        
      // });

      
  }

  // componentWillMount() {
  //   alert(authToken);
  // }

  // _loadInitialState = async () => {
  //   // var x = AsyncStorage.getItem(GLOBAL.AUTH_TOKEN);
  //   // console.log("================",x);
  //   // alert("x = " + x);
  //   try {
  //     authToken = await AsyncStorage.getItem('AUTH_TOKEN');
  //     // alert(authToken);
  //     if (authToken !== null){
  //       // this.replaceRoute('home');
  //       this.setState({
  //         authenticateToken : authToken
  //       });
  //     } else {
  //       try {
  //         //
  //       } catch (error) {
  //         //
  //       }
  //     }
  //   } catch (error) {
  //     //
  //   }
  // };

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceAt('home', { key: route }, this.props.navigation.key);
  }

  search() {
      // Set loading to true when the search starts to display a Spinner
      AsyncStorage.setItem('SEARCH_TEXT', this.state.search);

      this.pushRoute('search', 3);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  callMobile(number_phone) {
    Linking.canOpenURL('tel:' + number_phone).then(supported => {
      if (supported) {
        Linking.openURL('tel:' + number_phone);
      } else {
        console.log('Don\'t know how to open URI: ' + 'tel:' + number_phone);
      }
    });
  }

  viewDetail(id) {
    let _this = this;
    _this._saveDetailId(id);
    AsyncStorage.getItem('VIEW_ARTICLE_ID').then( (value) => {
      this.pushRoute('detail', 2);
    });
  }

  _saveDetailId(id) {
    try {
      AsyncStorage.setItem('VIEW_ARTICLE_ID', id.toString());
    } catch (error) {
      console.log(error);
    }
  };

  // getID = async () => {
  //   try {
  //     artId = await AsyncStorage.getItem('VIEW_ARTICLE_ID');
  //   } catch (error) {
  //     //
  //     alert("Eror get" + "Eror save" + error);
  //   }
  // }

  // _getStorageValue(){
  //   AsyncStorage.getItem('VIEW_ARTICLE_ID').then((value) => {
  //     return value;
  //   }, (error) => {
  //     console.log(error);
  //   })
  // }


  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
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
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>{(this.props.name) ? this.props.name : 'Trang chủ'}</Title>

          <Button transparent onPress={() => this.setState({is_search: true})}>
            <Icon name="ios-search" />
          </Button>
        </Header>

        <Content padder>
          {this.state.is_loading_data ? <Spinner color='blue' visible={this.state.is_loading_data} /> : null}
          {
            this.state.data ?
              this.state.data.map((members, index) => {
                return (
                  <Card key={members.id} style={{ flex: 0, marginBottom: 10, borderWidth: .5, borderColor: '#FFFAFA'}}>
                      <CardItem style={{backgroundColor: '#FFFFFA', borderBottomWidth: 0}}>
                          <Thumbnail source={{uri : userAlbum + members.Pet.User.avatarThumbnail}} />
                          <Text onPress={() => this.viewDetail(members.id)} style={{fontSize: 17}}>{members.title}</Text>
                          <Text note>{members.Pet.User.firstName} {members.Pet.User.lastName}</Text>
                      </CardItem>

                      <CardItem onPress={() => this.viewDetail(members.id)}>
                          {
                            /*<Image style={{ resizeMode: 'cover', width: null}} source={{uri: members.Pet.Image.thumbnail}} />*/
                          }
                          <Content style={styles.socialSection}>
                            <Button bordered style={styles.socialButton}><Icon name='ios-thumbs-up-outline' style={{color: '#FFFFFF'}}/></Button>
                            <Button bordered style={styles.socialButton}><Icon name='ios-heart-outline' style={{color: '#FFFFFF'}}/></Button>
                            <Button bordered style={styles.socialButton}><Icon name='ios-star' style={{color: '#FFFFFF'}}/></Button>
                          </Content>
                          <Image style={styles.mainPicture} source={{uri : petAlbum + members.Pet.Image.thumbnail}} />
                      </CardItem>

                      <CardItem style={{backgroundColor: '#fdfdfd', borderBottomWidth: 0}}>
                          <Text style={{color: '#384850'}}>
                              {members.content}
                          </Text>
                      </CardItem>

                      <CardItem style={{backgroundColor: '#fdfdfd', borderTopWidth: 0, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#f9f9f9'}}>
                        <Button transparent>
	                        <Icon name='ios-calendar-outline' />
	                        <Text note>Ngày đăng: {members.createdOn.slice(0, 10)}</Text>
	                    </Button>
	                    <Button transparent>
	                        <Icon name='ios-eye-outline' />
	                        <Text note>Lượt xem: {members.view}</Text>
	                    </Button>
	                    <Button transparent>
	                        <Icon name='ios-camera-outline' />
	                        <Text note>Ảnh: {members.view}</Text>
	                    </Button>
                      </CardItem>

                      <CardItem style={{flex: 0, flexDirection: 'row'}}>
                          <Button success block bordered>
                              <Icon name="ios-pricetag-outline" />
                              <Text>Giá bán: {members.price} VNĐ</Text>
                          </Button>
                          
                          {
                          	/*
                          	<Button rounded danger onPress={() => {this.setModalVisible(true)}}>
                              <Icon name="ios-call" />
                              {members.Pet.User.phone}
                          </Button>
                          	*/
                          }

                          <Button rounded primary onPress={() => {this.callMobile(members.Pet.User.phone)}}>
                              <Icon name="ios-call" />
                              {members.Pet.User.phone}
                          </Button>

                          
                      </CardItem>
                 </Card>
                )
              })
             : null
          }

         <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                  this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
              }}
              >
              <Card style={{paddingTop: 20}}>
                  <CardItem cardBody>
                      <Image source={require('../../../images/thumbnail.jpg')}  />
                      <Text>
                      List must contain one or more list elements.
                      Props Provideside configurability for several features.
                      Provides a number of attributes that follows styling and interaction guidelines for each platform,
                      so that they are intuitive for users to interact with
                      </Text>

                      <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
                        this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
                         }}>
                          Go Back
                      </Button>
                  </CardItem>
              </Card>
          </Modal>

        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {

    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUser: name => dispatch(setUser(name)),
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  data: '1212',
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);
