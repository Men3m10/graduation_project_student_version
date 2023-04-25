import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {width, height} = Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {images, COLORS, SIZES} from '../constants';
import * as Apidata from '../constants/constent';
var Api = Apidata.API;
export default class Attendance extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [
        // {
        //   id: 0,
        //   name: 'Operating System',
        //   code: 'CEA3',
        //   obtainedMarkes: 25,
        //   totalMarkes: 50,
        // },
        // {
        //   id: 1,
        //   name: 'Operating System',
        //   code: 'CEA3',
        //   obtainedMarkes: 25,
        //   totalMarkes: 50,
        // },
        // {
        //   id: 2,
        //   name: 'Operating System',
        //   code: 'CEA3',
        //   obtainedMarkes: 25,
        //   totalMarkes: 50,
        // },
        // {
        //   id: 3,
        //   name: 'Operating System',
        //   code: 'CEA3',
        //   obtainedMarkes: 25,
        //   totalMarkes: 50,
        // },
        // {
        //   id: 4,
        //   name: 'Operating System',
        //   code: 'CEA3',
        //   obtainedMarkes: 25,
        //   totalMarkes: 50,
        // },
      ],

      connection_Status: '',
      Connection: '',
      connBack: 0,
      refresh: false,
      loading: true,
      Id_data: '62b72c86a5112ea5b12f1ed7',
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

  getData() {
    this.setState({Connection: 'Open'});
    let data_to_send = {
      studentId: this.state.national_id,
    };

    axios
      .post(Api + '/api/v1/student_info/checkAttendence', data_to_send)
      .then(res => {
        if (res.status == 200) {
          //alert(res.data.message);
          // alert(JSON.stringify(res.data.result));
          // alert(JSON.stringify(res.data.result));
          // console.log(res.data.result);
          ///////////////////////////////////////////////////////////////
          this.setState({items: res.data.result, loading: true});
          if (this.state.connection_Status == 'Online') {
            ToastAndroid.showWithGravityAndOffset(
              res.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
          //////////////////////////////////////////////////////////////
        } else {
          alert('try again later');
        }
      })
      .catch(err => {
        console.log(err.response.data);
        //alert(err.response.data.message);
        //alert(JSON.stringify(err.response.data));
      });
  }

  Refresh_fun() {
    this.setState({refresh: true});
    setTimeout(() => {
      this.componentDidMount();
      this.setState({refresh: false});
    }, 100);
  }

  render() {
    return (
      <>
        {/* --------------header-------------- */}
        <View style={styles.Containerheader}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{width: '33%'}}>
            <Icon name="angle-left" size={25} color={'#000'} />
          </TouchableOpacity>
          <Text style={styles.textheader}>Attendance</Text>
        </View>
        {/* -----------------body----------------- */}

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
                {this.state.items.map((item, index) => (
                  <View>
                    <View style={styles.box1}>
                      <Text
                        numberOfLines={1}
                        style={{
                          alignSelf: 'center',
                          fontSize: 12,
                          fontWeight: '600',
                        }}>
                        {item.subjectName}
                      </Text>
                    </View>
                    <View key={index} style={styles.box}>
                      <View
                        style={{
                          width: '60%',
                          alignSelf: 'center',
                          borderBottomWidth: 1,
                          borderBottomColor: '#EEE',
                        }}
                      />
                      {/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            width: '80%',
                            height: 30,
                            // backgroundColor: "#F00",
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 15, fontWeight: '600'}}>
                              Code
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              width: '20%',
                            }}>
                            <Text style={{fontSize: 15, alignSelf: 'center'}}>
                              {item.subjectCode}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            width: '80%',
                            height: 30,
                            // backgroundColor: "#F00",
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            alignSelf: 'center',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={{ffontSize: 15, fontWeight: '600'}}>
                              number of sections
                            </Text>
                          </View>
                          <View
                            style={{justifyContent: 'center', width: '20%'}}>
                            <Text style={{fontSize: 15, alignSelf: 'center'}}>
                              {item.maxHours}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            width: '80%',
                            height: 30,
                            // backgroundColor: "#F00",
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            alignSelf: 'center',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={{fontSize: 15, fontWeight: '600'}}>
                              Attended sections
                            </Text>
                          </View>
                          <View
                            style={{justifyContent: 'center', width: '20%'}}>
                            <Text style={{fontSize: 15, alignSelf: 'center'}}>
                              {item.lectureAttended}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            width: '80%',
                            height: 30,
                            // backgroundColor: "#F00",
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            alignSelf: 'center',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={{fontSize: 15, fontWeight: '600'}}>
                              Sections by instructor
                            </Text>
                          </View>
                          <View
                            style={{justifyContent: 'center', width: '20%'}}>
                            <Text style={{fontSize: 15, alignSelf: 'center'}}>
                              {item.totalLecturesByinstructor}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            width: '80%',
                            height: 30,
                            // backgroundColor: "#F00",
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            alignSelf: 'center',
                          }}>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={{fontSize: 15, fontWeight: '600'}}>
                              {' '}
                              Attendence Percentage
                            </Text>
                          </View>
                          <View
                            style={{justifyContent: 'center', width: '15%'}}>
                            <Text
                              style={{
                                fontSize: 15,
                                alignSelf: 'center',
                                fontWeight: 'bold',
                              }}>
                              {item.attendence}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
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
        </ScrollView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    width: '90%',
    height: 250,
    borderRadius: 10,
    paddingVertical: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    elevation: 5,
    backgroundColor: '#FFF',
    marginBottom: 20,
    marginTop: 5,
  },
  box1: {
    width: '70%',
    //height: 150,
    borderRadius: 10,
    paddingVertical: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    elevation: 5,
    backgroundColor: '#FFF',
    marginTop: 5,
  },
  nameSubject: {
    width: '40%',
    alignSelf: 'center',
    marginBottom: 5,
    // backgroundColor:'#F00'
  },
  Containerheader: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: '5%',
  },
  textheader: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  lineheader: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});
