import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  BackHandler,
  PixelRatio,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AgrxColors from '../../config/AgrxColors';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';
import FastImage from 'react-native-fast-image';
export class OtpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      errors: [],
      otpSent: false,
      otp: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    if (this.state.otpSent) {
      this.setState({
        otpSent: false,
      });
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };

  onChangeOtp = (text) => {
    this.setState({
      otp: text,
    });
  };
  render() {
    const {isDark} = this.props.agrxTheme;
    const {name} = this.props.route.params.userData;
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{flex: 1}}>
          <View style={{marginHorizontal: 12, marginTop: 20}}>
            <FastImage
              style={{
                height: PixelRatio.getPixelSizeForLayoutSize(70),
                width: '80%',
                alignSelf: 'center',
              }}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/empo-e0524.appspot.com/o/Forgot%20password-rafiki%20(1).png?alt=media&token=68494fe2-3b81-47a8-81a2-1bfeda443bf1',
              }}
            />
            {name && (
              <Text
                style={{fontSize: 32, color: '#009688', fontWeight: 'bold'}}>
                Alright {name},
              </Text>
            )}
            {this.state.otpSent == false ? (
              <View>
                <View>
                  <Text
                    style={isDark ? styles.updateTextDark : styles.updateText}>
                    Enter your contact number
                  </Text>
                  <Text style={styles.subheadingText}>
                    To verify we will send an OTP to your number
                  </Text>
                  <PhoneInput
                    ref={(ref) => {
                      this.phoneNumberField = ref;
                    }}
                    value={this.state.phoneNumber}
                    onChangeText={this.onChangePhoneNumber}
                    onChangeCountry={this.onChangeCountry}
                    placeholder={'Phone number*'}
                    textInputProps={{keyboardType: 'number-pad', maxLength: 10}}
                    // containerStyle={
                    //   isDark ? styles.inputStyleDark : styles.inputStyle
                    // }
                    textInputProps={{
                      keyboardType: 'number-pad',
                      maxLength: 10,
                      placeholderTextColor: isDark
                        ? AgrxColors.darkText
                        : '#6c757d',
                      color: isDark ? AgrxColors.darkText : '#000',
                    }}
                    textContainerStyle={{
                      borderRadius: 5,
                      backgroundColor: isDark ? AgrxColors.darkCard : '#fff',
                    }}
                    codeTextStyle={{
                      backgroundColor: isDark ? AgrxColors.darkCard : '#fff',
                      color: isDark ? AgrxColors.darkText : '#000',
                    }}
                    containerStyle={{
                      backgroundColor: isDark ? AgrxColors.darkCard : '#fff',
                      width: '100%',
                    }}
                    flagButtonStyle={{
                      backgroundColor: isDark ? AgrxColors.darkCard : '#fff',
                    }}
                    withDarkTheme={isDark}
                  />

                  <Button
                    mode="contained"
                    style={styles.buttonStyle}
                    onPress={() => {
                      this.setState({
                        otpSent: true,
                      });
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: '500',
                      }}>
                      Submit
                    </Text>
                  </Button>
                </View>

                {(() => {
                  if (this.state.errors.phoneNumber)
                    return (
                      <Hyperlink
                        linkDefault={true}
                        linkStyle={{color: '#2980b9'}}>
                        <Text style={styles.errorLabel}>
                          {this.state.errors.phoneNumber}
                        </Text>
                      </Hyperlink>
                    );
                })()}
              </View>
            ) : (
              <View>
                <View>
                  <Text
                    style={isDark ? styles.updateTextDark : styles.updateText}>
                    Verify you number
                  </Text>
                  <Text style={styles.subheadingText}>
                    Enter verification code sent to {this.state.phoneNumber}
                  </Text>
                  <TextInput
                    mode="outlined"
                    // label="Enter otp"
                    keyboardType="number-pad"
                    placeholder="Enter your otp"
                    value={this.state.otp}
                    onChangeText={this.onChangeOtp}
                    style={{
                      width: '100%',
                      backgroundColor: '#fff',
                      alignSelf: 'center',
                      //   marginTop: 18,
                    }}
                    underlineColor="transparent"
                    underlineColorAndroid="transparent"
                  />

                  <Button
                    mode="contained"
                    style={styles.buttonStyle}
                    onPress={() => {
                      this.props.navigation.navigate('DocumentVerifiyScreen');
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: '500',
                      }}>
                      Verify
                    </Text>
                  </Button>
                </View>

                {(() => {
                  if (this.state.errors.phoneNumber)
                    return (
                      <Hyperlink
                        linkDefault={true}
                        linkStyle={{color: '#2980b9'}}>
                        <Text style={styles.errorLabel}>
                          {this.state.errors.phoneNumber}
                        </Text>
                      </Hyperlink>
                    );
                })()}
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    agrxTheme: state.agrxTheme,
  };
};

export default connect(mapStateToProps, {})(OtpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff2f5',
  },
  containerDark: {
    flex: 1,
    backgroundColor: AgrxColors.darkBackground,
  },
  updateText: {
    marginTop: 12,

    fontSize: 25,
    fontWeight: '600',
    marginBottom: 12,
    width: '100%',
  },
  updateTextDark: {
    marginTop: 12,

    fontSize: 25,
    fontWeight: '600',
    marginBottom: 12,
    width: '100%',
    color: AgrxColors.darkText,
  },
  inputStyle: {backgroundColor: '#fff', width: '100%'},
  inputStyleDark: {backgroundColor: AgrxColors.darkBackground, width: '100%'},
  innerContainer: {
    marginHorizontal: 14,
  },
  buttonStyle: {
    borderRadius: 2.5,
    marginTop: 14,
    marginBottom: 12,
  },
  resetButtonStyle: {
    borderRadius: 2.5,
    borderColor: '#6C757D',
    marginTop: 14,
    marginBottom: 12,
  },
  subheadingText: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 25,
  },
  errorLabel: {
    color: '#bd3b49',
    fontSize: 16,
    marginVertical: 8,
    fontWeight: '600',
  },
});
