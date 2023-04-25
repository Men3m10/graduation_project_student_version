// import React, {Component, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';

// export default class GenerateQR extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputText: '',
//       qrvalue: '',
//     };
//   }

//   render() {
//     const inputText = this.state.inputText;

//     const qrvalue = this.state.qrvalue;

//     return (
//       <>
//         <View style={styles.container}>
//           <QRCode
//             value={this.state.qrvalue ? qrvalue : 'NA'}
//             size={250}
//             color="black"
//             backgroundColor="white"
//             logoSize={30}
//             logoMargin={2}
//             logoBorderRadius={15}
//             logoBackgroundColor="yellow"
//           />
//           <Text style={styles.textStyle}>
//             Please insert any value to generate QR code
//           </Text>
//           <TextInput
//             style={styles.textInputStyle}
//             value={this.state.inputText}
//             onChangeText={value => {
//               this.setState({inputText: value});
//             }}
//             placeholder="Enter Any Value"
//           />
//           <TouchableOpacity
//             style={styles.buttonStyle}
//             onPress={() => {
//               // let inputText = this.state.inputText;
//               // let qrvalue = this.state.qrvalue;

//               this.setState({
//                 qrvalue: inputText,
//               });
//             }}>
//             <Text style={styles.buttonTextStyle}>Generate QR Code</Text>
//           </TouchableOpacity>
//         </View>
//       </>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     padding: 10,
//   },
//   titleStyle: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   textStyle: {
//     textAlign: 'center',
//     margin: 10,
//   },
//   textInputStyle: {
//     flexDirection: 'row',
//     height: 40,
//     marginTop: 20,
//     marginLeft: 35,
//     marginRight: 35,
//     margin: 10,
//   },
//   buttonStyle: {
//     backgroundColor: '#51D8C7',
//     borderWidth: 0,
//     color: '#FFFFFF',
//     borderColor: '#51D8C7',
//     alignItems: 'center',
//     borderRadius: 5,
//     marginTop: 30,
//     padding: 10,
//   },
//   buttonTextStyle: {
//     color: '#FFFFFF',
//     paddingVertical: 10,
//     fontSize: 16,
//   },
// });
