
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, Thumbnail, Fab, Spinner } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

import GLOBAL from '../../storage/global';

const {
  popRoute,
} = actions;

const apiLink = 'http://210.211.118.178/PetsAPI/';
const petAlbum = 'http://210.211.118.178/PetsAPI/Images/PetThumbnails/';
const userAlbum = 'http://210.211.118.178/PetsAPI/Images/UserThumbnails/';

var authToken = '';
var detail_id = '';

class Detail extends Component {

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

  constructor(props) {
      super(props)
      this.state = {
          active: 'true',
          is_loading_data : 'true',
          authToken: '',
          detailId: '',
          data : null,
          is_search: false
      };
  }

  componentDidMount() {
    let _this = this;
    _this._authenticate();
    _this._getArticleId();
  }

  componentWillMount() {
    let _this = this;
    // _this._getArticleId();

    _this.setState({
      is_loading_data: false
    });
  }

  _authenticate() {
    let _this = this;

    AsyncStorage.getItem('AUTH_TOKEN').then((value) => {
      authToken = value;
    }, (error) => {
      alert("Bạn cần có quyền truy cập vào trang này");
    }).catch((error) => {
      alert("Bạn cần có quyền truy cập vào trang này");
    });
  }

  _getArticleId() {
    let _this = this;

    AsyncStorage.getItem('VIEW_ARTICLE_ID').then((value) => {
      detail_id = value;

      _this.setState({
        detailId : value
      });

      console.log("==== Get Article detail by Id: ", value);

      _this._getArticleOne();

    }, (error) => {
      alert("Không tìm thấy bài viết. Vui lòng thử lại");
    }).catch((error) => {
      alert("Không tìm thấy bài viết. Vui lòng thử lại");
    });
  }

  _getArticleOne() {
    let _this = this;

    _this.setState({
      is_loading_data: true
    });

    console.log("=====================" + authToken);

    fetch('http://210.211.118.178/PetsAPI/api/articles/'+detail_id+'/detail', {
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

        console.log("responseJson: ", responseJson);
    })
    .catch((error) => {
        _this.setState({
            loading: false
        });
        console.error(error);
    });
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

          <Title>{(name) ? this.props.name : 'Chi tiết bài viết'}</Title>

          <Button transparent onPress={() => this.setState({is_search: true})}>
              <Icon name="ios-search" />
          </Button>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
          {this.state.is_loading_data ? <Spinner color='blue' visible={this.state.is_loading_data} /> : null}
          
          {
            this.state.data ? (
              <Card style={{ flex: 0, marginTop: 10, borderWidth: .5, borderColor: '#FFFAFA' }}>
                  <CardItem style={{backgroundColor: '#FFFFFA', borderBottomWidth: 0}}>
                      {
                        /*this.state.data.Pet.User.avatarThumbnail ? <Thumbnail source={{uri : userAlbum + this.state.data.Pet.User.avatarThumbnail}} /> : null*/
                      }
                      <Text style={{fontSize: 17}}>{this.state.data.title}</Text>
                      {
                        /*<Text note>{this.state.data.Pet.User.firstName ? 'Linh' : 'Linh'} {this.state.data.Pet.User.lastName ? 'Linh' : 'Linh'}</Text>*/
                      }
                  </CardItem>

                  <CardItem>                        
                      {
                        <Image style={{ resizeMode: 'cover', width: null }} source={{uri : petAlbum + this.state.data.Pet.Image.thumbnail}} />
                      }
                  </CardItem>
                  <CardItem style={{flex: 0, flexDirection: 'row'}}>
                      <Button transparent>
                          <Icon name="ios-thumbs-up-outline" />
                          1,926
                      </Button>
                      <Button transparent>
                          <Icon name="md-heart-outline" />
                          521
                      </Button>
                      <Button transparent>
                          <Icon name="ios-pricetags-outline" />
                          Chó
                      </Button>
                      <Button>
                          <Icon name="ios-phone-portrait-outline" />
                          GỌI NGAY
                      </Button>

                      {
                        /*
                        <Button onPress={() => {this.callMobile(members.Pet.User.phone)}}>
                            <Icon name="ios-phone-portrait-outline" />
                            GỌI NGAY
                        </Button>
                        */
                      }
                  </CardItem>

                  <CardItem style={{backgroundColor: '#fdfdfd', borderBottomWidth: 0}}>
                      <Text style={{color: '#384850'}}>{this.state.data.content}</Text>
                  </CardItem>
             </Card>
            ) : null
          }
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
  list: state.list.list
});


export default connect(mapStateToProps, bindAction)(Detail);
