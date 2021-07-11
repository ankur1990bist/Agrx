import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  BackHandler,
  FlatList,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AgrxColors from '../../config/AgrxColors';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PROFESSIONAL_DETAILS} from '../../config/settings';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash';

function getId() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

const payScheme = {
  questionTitle: 'You are paid on:',
  id: getId(),
  child: [
    {id: getId(), title: 'Hourly Basis'},
    {id: getId(), title: 'Fixed Pay'},
  ],
};

const afterBuy = {
  questionTitle: 'What do you do after buying the produce from farmer?',
  id: getId(),
  child: [
    {id: getId(), title: 'Immediately sell to market'},
    {id: getId(), title: 'Store for future'},
  ],
};

const typeOfSeed = {
  questionTitle: 'Are you a',
  id: getId(),
  child: [
    {id: getId(), title: 'Government Seed Provider'},
    {id: getId(), title: 'Private Seed Provider'},
  ],
};

const buyFrom = {
  id: getId(),
  questionTitle: 'You buy the crop from',
  child: [
    {id: getId(), title: 'Direct from farmer'},
    {
      id: getId(),
      title: 'Village trader or Agent',
    },
  ],
};

const sellTo = {
  id: getId(),
  questionTitle: 'You sell the crop to',
  child: [
    {
      id: getId(),
      title: 'Nearbuy Market(Mandis)',
      child: [buyFrom],
    },
    {
      id: getId(),
      title: 'Food Product Industry',
      child: [buyFrom],
    },
    {
      id: getId(),
      title: 'Government',
      child: [buyFrom],
    },
    {
      id: getId(),
      title: 'Local Shops',
      child: [buyFrom],
    },
  ],
};

const typeOfService = {
  questionTitle: 'What all services you give to farmer',
  id: getId(),
  child: [
    {id: getId(), title: 'Loan to farmer'},
    {id: getId(), title: 'Storage facility to farmer'},
    {id: getId(), title: 'Transportation to farmer'},
    {id: 999, title: 'Others'},
  ],
};

