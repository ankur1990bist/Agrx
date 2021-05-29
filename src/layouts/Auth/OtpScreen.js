import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AgrxColors from '../../config/AgrxColors';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';
export class OtpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      errors: [],
    };
  }

  onChangeText = (text) => {
    this.setState({
      name: text,
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
            <Text style={{fontSize: 32, color: '#009688', fontWeight: 'bold'}}>
              Alright {name},
            </Text>
            <Text style={isDark ? styles.updateTextDark : styles.updateText}>
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
                placeholderTextColor: isDark ? AgrxColors.darkText : '#6c757d',
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
              onPress={this.verifyNumber}>
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
                <Hyperlink linkDefault={true} linkStyle={{color: '#2980b9'}}>
                  <Text style={styles.errorLabel}>
                    {this.state.errors.phoneNumber}{' '}
                  </Text>
                </Hyperlink>
              );
          })()}
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
