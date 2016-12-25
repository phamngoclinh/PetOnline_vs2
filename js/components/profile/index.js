
import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, H1, H3, Text, Button, Radio, Tabs, Icon, Thumbnail, List, ListItem, InputGroup, Input, Card, CardItem, Grid, Col } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
} = actions;

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


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

  constructor(props) {
      super(props);
      this.state = {
          active: 'true',
          avatarSource: null,
          avatarSourceBase64: '',
          coverSource: null,
          coverSourceBase64: '',
          is_search: false
      };
  }

  loadImageFromDevice() {
    /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info below in README)
   */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {

        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.setState({
          avatarSourceBase64: response.data
        });
        // const source = {uri: response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        });

        console.log("Source: ", source);
      }
    });
  }

  loadImageFromDeviceForCover() {
    /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info below in README)
   */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {

        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.setState({
          coverSourceBase64: response.data
        });
        // const source = {uri: response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          coverSource: source
        });

        console.log("Source: ", source);
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

          <Title>{(name) ? this.props.name : 'Thông tin cá nhân'}</Title>

          <Button transparent onPress={() => this.setState({is_search: true})}>
              <Icon name="ios-search" />
          </Button>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content style={{flex: 0, flexDirection: 'row', height: ScreenHeight - 80}}>
          
          <View style={styles.top}>
            {
            	this.state.coverSource ? (
            		<Image 
            			style={{width: ScreenWidth, minHeight: 150}}
              			source={this.state.coverSource}>

              			<ListItem style={{borderBottomWidth: 0, padding: 30}}>
			                {
			                	this.state.avatarSource ? (
			                		<Thumbnail source={this.state.avatarSource} style={{width: 100, height: 100, borderRadius: 100, marginLeft: 10}}/>
			                	) : (
			                		<Thumbnail source={require('../../../images/avatar.png')} style={{width: 100, height: 100, borderRadius: 100, marginLeft: 10}}/>
			                	)
			                }
			                <Text style={{height: 40}}><H1>PHẠM NGỌC LINH</H1></Text>
			                <Text note numberOfLines={5} style={{height: 40}}><H3 style={{color: '#05a5d1'}}>Email: pnlinh93@gmail.com</H3></Text>
			                <Button transparent style={{
			                	position: 'absolute',
			                	right: 0,
			                	top: 20,
			                	height: 40
			                }} >
		                        <Icon name='ios-settings-outline' style={{color: '#333333', fontSize: 30}}/>
		                    </Button>
			            </ListItem>

              		</Image>

              	): (
              		<Image resizeMode={Image.resizeMode.cover}
		              source={require('../../../images/thumbnail.jpg')}>
		              	<ListItem style={{borderBottomWidth: 0, padding: 30}}>
			                {
			                	this.state.avatarSource ? (
			                		<Thumbnail source={this.state.avatarSource} style={{width: 100, height: 100, borderRadius: 100, marginLeft: 10}}/>
			                	) : (
			                		<Thumbnail source={require('../../../images/avatar.png')} style={{width: 100, height: 100, borderRadius: 100, marginLeft: 10}}/>
			                	)
			                }
			                <Text style={{height: 40}}><H1>PHẠM NGỌC LINH</H1></Text>
			                <Text note numberOfLines={5} style={{height: 40}}><H3 style={{color: '#05a5d1'}}>Email: pnlinh93@gmail.com</H3></Text>
			                <Button transparent style={{
			                	position: 'absolute',
			                	right: 0,
			                	top: 20,
			                	height: 40
			                }} >
		                        <Icon name='ios-settings-outline' style={{color: '#333333', fontSize: 30}}/>
		                    </Button>
			            </ListItem>
		            </Image>
              	)
            }

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
                              {
                                /*
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
                                */
                              }
                              <ListItem button onPress={() => this.loadImageFromDevice()}>
                                <Radio selected={false} />
                                  <Text>Thay đổi ảnh đại diện (Avatar)</Text>
                              </ListItem>
                              <ListItem button onPress={() => this.loadImageFromDeviceForCover()}>
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