const jsonData = {
  questionTitle: 'Choose your category',
  id: getId(),
  child: [
    {id: 0, title: 'Producer / Grower'},
    {
      id: 1,
      title: 'Non Farmer',
      child: [
        {
          questionTitle: 'You are a:',
          id: 9,
          child: [
            {
              id: 10,
              title: 'Dairy Man',
              child: [
                {
                  questionTitle: 'You work in your',
                  id: 13,
                  child: [
                    {
                      id: 14,
                      title: 'Own Farm',
                      child: [
                        {
                          questionTitle: 'What is your herd size?',
                          id: 16,
                          child: [
                            {id: 17, title: '5-20', child: []},
                            {id: 18, title: '20-30', child: []},
                            {id: 19, title: '30-40', child: []},
                            {id: 20, title: '50 or more', child: []},
                          ],
                        },
                      ],
                    },
                    {
                      id: 15,
                      title: 'Hired by other farm',
                      child: [payScheme],
                    },
                  ],
                },
              ],
            },
            {
              id: 11,
              title: 'Horticulturist',
              child: [
                {
                  questionTitle: 'You work in a: ',
                  id: 24,
                  child: [
                    {
                      title: 'Small Family Owned Farm',
                      id: 25,
                      child: [
                        {
                          questionTitle: 'You are hired as: ',
                          id: 28,
                          child: [
                            {
                              title: 'Seasonal Horticulturist',
                              id: 29,
                              child: [payScheme],
                            },
                            {title: 'Fixed Horticulturist', id: 30},
                          ],
                        },
                      ],
                    },
                    {
                      id: 26,
                      title: 'Corporate Farm',
                      child: [
                        {
                          questionTitle: 'You are hired as:',
                          id: getId(),
                          child: [
                            {
                              id: getId(),
                              title: 'Seasonal Horticulturist',
                              child: [payScheme],
                            },
                            {
                              id: getId(),
                              title: 'Fixed Horticulturist',
                              child: [payScheme],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: getId(),
                      title: 'Own Farm',
                      child: [
                        {
                          questionTitle: 'What kind of orchard you grow?',
                          id: getId(),
                          child: [
                            {id: getId(), title: 'Fruit Orchard'},
                            {id: getId(), title: 'Nut Orchard'},
                            {id: getId(), title: 'Seed Orchard'},
                            {
                              id: getId(),
                              title: 'Other types of orchard',
                              otherType: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 12,
              title: 'Honey Farmer',
              child: [
                {
                  id: getId(),
                  questionTitle: 'You work for',
                  child: [
                    {
                      id: getId(),
                      title: 'Large Companies',
                      child: [
                        {
                          questionTitle: 'You are hired as',
                          id: getId(),
                          child: [
                            {
                              id: getId(),
                              title: 'Seasonal Honey Farmer',
                              child: [payScheme],
                            },
                            {
                              id: getId(),
                              title: 'Fixed Honey Farmer',
                              child: [payScheme],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: getId(),
                      title: 'Self Employed',
                      child: [
                        {
                          id: getId(),
                          questionTitle: 'How many hives you have?',
                          child: [
                            {id: getId(), title: '2-10'},
                            {id: getId(), title: '10-20'},
                            {id: getId(), title: '20-30'},
                            {id: getId(), title: 'More than 30'},
                          ],
                        },
                      ],
                    },
                    {
                      id: getId(),
                      title: 'Privately Owned Firm',
                      child: [
                        {
                          questionTitle: 'You are hired as: ',
                          id: getId(),
                          child: [
                            {
                              id: getId(),
                              title: 'Seasonal Honey Farmer',
                              child: [payScheme],
                            },
                            {
                              id: getId(),
                              title: 'Fixed honey Farmer',
                              child: [payScheme],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {id: 999, title: 'Others'},
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Corporate Seller',
      child: [
        {
          questionTitle: 'You are a:',
          id: getId(),
          child: [
            {
              id: getId(),
              title: 'Seed Provider',
              child: [
                {
                  questionTitle: 'What kind of seed do you provide to farmers?',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Breeder seed',
                      child: [typeOfSeed],
                    },
                    {
                      id: getId(),
                      title: 'Foundation seed',
                      child: [typeOfSeed],
                    },
                    {
                      id: getId(),
                      title: 'Registered seed',
                      child: [typeOfSeed],
                    },
                    {
                      id: getId(),
                      title: 'Certified seed',
                      child: [typeOfSeed],
                    },
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'Wholesaler',
              child: [
                {
                  questionTitle:
                    'You are wholesaler of which agriculture product?',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Food Products',
                      child: [sellTo],
                    },
                    {
                      id: getId(),
                      title: 'Fuel Products',
                      child: [sellTo],
                    },
                    {
                      id: getId(),
                      title: 'Fibre Products',
                      child: [sellTo],
                    },
                    {
                      id: getId(),
                      title: 'Raw Material Products',
                      child: [sellTo],
                    },
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'Village Trader',
              child: [
                {
                  questionTitle: 'You sell the crop to',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Nearby Market(Mandis)',
                      child: [afterBuy],
                    },
                    {
                      id: getId(),
                      title: 'Food Product Industry',
                      child: [afterBuy],
                    },
                    {id: getId(), title: 'Government', child: [afterBuy]},
                    {id: getId(), title: 'Wholesaler', child: [afterBuy]},
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'Commission Agent',
              child: [
                {
                  questionTitle: 'Are you a representative of',
                  id: getId(),
                  child: [
                    {id: getId(), title: 'Seller', child: [typeOfService]},
                    {id: getId(), title: 'Buyer', child: [typeOfService]},
                    {id: getId(), title: 'Both', child: [typeOfService]},
                  ],
                },
              ],
            },
            {id: 999, title: 'Others'},
          ],
        },
      ],
    },
    {id: 3, title: 'Customer / Buyer'},
    {id: 4, title: 'Support Community'},
    {id: 5, title: 'Monitoring Community'},
    {id: 6, title: 'Labour & Employment'},
    {id: 7, title: 'Finance'},
    {id: 999, title: 'Others'},
  ],
};

let initialState = {
  name: '',
  workData: [],
  selectedData: [],
  showSubmit: false,
  categoryDescription: '',
  categoryText: '',
  showOther: false,
  selectedOption: null,
  selectedImage: [],
  pressed: false,
};

export class ProfessionalDetails extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  async componentDidMount() {
    this.setState({
      workData: jsonData,
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              this.setState(initialState);
              this.resetData();
            }}
            style={{margin: 8}}>
            <Text
              style={{
                color: AgrxColors.primary,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        );
      },
    });
  }

  resetData = () => {
    this.setState({
      workData: jsonData,
    });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.setState({
      occupationCategory: 0,
    });
    return true;
  };

  onChangeText = (text) => {
    this.setState({
      categoryText: text,
    });
  };

  getData = (id) => {
    // jsonData[id]
    if (this.state.workData?.child?.length > 0) {
      let temp = _.find(this.state.workData.child, {id});

      console.log(temp, 'temp');

      if (temp?.child?.length > 0) {
        this.setState({
          workData: temp.child[0],
        });
      } else {
        this.setState({
          showSubmit: true,
        });
      }
    } else {
      this.setState({
        showSubmit: true,
      });
    }

    return;
    let url = PROFESSIONAL_DETAILS;

    if (id) {
      url = url + id;
    } else {
      url = url + 1;
    }
    console.log(url, 'urlurl');
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        // 'x-api-key': 'bf7fe978-c0f1-11eb-8089-0200cd936042',
        'Content-Type': 'application/json',
      },
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
          if (responseJson.options == null) {
            this.setState({
              showSubmit: true,
            });
            return;
          }
          if (
            responseJson.options.length == 1 &&
            responseJson.options[0].id > 2
          ) {
            this.getData(responseJson.options[0].id);
            return;
          }
          this.setState({
            workData: responseJson,
          });
        },
        (errors) => {
          console.log('errors', errors);
        },
      )
      .catch((error) => {
        console.log('error', error);
      })
      .done();
  };

  renderOptions = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            selectedData: [...this.state.selectedData, item],
            selectedOption: item.id,
          });
          this.getData(item.id);
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            this.state.selectedOption == item.id
              ? AgrxColors.primary
              : 'transparent',
          borderRadius: 5,

          borderWidth: 0.4,
          borderColor: AgrxColors.borderBottomColor,
          width: '45%',
          marginHorizontal: 5,
          alignSelf: 'center',
          marginTop: 8,
        }}>
        <Text
          style={{
            fontSize: 16,
            padding: 12,
            color: this.state.selectedOption == item.id ? '#fff' : '#000',
            textAlign: 'center',
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  onChangeCategory = (text) => {
    this.setState({
      categoryText: text,
    });
  };

  onChangeCategoryDescription = (text) => {
    this.setState({
      categoryDescription: text,
    });
  };

  imageTapped = () => {
    if (this.state.selectedImage.length == 5) {
      Toast.show('You can upload max 5 documents');
      return;
    }
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
          selectedImage: [...this.state.selectedImage, response],
        });
        console.log(response, 'response image');
      }
    });
  };

  renderSelectedDoc = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{
            fontSize: 16,
            color: AgrxColors.igesiaGray,
            flex: 0.8,
            // maxWidth: '50%',
          }}>
          {index + 1}) {item.fileName}
        </Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 35,
            width: 35,
            flex: 0.2,
          }}
          onPress={() => {
            let tempImages = this.state.selectedImage;

            let newImg = tempImages.filter((img) => {
              return img.fileName !== item.fileName;
            });
            this.setState({
              selectedImage: newImg,
            });
          }}>
          <MaterialCommunityIcon
            name={'close'}
            color={AgrxColors.error2}
            size={25}
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {isDark} = this.props.agrxTheme;

    console.log(this.state.selectedData, 'selectedData');
    console.log(this.state.selectedImage, 'this.state.selectedImage.');
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{marginTop: 20, paddingHorizontal: 12, marginBottom: 5}}>
          <Text style={{fontSize: 32, color: '#009688', fontWeight: 'bold'}}>
            Almost there!
          </Text>
          <Text style={{fontSize: 16, color: '#6c757d', marginTop: 5}}>
            We need little more information to serve you better
          </Text>
        </View>

        {this.state.showOther ? (
          <View>
            <TextInput
              mode="flat"
              placeholder="Kindly mention the category of your work"
              onChangeText={this.onChangeCategory}
              style={{
                width: '90%',
                backgroundColor: '#fff',
                alignSelf: 'center',
                marginTop: 8,
              }}
              underlineColor="transparent"
              underlineColorAndroid="transparent"
            />

            <TextInput
              mode="flat"
              placeholder="Describe your work in 40-250 words"
              onChangeText={this.onChangeCategoryDescription}
              style={{
                width: '90%',
                backgroundColor: '#fff',
                alignSelf: 'center',
                marginTop: 8,
              }}
              numberOfLines={5}
              multiline={true}
              underlineColor="transparent"
              underlineColorAndroid="transparent"
            />
          </View>
        ) : (
          <View style={{paddingHorizontal: 8}}>
            <Text
              style={{
                fontSize: 26,
                color: '#000',
                marginTop: 12,
                fontWeight: 'bold',
              }}>
              {this.state.workData.questionTitle}
            </Text>
            <FlatList
              style={{marginTop: 8}}
              numColumns={2}
              data={this.state.workData.child}
              renderItem={this.renderOptions}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        {this.state.showSubmit && (
          <Animatable.View
            style={{paddingHorizontal: 8, marginTop: 12}}
            animation="slideInRight"
            useNativeDriver={true}>
            <Text
              style={{
                color: AgrxColors.igesiaGray,
                fontSize: 14,
                padding: 5,
              }}>
              Please upload your business documents/GST/Aadhar Udyog/Shop
              License/Memorandum/Contract/Lease Agreement/any government issued
              document for business.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Button
                icon="note-plus"
                mode="contained"
                style={{
                  borderRadius: 5,

                  alignSelf: 'center',
                }}
                labelStyle={{color: '#fff'}}
                onPress={this.imageTapped}>
                Upload Documents
              </Button>
              <Button
                mode="contained"
                style={{
                  borderRadius: 5,
                  width: 120,
                  alignSelf: 'center',
                }}
                labelStyle={{color: '#fff'}}
                onPress={() => {
                  this.props.navigation.navigate('SelectFieldScreen');
                }}>
                Next
              </Button>
            </View>
            <FlatList
              style={{marginTop: 8, maxHeight: 100}}
              data={this.state.selectedImage}
              renderItem={this.renderSelectedDoc}
              keyExtractor={(item) => item.path}
            />

            <Text
              style={{
                color: AgrxColors.igesiaGray,
                fontSize: 14,
                padding: 5,
                marginTop: 5,
              }}>
              (Maximum 5 documents can be added)
            </Text>
          </Animatable.View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    agrxTheme: state.agrxTheme,
  };
};

export default connect(mapStateToProps, {})(ProfessionalDetails);
