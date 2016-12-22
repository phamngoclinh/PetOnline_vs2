
import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Radio, Tabs, Icon, Thumbnail, List, ListItem, InputGroup, Input, Card, CardItem, Grid, Col } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
} = actions;

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

class Profile extends Component {

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

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{(name) ? this.props.name : 'Profile'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content style={{flex: 0, flexDirection: 'row', height: ScreenHeight - 80}}>
          
          <View style={styles.top}>
            <Image resizeMode={Image.resizeMode.contain} source={require('../../../images/avatar.png')}>
              <Text style={{color: '#ffffff'}}>Phạm Ngọc Linh</Text>
              <Text note style={{color: '#ffffff'}}>Email: pnlinh93@gmail.com</Text>
            </Image>
            {
              /*<Thumbnail size={100} source={require('../../../images/avatar.png')} />*/
            }
            
          </View>
          <View style={{backgroundColor: '#ffffff', alignItems: 'center', padding: 10, flex: 5}}>
            <ScrollView style={{width: ScreenWidth - 20, padding: 10}}>
               <Tabs style={{width: ScreenWidth - 40}}>
                    <Content tabLabel='Thông tin cá nhân' style={{paddingTop: 10}}>
                      <Card style={{width: ScreenWidth - 40}}>
                          <CardItem header>                        
                              <Text>Thông tin cá nhân</Text>
                          </CardItem>

                          <CardItem>                    
                              <List>
                                <ListItem>
                                    <InputGroup>
                                        <Input inlineLabel label="Họ tên" placeholder="Phạm Ngọc Linh" />
                                    </InputGroup>
                                </ListItem>
                                <ListItem>
                                    <InputGroup>
                                        <Input inlineLabel label="Địa chỉ email" placeholder="pnlinh93@gmail.com" />
                                    </InputGroup>
                                </ListItem>
                                <ListItem>
                                    <InputGroup>
                                        <Input inlineLabel label="Số điện thoại" placeholder="012356789" />
                                    </InputGroup>
                                </ListItem>
                                <ListItem>
                                    <InputGroup>
                                        <Input inlineLabel label="Mật khẩu" placeholder="*********" />
                                    </InputGroup>
                                </ListItem>
                                <ListItem>
                                    <InputGroup>
                                        <Input inlineLabel label="Đổi mật khẩu" placeholder="Nhập mật khẩu mới" />
                                    </InputGroup>
                                </ListItem>
                                <ListItem>
                                    <InputGroup >
                                        <Input stackedLabel label="Đại chỉ" placeholder="21 Nguyễn Trãi, Phường 15, Quận 5, TP. Hồ Chí Minh" />
                                    </InputGroup>
                                </ListItem>
                              </List>

                              <Button rounded bordered block style={{maxWidth: 200, alignSelf: 'center', width: 200, marginTop: 20, marginBottom: 20}}> Cập nhật </Button>
                          </CardItem>

                          <CardItem header>                        
                              <Text>Thay đổi hình ảnh</Text>
                          </CardItem>

                          <CardItem>                    
                              <List>
                                <ListItem button>
                                    <Thumbnail source={require('../../../images/avatar.png')} />
                                    <Text>Thay đổi ảnh đại diện (Avatar)</Text>
                                </ListItem>
                                        <ListItem button>
                                    <Thumbnail source={require('../../../images/avatar.png')} />
                                    <Text>Thay đổi ảnh bìa (Cover)</Text>
                                </ListItem>
                              </List>
                              <ListItem>
                                <Radio selected={false} />
                                  <Text>Thay đổi ảnh đại diện (Avatar)</Text>
                              </ListItem>
                              <ListItem>
                                  <Radio selected={true} />
                                  <Text>Thay đổi ảnh bìa (Cover)</Text>
                              </ListItem>

                              <Button rounded bordered block style={{maxWidth: 200, alignSelf: 'center', width: 200, marginTop: 20, marginBottom: 20}}> Cập nhật </Button>
                          </CardItem>
                     </Card>

                    </Content>
                    <Content tabLabel='Danh mục ưa thích' style={{paddingTop: 10}}>
                      <Grid style={{width: ScreenWidth - 40}}>
                          <Col style={{paddingRight: 5}}>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>Ưa thích 1</Button>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>Ưa thích 3</Button>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>Ưa thích 5</Button>
                          </Col>
                          <Col style={{paddingLeft: 5}}>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>Ưa thích 2</Button>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>Ưa thích 4</Button>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>Ưa thích 5</Button>
                          </Col>
                      </Grid>
                    </Content>
                </Tabs>
            </ScrollView>
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


export default connect(mapStateToProps, bindAction)(Profile);
