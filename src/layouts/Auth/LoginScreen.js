import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AgrxColors from '../../config/AgrxColors';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: 'null',
    };
  }

  onChangeText = (text) => {
    this.setState({
      name: text,
    });
  };
  render() {
    const {isDark} = this.props.agrxTheme;
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{flex: 1}}>
          <View style={{marginTop: 28, paddingLeft: 12}}>
            <Text style={{fontSize: 32, color: '#009688', fontWeight: 'bold'}}>
              Let's start, shall we?
            </Text>
            <Text style={{fontSize: 16, color: '#6c757d', marginTop: 5}}>
              Tell us about yourself
            </Text>

            <Animatable.View animation="slideInRight" useNativeDriver={true}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  marginTop: 35,
                  textAlign: 'left',
                }}>
                How should we address you?
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 0.4,
                  borderColor: '#6c757d',
                  // width: '30%',
                  alignSelf: 'center',
                  marginTop: 16,
                  borderRadius: 5,
                  backgroundColor: '#fff',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      gender: 'male',
                    });
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      this.state.gender == 'male'
                        ? AgrxColors.primary
                        : 'transparent',
                    borderRightWidth: 0.4,
                    borderRightColor: '#6c757d',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      paddingVertical: 12,
                      color: this.state.gender == 'male' ? '#fff' : '#000',
                      paddingHorizontal: 20,
                    }}>
                    Sir
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      gender: 'female',
                    });
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      this.state.gender == 'female'
                        ? AgrxColors.primary
                        : 'transparent',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      padding: 12,
                      color: this.state.gender == 'female' ? '#fff' : '#000',
                    }}>
                    Ma'am
                  </Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
            {this.state.gender != 'null' && (
              <Animatable.View animation="slideInRight" useNativeDriver={true}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000',
                    marginTop: 35,
                    textAlign: 'left',
                  }}>
                  What should we call you?
                </Text>
                <TextInput
                  mode="outlined"
                  keyboardType="default"
                  placeholder="Enter your name"
                  value={this.state.name}
                  onChangeText={this.onChangeText}
                  style={{
                    width: '60%',
                    backgroundColor: '#fff',
                    alignSelf: 'center',
                    marginTop: 18,
                  }}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                />
              </Animatable.View>
            )}
            {this.state.name.length > 0 && (
              <Animatable.View animation="zoomIn" useNativeDriver={true}>
                <Button
                  mode="contained"
                  style={{
                    borderRadius: 5,
                    width: '60%',
                    alignSelf: 'center',
                    marginTop: 40,
                  }}
                  labelStyle={{color: '#fff'}}
                  onPress={() => {
                    this.props.navigation.navigate('RegisterScreen', {
                      userData: {
                        name: this.state.name,
                        gender: this.state.gender,
                      },
                      isLogin: false,
                    });
                  }}>
                  Proceed
                </Button>
              </Animatable.View>
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

export default connect(mapStateToProps, {})(LoginScreen);
