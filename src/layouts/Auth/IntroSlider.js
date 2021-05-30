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

  goToLogin = () => {
    this.props.navigation.navigate('OtpScreen', {
      userData: {},
    });
  };

  goToRegister = () => {
    this.props.navigation.navigate('LoginScreen');
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
              style={{flex: 1, paddingTop: 40}}
              horizontal={true}
              scrollEventThrottle={16}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              onScroll={(event) => {
                this.setSliderPage(event);
              }}>
              <View style={{width, height}}>
                <FastImage
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/empo-e0524.appspot.com/o/Environment-bro%20(2).png?alt=media&token=1a3ba314-d456-41b4-b61c-f3be1051ef9e',
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
                    uri: 'https://firebasestorage.googleapis.com/v0/b/empo-e0524.appspot.com/o/Stay%20Positive-bro.png?alt=media&token=ba40e98b-b9da-44c6-841a-d517a21891f2',
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
                    uri: 'https://firebasestorage.googleapis.com/v0/b/empo-e0524.appspot.com/o/Environment-rafiki%20(1).png?alt=media&token=0eccd7b7-0332-447c-b63e-431c6dcdb22f',
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
                  width: '75%',
                  alignSelf: 'center',
                  marginBottom: 12,
                }}
                labelStyle={{color: '#fff'}}
                onPress={this.goToLogin}>
                Login
              </Button>
              <Button
                mode="outlined"
                style={{
                  borderRadius: 20,
                  width: '75%',
                  alignSelf: 'center',
                  borderWidth: 0.6,
                  borderColor: AgrxColors.primary,
                }}
                // labelStyle={{color: '#fff'}}
                onPress={this.goToRegister}>
                Register
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
    backgroundColor: AgrxColors.primary,
    marginLeft: 10,
    marginBottom: 30,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,

    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
