
import React, { Component } from 'react';
import { TouchableOpacity, Linking, Image, Modal, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Thumbnail, Spinner, InputGroup, Input } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
  replaceAt,
} = actions;

var searchText = 'pet';
var authToken = '';

const apiLink = 'http://210.211.118.178/PetsAPI/';
const petAlbum = 'http://210.211.118.178/PetsAPI/Images/PetThumbnails/';
const userAlbum = 'http://210.211.118.178/PetsAPI/Images/UserThumbnails/';

class Search extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
      super(props);
      this.state = {
        is_searching: true,
        loading: true,
        results: {},
        messageError: '',
        searchText: ''
      };

      // this.search = this.search.bind(this);
  }

  componentDidMount() {
    let _this = this;

    AsyncStorage.getItem('SEARCH_TEXT').then((value) => {
      searchText = value;
    });

    AsyncStorage.getItem('AUTH_TOKEN').then( (value) => {
      authToken = value;

      fetch('http://210.211.118.178/PetsAPI/api/articles/search/'+searchText, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': value
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
          _this.setState({
            results: responseJson,
            loading: false,
          });

          console.log("Research: ", responseJson);
      })
      .catch((error) => {
          _this.setState({
            loading: false,
            messageError: "Không tìm thấy kết quả phù hợp nào. Vui lòng thử lại từ khóa khác"
          });
          // console.log(error);
      });
    });
    

    // return fetch('https://api.github.com/search/repositories?q='+this.state.search, {
    //   method: 'get'
    // })
    // .then((response) => response.json())
    // .then((responseJson) => {
    //     // Store the results in the state variable results and set loading to
    //     _this.setState({
    //       results: responseJson,
    //       is_searching: false
    //     });
    // })
    // .catch((error) => {
    //     _this.setState({
    //       loading: false
    //   });
    //     console.error(error);
    // });
  }

  replaceRoute(route) {
    // this.setUser(this.state.name);
    this.props.replaceAt('search', { key: route }, this.props.navigation.key);
  }

  viewDetail(id) {
    let _this = this;
    _this._saveDetailId(id);
    AsyncStorage.getItem('VIEW_ARTICLE_ID').then( (value) => {
      fetch('http://210.211.118.178/PetsAPI/api/articles/'+value+'/updateview', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Auth-Token': authToken
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // Store the results in the state variable results and set loading to
            // _this.setState({
            //   data: responseJson,
            //   is_loading_data: false
            // });
          console.log('PUT success');

          // this.pushRoute('detail', 2);
          _this.replaceRoute('detail');
        })
        .catch((error) => {
           //  _this.setState({
           //    loading: false
            // });
            console.error(error);
        });
    });
  }

  _saveDetailId(id) {
    try {
      AsyncStorage.setItem('VIEW_ARTICLE_ID', id.toString());
    } catch (error) {
      console.log(error);
    }
  };

  search() {
      var _this = this;

      searchText = this.state.searchText;

      _this.setState({
        loading: true,
        results: {}
      });
      // Set loading to true when the search starts to display a Spinner
      AsyncStorage.setItem('SEARCH_TEXT', this.state.searchText);

      fetch('http://210.211.118.178/PetsAPI/api/articles/search/'+this.state.searchText, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': authToken
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
          _this.setState({
            results: responseJson,
            loading: false,
          });

          console.log("Research: ", responseJson);
      })
      .catch((error) => {
          _this.setState({
            loading: false,
            messageError: "Không tìm thấy kết quả phù hợp nào. Vui lòng thử lại từ khóa khác"
          });
          // console.log(error);
      });
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
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
                      <Input placeholder="Tìm kiếm thú cưng..." value={this.state.searchText}  onChangeText={(text) => this.setState({searchText:text})} onSubmitEditing={()=>this.search()}/>
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

          <Title>{(name) ? this.props.name : 'Tìm kiếm'}</Title>

          <Button transparent onPress={() => this.setState({is_search: true})}>
              <Icon name="ios-search" />
          </Button>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
            {this.state.messageError ? <Text>{this.state.messageError}</Text> : <Text>Kết quả tìm kiếm: {this.state.results.length} bài viết cho từ khóa {searchText}</Text>}
            {this.state.loading ? <Spinner color='blue' visible={this.state.loading} /> : null}

           <List style={{paddingLeft: 0, marginLeft: 0}} dataArray={this.state.results} renderRow={(item) =>
                <ListItem style={{paddingLeft: 0, marginLeft: 0}} button onPress={() => this.viewDetail(item.id)}>
                    <Thumbnail square size={80} source={{uri: petAlbum + item.Pet.Image.thumbnail}}/>
                    <Text style={{fontWeight: '600', color: '#007594'}}>{item.title}</Text>
                    <Text numberOfLines={3} style={{color:'#2a2f3a'}}>{item.description}</Text>
                    <Text note>Giá: <Text note style={{marginTop: 5}}>{item.price}</Text></Text>
                </ListItem>
            } />
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(Search);
