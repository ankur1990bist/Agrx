import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {TextInput, Button, ProgressBar, Checkbox} from 'react-native-paper';
import AgrxColors from '../../config/AgrxColors';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SAVE_DOCUMENT_DATA, UPLOAD_IMAGE} from '../../config/settings';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';
import Spinner from '../../components/SpinnerOverlay';

export class DocumentVerifiyScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: null,
      imageSubmitted: false,
      documentData: {
        idType: 'Passport',
        idNumber: 'AWLPV1081D',
        name: 'DEEPAK VERMA',
        dateOfBirth: '14/08/1996',
      },
      progress: 0,
      tncAccepted: false,
      pressed: false,
      uploadProgress: '',
      editDocType: false,
      editDocNo: false,
      editName: false,
      editDOB: false,
      type: '',
      id: '',
      name: '',
      dob: '',
      errors: [],
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    if (this.state.selectedImage == null) {
      this.props.navigation.goBack();
    } else if (this.state.imageSubmitted) {
      this.setState({
        imageSubmitted: false,
      });
    }
    return true;
  };

  imageTapped = (docType) => {
    this.setState({
      pressed: true,
    });
    const options = {
      storageOptions: {
        skipBackup: true,
        cameraRoll: true,
      },
      allowsEditing: true,
      mediaType: 'photo',
      saveToPhotos: false,
    };

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log(response.didCancel, 'response.didCancel');
        this.setState({
          pressed: false,
        });
      } else if (response.error) {
        console.log(response.error, 'response.error');
        this.setState({
          pressed: false,
        });
      } else if (response.customButton) {
        console.log(response.customButton, 'response.customButton');
        this.setState({
          pressed: false,
        });
      } else {
        this.setState({
          pressed: false,
          selectedImage: response,
          documentData: {
            ...this.state.documentData,
            idType: docType,
          },
        });
        console.log(response, 'response image');
      }
    });
  };

  uploadImage = () => {
    // this.setState({
    //   isLoading: false,
    //   imageSubmitted: true,
    //   progress: 0.33,
    // });
    // return;
    const {selectedImage} = this.state;
    const mobileNo = this.props.route.params.mobileNo;
    let body = [
      {
        name: 'file',
        filename: `IMG_${Date.now()}`,
        data:
          Platform.OS == 'android'
            ? RNFetchBlob.wrap(selectedImage.uri)
            : RNFetchBlob.wrap(selectedImage.uri.replace('file://', '')),
      },
      {
        name: 'mobileNo',
        data: mobileNo,
      },
    ];

    console.log(body, 'body');
    this.setState({
      isLoading: true,
    });

    RNFetchBlob.fetch(
      'POST',
      UPLOAD_IMAGE,
      {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body,
    )
      .uploadProgress((written, total) => {
        console.log('uploaded', written / total);
        this.setState({
          uploadProgress: (written / total).toFixed(2) * 100,
        });
      })
      .then((resp) => {
        console.log('resp', resp);
        if (resp.data) {
          let docData = JSON.parse(resp.data);
          console.log(docData, 'docData');
          this.setState({
            isLoading: false,
            imageSubmitted: true,
            progress: 0.33,
            documentData: {
              ...this.state.documentData,
              idNumber: docData?.result?.documentNumber,
              name:
                docData?.result?.fullName.length > 0
                  ? docData?.result?.fullName
                  : docData?.result?.firstName + docData?.result?.lastName,
              dateOfBirth: `${docData?.result?.dateOfBirth?.day}/${docData?.result?.dateOfBirth?.month}/${docData?.result?.dateOfBirth?.year}`,
            },
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        this.setState({
          isLoading: false,
        });
      });
  };

  onChangeType = (text) => {
    this.setState({
      type: text,
      isManual: true,
    });
  };

  onChangeNo = (text) => {
    this.setState({
      id: text,
      isManual: true,
    });
  };

  onChangeName = (text) => {
    this.setState({
      name: text,
      isManual: true,
    });
  };

  onChangeDOB = (text) => {
    this.setState({
      dob: text,
      isManual: true,
    });
  };

  saveData = () => {
    this.setState(
      {
        progress: 1,
      },
      () => {
        this.props.navigation.navigate('ProfessionalDetails');
      },
    );
    return;
    const body = {
      farmerName: this.state.documentData.name,
      dateOfBirth: this.state.documentData.dateOfBirth,
      docType: this.state.documentData.idType,
      documentNumber: this.state.documentData.idNumber,
      // gender: 'M',
    };
    console.log(body, 'body');

    fetch(SAVE_DOCUMENT_DATA, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'x-api-key': 'bf7fe978-c0f1-11eb-8089-0200cd936042',
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
          // this.setState(
          //   {
          //     progress: 1,
          //   },
          //   () => {
          //     this.props.navigation.navigate('ProfessionalDetails');
          //   },
          // );
        },
        (errors) => {
          console.log('errors', errors);
          let tempError = this.state.errors;
          tempError['globalError'] = 'Some error occured.';

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
        errors['globalError'] = 'Some error occured.';

        this.setState({
          isLoading: false,
          otpSent: false,
          errors: errors,
        });
      })
      .done();
  };

  render() {
    const {isDark} = this.props.agrxTheme;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ProgressBar progress={this.state.progress} />
        <Spinner visible={this.state.isLoading} />
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
                onPress={() => this.imageTapped('PAN CARD')}>
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
                onPress={() => this.imageTapped('AADHAR CARD')}>
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
                onPress={() => this.imageTapped('PASSPORT')}>
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
                {!this.state.selectedImage?.uri ? (
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
                        uri: this.state.selectedImage.uri,
                      }}
                      style={{
                        marginTop: 8,
                        height: 200,
                        width: '100%',
                        alignSelf: 'center',
                        borderRadius: 5,
                      }}
                      resizeMode={'contain'}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        paddingBottom: 16,
                        marginTop: 12,
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
                        onPress={this.uploadImage}
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
                Below are the details we fetched from the document you uploaded.
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
                  Document type
                </Text>
                {this.state.editDocType ? (
                  <TextInput
                    mode="flat"
                    keyboardType="default"
                    placeholder="Enter document type"
                    value={this.state.type}
                    onChangeText={this.onChangeType}
                    style={{
                      // width: '60%',
                      backgroundColor: 'transparent',
                      // alignSelf: 'center',
                      marginTop: 18,
                      flex: 0.55,
                      height: 30,
                    }}
                    underlineColor="transparent"
                    underlineColorAndroid="transparent"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#6c757d',
                      flex: 0.55,
                    }}>
                    {this.state.documentData.idType}
                  </Text>
                )}
                <TouchableOpacity
                  style={{marginRight: 0}}
                  onPress={() => {
                    this.setState({
                      editDocType: !this.state.editDocType,
                    });
                  }}>
                  <MaterialCommunityIcon
                    name={this.state.editDocType ? 'check' : 'pencil'}
                    size={25}
                    color={
                      this.state.editDocType
                        ? AgrxColors.igesiaSuccess
                        : AgrxColors.igesiaGray
                    }
                  />
                </TouchableOpacity>
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
                  Document Id No
                </Text>
                {this.state.editDocNo ? (
                  <TextInput
                    mode="flat"
                    keyboardType="default"
                    placeholder="Enter document number"
                    value={this.state.id}
                    onChangeText={this.onChangeNo}
                    style={{
                      // width: '60%',
                      backgroundColor: 'transparent',
                      // alignSelf: 'center',
                      marginTop: 18,
                      flex: 0.55,
                      height: 30,
                    }}
                    underlineColor="transparent"
                    underlineColorAndroid="transparent"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#6c757d',
                      flex: 0.55,
                    }}>
                    {this.state.documentData.idNumber}
                  </Text>
                )}
                <TouchableOpacity
                  style={{marginRight: 0}}
                  onPress={() => {
                    this.setState({
                      editDocNo: !this.state.editDocNo,
                    });
                  }}>
                  <MaterialCommunityIcon
                    name={this.state.editDocNo ? 'check' : 'pencil'}
                    size={25}
                    color={
                      this.state.editDocNo
                        ? AgrxColors.igesiaSuccess
                        : AgrxColors.igesiaGray
                    }
                  />
                </TouchableOpacity>
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
                  Name
                </Text>
                {this.state.editName ? (
                  <TextInput
                    mode="flat"
                    keyboardType="default"
                    placeholder="Enter name"
                    value={this.state.name}
                    onChangeText={this.onChangeName}
                    style={{
                      // width: '60%',
                      backgroundColor: 'transparent',
                      // alignSelf: 'center',
                      marginTop: 18,
                      flex: 0.55,
                      height: 30,
                    }}
                    underlineColor="transparent"
                    underlineColorAndroid="transparent"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#6c757d',
                      flex: 0.55,
                    }}>
                    {this.state.documentData.name}
                  </Text>
                )}
                <TouchableOpacity
                  style={{marginRight: 0}}
                  onPress={() => {
                    this.setState({
                      editName: !this.state.editName,
                    });
                  }}>
                  <MaterialCommunityIcon
                    name={this.state.editName ? 'check' : 'pencil'}
                    size={25}
                    color={
                      this.state.editName
                        ? AgrxColors.igesiaSuccess
                        : AgrxColors.igesiaGray
                    }
                  />
                </TouchableOpacity>
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
                {this.state.editDOB ? (
                  <TextInput
                    mode="flat"
                    keyboardType="default"
                    placeholder="Enter date of birth"
                    value={this.state.dob}
                    onChangeText={this.onChangeDOB}
                    style={{
                      // width: '60%',
                      backgroundColor: 'transparent',
                      // alignSelf: 'center',
                      marginTop: 18,
                      flex: 0.55,
                      height: 30,
                    }}
                    underlineColor="transparent"
                    underlineColorAndroid="transparent"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#6c757d',
                      flex: 0.55,
                    }}>
                    {this.state.documentData.dateOfBirth}
                  </Text>
                )}
                <TouchableOpacity
                  style={{marginRight: 0}}
                  onPress={() => {
                    this.setState({
                      editDOB: !this.state.editDOB,
                    });
                  }}>
                  <MaterialCommunityIcon
                    name={this.state.editDOB ? 'check' : 'pencil'}
                    size={25}
                    color={
                      this.state.editDOB
                        ? AgrxColors.igesiaSuccess
                        : AgrxColors.igesiaGray
                    }
                  />
                </TouchableOpacity>
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
                  if (this.state.tncAccepted == false) {
                    Toast.show('Please accept terms and conditions first.');
                    return;
                  }
                  this.saveData();
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
