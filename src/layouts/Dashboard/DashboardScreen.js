import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  FlatList,
} from 'react-native';
import AgrxColors from '../../config/AgrxColors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TabView, SceneMap, ScrollPager, TabBar} from 'react-native-tab-view';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

export class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      routes: [
        {key: 'Home', title: 'Home'},
        {key: 'Community', title: 'Community'},
      ],
      crops: [
        {
          name: 'Apple',
          image:
            'https://www.researchgate.net/profile/Venu-Mangena-2/publication/343932672/figure/fig1/AS:973654737289218@1609148787780/Input-image-of-infected-leaf.png',
          time: '3 days ago',
        },
        {
          name: 'Sugarcane',
          image:
            'https://www.researchgate.net/profile/Jawaid-Khan-2/publication/266081512/figure/fig1/AS:392074047311883@1470489145675/Cotton-leaf-curl-virus-infected-leaves-collected-from-the-experimental-plots-of.png',
          time: '5 days ago',
        },
        {
          name: 'Banana',
          image:
            'https://ohioline.osu.edu/sites/ohioline/files/imce/Plant_Pathology/PLPATH-FRU-37-Powdery-Mildew-Grape-figure-1.png',
          time: '7 days ago',
        },
      ],
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // unsubscribeArray.forEach((listener) => {
    //   listener && listener();
    // });
  };

  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  renderScene = ({route}) => {
    return (
      <View style={{flex: 1, marginTop: 12}}>
        <FlatList
          data={this.state.crops}
          renderItem={this.renderCrops}
          keyExtractor={(item) => item.name}
        />
      </View>
    );
  };

  setIndex = (index) => {
    this.setState({
      tabIndex: index,
    });
  };

  renderTabBar = (props) => {
    const {isDark} = false;
    return (
      <TabBar
        {...props}
        scrollEnabled={false}
        tabStyle={{
          width: width / 2,
          backgroundColor: isDark ? AgrxColors.darkBackground : '#fff',
          marginBottom: 1,
        }}
        renderIcon={this.renderIcon}
        bounces
        indicatorStyle={{backgroundColor: AgrxColors.primary}}
        labelStyle={{textAlign: 'center', fontSize: 0}}
        style={{backgroundColor: isDark ? AgrxColors.darkBackground : '#fff'}}
        activeColor={AgrxColors.primary}
        inactiveColor="#6c757d"
      />
    );
  };

  renderIcon = ({route, focused, color}) => {
    switch (route.key) {
      case 'Home':
        return (
          <MaterialCommunityIcon
            name={'home'}
            size={25}
            color={focused ? AgrxColors.primary : AgrxColors.igesiaGray}
          />
        );
      case 'Community':
        return (
          <MaterialCommunityIcon
            name={'account-multiple'}
            size={25}
            color={focused ? AgrxColors.primary : AgrxColors.igesiaGray}
          />
        );

      default:
        return this.renderApp();
    }
  };

  renderCrops = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 8,
          marginVertical: 5,
          marginHorizontal: 8,
        }}>
        <FastImage
          source={{uri: item.image}}
          style={{height: 50, width: 50, borderRadius: 5}}
        />
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
        <Text style={{fontSize: 18, color: AgrxColors.igesiaGray}}>
          {item.time}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {tabIndex, routes} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            marginTop: 8,
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 50,
              backgroundColor: AgrxColors.igesiaGray,
            }}>
            <MaterialCommunityIcon
              name={'weather-cloudy'}
              size={30}
              color={'#fff'}
            />
            {/* <Text
              style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
              31
            </Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 50,
              backgroundColor: AgrxColors.igesiaBlue,
            }}>
            <MaterialCommunityIcon
              name={'weather-pouring'}
              size={30}
              color={'#fff'}
            />
            {/* <Text
              style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
              80%
            </Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 50,
              backgroundColor: AgrxColors.yellow,
            }}>
            <MaterialCommunityIcon name={'water'} size={30} color={'#fff'} />
            {/* <Text
              style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
              80%
            </Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              width: 50,
              borderRadius: 50,
              backgroundColor: AgrxColors.events,
            }}>
            <MaterialCommunityIcon name={'bell'} size={30} color={'#fff'} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 12,
          }}>
          {' '}
          AGRX{' '}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: AgrxColors.igesiaGray,
          }}>
          {' '}
          Smart Agriculture Assistant{' '}
        </Text>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 60,
            width: 60,
            borderRadius: 8,
            marginTop: 50,
            backgroundColor: AgrxColors.primary,
            alignSelf: 'center',
          }}>
          <MaterialCommunityIcon name="camera" size={30} color={'#fff'} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            color: AgrxColors.igesiaGray,
            marginTop: 8,
          }}>
          SCAN YOUR CROP
        </Text>

        <TabView
          style={{marginTop: 16}}
          navigationState={{index: tabIndex, routes}}
          renderScene={this.renderScene}
          onIndexChange={this.setIndex}
          initialLayout={{width: width}}
          renderTabBar={this.renderTabBar}
          swipeEnabled={true}
          lazy={false}
        />
      </SafeAreaView>
    );
  }
}

export default DashboardScreen;
