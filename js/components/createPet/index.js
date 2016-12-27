
import React, { Component } from 'react';
import { MapView, Image, TextInput, UselessTextInput, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon, Fab, View, Thumbnail, InputGroup, Input, Spinner } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import template from '../../themes/style-template';
import { setIndex } from '../../actions/list';
import styles from './styles';

const {
  popRoute,
  pushRoute,
} = actions;

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
var AUTH_TOKEN = '';
var authToken = '';

var FROM_PET_ID = '';


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



class CreatePet extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
      super(props);
      this.state = {
          active: 'true',
          avatarSource: null,
          avatarSourceBase64: '',
          petName: '',
          petDate: '',
          petPrice: 100000,
          petOther: '',
          is_loading: false,
          authenticateToken: '',
          createPetMessage: '',
          is_search: false,
          search: ''
      };
  }

  componentDidMount() {
    let _this = this;

    _this._loadInitialState();
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
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

  createPet() {
    let _this = this;

    if(
      this.state.avatarSourceBase64 == '' ||  
      this.state.petName == '' || 
      this.state.petDate == '' || 
      this.state.petPrice == ''
    ) {
      _this.setState({
        createPetMessage: 'Vui lòng điền đầy đủ thông tin'
      });
    } else {
      _this.setState({
        is_loading: true
      });
      // ...
      fetch('http://210.211.118.178/PetsAPI/api/pets', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
           'Auth-Token': authToken
        },
        body: JSON.stringify({
          "name": this.state.petName,
          "birthDate": this.state.petDate,
          "price": this.state.petPrice,
          "userAuthInfoId": 1,
          "thumbNailInBase64": this.state.avatarSourceBase64
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
              authToken : responseJson.authToken,
              is_loading: false
            });

            Alert.alert(
              "Tạo pet thành công",
              "Yeah yeah tạo thành công rồi! Bây giờ chuyển sang trang tạo Post. OK?",
              [
                {text: 'OK', onPress: () => _this.pushRoute('createArticle', 3), style: 'ok'}
              ]
            );
          }
      })
      .catch((error) => {
          _this.setState({
              is_loading: false
          });
          Alert.alert(
            "Lỗi",
            "Lỗi phát sinh trong quá trình đăng ký. Vui lòng thử lại!",
            [
              {text: 'Tìm hiểu thêm', onPress: () => console.log('Tìm hiểu thêm pressed')},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
          );
          console.error(error);
      });

    }
  }

  _loadInitialState () {
    AsyncStorage.getItem('AUTH_TOKEN').then( (value) => {
      authToken = value;
    });

    // try {
    //   authToken = await AsyncStorage.getItem(AUTH_TOKEN);
    //   // alert(authToken);
    //   if (authToken !== null){
    //     // this.replaceRoute('home');
    //     this.setState({
    //       authenticateToken : authToken
    //     });
    //   } else {
    //     try {
    //       //
    //     } catch (error) {
    //       //
    //     }
    //   }
    // } catch (error) {
    //   //
    // }
  };

  search() {
      // Set loading to true when the search starts to display a Spinner
      AsyncStorage.setItem('SEARCH_TEXT', this.state.search);

      this.pushRoute('search', 3);
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

          <Title>{(name) ? this.props.name : 'Tạo thú cưng'}</Title>

          <Button transparent onPress={() => this.setState({is_search: true})}>
              <Icon name="ios-search" />
          </Button>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder style={styles.wrapper}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.imageUploaded}
              source={this.state.avatarSource} />

            <Button bordered style={styles.buttonUpload} onPress={() => this.loadImageFromDevice()}>
              {this.state.avatarSource ? 'Thay đổi hình ảnh' : 'Chọn ảnh tải lên'}
            </Button>

          </View>

          <View>
            <InputGroup iconRight style={styles.myInput}>
                <Icon name='ios-swap' style={{color:'#00C497'}}/>
                <Input placeholder="Tên thú cưng" 
                onChangeText={petName => this.setState({ petName })} />
            </InputGroup>

            <InputGroup iconRight style={styles.myInput}>
                <Icon name='ios-swap' style={{color:'#00C497'}}/>
                <Input placeholder="Ngày sinh"
                  onChangeText={petDate => this.setState({ petDate })} />
            </InputGroup>

            <InputGroup iconRight style={styles.myInput}>
                <Icon name='ios-swap' style={{color:'#00C497'}}/>
                <Input placeholder="Giá"
                  onChangeText={petPrice => this.setState({ petPrice })} />
            </InputGroup>

            <InputGroup iconRight style={styles.myInput}>
                <Icon name='ios-swap' style={{color:'#00C497'}}/>
                <Input placeholder="Thông tin khác"
                  onChangeText={petOther => this.setState({ petOther })} />
            </InputGroup>

            {this.state.createPetMessage ? <Text style={{ color: template.danger, alignSelf: 'center', marginTop: 15 }}>{this.state.createPetMessage}</Text> : null}
            {this.state.is_loading ? <Spinner color='blue' visible={this.state.is_loading} /> : null}

            <Button large style={styles.createPet} onPress={() => this.createPet()}>TẠO THÚ CƯNG</Button>
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
    setIndex: index => dispatch(setIndex(index)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(CreatePet);
