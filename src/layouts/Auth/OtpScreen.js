import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  BackHandler,
  PixelRatio,
  PermissionsAndroid,
  AsyncStorage,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AgrxColors from '../../config/AgrxColors';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';
import FastImage from 'react-native-fast-image';
import {SEND_OTP, VERIFY_OTP} from '../../config/settings';
import Spinner from '../../components/SpinnerOverlay';
import Toast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonActions} from '@react-navigation/native';

export class OtpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      errors: [],
      otpSent: false,
      otp: '',
      isLoading: false,
      showPass: false,
      password: '',

      phoneNumberFormatted: '',
    };
  }

  async componentDidMount() {
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

  onChangePhoneNumber = (text) => {
    this.setState({
      phoneNumber: text,
      phoneNumberFormatted: `+${this.phoneNumberField.getCallingCode()}${text}`,
      errors: [],
    });
  };

  onChangeOtp = (text) => {
    this.setState({
      otp: text,
      errors: [],
    });
  };

  onChangePassword = (text) => {
    this.setState({
      password: text,
      errors: [],
    });
  };

  onChangePasswordConfirm = (text) => {
    this.setState({
      confirmPassword: text,
      errors: [],
    });
  };

  sendOtp = () => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    console.log(
      regex.test(this.state.phoneNumber),
      'regex.test(this.state.phoneNumber)',
      this.state.phoneNumber,
    );
    if (this.state.phoneNumber.length < 10) {
      let errors = this.state.errors;
      errors['globalError'] = 'Please enter phone number';
      this.setState({
        errors: errors,
      });
      return;
    }

    if (regex.test(this.state.phoneNumber) == false) {
      let errors = this.state.errors;
      errors['globalError'] = 'Please enter valid phone number';
      this.setState({
        errors: errors,
      });
      return;
    }

    this.setState({
      isLoading: true,
    });

    const body = {
      mobileNo: this.state.phoneNumberFormatted,
    };
    console.log(body, 'body');

    fetch(SEND_OTP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'x-api-key': 'bf7fe978-c0f1-11eb-8089-0200cd936042',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response
            .json()
            .then((resposeData) => Promise.resolve(resposeData));
        }
        return response.json().then((errorData) => Promise.reject(errorData));
      })
      .then(
        (responseJson) => {
          console.log('json suceess', responseJson);
          Toast.show('OTP sent successfully!', Toast.LONG);
          // AsyncStorage.setItem('token', JSON.stringify(responseJson.Details));
          this.setState({
            isLoading: false,
            otpSent: true,
          });
        },
        (errors) => {
          console.log('errors', errors);
          let tempError = this.state.errors;
          tempError['phoneError'] = 'Some error occured.';

          this.setState({
            isLoading: false,
            otpSent: false,
            errors: tempError,
          });
        },
      )
      .catch((error) => {
        console.log('error', error);
        let errors = this.state.errors;
        errors['phoneError'] = 'Some error occured.';

        this.setState({
          isLoading: false,
          otpSent: false,
          errors: errors,
        });
      })
      .done();
  };

  verifyOtp = () => {
    if (this.state.otp.length <= 1) {
      let errors = this.state.errors;
      errors['globalError'] = 'Please enter OTP';
      this.setState({
        errors: errors,
      });
      return;
    }

    this.setState({
      isLoading: true,
    });

    const body = {
      mobileNo: this.state.phoneNumberFormatted,
      otp: this.state.otp,
    };

    console.log(body, 'body');

    fetch(VERIFY_OTP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response
            .json()
            .then((resposeData) => Promise.resolve(resposeData));
        }
        return response.json().then((errorData) => Promise.reject(errorData));
      })
      .then(
        (responseJson) => {
          console.log('json suceess', responseJson);
          this.setState({
            isLoading: false,
          });
          if (responseJson?.profileDTO?.ocrFlag) {
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'ProfileStack',
                    params: {
                      screen: 'ProfessionalDetails',
                      params: {
                        mobileNo: this.state.phoneNumberFormatted,
                      },
                    },
                  },
                ],
              }),
            );
          } else {
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'ProfileStack',
                    params: {
                      screen: 'DocumentVerifiyScreen',
                      params: {
                        mobileNo: this.state.phoneNumberFormatted,
                      },
                    },
                  },
                ],
              }),
            );
          }
        },
        (errors) => {
          console.log('errors', errors);
          let errorsTemp = this.state.errors;
          errorsTemp['globalError'] = 'Invalid OTP';
          this.setState({
            isLoading: false,
            errors: errorsTemp,
          });
        },
      )
      .catch((error) => {
        console.log('error', error);
        let errors = this.state.errors;
        errors['globalError'] = 'Invalid OTP';
        this.setState({
          isLoading: false,
          errors: errors,
        });
      })
      .done();
  };

  loginUser = () => {
    this.props.navigation.navigate('HomeTab', {
      mobileNo: this.state.phoneNumberFormatted,
    });
  };

  editPhone = () => {
    this.setState({
      otpSent: false,
      otp: '',
    });
  };

  render() {
    const {isDark} = this.props.agrxTheme;
    const {isLogin} = this.props.route.params;
    const {isLoading, phoneNumber, otp, errors, password} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Spinner visible={isLoading} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{marginHorizontal: 12, marginTop: 20}}>
            <FastImage
              style={{
                height: isLogin
                  ? PixelRatio.getPixelSizeForLayoutSize(50)
                  : PixelRatio.getPixelSizeForLayoutSize(70),
                width: isLogin ? '60%' : '80%',
                alignSelf: 'center',
              }}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/empo-e0524.appspot.com/o/Forgot%20password-rafiki%20(1).png?alt=media&token=68494fe2-3b81-47a8-81a2-1bfeda443bf1',
              }}
            />

            {this.state.otpSent == false ? (
              <View>
                <View>
                  <Text
                    style={isDark ? styles.updateTextDark : styles.updateText}>
                    Enter your contact number
                  </Text>
                  {!isLogin && (
                    <Text style={styles.subheadingText}>
                      To verify we will send an OTP to your number
                    </Text>
                  )}

                  <PhoneInput
                    ref={(ref) => {
                      this.phoneNumberField = ref;
                    }}
                    value={phoneNumber}
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
                  {(() => {
                    if (errors.phoneError)
                      return (
                        <Text style={styles.errorLabel}>
                          {errors.phoneError}{' '}
                        </Text>
                      );
                  })()}
                  {isLogin && (
                    <View>
                      <TextInput
                        mode="flat"
                        // label="Enter otp"
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={this.onChangePassword}
                        style={{
                          width: '100%',
                          backgroundColor: '#fff',
                          alignSelf: 'center',
                          marginTop: 8,
                        }}
                        secureTextEntry={this.state.showPass ? false : true}
                        underlineColor="transparent"
                        underlineColorAndroid="transparent"
                        right={
                          <TextInput.Icon
                            onPress={() => {
                              this.setState({
                                showPass: !this.state.showPass,
                              });
                            }}
                            name={() => (
                              <Ionicons
                                name={this.state.showPass ? 'eye' : 'eye-off'}
                                size={25}
                                color={AgrxColors.igesiaGray}
                              />
                            )}
                          />
                        }
                      />
                      {(() => {
                        if (errors.passwordError)
                          return (
                            <Text style={styles.errorLabel}>
                              {errors.passwordError}{' '}
                            </Text>
                          );
                      })()}
                      <Button
                        mode="contained"
                        style={styles.buttonStyle}
                        onPress={this.sendOtp}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: '500',
                          }}>
                          Login
                        </Text>
                      </Button>

                      <Text
                        style={{
                          fontSize: 22,
                          color: AgrxColors.igesiaGray,
                          textAlign: 'center',
                        }}>
                        OR
                      </Text>
                    </View>
                  )}

                  <Button
                    mode="contained"
                    style={[
                      styles.buttonStyle,
                      isLogin && {backgroundColor: '#fff'},
                    ]}
                    onPress={this.sendOtp}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: isLogin ? AgrxColors.primary : '#fff',
                        textTransform: 'none',
                        fontWeight: '500',
                      }}>
                      Request OTP
                    </Text>
                  </Button>
                </View>
              </View>
            ) : (
              <View>
                <View>
                  <Text
                    style={isDark ? styles.updateTextDark : styles.updateText}>
                    Verify your number
                  </Text>
                  <Text style={styles.subheadingText}>
                    Enter verification code sent to {phoneNumber}
                  </Text>
                  <TextInput
                    mode="outlined"
                    // label="Enter otp"
                    keyboardType="number-pad"
                    placeholder="Enter OTP"
                    value={otp}
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
                  {(() => {
                    if (errors.globalError)
                      return (
                        <Text style={styles.errorLabel}>
                          {errors.globalError}{' '}
                        </Text>
                      );
                  })()}
                  <Button
                    mode="contained"
                    style={styles.buttonStyle}
                    onPress={this.verifyOtp}>
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={this.editPhone}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: AgrxColors.igesiaGray, fontSize: 16}}>
                      Edit phone number?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.sendOtp}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: AgrxColors.primary, fontSize: 16}}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
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
