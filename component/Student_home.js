import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {images, COLORS, SIZES} from '../constants';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
const {width, height} = Dimensions.get('window');
import * as Apidata from '../constants/constent';
var Api = Apidata.API;
export default class Student_home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_picker: false,
      kind: true,
      date: '',
      day: '',
      time: '',
      stamp: '',
      Id_data: '62b72c86a5112ea5b12f1ed7',
      Data: [],
      connection_Status: '',
      Connection: '',
      connBack: 0,
      refresh: false,
      loading: true,
      national_id: '',
    };
  }

  componentDidMount() {
    this.setState({loading: false});
    NetInfo.addEventListener(state => {
      if (state.isConnected == true) {
        this.setState({
          connection_Status: 'Online',
        });
        this.Creat_QR();
        setTimeout(() => {
          this.getData();
        }, 1000);
      } else {
        this.setState({
          connection_Status: 'Offline',
          Connection: 'Close',
        });
      }
    });
  }

  async Creat_QR() {
    const Qr = await AsyncStorage.getItem('Qr');
    this.setState({national_id: Qr});
  }

  // async Creat_QR() {
  //   const Qr = await AsyncStorage.getItem('Qr');
  //   this.setState({qrvalue: Qr});
  // }

  getData() {
    this.setState({Connection: 'Open'});
    let data_to_send = {
      Id: this.state.national_id,
    };
    // alert(JSON.stringify(data_to_send));
    axios
      .post(Api + '/api/v1/student_info/getStudentID', data_to_send)
      .then(res => {
        if (res.status == 200) {
          //alert(res.data.message);
          //alert(JSON.stringify(res.data.response))
          //alert(JSON.stringify(res.data.result));
          // console.log(res.data.result);
          ///////////////////////////////////////////////////////////////
          this.setState({Data: res.data.result, loading: true});

          this.storeDepat();
          if (this.state.connection_Status == 'Online') {
            ToastAndroid.showWithGravityAndOffset(
              res.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        } else {
          alert('try again later');
        }
      })
      .catch(err => {
        console.log(err.response.message);
        //alert(err.response.data.message);
        //alert(JSON.stringify(err.response.data));
      });
  }

  async storeDepat() {
    await AsyncStorage.setItem('department', this.state.Data.department);
  }

  Refresh_fun() {
    this.setState({refresh: true});
    setTimeout(() => {
      this.componentDidMount();
      this.setState({refresh: false});
    }, 100);
  }
  render_header() {
    return (
      <>
        <View style={styles.Containerheader}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <Icon name="bars" size={24} style={styles.iconheader} />
          </TouchableOpacity>
          <View style={{width: '70%'}}>
            <Text style={styles.fontheader}>
              Welcome to the faculty of Computers and Information
            </Text>
          </View>
          <Image source={images.Logo} style={styles.imageheader} />
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: '#f0f0f0'}} />
      </>
    );
  }

  render() {
    return (
      <>
        {/* -------------------header----------------- */}
        {this.render_header()}
        {/* ----------------details--------------- */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.Refresh_fun();
              }}
            />
          }>
          {this.state.Connection == 'Open' ? (
            this.state.loading ? (
              <View>
                <View style={styles.Container}>
                  <View style={styles.SmallContainer}>
                    <Image source={images.Name} style={styles.image} />
                    <View style={styles.inside_view}>
                      <Text style={styles.text1}>Name</Text>
                      <Text style={styles.text2}>{this.state.Data.name}</Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={[COLORS.four, COLORS.third, COLORS.second]}
                    style={styles.Dessinview}
                  />
                </View>
                <View style={styles.Container}>
                  <View style={styles.SmallContainer}>
                    <Image source={images.Faild} style={styles.image} />
                    <View style={styles.inside_view}>
                      <Text style={styles.text1}>Devision</Text>
                      <Text style={styles.text2}>
                        {this.state.Data.division}
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={[COLORS.four, COLORS.third, COLORS.second]}
                    style={styles.Dessinview}
                  />
                </View>
                <View style={styles.Container}>
                  <View style={styles.SmallContainer}>
                    <Image source={images.ID9} style={styles.image} />
                    <View style={styles.inside_view}>
                      <Text style={styles.text1}>Student Code</Text>
                      <Text style={styles.text2}>
                        {this.state.Data.code_Hash}
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={[COLORS.four, COLORS.third, COLORS.second]}
                    style={styles.Dessinview}
                  />
                </View>
                <View style={styles.Container}>
                  <View style={styles.SmallContainer}>
                    <Image source={images.ID4} style={styles.image} />
                    <View style={styles.inside_view}>
                      <Text style={styles.text1}>National ID</Text>
                      <Text style={styles.text2}>
                        {this.state.Data.ssid_Hash}
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={[COLORS.four, COLORS.third, COLORS.second]}
                    style={styles.Dessinview}
                  />
                </View>

                <View style={styles.Container}>
                  <View style={styles.SmallContainer}>
                    <Image
                      source={images.Grade7}
                      style={styles.image}
                      resizeMode={'repeat'}
                    />
                    <View style={styles.inside_view}>
                      <Text style={styles.text1}>Year</Text>
                      <Text style={styles.text2}>{this.state.Data.year}</Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={[COLORS.four, COLORS.third, COLORS.second]}
                    style={styles.Dessinview}
                  />
                </View>
                <View style={styles.Container}>
                  <View style={styles.SmallContainer}>
                    <Image source={images.Depart} style={styles.image} />
                    <View style={styles.inside_view}>
                      <Text style={styles.text1}>Department</Text>
                      <Text style={styles.text2}>
                        {this.state.Data.department}
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={[COLORS.four, COLORS.third, COLORS.second]}
                    style={styles.Dessinview}
                  />
                </View>
                <View style={styles.Container}>
                  <View style={styles.SmallContainer}>
                    <Image source={images.Transfer5} style={styles.image} />
                    <View style={styles.inside_view}>
                      <Text style={styles.text1}>Email of University</Text>
                      <Text style={styles.text2}>
                        {this.state.Data.uni_email}
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={[COLORS.four, COLORS.third, COLORS.second]}
                    style={styles.Dessinview}
                  />
                </View>
                <View style={styles.Container}>
                  <View style={styles.SmallContainer}>
                    <Image
                      source={images.Tybe4}
                      style={[styles.image, {borderRadius: 40}]}
                    />
                    <View style={styles.inside_view}>
                      <Text style={styles.text1}>Gender</Text>
                      <Text style={styles.text2}>{this.state.Data.gender}</Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={[COLORS.four, COLORS.third, COLORS.second]}
                    style={styles.Dessinview}
                  />
                </View>

                <View style={styles.Container}>
                  <View style={styles.SmallContainer}>
                    <Image source={images.Nationality} style={styles.image} />
                    <View style={styles.inside_view}>
                      <Text style={styles.text1}>Address</Text>
                      <Text style={styles.text2}>
                        {this.state.Data.address}
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={[COLORS.four, COLORS.third, COLORS.second]}
                    style={styles.Dessinview}
                  />
                </View>
                <View style={styles.Container}>
                  <View style={styles.SmallContainer}>
                    <Image source={images.T} style={styles.image} />
                    <View style={styles.inside_view}>
                      <Text style={styles.text1}>Section</Text>
                      <Text style={styles.text2}>
                        {this.state.Data.section}
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={[COLORS.four, COLORS.third, COLORS.second]}
                    style={styles.Dessinview}
                  />
                </View>
              </View>
            ) : (
              <View style={{flex: 1, marginTop: '20%'}}>
                <ActivityIndicator color={'green'} />
              </View>
            )
          ) : this.state.Connection == 'Close' ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height / 6,
              }}>
              <Image source={images.Home1} style={{width: 150, height: 150}} />
              <View style={{margin: 20}}>
                <Text style={{fontSize: 18, fontWeight: '700', color: 'red'}}>
                  Connection Failed !{' '}
                </Text>
              </View>
            </View>
          ) : null}
          {/* ------------------------------------------------ */}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  Containerheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
  },
  iconheader: {
    alignSelf: 'center',
    paddingRight: '10%',
    color: COLORS.second,
  },
  fontheader: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 17,
  },
  imageheader: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  Container: {
    width: '95%',
    flexDirection: 'row',
    marginHorizontal: '2.5%',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    elevation: 0.5,
  },
  SmallContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingVertical: '4%',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: 'center',
  },
  text1: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  text2: {
    fontSize: 16,
    textAlign: 'left',
    color: '#000',
  },
  Dessinview: {
    width: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  inside_view: {
    paddingLeft: 20,
  },
});
