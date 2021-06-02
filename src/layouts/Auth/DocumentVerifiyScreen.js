import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  PixelRatio,
} from 'react-native';
import {TextInput, Button, ProgressBar, Checkbox} from 'react-native-paper';
import AgrxColors from '../../config/AgrxColors';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
export class DocumentVerifiyScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: null,
      imageSubmitted: false,
      documentData: {
        idType: 'Passport',
        idNumber: '1212',
        placeOfIssue: 'Delhi',
        issuingAuthority: 'Ministry of public affairs',
        dateOfIssue: '24/07/2020',
        expiryDate: '24/07/2030',
        name: 'John anderson',
        dateOfBirth: '01/01/1995',
        address: 'India',
        gender: 'Male',
      },
      progress: 0,
      showFinalDetails: false,
      tncAccepted: false,
    };
  }

  render() {
    const {isDark} = this.props.agrxTheme;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ProgressBar progress={this.state.progress} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{flexGrow: 1}}>
          {!this.state.imageSubmitted ? (
            <View style={{marginTop: 28, paddingLeft: 12}}>
              <Text
                style={{fontSize: 32, color: '#009688', fontWeight: 'bold'}}>
                Let's verify your date of birth.
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#6c757d',
                  marginTop: 5,
                  marginBottom: 12,
                }}>
                Which of these document would you like to use for the
                verification?
              </Text>
              <Button
                mode="contained"
                style={styles.buttonStyle}
                onPress={() => {
                  this.setState({
                    selectedImage: true,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: '500',
                  }}>
                  PAN CARD
                </Text>
              </Button>
              <Button
                mode="contained"
                style={styles.buttonStyle}
                onPress={() => {
                  this.setState({
                    selectedImage: true,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: '500',
                  }}>
                  AADHAR CARD
                </Text>
              </Button>
              <Button
                mode="contained"
                style={styles.buttonStyle}
                onPress={() => {
                  this.setState({
                    selectedImage: true,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: '500',
                  }}>
                  PASSPORT
                </Text>
              </Button>
              <View
                style={{
                  marginHorizontal: 8,
                  marginVertical: 8,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                  borderRadius: 3,
                  backgroundColor: isDark ? AgrxColors.darkCard : '#fff',
                  borderWidth: 0.3,
                  borderColor: AgrxColors.igesiaGray,
                }}>
                {!this.state.selectedImage ? (
                  <View
                    style={{
                      padding: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaterialCommunityIcon
                      name={'image-off'}
                      size={35}
                      color={AgrxColors.igesiaGray}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        marginTop: 8,
                      }}>
                      You have not selected any proof
                    </Text>
                  </View>
                ) : (
                  <View>
                    <FastImage
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/empo-e0524.appspot.com/o/Environment-rafiki%20(1).png?alt=media&token=0eccd7b7-0332-447c-b63e-431c6dcdb22f',
                      }}
                      style={{
                        height: 180,
                        width: '100%',
                        alignSelf: 'center',
                      }}
                      resizeMode={'contain'}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        paddingBottom: 16,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            selectedImage: null,
                          });
                        }}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: AgrxColors.error2,
                          padding: 5,
                          borderRadius: 5,
                        }}>
                        <MaterialCommunityIcon
                          name={'close-circle'}
                          size={35}
                          color={'#fff'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            imageSubmitted: true,
                            progress: 0.33,
                          });
                        }}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: AgrxColors.igesiaSuccess,
                          padding: 5,
                          borderRadius: 5,
                          // marginLeft: 12,
                        }}>
                        <MaterialCommunityIcon
                          name={'check-circle'}
                          size={35}
                          color={'#fff'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : !this.state.showFinalDetails ? (
            <View style={{marginTop: 28, paddingLeft: 12}}>
              <Text
                style={{
                  fontSize: 32,
                  color: '#009688',
                  fontWeight: 'bold',
                }}>
                Id Details
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#6c757d',
                  marginTop: 5,
                  marginBottom: 12,
                }}>
                Below are the details we fetched from the document you uploaded.
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: AgrxColors.primary,
                  marginTop: 5,
                }}>
                Identity document type
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#6c757d',
                  marginTop: 5,
                }}>
                {this.state.documentData.idType}
              </Text>
              <View
                style={{
                  marginTop: 3,
                  borderTopWidth: 0.4,
                  borderTopColor: AgrxColors.borderBottomColor,
                  marginBottom: 16,
                  width: '95%',
                }}
              />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: AgrxColors.primary,
                  marginTop: 12,
                }}>
                Document Id No
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#6c757d',
                  marginTop: 5,
                }}>
                {this.state.documentData.idNumber}
              </Text>
              <View
                style={{
                  marginTop: 3,
                  borderTopWidth: 0.4,
                  borderTopColor: AgrxColors.borderBottomColor,
                  marginBottom: 16,
                  width: '95%',
                }}
              />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: AgrxColors.primary,
                  marginTop: 5,
                }}>
                Place of issue
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#6c757d',
                  marginTop: 5,
                }}>
                {this.state.documentData.placeOfIssue}
              </Text>
              <View
                style={{
                  marginTop: 3,
                  borderTopWidth: 0.4,
                  borderTopColor: AgrxColors.borderBottomColor,
                  marginBottom: 16,
                  width: '95%',
                }}
              />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: AgrxColors.primary,
                  marginTop: 5,
                }}>
                Issuing Authority
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#6c757d',
                  marginTop: 5,
                }}>
                {this.state.documentData.issuingAuthority}
              </Text>
              <View
                style={{
                  marginTop: 3,
                  borderTopWidth: 0.4,
                  borderTopColor: AgrxColors.borderBottomColor,
                  marginBottom: 16,
                  width: '95%',
                }}
              />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: AgrxColors.primary,
                  marginTop: 5,
                }}>
                Date Of Issue
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#6c757d',
                  marginTop: 5,
                }}>
                {this.state.documentData.dateOfIssue}
              </Text>
              <View
                style={{
                  marginTop: 3,
                  borderTopWidth: 0.4,
                  borderTopColor: AgrxColors.borderBottomColor,
                  marginBottom: 16,
                  width: '95%',
                }}
              />

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: AgrxColors.primary,
                  marginTop: 5,
                }}>
                Expiry Date
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#6c757d',
                  marginTop: 5,
                }}>
                {this.state.documentData.expiryDate}
              </Text>
              <View
                style={{
                  marginTop: 3,
                  borderTopWidth: 0.4,
                  borderTopColor: AgrxColors.borderBottomColor,
                  marginBottom: 16,
                  width: '95%',
                }}
              />

              <Button
                mode="contained"
                style={[styles.buttonStyle, {width: '90%', marginTop: 50}]}
                onPress={() => {
                  this.setState({
                    progress: 0.66,
                    showFinalDetails: true,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: '500',
                  }}>
                  Next
                </Text>
              </Button>
            </View>
          ) : (
            <View style={{marginTop: 28, paddingLeft: 12}}>
              <Text
                style={{
                  fontSize: 32,
                  color: '#009688',
                  fontWeight: 'bold',
                }}>
                Id Details
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#6c757d',
                  marginTop: 5,
                  marginBottom: 12,
                }}>
                Please verify below details which will be used to create your
                profile.
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: AgrxColors.primary,
                    flex: 0.4,
                  }}>
                  Name
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#6c757d',
                    flex: 0.7,
                  }}>
                  {this.state.documentData.idType}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 3,
                  borderTopWidth: 0.4,
                  borderTopColor: AgrxColors.borderBottomColor,
                  marginBottom: 16,
                  width: '95%',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: AgrxColors.primary,
                    flex: 0.4,
                  }}>
                  Address
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#6c757d',
                    flex: 0.7,
                  }}>
                  {this.state.documentData.address}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 3,
                  borderTopWidth: 0.4,
                  borderTopColor: AgrxColors.borderBottomColor,
                  marginBottom: 16,
                  width: '95%',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: AgrxColors.primary,
                    flex: 0.4,
                  }}>
                  Date of birth
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#6c757d',
                    flex: 0.7,
                  }}>
                  {this.state.documentData.dateOfBirth}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 3,
                  borderTopWidth: 0.4,
                  borderTopColor: AgrxColors.borderBottomColor,
                  marginBottom: 16,
                  width: '95%',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: AgrxColors.primary,
                    flex: 0.4,
                  }}>
                  Id Number
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#6c757d',
                    flex: 0.7,
                  }}>
                  {this.state.documentData.idNumber}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 3,
                  borderTopWidth: 0.4,
                  borderTopColor: AgrxColors.borderBottomColor,
                  marginBottom: 16,
                  width: '95%',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: AgrxColors.primary,
                    flex: 0.4,
                  }}>
                  Gender
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#6c757d',
                    flex: 0.7,
                  }}>
                  {this.state.documentData.gender}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 3,
                  borderTopWidth: 0.4,
                  borderTopColor: AgrxColors.borderBottomColor,
                  marginBottom: 16,
                  width: '95%',
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                }}>
                <Checkbox
                  status={this.state.tncAccepted ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({tncAccepted: !this.state.tncAccepted});
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 5,
                    color: AgrxColors.igesiaGray,
                    flex: 0.95,
                  }}>
                  By checking this, I agree to the{' '}
                  <Text style={{color: AgrxColors.primary}}>
                    privacy policy
                  </Text>{' '}
                  and{' '}
                  <Text style={{color: AgrxColors.primary}}>
                    terms and condtions
                  </Text>{' '}
                  of agrx
                </Text>
              </View>
              <Button
                mode="contained"
                style={[styles.buttonStyle, {width: '90%', marginTop: 16}]}
                onPress={() => {
                  this.setState(
                    {
                      progress: 1,
                    },
                    () => {
                      this.props.navigation.navigate('ProfileDetails');
                    },
                  );
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
          )}
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

export default connect(mapStateToProps, {})(DocumentVerifiyScreen);

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
    marginTop: 3,
    marginBottom: 12,
    width: '80%',
    alignSelf: 'center',
  },
  resetButtonStyle: {
    borderRadius: 2.5,
    borderColor: '#6C757D',
    marginTop: 14,
    marginBottom: 12,
    width: '80%',
    alignSelf: 'center',
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
