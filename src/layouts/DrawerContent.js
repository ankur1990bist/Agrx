import React, {Component} from 'react';
import {View, StyleSheet, AsyncStorage, Alert} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
  Text,
  Divider,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonActions} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import DeviceInfo from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AgrxColors from '../config/AgrxColors';
import * as Animatable from 'react-native-animatable';

const AnimatedIcon = Animatable.createAnimatableComponent(Ionicons);
class DrawerContent extends Component {
  constructor(props) {
    super(props);
  }

  logoutPressed = async () => {
    let keys = await AsyncStorage.getAllKeys();
    keys = keys.filter(function (item) {
      return (
        item !== 'messageTooltip' &&
        item !== 'videoTooltip' &&
        item !== 'hidePager'
      );
    });

    firebase
      .firestore()
      .collection('users')
      .doc(this.props.userData.uid)
      .get()
      .then((doc) => {
        console.log(doc, 'docdocdocdoc');
        auth()
          .signOut()
          .then(() => {
            console.log('User signed out!');
            this.props.resetState(true);
            this.props.resetUserData(true);
            this.props.inputFieldData([]);
            this.props.storeDraftResponse([]);
            this.props.getCurrentWorkspace([]);
            this.props.getAllWorkspace([]);
            AsyncStorage.multiRemove(keys);
            this.setState({user: null});
            this.props.navigation.dispatch(
              CommonActions.reset({index: 0, routes: [{name: 'Auth'}]}),
            );
          })
          .catch((e) => console.log('error logout', e));
      })
      .catch((error) => {});
  };

  toggleagrxTheme = () => {
    this.props.toggleagrxTheme(!this.props.agrxTheme.isDark);
    this.switchIcon.zoomIn();
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  alignItems: 'center',
                }}>
                <FastImage style={[styles.avatar]} source={{uri: ''}} />
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  <Title style={styles.title}>Name</Title>
                  <Caption style={styles.caption}>@Username</Caption>
                </View>
              </View>

              {/* <View style={styles.row}>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    80
                  </Paragraph>
                  <Caption style={styles.caption}>Following</Caption>
                </View>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    100
                  </Paragraph>
                  <Caption style={styles.caption}>Followers</Caption>
                </View>
              </View> */}
            </View>
          </View>
        </DrawerContentScrollView>
        <Divider />
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="exit-to-app" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => {
              this.logoutPressed();
            }}
          />
          <DrawerItem
            // icon={({color, size}) => (
            //   <Icon name="information-outline" color={color} size={size} />
            // )}
            labelStyle={{textAlign: 'center', paddingBottom: 8}}
            label={`App Version: ${
              DeviceInfo.getVersion() ? DeviceInfo.getVersion() : ''
            }`}
          />
        </Drawer.Section>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'green',
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  themeStyle: {
    fontSize: 15,
  },
});
