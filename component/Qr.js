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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import QRCode from 'react-native-qrcode-svg';

import {images, COLORS, SIZES} from '../constants';

export default class Qr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrvalue: '',
    };
  }
  componentDidMount() {
    let qrvalue = this.props.navigation.getParam('qrvalue');
    this.setState({qrvalue});
  }

  render() {
    const qrvalue = this.state.qrvalue;

    return (
      <>
        <View style={{flex: 1, backgroundColor: COLORS.second}}>
          {/* -----------------header----------------- */}
          <View style={styles.Containerheader}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
                // alert(this.state.qrvalue);
              }}
              style={{width: '33%'}}>
              <Icon name="arrow-left" size={18} color={'#000'} />
            </TouchableOpacity>
            <Text style={styles.textheader}>Your QR</Text>
          </View>
          {/* <View style={styles.lineheader} /> */}
          {/* ---------------------------------------------------- */}
          <View
            style={{
              width: '80%',
              marginHorizontal: '10%',
              backgroundColor: '#fff',
              height: 400,
              marginTop: '40%',
              borderRadius: 10,
            }}>
            {/* ------------- */}
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                backgroundColor: '#C6C6C6',
                borderWidth: 3,
                borderColor: '#fff',
                position: 'absolute',
                top: -60,
                left: '33%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={images.Student}
                style={{
                  width: 75,
                  height: 75,
                  resizeMode: 'center',
                }}
              />
            </View>
            {/* ------------- */}
            {/* <Text
              style={{
                alignSelf: 'center',
                marginTop: '20%',
                color: '#000',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Seif ElDeen Wael
            </Text> */}
            {/* ------------- */}
            <View
              style={{
                width: '90%',
                marginHorizontal: '5%',
                // backgroundColor: 'red',
                height: 250,
                marginVertical: 70,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <QRCode
                value={this.state.qrvalue ? qrvalue : 'NA'}
                size={200}
                color="black"
                backgroundColor="white"
                logoSize={30}
                logoMargin={2}
                logoBorderRadius={15}
                logoBackgroundColor="yellow"
              />
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
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
