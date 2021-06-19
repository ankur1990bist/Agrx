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
import DocumentVerifiyScreen from '../layouts/Auth/DocumentVerifiyScreen';
import ProfileDetails from '../layouts/Auth/ProfileDetails';
import RegisterScreen from '../layouts/Auth/RegisterScreen';
import SelectFieldScreen from '../layouts/Auth/SelectFieldScreen';

import AgrxColors from '../config/AgrxColors';

import * as Animatable from 'react-native-animatable';
import DashboardScreen from '../layouts/Dashboard/DashboardScreen';
import MarketPlace from '../layouts/MarketPlace/MarketPlace';

import Library from '../layouts/Library/Library';

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

function IntroSliderStack() {
  return (
    <Stack.Navigator initialRouteName="SelectFieldScreen">
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
        options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' '}}
      />
      <Stack.Screen
        name="DocumentVerifiyScreen"
        component={DocumentVerifiyScreen}
        options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' '}}
      />
      <Stack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' '}}
      />
      <Stack.Screen
        name="SelectFieldScreen"
        component={SelectFieldScreen}
        options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' '}}
      />
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={(props) => {
          const routeName = getFocusedRouteNameFromRoute(props.route);
          return {
            headerShown: routeName != 'Events',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              backgroundColor: '#fff',
              height: Platform.OS == 'android' ? 60 : 105,
            },
            title: '',

            headerLeft: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableHighlight
                  underlayColor="rgba(0, 0, 0, 0.1)"
                  style={{
                    height: 50,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#eff2f5',
                    marginLeft: 5,
                  }}
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {/* <IonIcons
                      name={'reorder-three-sharp'}
                      size={35}
                      color={'#212529'}
                    /> */}
                  </View>
                </TouchableHighlight>
              </View>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}

function handleBackButton() {
  BackHandler.exitApp();
  return true;
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="DashboardScreen">
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{headerTitle: ' '}}
      />
    </Stack.Navigator>
  );
}

function MarketPlaceStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MarketPlace">
      <Stack.Screen
        name="MarketPlace"
        component={MarketPlace}
        options={{headerTitle: ' '}}
      />
    </Stack.Navigator>
  );
}

function LibraryStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Library">
      <Stack.Screen
        name="Library"
        component={Library}
        options={{headerTitle: ' '}}
      />
    </Stack.Navigator>
  );
}

function HomeTab() {
  const libraryRef = React.useRef(null);
  const marketRef = React.useRef(null);
  const homeRef = React.useRef(null);

  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName="HomeStack"
      tabBarPosition={'bottom'}
      screenOptions={{
        animationEnabled: true,
        gestureEnabled: true,
        ...TransitionPresets.FadeFromBottomAndroid,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
      lazy={true}
      tabBarOptions={{
        activeTintColor: AgrxColors.primary,
        inactiveTintColor: 'gray',
        showIcon: true,
        tabStyle: [
          {
            paddingBottom: Platform.OS == 'ios' ? 20 : 8,
            backgroundColor: '#fff',
          },
          Platform.OS == 'android' && {height: 60},
        ],
        labelStyle: {
          fontSize: 10,
        },
        iconStyle: {},
        allowFontScaling: true,
        indicatorStyle: {height: 0},

        // pressColor: 'transparent',
      }}>
      <Tab.Screen
        listeners={{
          tabPress: () => {
            homeRef.current.zoomIn();
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
          },
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        }}
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: AgrxColors.primary,
          tabBarIcon: ({color}) => {
            return (
              <AnimatedIcon
                useNativeDriver={true}
                ref={homeRef}
                name="home"
                size={25}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: () => {
            marketRef.current.zoomIn();
          },
        }}
        name="MarketPlace"
        component={MarketPlaceStack}
        options={{
          tabBarLabel: 'Market Place',
          tabBarColor: AgrxColors.primary,
          tabBarIcon: ({color}) => {
            return (
              <AnimatedIcon
                useNativeDriver={true}
                ref={marketRef}
                name="shopping"
                size={25}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: () => {
            libraryRef.current.zoomIn();
          },
        }}
        name="Library"
        component={LibraryStack}
        options={{
          tabBarLabel: 'Library',
          tabBarColor: AgrxColors.primary,
          tabBarIcon: ({color}) => {
            return (
              <AnimatedIcon
                useNativeDriver={true}
                ref={libraryRef}
                name="library"
                size={25}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
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
