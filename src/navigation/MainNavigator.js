import {
  StatusBar,
  Dimensions,
  BackHandler,
  Platform,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
} from 'react-native';

import 'react-native-gesture-handler';
import * as React from 'react';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {
  getFocusedRouteNameFromRoute,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {connect, useSelector} from 'react-redux';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import DrawerContent from '../layouts/DrawerContent';

import IntroSlider from '../layouts/Auth/IntroSlider';
import LoginScreen from '../layouts/Auth/LoginScreen';
import OtpScreen from '../layouts/Auth/OtpScreen';

import RegisterScreen from '../layouts/Auth/RegisterScreen';

import AgrxColors from '../config/AgrxColors';

import * as Animatable from 'react-native-animatable';
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

const AnimatedIcon = Animatable.createAnimatableComponent(
  MaterialCommunityIcons,
);
const AnimatedMaterialIcon =
  Animatable.createAnimatableComponent(MaterialIcons);

const AnimatedOcticons = Animatable.createAnimatableComponent(Octicons);

const Drawer = createDrawerNavigator();

const config = {
  animation: 'timing',
  config: {
    duration: 120,
  },
};

const customDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: '#32ab9f',
    accent: '#009688',
    background: '#eff2f5',
    card: '#ffffff',
    surface: '#ffffff',
  },
};

const customDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  roundness: 2,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: '#32ab9f',
    accent: '#009688',
    background: AgrxColors.darkBackground,
    card: AgrxColors.darkCard,
    surface: AgrxColors.darkCard,
  },
};

function Auth() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
          height: 60,
        },
        headerTintColor: '#515151',
        headerTitleStyle: {
          fontSize: 20,
        },
        animationEnabled: true,
        ...TransitionPresets.DefaultTransition,
      }}
      initialRouteName={'Login'}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' '}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function IntroSliderStack() {
  return (
    <Stack.Navigator initialRouteName="IntroSlider">
      <Stack.Screen
        name="IntroSlider"
        component={IntroSlider}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' '}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

class MainNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PaperProvider
        theme={
          this.props.agrxTheme?.isDark ? customDarkTheme : customDefaultTheme
        }>
        <NavigationContainer
          theme={
            this.props.agrxTheme?.isDark ? customDarkTheme : customDefaultTheme
          }>
          <StatusBar
            backgroundColor={AgrxColors.darkBackground}
            barStyle={
              Platform.OS == 'android'
                ? this.props.agrxTheme?.isDark
                  ? 'light-content'
                  : 'default'
                : this.props.agrxTheme?.isDark
                ? 'light-content'
                : 'dark-content'
            }
          />

          <Drawer.Navigator
            drawerType="front"
            initialRouteName={'IntroSliderStack'}
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen
              name="IntroSliderStack"
              component={IntroSliderStack}
              options={{headerShown: false, swipeEnabled: false}}
            />
            {/* <Drawer.Screen
              name="Auth"
              component={Auth}
              options={{headerShown: false, swipeEnabled: false}}
            /> */}
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    agrxTheme: state.agrxTheme,
  };
};

export default connect(mapStateToProps, {})(MainNavigator);
