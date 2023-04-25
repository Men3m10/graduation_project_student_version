import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

import {images, COLORS, SIZES} from '../constants';
import NetInfo from '@react-native-community/netinfo';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Apidata from '../constants/constent';
var Api = Apidata.API;
//const userInfo = {National_id: '11111111111111', Password: '123456'};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      national_id: '',
      national_id_err: '',

      Id: '',
      pass: '',
      passerr: '',
      correct: true,
      i_pass: true,
      state: '',
      connection_Status: '',
      Connection: '',
      connBack: 0,
      showAlert: false,
      showAlert2: false,

      showAlert4: false,
      showAlert5: false,
      fMessage: '',
      welcomeMessage: '',
      welcomeMessagename: '',
    };
  }

  ///////////////////Net Info//////////////////////////////

  componentDidMount() {
    NetInfo.addEventListener(state => {
      if (state.isConnected == true) {
        this.setState({
          connection_Status: 'Online',
        });
        //this.Check_Validation();
        if (this.state.connBack == 1) {
          //alert('connection back');
          this.setState({showAlert2: true, connBack: 0});
        }
      } else {
        //this.hide_loading();
        this.setState({
          connection_Status: 'Offline',
          Connection: 'Close',
          connBack: 1,
          showAlert: true,
        });

        // alert('check your connection and try again');
      }
    });
  }

  /////////////////////////////////////////////////////////////////////

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  hideAlert2 = () => {
    this.setState({
      showAlert2: false,
    });
  };

  hideAlert4 = () => {
    this.setState({
      showAlert4: false,
    });
  };
  hideAlert5 = () => {
    this.setState({
      showAlert5: false,
    });
  };
  ////////////////////////////////////////////////
  async Check_Validation() {
    let errors = 0;
    if (this.state.national_id == '') {
      // alert('قم بإدخال رقمك القومى');
      this.setState({national_id_err: ' please Enter your national ID'});
      errors++;
    } else if (
      this.state.national_id.length < 14 ||
      this.state.national_id.length >= 15
    ) {
      this.setState({national_id_err: 'National ID must be 14 digit '});
      errors++;
    } else {
      this.setState({national_id_err: ''});
    }

    if (errors === 0) {
      this.Data_send();
    }
  }
  async isLoogged() {
    await AsyncStorage.setItem('isLoggedIn', '1');
    await AsyncStorage.setItem('Qr', this.state.Id);
    await AsyncStorage.setItem('generateQr', this.state.national_id);
  }

  async Data_send() {
    let data_to_send = {
      ssid_Hash: this.state.national_id,
    };
    this.setState({Connection: 'Open'});
    axios
      .post(Api + '/api/v1/student_info/studentLogin', data_to_send)
      .then(res => {
        if (res.status == 200) {
          this.setState({
            welcomeMessage: res.data.message,
            welcomeMessagename: res.data.name,
            Id: res.data.Id,
            showAlert5: true,
          });
          console.log(res.data.message);
          ToastAndroid.showWithGravityAndOffset(
            'Correct data',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          this.setState({correct: false, national_id_err: '', passerr: ''});
          this.isLoogged();
        }
      })
      .catch(err => {
        console.log(err.response.data.message);
        this.setState({
          showAlert4: true,
          fMessage: err.response.data.message,
        });
      });
    console.log(data_to_send);
  }

  render() {
    return (
      <>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          {/* ----------------Logo------------------- */}
          <Image source={images.Logo} style={styles.imagestyle} />
          {/* -------------------text----------------- */}
          <View style={{marginVertical: 25}}>
            <Text style={[styles.textstyle, {marginTop: '10%'}]}>
              Welcome to faculty of computers
            </Text>
            <Text style={styles.textstyle}> and informatics</Text>
          </View>
          {/* ---------------text input National id--------------- */}
          <View style={styles.inputstyle}>
            <Hoshi
              label={'National ID'}
              keyboardType={'numeric'}
              borderColor={'#9bcee3'}
              style={{
                width: '95%',
              }}
              borderHeight={3}
              labelStyle={{
                color: '#17A589 ',
              }}
              inputStyle={{
                color: '#17A589 ',
              }}
              maxLength={14}
              value={this.state.national_id}
              onChangeText={value => {
                this.setState({national_id: value});
              }}
            />
          </View>
          <Text style={styles.Text_error}>{this.state.national_id_err}</Text>
          {/* ---------------button----------------- */}
          <TouchableOpacity
            disabled={this.state.connection_Status == 'Online' ? false : true}
            onPress={() => {
              this.Check_Validation();
            }}>
            <LinearGradient
              colors={[COLORS.four, COLORS.third, COLORS.second]}
              style={styles.Button_Style}>
              {this.state.correct ? (
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Sign in</Text>
              ) : (
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Sign in</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View>
            <AwesomeAlert
              show={this.state.showAlert}
              showProgress={false}
              title="Connection failed"
              message="check your connection and try again"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              confirmButtonStyle={{width: 80, hight: 40, borderRadius: 10}}
              confirmButtonTextStyle={{fontSize: 18, textAlign: 'center'}}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor="#00BFA6"
              onConfirmPressed={() => {
                this.hideAlert();
              }}
            />
            <AwesomeAlert
              show={this.state.showAlert2}
              showProgress={false}
              title="Connected"
              message="Connected successfully"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              confirmButtonStyle={{width: 80, hight: 40, borderRadius: 10}}
              confirmButtonTextStyle={{fontSize: 18, textAlign: 'center'}}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor="#00BFA6"
              onConfirmPressed={() => {
                this.hideAlert2();
              }}
            />
            <AwesomeAlert
              show={this.state.showAlert4}
              showProgress={false}
              title="LogIn Failed"
              message={this.state.fMessage}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              confirmButtonStyle={{width: 80, hight: 40, borderRadius: 10}}
              confirmButtonTextStyle={{fontSize: 18, textAlign: 'center'}}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor="#00BFA6"
              onConfirmPressed={() => {
                this.hideAlert4();
              }}
            />

            <AwesomeAlert
              show={this.state.showAlert5}
              showProgress={false}
              title={this.state.welcomeMessage}
              message={this.state.welcomeMessagename}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              confirmButtonStyle={{width: 100, hight: 50, borderRadius: 10}}
              confirmButtonTextStyle={{fontSize: 16, textAlign: 'center'}}
              showConfirmButton={true}
              confirmText="home page"
              confirmButtonColor="#00BFA6"
              onConfirmPressed={() => {
                this.hideAlert5();
                this.props.navigation.navigate('Student_home');
              }}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  imagestyle: {
    width: 200,
    height: 200,
    borderRadius: 170,
    marginTop: '15%',
    alignSelf: 'center',
  },
  textstyle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
  },
  inputstyle: {
    width: '100%',
    paddingHorizontal: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    marginVertical: 25,
  },
  Text_error: {
    textAlign: 'center',
    color: 'red',
    fontSize: 14,
    fontWeight: '800',
  },
  Button_Style: {
    width: '70%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: '10%',
    alignSelf: 'center',
  },
});
