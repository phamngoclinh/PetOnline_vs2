
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Thumbnail, Spinner } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
} = actions;

class Search extends Component {

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
        is_searching: true,
        results: {}
      };

      // this.search = this.search.bind(this);
  }

  componentDidMount() {
    let _this = this;
    return fetch('https://api.github.com/search/repositories?q='+this.state.search, {
      method: 'get'
    })
    .then((response) => response.json())
    .then((responseJson) => {
        // Store the results in the state variable results and set loading to
        _this.setState({
          results: responseJson,
          is_searching: false
        });
    })
    .catch((error) => {
        _this.setState({
          loading: false
      });
        console.error(error);
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

          <Title>{(name) ? this.props.name : 'Tìm kiếm'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
            {this.state.is_searching ? <Spinner color='blue' visible={this.state.is_searching} /> : null}

           <List style={{paddingLeft: 0, marginLeft: 0}} dataArray={this.state.results.items} renderRow={(item) =>
                <ListItem style={{paddingLeft: 0, marginLeft: 0}} button onPress={()=>this.setModalVisible(true, item)}>
                    <Thumbnail square size={80} source={{uri: item.owner.avatar_url}} />
                    <Text>Name: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{item.name}</Text></Text>
                    <Text style={{color:'#007594'}}>{item.full_name}</Text>
                    <Text note>Score: <Text note style={{marginTop: 5}}>{item.score}</Text></Text>
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
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(Search);
