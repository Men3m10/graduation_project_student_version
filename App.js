import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';
import {Login, Student_home, Qr} from './component';
import {
  Profile,
  Graduit_paper,
  Arrive,
  New_Student,
  Payment,
  Summer_Training,
  Transfer_Students,
  Transfer_from,
  College,
  About_Us,
  Attendance,
  Degree,
} from './Drawer';
import RNBootSplash from 'react-native-bootsplash';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {images, COLORS, SIZES} from './constants';
import * as Animatable from 'react-native-animatable';

class App extends React.Component {
  componentDidMount() {
    RNBootSplash.hide({fade: false});
    this._loadData();
    this.Creat_QR();
    // this.props.navigation.navigate('HomeStack');
  }

  async _loadData() {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(
      isLoggedIn !== '1' ? 'AuthStack' : 'HomeStack',
    );
  }

  async Creat_QR() {
    const generateQr = await AsyncStorage.getItem('generateQr');
    this.setState({qrvalue: generateQr});
  }

  render() {
    return <></>;
  }
}

const CustomDrawerContentComponent = props => {
  const [qrvalue, setQrvalue] = React.useState('');
  React.useEffect(() => {
    const loadQr = async () => {
      const Qr = await AsyncStorage.getItem('generateQr');
      setQrvalue(Qr);
    };

    loadQr();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.drawerHeader}>
        <ImageBackground
          style={styles.drawerImage}
          source={images.Back1}
          resizeMode={'center'}
        />
      </View>
      {/* --------------------------- */}
      <Animatable.View
        animation={'swing'}
        duration={1250}
        iterationDelay={500}
        iterationCount="5"
        style={styles.Qr_view}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Qr', {
              qrvalue,
            });
            // alert(qrvalue);
          }}>
          <Image source={images.Qr} style={styles.Qr_image} />
        </TouchableOpacity>
      </Animatable.View>

      {/* --------------------------- */}

      <DrawerItems {...props} />
      {/* --------------------------- */}

      <LinearGradient
        colors={[COLORS.four, COLORS.third, COLORS.second]}
        style={{
          width: '60%',
          height: 60,
          // backgroundColor: '#9bcee3',
          marginBottom: 20,
          justifyContent: 'center',
          marginLeft: '15%',
          paddingHorizontal: '5%',
          borderRadius: 30,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
          }}>
          <Image
            source={images.About4}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              resizeMode: 'center',
            }}
          />
          <Text style={{fontWeight: 'bold', color: '#000', marginLeft: 15}}>
            About App
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      {/* --------------------------- */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 15,
          marginLeft: 15,
          alignItems: 'center',
        }}>
        <Image
          source={images.Logout1}
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            resizeMode: 'center',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              '',
              'Are you sure you want to logout? ',
              [
                {
                  text: 'Done',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.navigate('AuthStack');
                  },
                },

                {
                  text: 'Cancle',
                  onPress: () => props.navigation.closeDrawer(),
                },
              ],
              {cancelable: false},
            );
          }}>
          <Text style={{color: '#000', fontWeight: 'bold', marginLeft: 20}}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const HomepageDrawerStack = createDrawerNavigator(
  {
    Profile: {
      screen: Student_home,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: (
          <Image
            source={images.Home2}
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              resizeMode: 'center',
            }}
          />
        ),
      },
    },
    Attendance: {
      screen: Attendance,
      navigationOptions: {
        drawerLabel: 'Your Attendance',
        drawerIcon: (
          <Image
            source={images.Attendance}
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              resizeMode: 'center',
            }}
          />
        ),
      },
    },
    Degree: {
      screen: Degree,
      navigationOptions: {
        drawerLabel: 'Your Degree',
        drawerIcon: (
          <Image
            source={images.Degree4}
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              resizeMode: 'center',
            }}
          />
        ),
      },
    },
    Transfer_Students: {
      screen: Transfer_Students,
      navigationOptions: {
        drawerLabel: 'Transfer to Fci',
        drawerIcon: (
          <Image
            source={images.Transfer10}
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              resizeMode: 'center',
            }}
          />
        ),
      },
    },
    Transfer_from: {
      screen: Transfer_from,
      navigationOptions: {
        drawerLabel: 'Transfer from Fci',
        drawerIcon: (
          <Image
            source={images.Transfer6}
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              resizeMode: 'center',
            }}
          />
        ),
      },
    },

    Graduit_paper: {
      screen: Graduit_paper,
      navigationOptions: {
        drawerLabel: 'Graduated',
        drawerIcon: (
          <Image
            source={images.Finish5}
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              resizeMode: 'center',
            }}
          />
        ),
      },
    },

    College: {
      screen: College,
      navigationOptions: {
        drawerLabel: 'About College',
        drawerIcon: (
          <Image
            source={images.College2}
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              resizeMode: 'center',
            }}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Profile',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerType: 'slide',
    contentOptions: {
      // activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Student_home: {screen: HomepageDrawerStack},
    Qr: {screen: Qr},
  },
  {
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator(
  {
    Login: {screen: Login},
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AppStack: App,
      HomeStack: HomeStack,
      AuthStack: AuthStack,
    },
    {
      initialRouteParams: 'AppStack',
      headerMode: 'none',
    },
  ),
);

const styles = StyleSheet.create({
  drawerHeader: {
    height: 160,
    width: '100%',

    backgroundColor: '#fff',
  },
  drawerImage: {
    height: 150,
    width: '80%',
  },
  icon_image: {
    width: 30,
    height: 30,
    borderRadius: 10,
    resizeMode: 'center',
  },
  Qr_view: {
    width: 70,
    height: 70,
    borderRadius: 100,
    resizeMode: 'center',
    position: 'absolute',
    top: '7%',
    right: '10%',
    borderWidth: 3,
    borderColor: '#9BCEE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Qr_image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    resizeMode: 'center',
  },
});
