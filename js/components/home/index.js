
import React, { Component } from 'react';
import { TouchableOpacity, Image, Modal } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, H1, H2, H3, H4, Card, CardItem, Text, Button, Icon, InputGroup, Input, Thumbnail, List, ListItem, Spinner } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { openDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const {
  reset,
  pushRoute,
} = actions;

class Home extends Component {

  static propTypes = {
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
          is_search: false
      };

      this.search = this.search.bind(this);
  }

  componentDidMount() {
      let _this = this;
      _this.setState({
        is_loading_data: true
      });

      fetch('http://210.211.118.178/PetsAPI/api/articles/'+_this.state.categoryType, {
        method: 'GET'
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
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  search() {
      // Set loading to true when the search starts to display a Spinner
      this.setState({
          loading: true,
          is_loading_data: true
      });
      this.pushRoute('search', 3);
      var that = this;
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
        {

          this.state.is_search ?
            (
              <Header searchBar rounded>
                  <InputGroup>
                      <Icon name="ios-search" />
                      <Input placeholder="Search..." value={this.state.search}  onChangeText={(text) => this.setState({search:text})} onSubmitEditing={()=>this.search()}/>
                      <Button transparent onPress={()=> this.setState({is_search: false})}>Close</Button>
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

          <Title>{(this.props.name) ? this.props.name : 'Home'}</Title>

          <Button transparent onPress={() => this.setState({is_search: true})}>
            <Icon name="ios-search" />
          </Button>
        </Header>

        <Content padder>
          {
            this.state.data ?
              this.state.data.map((members, index) => {
                return (
                  <Card key={members.id} style={{ flex: 0, marginBottom: 10}}>
                      <CardItem>
                          <Thumbnail source={require('../../../images/avatar.png')} />
                          <Text onPress={() => this.pushRoute('detail', 2)}>{members.title}</Text>
                          <Text note>Phạm Ngọc Linh</Text>
                      </CardItem>

                      <CardItem onPress={() => this.pushRoute('detail', 2)}>
                          <Image style={{ resizeMode: 'cover', width: null}} source={{uri: members.Pet.Image.thumbnail}} />
                      </CardItem>

                      <CardItem>
                          <Text>
                              {members.content}
                          </Text>
                          <Text>Ngày đăng: {members.createdOn}</Text>
                      </CardItem>

                      <CardItem style={{flex: 0, flexDirection: 'row'}}>
                          <Button transparent>
                              <Icon name="ios-eye-outline" />
                              <Text>Lượt xem: {members.view} </Text>
                          </Button>
                          <Button transparent>
                              <Icon name="ios-heart" />
                              Chó / Mèo / ...
                          </Button>
                          <Button onPress={() => {this.setModalVisible(true)}}>
                              <Icon name="ios-share" />
                              CALL NOW
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
                      Props provide configurability for several features.
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
