import React, {PureComponent} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  PixelRatio,
  AsyncStorage,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import AgrxColors from '../../config/AgrxColors';
const {width, height} = Dimensions.get('window');

class IntroSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sliderState: {currentPage: 0},
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('tokenFound').then((token) => {
      if (token == 'true') {
        this.setState(
          {
            loading: false,
          },
          () => {
            // this.props.navigation.navigate('WorkspaceStack');
          },
        );

        SplashScreen.hide();
      } else {
        SplashScreen.hide();
        // this.props.navigation.navigate('Auth');
      }
    });
  }

  setSliderPage = (event) => {
    const {currentPage} = this.state.sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      this.setState({
        sliderState: {
          ...this.state.sliderState,
          currentPage: indexOfNextScreen,
        },
      });
    }
  };

  hidePager = () => {
    AsyncStorage.setItem('hidePager', 'true');
    this.props.navigation.navigate('Auth');
  };

  render() {
    const pageIndex = this.state.sliderState.currentPage;
    const {isDark} = this.props.agrxTheme;
    return (
      <>
        {this.state.loading == false ? (
          <SafeAreaView style={styles.container}>
            <StatusBar
              backgroundColor={AgrxColors.darkBackground}
              barStyle={
                Platform.OS == 'android'
                  ? isDark
                    ? 'light-content'
                    : 'default'
                  : isDark
                  ? 'light-content'
                  : 'dark-content'
              }
            />

            <ScrollView
              style={{flex: 1, marginTop: 60}}
              horizontal={true}
              scrollEventThrottle={16}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 12}}
              onScroll={(event) => {
                this.setSliderPage(event);
              }}>
              <View style={{width, height}}>
                <FastImage
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/empo-e0524.appspot.com/o/Environment-bro.png?alt=media&token=ac6377f4-d621-495a-9dbe-1e4f97019840',
                  }}
                  style={styles.imageStyle}
                />
                <View style={styles.wrapper}>
                  <Text style={styles.header}>
                    Cultivating Ideas for Growth.
                  </Text>
                  <Text style={styles.paragraph}>
                    Suite of Agriculture Management
                  </Text>
                </View>
              </View>
              <View style={{width, height}}>
                <FastImage
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/empo-e0524.appspot.com/o/Nature-bro.png?alt=media&token=158e1833-08c3-4f09-ad04-c2465dce1044',
                  }}
                  style={styles.imageStyle}
                />
                <View style={styles.wrapper}>
                  <Text style={styles.header}>
                    Cultivating Ideas for Growth.
                  </Text>
                  <Text style={styles.paragraph}>
                    Suite of Agriculture Management
                  </Text>
                </View>
              </View>
              <View style={{width, height}}>
                <FastImage
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/empo-e0524.appspot.com/o/Environment-rafiki.png?alt=media&token=6f0cca77-90f2-4ff3-a6a0-3533dfab8216',
                  }}
                  style={styles.imageStyle}
                />
                <View style={styles.wrapper}>
                  <Text style={styles.header}>
                    Cultivating Ideas for Growth.
                  </Text>
                  <Text style={styles.paragraph}>
                    Suite of Agriculture Management
                  </Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
              <View style={styles.paginationWrapper}>
                {Array.from(Array(3).keys()).map((key, index) => (
                  <View
                    style={[
                      styles.paginationDots,
                      {opacity: pageIndex === index ? 1 : 0.2},
                    ]}
                    key={index}
                  />
                ))}
              </View>
              <Button
                mode="contained"
                style={{
                  borderRadius: 20,
                  width: '60%',
                  backgroundColor: '#007bff',
                  alignSelf: 'center',
                }}
                onPress={this.hidePager}>
                Get Started
              </Button>
            </View>
          </SafeAreaView>
        ) : (
          <SafeAreaView style={styles.container}>
            <StatusBar
              backgroundColor={AgrxColors.darkBackground}
              barStyle={Platform.OS == 'android' ? 'default' : 'dark-content'}
            />
          </SafeAreaView>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    agrxTheme: state.agrxTheme,
  };
};

export default connect(mapStateToProps, {})(IntroSlider);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(70),
    width: '80%',
    alignSelf: 'center',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 8,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 17,
    color: '#6c757d',
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#007bff',
    marginLeft: 10,
    marginBottom: 30,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
