
import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Card, CardItem, Text, Button, Icon, InputGroup, Input, Thumbnail, List, ListItem, Spinner } from 'native-base';
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

      var that = this;        
      return fetch('https://api.github.com/search/repositories?q='+this.state.search, {
        method: 'get'
      })            
      .then((response) => response.json())            
      .then((responseJson) => {      
          // Store the results in the state variable results and set loading to
          that.setState({
            results: responseJson,
            is_loading_data: false
          });
      }) 
      .catch((error) => {
          that.setState({                    
            loading: false
        });
          console.error(error);
      });    
  }

  goToDetail = () => {
    this.props.navigator.push({
      name: 'Detail',
      title: "Detail",
      index: 2,
      passProps: {
            data: "12441212",
        }
    });
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
                </InputGroup>                    
                <Button transparent onPress={()=>this.search()}>Go</Button>                
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

          {
            /*
            <Button transparent onPress={() => this.props.reset(this.props.navigation.key)}>
              <Icon name="ios-power" />
            </Button>
            */
          }
        </Header>

        <Content>
          {this.state.is_loading_data ? <Spinner color='blue' visible={this.state.is_loading_data} /> : null}

         <List dataArray={this.state.results.items} renderRow={(item) =>               
              <ListItem button onPress={()=>this.setModalVisible(true, item)}> 
                  <Thumbnail square size={80} source={{uri: item.owner.avatar_url}} />
                  <Text>Name: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{item.name}</Text></Text>
                  <Text style={{color:'#007594'}}>{item.full_name}</Text>    
                  <Text note>Score: <Text note style={{marginTop: 5}}>{item.score}</Text></Text>    
              </ListItem>                            
          } />

          <Card style={{ flex: 0 }}>
              <CardItem>
                  <Thumbnail source={require('../../../images/avatar.png')} />
                  <Text onPress = {this.goToDetail}>Kênh rao bán Pet số 1 Việt Nam</Text>
                  <Text note>Phạm Ngọc Linh</Text>
              </CardItem>

              <CardItem cardBody> 
                  <Image style={{ resizeMode: 'cover', width: null }} source={require('../../../images/thumbnail.jpg')} /> 
                  <Text>
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất. Page được lập không vì mục đích lợi nhuận.
                  </Text>
                  <Button transparent textStyle={{color: '#87838B'}}>
                      <Icon name="logo-github" />
                      <Text>636 likes</Text>
                  </Button>

                  <Button transparent textStyle={{color: '#87838B'}}>
                      <Icon name="logo-github" />
                      <Text>742 shares</Text>
                  </Button>
              </CardItem>
         </Card>

         <Card style={{ flex: 0 }}>
              <CardItem>
                  <Thumbnail source={require('../../../images/avatar.png')} />
                  <Text onPress = {this.goToDetail}>Kênh rao bán Pet số 1 Việt Nam</Text>
                  <Text note>Phạm Ngọc Linh</Text>
              </CardItem>

              <CardItem cardBody> 
                  <Image style={{ resizeMode: 'cover', width: null }} source={require('../../../images/thumbnail.jpg')} /> 
                  <Text>
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất. Page được lập không vì mục đích lợi nhuận.
                  </Text>
                  <Button transparent textStyle={{color: '#87838B'}}>
                      <Icon name="logo-github" />
                      <Text>636 likes</Text>
                  </Button>

                  <Button transparent textStyle={{color: '#87838B'}}>
                      <Icon name="logo-github" />
                      <Text>742 shares</Text>
                  </Button>
              </CardItem>
         </Card>

         <Card style={{ flex: 0 }}>
              <CardItem>
                  <Thumbnail source={require('../../../images/avatar.png')} />
                  <Text onPress = {this.goToDetail}>Kênh rao bán Pet số 1 Việt Nam</Text>
                  <Text note>Phạm Ngọc Linh</Text>
              </CardItem>

              <CardItem cardBody> 
                  <Image style={{ resizeMode: 'cover', width: null }} source={require('../../../images/thumbnail.jpg')} /> 
                  <Text>
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất. Page được lập không vì mục đích lợi nhuận.
                  </Text>
                  <Button transparent textStyle={{color: '#87838B'}}>
                      <Icon name="logo-github" />
                      <Text>636 likes</Text>
                  </Button>

                  <Button transparent textStyle={{color: '#87838B'}}>
                      <Icon name="logo-github" />
                      <Text>742 shares</Text>
                  </Button>
              </CardItem>
         </Card>

         <Card style={{ flex: 0 }}>
              <CardItem>
                  <Thumbnail source={require('../../../images/avatar.png')} />
                  <Text onPress = {this.goToDetail}>Kênh rao bán Pet số 1 Việt Nam</Text>
                  <Text note>Phạm Ngọc Linh</Text>
              </CardItem>

              <CardItem cardBody> 
                  <Image style={{ resizeMode: 'cover', width: null }} source={require('../../../images/thumbnail.jpg')} /> 
                  <Text>
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất. Page được lập không vì mục đích lợi nhuận.
                  </Text>
                  <Button transparent textStyle={{color: '#87838B'}}>
                      <Icon name="logo-github" />
                      <Text>636 likes</Text>
                  </Button>

                  <Button transparent textStyle={{color: '#87838B'}}>
                      <Icon name="logo-github" />
                      <Text>742 shares</Text>
                  </Button>
              </CardItem>
         </Card>


          <Button onPress = {() => this.props.reset(this.props.navigation.key)}>Logout</Button>
          <Grid style={styles.mt}>
            {this.props.list.map((item, i) =>
              <Row key={i}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => this.pushRoute('blankPage', i)}
                >
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              </Row>
            )}
          </Grid>
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
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);
