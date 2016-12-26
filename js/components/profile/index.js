
import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, H1, H3, Text, Button, Radio, Tabs, Icon, Thumbnail, List, ListItem, InputGroup, Input, Card, CardItem, Grid, Col } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import template from '../../themes/style-template';
import styles from './styles';

const {
  popRoute,
} = actions;

const apiLink = 'http://210.211.118.178/PetsAPI/';
const petAlbum = 'http://210.211.118.178/PetsAPI/Images/PetThumbnails/';
const userAlbum = 'http://210.211.118.178/PetsAPI/Images/UserThumbnails/';

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


var authToken = '';
var userId = '';
var avatarThumbnail = '';
var coverThumbnail = '';

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
          is_search: false,

          data : null,
          is_loading: false,
          changeImageMessage: '',
          user: '',
          username: '',
          email: '',
          phone: '',

          avatarThumbnail : '',
          coverThumbnail : '',
          coverOption: '',
          changeUsername: '',
          changeFirstName: '',
          changeLastName: '',
          changeEmail : '',
          changePhone : '',
          changeAddress: ''
      };
  }

  componentDidMount() {
    let _this = this;

    _this._loadInitialState();

    _this._getUserInformation();
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
          coverSource: source,
          coverOption: source
        });

        console.log("Source: ", source);
      }
    });
  }

  _loadInitialState () {
    AsyncStorage.getItem('AUTH_TOKEN').then( (value) => {
      authToken = value;
    });

    AsyncStorage.getItem('USER_ID').then((value) => {
      userId = value;
    });
  };

  _getUserInformation() {
    let _this = this;
    AsyncStorage.getItem('USER_ID').then((value) => {
      console.log("UserId in sidebar: ", value);
      // alert("UserId in sidebar: ", value);

      fetch('http://210.211.118.178/PetsAPI/api/userauthinfos/'+value, {
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
            user: responseJson,
            username: responseJson.firstName + " " + responseJson.lastName,
            email: responseJson.email,
            phone: responseJson.phone,
            is_loading_data: false,
            avatarThumbnail : responseJson.avatarThumbnail,
            coverThumbnail : responseJson.coverThumbnail,
            coverOption: {uri: userAlbum + responseJson.coverThumbnail}
          });

          

          avatarThumbnail = responseJson.avatarThumbnail;
          coverThumbnail = responseJson.coverThumbnail;

          if(avatarThumbnail == null || avatarThumbnail == '') {
            avatarThumbnail = '../../../images/avatar.png';
          }

          if(coverThumbnail == null || coverThumbnail == '') {
            coverThumbnail = '../../../images/thumbnail.jpg';
          }

          console.log("Get USER from server: ", responseJson);
      })
      .catch((error) => {
          _this.setState({
            loading: false
        });
          console.error(error);
      });
    });
  }

  _updateAvatar() {
    let _this = this;

    if(this.state.avatarSourceBase64 == '') {
      _this.setState({
        changeImageMessage: 'Vui lòng chọn hình ảnh tải lên'
      });
    } else {
      _this.setState({
        is_loading: true
      });
      // ...
      fetch('http://210.211.118.178/PetsAPI/api/userauthinfos/'+userId+'/updateavatar', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': authToken
        },
        body: JSON.stringify({
          "avatarThumbNailInBase64": this.state.avatarSourceBase64
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          // Store the results in the state variable results and set loading to
          console.log(responseJson);

          if(responseJson.errorCode) {
            console.log("Code: "+ responseJson.errorMsg);
            _this.setState({
              is_loading: false
            });
            Alert.alert(
              "Thông báo",
              responseJson.errorMsg,
              [
                {text: 'Quay lại', onPress: () => console.log('Quay lại pressed'), style: 'cancel'}
              ]
            );            
          } else {
            _this.setState({
              data: responseJson,
              is_loading: false,
              changeImageMessage: "Cập nhật avatar thành công"
            });
          }
      })
      .catch((error) => {
          _this.setState({
              is_loading: false
          });
          Alert.alert(
            "Lỗi",
            "Lỗi phát sinh trong quá trình truyền tải. Vui lòng thử lại!",
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          );
          console.log(error);
      });

    }
  }

  _updateCover() {
    let _this = this;

    if(this.state.coverSourceBase64 == '') {
      _this.setState({
        changeImageMessage: 'Vui lòng chọn hình ảnh tải lên'
      });
    } else {
      _this.setState({
        is_loading: true
      });
      // ...
      fetch('http://210.211.118.178/PetsAPI/api/userauthinfos/'+userId+'/updatecover', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': authToken
        },
        body: JSON.stringify({
          "coverThumbNailInBase64": this.state.coverSourceBase64
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          // Store the results in the state variable results and set loading to
          console.log(responseJson);

          if(responseJson.errorCode) {
            console.log("Code: "+ responseJson.errorMsg);
            _this.setState({
              is_loading: false
            });
            Alert.alert(
              "Thông báo",
              responseJson.errorMsg,
              [
                {text: 'Quay lại', onPress: () => console.log('Quay lại pressed'), style: 'cancel'}
              ]
            );            
          } else {
            _this.setState({
              data: responseJson,
              is_loading: false,
              changeImageMessage: "Cập nhật ảnh bìa thành công"
            });
          }
      })
      .catch((error) => {
          _this.setState({
              is_loading: false
          });
          Alert.alert(
            "Lỗi",
            "Lỗi phát sinh trong quá trình truyền tải. Vui lòng thử lại!",
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          );
          console.log(error);
      });

    }
  }

  _updatePicture() {
    if(this.state.avatarSourceBase64 != '' && this.state.coverSourceBase64 != '') {
      this._updateAvatar();
      this._updateCover();
    } else if(this.state.avatarSourceBase64 != '') {
      this._updateAvatar();
    } else if(this.state.coverSourceBase64 != '') {
      this._updateCover();
    } else {
      this.setState({
        changeImageMessage: 'Vui lòng chọn ảnh cần thay đổi'
      });
    }
  }

  _updateUserInformation() {
    let _this = this;

    if(this.state.changeLastName == '') {
      _this.setState({
        changeUserInfoMessage: 'Vui lòng nhập thông tin trước khi gửi'
      });
    } else {
      _this.setState({
        is_loading: true
      });
      // ...
      fetch('http://210.211.118.178/PetsAPI/api/userauthinfos/'+userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': authToken
        },
        body: JSON.stringify({
          "email": this.state.changeEmail ? this.state.changeEmail : this.state.user.email,
          "phone": this.state.changePhone ? this.state.changePhone : this.state.user.phone,
          "nationality": this.state.changeAddress ? this.state.changeAddress : this.state.user.nationality,
          "firstName": this.state.changeFirstName ? this.state.changeFirstName : this.state.user.changeFirstName,
          "lastName" : this.state.changeLastName ? this.state.changeLastName : this.state.user.changeLastName
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          // Store the results in the state variable results and set loading to
          console.log(responseJson);

          if(responseJson.errorCode) {
            console.log("Code: "+ responseJson.errorMsg);
            _this.setState({
              is_loading: false,
              changeUserInfoMessage: responseJson.errorMsg
            });
            Alert.alert(
              "Thông báo",
              responseJson.errorMsg,
              [
                {text: 'Quay lại', onPress: () => console.log('Quay lại pressed'), style: 'cancel'}
              ]
            );            
          } else {
            _this.setState({
              data: responseJson,
              is_loading: false,
              changeUserInfoMessage: "Cập nhật thành công"
            });
          }
      })
      .catch((error) => {
          _this.setState({
              is_loading: false,
              changeUserInfoMessage: error
          });
          Alert.alert(
            "Lỗi",
            "Lỗi phát sinh trong quá trình truyền tải. Vui lòng thử lại!",
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          );
          console.log(error);
      });

    }
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
            	this.state.user ? (
                <Image 
            			style={{width: ScreenWidth, minHeight: 150}}
              		source={this.state.coverOption} >

              			<ListItem style={{borderBottomWidth: 0, padding: 30}}>
			                {
			                	this.state.avatarThumbnail ? (
			                		this.state.avatarSource ? (
                            <Thumbnail source={this.state.avatarSource} style={{width: 80, height: 80, maxWidth: 80, maxHeight: 80, borderRadius: 100, marginLeft: 10}}/>
                          ) : (
                            <Thumbnail source={{uri : userAlbum + this.state.avatarThumbnail}} style={{width: 80, height: 80, borderRadius: 100, marginLeft: 10}}/>
                          )
			                	) : (
			                		<Thumbnail source={require('../../../images/avatar.png')} style={{width: 80, height: 80, borderRadius: 100, marginLeft: 10}}/>
			                	)
			                }
			                <Text style={{height: 40}}><H1>{this.state.username}</H1></Text>
			                <Text note numberOfLines={5} style={{height: 40}}><H3 style={{color: '#05a5d1'}}>Email: {this.state.email}</H3></Text>
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
			                		<Thumbnail source={this.state.avatarSource} style={{width: 80, height: 80, maxWidth: 80, maxHeight: 80, borderRadius: 100, marginLeft: 10}}/>
			                	) : (
			                		<Thumbnail source={require('../../../images/avatar.png')} style={{width: 80, height: 80, maxWidth: 80, maxHeight: 80, borderRadius: 100, marginLeft: 10}}/>
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
            <ScrollView  style={{width: ScreenWidth - 20, padding: 10}}>
               <Tabs style={{width: ScreenWidth - 40}}>
                    <Content tabLabel='THÔNG TIN CÁ NHÂN' tabTextColor='#000000' style={{paddingTop: 10}}>
                      <Card style={{width: ScreenWidth - 40}}>
                          <CardItem header>                        
                              <Text>Thông tin cá nhân</Text>
                          </CardItem>

                          <CardItem>                    
                              <List>
                                <ListItem>
                                    <InputGroup>
                                        <Input inlineLabel label="Họ" onChangeText={changeLastName => this.setState({ changeLastName })} placeholder={this.state.user.lastName} />
                                    </InputGroup>
                                </ListItem>
                                <ListItem>
                                    <InputGroup>
                                        <Input inlineLabel label="Tên" onChangeText={changeFirstName => this.setState({ changeFirstName })} placeholder={this.state.user.firstName} />
                                    </InputGroup>
                                </ListItem>
                                <ListItem>
                                    <InputGroup>
                                        <Input inlineLabel label="Địa chỉ email" onChangeText={changeEmail => this.setState({ changeEmail })} placeholder={this.state.email} />
                                    </InputGroup>
                                </ListItem>
                                <ListItem>
                                    <InputGroup>
                                        <Input inlineLabel label="Số điện thoại" onChangeText={changePhone => this.setState({ changePhone })} placeholder={this.state.phone} />
                                    </InputGroup>
                                </ListItem>
                                
                                <ListItem>
                                    <InputGroup >
                                        <Input stackedLabel label="Đại chỉ" onChangeText={changeAddress => this.setState({ changeAddress })} placeholder={this.state.user.nationality ? this.state.user.nationality : 'Thông tin này chưa được cập nhật'} />
                                    </InputGroup>
                                </ListItem>
                              </List>

                              <View>
                                  {
                                    this.state.changeUserInfoMessage ? 
                                    <Text style={{ color: template.danger, alignSelf: 'center', marginTop: 10 }}>{this.state.changeUserInfoMessage}</Text>
                                     : null
                                  }
                              </View>

                              <Button onPress = {() => this._updateUserInformation()} rounded bordered block style={{maxWidth: 150, alignSelf: 'center', width: 150, marginTop: 20, marginBottom: 20}}> Cập nhật </Button>
                          </CardItem>

                          <CardItem header>                        
                              <Text>Đổi mật khẩu</Text>
                          </CardItem>

                          <CardItem> 
                              <List>
                                  <ListItem>
                                      <InputGroup>
                                          <Input inlineLabel label="Nhập mật khẩu cũ" placeholder="*********" />
                                      </InputGroup>
                                  </ListItem>
                                  <ListItem>
                                      <InputGroup>
                                          <Input inlineLabel label="Xác nhận OTP" placeholder="Nhận mã OTP" />
                                      </InputGroup>
                                  </ListItem>
                                  <ListItem>
                                      <InputGroup>
                                          <Input inlineLabel label="Đổi mật khẩu" placeholder="Nhập mật khẩu mới" />
                                      </InputGroup>
                                  </ListItem>
                              </List>
                              <List style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                  <ListItem style={{borderBottomWidth: 0}}>
                                    <Button rounded danger bordered block style={{maxWidth: 150, alignSelf: 'center', width: 150, marginTop: 20, marginBottom: 20}}> Lấy mã OTP </Button>
                                  </ListItem>
                                  <ListItem style={{borderBottomWidth: 0}}>
                                    <Button rounded bordered block style={{maxWidth: 150, alignSelf: 'center', width: 150, marginTop: 20, marginBottom: 20}}> Cập nhật </Button>
                                  </ListItem>
                              </List>
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
                              <ListItem iconRight button onPress={() => this.loadImageFromDevice()}>
                                  <Icon name="ios-image-outline" style={{ color: '#0A69FE' }} />
                                  <Text>Thay đổi ảnh đại diện (Avatar)</Text>
                              </ListItem>
                              <ListItem iconRight button onPress={() => this.loadImageFromDeviceForCover()}>
                                  <Icon name="ios-images-outline" style={{ color: '#0A69FE' }} />
                                  <Text>Thay đổi ảnh bìa (Cover)</Text>
                              </ListItem>
                              <View>
                                  {
                                    this.state.changeImageMessage ? 
                                    <Text style={{ color: template.danger, alignSelf: 'center', marginTop: 10 }}>{this.state.changeImageMessage}</Text>
                                     : null
                                  }
                              </View>
                              <Button 
                                onPress = {() => this._updatePicture()}
                                rounded bordered block 
                                style={{maxWidth: 150, alignSelf: 'center', width: 150, marginTop: 20, marginBottom: 20}}>
                                 Cập nhật 
                              </Button>
                          </CardItem>
                     </Card>

                    </Content>
                    <Content tabLabel='DANH MỤC CỦA TÔI' style={{paddingTop: 10}}>
                      <Grid style={{width: ScreenWidth - 40}}>
                          <Col style={{paddingRight: 5}}>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>PET CỦA TÔI</Button>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>BÀI VIẾT CỦA TÔI</Button>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>ĐANG THEO DÕI</Button>
                          </Col>
                          <Col style={{paddingLeft: 5}}>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>BÀI VIẾT GẦN ĐÂY</Button>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>BÀI VIẾT XEM NHIỀU</Button>
                            <Button block style={{ backgroundColor: '#D93735', height: 200, marginBottom: 10}}>LỊCH SỬ BÁN PET</Button>
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
