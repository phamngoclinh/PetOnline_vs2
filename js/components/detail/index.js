
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, Thumbnail, Fab } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
} = actions;

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
          active: 'true'
      };
  }

  componentDidMount() {

    console.log(this.props);
  }

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{(name) ? this.props.name : 'Detail'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
          <Text>Data: {this.props.data}</Text>
          <Card style={{ flex: 0, marginTop: 10 }}>
              <CardItem>
                  <Thumbnail source={require('../../../images/avatar.png')} />
                  <Text onPress={() => this.pushRoute('detail', 2)}>Bán gấp 3 em Pull Dog tại Quận 1, TP. Hồ Chí Minh</Text>
                  <Text note>Phạm Ngọc Linh</Text>
              </CardItem>

              <CardItem onPress={() => this.pushRoute('detail', 2)}>                        
                  <Image style={{ resizeMode: 'cover', width: null }} source={require('../../../images/pet-1.jpeg')} /> 
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
                      Chó / Mèo / ...
                  </Button>
                  <Button>
                      <Icon name="ios-phone-portrait-outline" />
                      CALL NOW
                  </Button>
              </CardItem>

              <CardItem>
                  <Text>
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất.
                      Page được lập không vì mục đích lợi nhuận.
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất.
                      Page được lập không vì mục đích lợi nhuận.
                  </Text>
                  <Text>
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất.
                      Page được lập không vì mục đích lợi nhuận.
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất.
                      Page được lập không vì mục đích lợi nhuận.
                  </Text>
                  <Text>
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất.
                      Page được lập không vì mục đích lợi nhuận.
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất.
                      Page được lập không vì mục đích lợi nhuận.
                  </Text>
                  <Text>
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất.
                      Page được lập không vì mục đích lợi nhuận.
                      CHỢ THÚ CƯNG Online là nơi giúp các bạn yêu Thú Cưng có thể tìm được các bé thú đánh yêu nhất.
                      Page được lập không vì mục đích lợi nhuận.
                  </Text>
              </CardItem>

              <CardItem style={{flex: 0, flexDirection: 'row'}}>
                  <Button transparent style={{ alignSelf: 'center'}}>
                      VIEW MORE
                  </Button>
              </CardItem>
         </Card>
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
