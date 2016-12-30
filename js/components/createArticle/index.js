
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

// LocalStorage
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



class CreateArticle extends Component {

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
          articleTitle: '',
          articleDescription: '',
          articleContent: '',
          articleBasePrice: 100000,
          is_loading: false,
          authenticateToken: '',
          createArticleMessage: '',
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

  createArticle() {
    let _this = this;

    if(
      this.state.avatarSourceBase64 == '' ||
      this.state.avatarSourceBase64 == null ||  
      this.state.petName == '' || 
      this.state.petDate == '' || 
      this.state.petPrice == ''
    ) {
      _this.setState({
        createArticleMessage: 'Vui lòng nhập đầy đủ thông tin'
      });
    } else {
      _this.setState({
        is_loading: true
      });
      // ...
      fetch('http://210.211.118.178/PetsAPI/api/articles', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token': authToken
        },
        body: JSON.stringify({
          "title": this.state.articleTitle,
          "description": this.state.articleDescription,
          "content": this.state.articleContent,
          "price": this.state.articleBasePrice,
          "petId": FROM_PET_ID
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
              is_loading: false
            });

            Alert.alert(
              "Tạo pet thành công",
              "Yeah yeah tạo thành công rồi! Bây giờ chuyển sang trang chủ xem pài post của mình nào. OK?",
              [
                {text: 'OK', onPress: () => _this.popRoute(), style: 'ok'}
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

    AsyncStorage.getItem('PET_ID').then((value) => {
      FROM_PET_ID = value;

      console.log("FROM_PET_ID: ", value);
    })

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

          <Title>{(name) ? this.props.name : 'Tạo bài viết'}</Title>

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
                <Input placeholder="Tiêu đề" 
                onChangeText={articleTitle => this.setState({ articleTitle })} />
            </InputGroup>

            <InputGroup iconRight style={styles.myInput}>
                <Icon name='ios-swap' style={{color:'#00C497'}}/>
                <Input placeholder="Mô tả"
                  onChangeText={articleDescription => this.setState({ articleDescription })} />
            </InputGroup>

            <InputGroup iconRight style={styles.myInput}>
                <Icon name='ios-swap' style={{color:'#00C497'}}/>
                <Input placeholder="Nội dung chính"
                  onChangeText={articleContent => this.setState({ articleContent })} />
            </InputGroup>

            <InputGroup iconRight style={styles.myInput}>
                <Icon name='ios-swap' style={{color:'#00C497'}}/>
                <Input placeholder="Giá"
                  onChangeText={articleBasePrice => this.setState({ articleBasePrice })} />
            </InputGroup>

            {this.state.createArticleMessage ? <Text style={{ color: template.danger, alignSelf: 'center', marginTop: 15 }}>{this.state.createArticleMessage}</Text> : null}
            {this.state.is_loading ? <Spinner color='blue' visible={this.state.is_loading} /> : null}

            <Button large style={styles.createArticle} onPress={() => this.createArticle()}>TẠO BÀI VIẾT</Button>
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


export default connect(mapStateToProps, bindAction)(CreateArticle);
