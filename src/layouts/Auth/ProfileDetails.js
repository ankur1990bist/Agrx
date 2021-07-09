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
import {DAIRYMAN_DATA} from '../../config/settings';

const nonFarmerData = [
  {
    title: 'Dairy Man',
    child: {
      title: 'You work in your',
      options: [
        {
          title: 'Own Farm',
          child: {
            title: 'What is your herd size?',
            options: ['5-20', '20-30', '30-40', '50 or more'],
          },
        },
        {
          title: 'Hired by other farm',
          child: {
            title: 'You are paid on:',
            options: ['Hourly Basis', 'Fixed Pay'],
          },
        },
      ],
    },
  },
  {
    title: 'Labourer',
  },
  {
    title: 'Horticulturist',
  },
  {
    title: 'Honey Farmer',
  },
];

let initialState = {
  name: '',
  occupationCategory: null, // 0 = farmer , 1 = non farmer
  farmerCategory: null,
  landOnLease: null,
  farmingPattern: null,
  waterAvailableType: null,
  categoryText: '',
  nonFarmerOption: null,
  subData: {},
  workPlace: null,
  herdSize: null,
  paidOn: null,
};

export class ProfileDetails extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              this.setState(initialState);
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

  typeOfFarmer = () => {
    const {isDark} = this.props.agrxTheme;
    const {
      occupationCategory,
      farmerCategory,
      landOnLease,
      farmingPattern,
      waterAvailableType,
    } = this.state;
    return (
      <Animatable.View animation="slideInRight" useNativeDriver={true}>
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            marginTop: 25,
            textAlign: 'left',
          }}>
          Type of farmer
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 16,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerCategory: 0,
              });
            }}
            style={{
              backgroundColor:
                this.state.farmerCategory == 0
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              flex: 0.45,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.farmerCategory == 0 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Marginal Farmers
            </Text>

            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 12,
                paddingBottom: 8,
                fontStyle: 'italic',
                color:
                  this.state.farmerCategory == 0
                    ? '#fff'
                    : AgrxColors.igesiaGray,
              }}>
              Farmers who have less than 1 hectare of land
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerCategory: 1,
              });
            }}
            style={{
              backgroundColor:
                this.state.farmerCategory == 1
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              flex: 0.45,
              marginLeft: 12,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.farmerCategory == 1 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Small farmers
            </Text>

            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 12,
                paddingBottom: 8,
                fontStyle: 'italic',
                color:
                  this.state.farmerCategory == 1
                    ? '#fff'
                    : AgrxColors.igesiaGray,
              }}>
              Farmers who have 1 to 2 hectare of land
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 16,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerCategory: 2,
              });
            }}
            style={{
              backgroundColor:
                this.state.farmerCategory == 2
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              flex: 0.45,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.farmerCategory == 2 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Semi Medium Farmers
            </Text>

            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 12,
                paddingBottom: 8,
                fontStyle: 'italic',
                color:
                  this.state.farmerCategory == 2
                    ? '#fff'
                    : AgrxColors.igesiaGray,
              }}>
              Farmers who have 2 to 4 hectare of land
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerCategory: 3,
              });
            }}
            style={{
              backgroundColor:
                this.state.farmerCategory == 3
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              flex: 0.45,
              marginLeft: 12,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.farmerCategory == 3 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Medium Farmers
            </Text>

            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 12,
                paddingBottom: 8,
                fontStyle: 'italic',
                color:
                  this.state.farmerCategory == 3
                    ? '#fff'
                    : AgrxColors.igesiaGray,
              }}>
              Farmers who have 4 to 10 hectare of land
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 16,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerCategory: 4,
              });
            }}
            style={{
              backgroundColor:
                this.state.farmerCategory == 4
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              flex: 0.45,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.farmerCategory == 4 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Large Farmers
            </Text>

            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 12,
                paddingBottom: 8,
                fontStyle: 'italic',
                color:
                  this.state.farmerCategory == 4
                    ? '#fff'
                    : AgrxColors.igesiaGray,
              }}>
              Farmers who have 10 hectare or above of land
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerCategory: 5,
              });
            }}
            style={{
              backgroundColor:
                this.state.farmerCategory == 5
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              flex: 0.45,
              marginLeft: 12,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.farmerCategory == 5 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Doesn't own Land
            </Text>

            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 12,
                paddingBottom: 8,
                fontStyle: 'italic',
                color:
                  this.state.farmerCategory == 5
                    ? '#fff'
                    : AgrxColors.igesiaGray,
              }}>
              Farmers who does farming on others land
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    );
  };

  landOnLease = () => {
    const {isDark} = this.props.agrxTheme;
    const {
      occupationCategory,
      farmerCategory,
      landOnLease,
      farmingPattern,
      waterAvailableType,
    } = this.state;
    return (
      <Animatable.View animation="slideInRight" useNativeDriver={true}>
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            marginTop: 25,
            textAlign: 'left',
          }}>
          If Land on lease
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                landOnLease: 0,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.landOnLease == 0
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.landOnLease == 0 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Written Contract
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                landOnLease: 1,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.landOnLease == 1
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,

              marginLeft: 12,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.landOnLease == 1 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Enforceable Lease
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                landOnLease: 2,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.landOnLease == 2
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              width: '45%',
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.landOnLease == 2 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Cash lease
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                landOnLease: 3,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.landOnLease == 3
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              width: '45%',
              marginLeft: 12,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.landOnLease == 3 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Crop share Lease
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    );
  };

  waterAvailibility = () => {
    const {isDark} = this.props.agrxTheme;
    const {
      occupationCategory,
      farmerCategory,
      landOnLease,
      farmingPattern,
      waterAvailableType,
    } = this.state;
    return (
      <Animatable.View animation="slideInRight" useNativeDriver={true}>
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            marginTop: 25,
            textAlign: 'left',
          }}>
          Availability of water for farming
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                waterAvailableType: 0,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.waterAvailableType == 0
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              width: '45%',
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.waterAvailableType == 0 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Rainfed water
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                waterAvailableType: 1,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.waterAvailableType == 1
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              width: '45%',
              marginLeft: 12,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.waterAvailableType == 1 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Irrigated Farming
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    );
  };

  farmerPractice = () => {
    const {isDark} = this.props.agrxTheme;
    const {
      occupationCategory,
      farmerCategory,
      landOnLease,
      farmingPattern,
      waterAvailableType,
    } = this.state;
    return (
      <Animatable.View animation="slideInRight" useNativeDriver={true}>
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            marginTop: 25,
            textAlign: 'left',
          }}>
          Your farming pattern
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 16,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmingPattern: 0,
              });
            }}
            style={{
              backgroundColor:
                this.state.farmingPattern == 0
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              flex: 0.45,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.farmingPattern == 0 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Mono Cropping
            </Text>

            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 12,
                paddingBottom: 8,
                fontStyle: 'italic',
                color:
                  this.state.farmingPattern == 0
                    ? '#fff'
                    : AgrxColors.igesiaGray,
              }}>
              Only one crop is grown on farm land year after year
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmingPattern: 1,
              });
            }}
            style={{
              backgroundColor:
                this.state.farmingPattern == 1
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              flex: 0.45,
              marginLeft: 12,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.farmingPattern == 1 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Multiple Cropping
            </Text>

            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 12,
                paddingBottom: 8,
                fontStyle: 'italic',
                color:
                  this.state.farmingPattern == 1
                    ? '#fff'
                    : AgrxColors.igesiaGray,
              }}>
              Farmers grows two or more crops on farm land in one calendar year
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 16,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmingPattern: 2,
              });
            }}
            style={{
              backgroundColor:
                this.state.farmingPattern == 2
                  ? AgrxColors.primary
                  : 'transparent',
              borderRadius: 5,

              borderWidth: 0.4,
              borderColor: AgrxColors.borderBottomColor,
              flex: 0.45,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.farmingPattern == 2 ? '#fff' : '#000',
                textAlign: 'center',
              }}>
              Inter Cropping
            </Text>

            <Text
              style={{
                fontSize: 14,
                paddingHorizontal: 12,
                paddingBottom: 8,
                fontStyle: 'italic',
                color:
                  this.state.farmingPattern == 2
                    ? '#fff'
                    : AgrxColors.igesiaGray,
              }}>
              Farmers grows two or more crops simultaneously on the same field
              in one calendar year
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    );
  };

  // getDairyManData = () => {
  //   fetch(DAIRYMAN_DATA, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       // 'x-api-key': 'bf7fe978-c0f1-11eb-8089-0200cd936042',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response
  //           .json()
  //           .then((resposeData) => Promise.resolve(resposeData));
  //       }
  //       return response.json().then((errorData) => Promise.reject(errorData));
  //     })
  //     .then(
  //       (responseJson) => {
  //         console.log('json suceess', responseJson);
  //         this.setState({
  //           subData: responseJson['Dairy Man'],
  //         });
  //       },
  //       (errors) => {
  //         console.log('errors', errors);
  //       },
  //     )
  //     .catch((error) => {
  //       console.log('error', error);
  //     })
  //     .done();
  // };

  nonnonFarmerOptions = () => {
    const {isDark} = this.props.agrxTheme;
    const {nonFarmerOption} = this.state;

    if (nonFarmerOption != null) {
      return this.renderDairyMan();
    }

    return (
      <View>
        <FlatList
          // horizontal={true}
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 16,
          }}
          numColumns={2}
          data={nonFarmerData}
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    nonFarmerOption: index,
                  });
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    item == this.state.selectedCat1
                      ? AgrxColors.primary
                      : 'transparent',
                  borderRadius: 5,

                  borderWidth: 0.4,
                  borderColor: AgrxColors.borderBottomColor,
                  padding: 12,
                  marginHorizontal: 5,
                  marginTop: 5,
                  alignSelf: 'center',
                  width: '45%',
                }}>
                <Text style={{fontSize: 16}}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  renderDairyMan = () => {
    const data = nonFarmerData[this.state.nonFarmerOption];
    if (this.state.workPlace != null) {
      return this.renderWorkplace();
    }
    return (
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 18,
            marginTop: 8,
          }}>
          {data.child.title}
        </Text>

        <FlatList
          // horizontal={true}
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 16,
          }}
          numColumns={2}
          data={data.child.options}
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    workPlace: index,
                  });
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    item == this.state.selectedCat1
                      ? AgrxColors.primary
                      : 'transparent',
                  borderRadius: 5,

                  borderWidth: 0.4,
                  borderColor: AgrxColors.borderBottomColor,
                  padding: 12,
                  marginHorizontal: 5,
                  marginTop: 5,
                  alignSelf: 'center',
                  width: '45%',
                }}>
                <Text style={{fontSize: 16}}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  renderWorkplace = () => {
    const data =
      nonFarmerData[this.state.nonFarmerOption].child.options[
        this.state.workPlace
      ];
    if (this.state.herdSize != null) {
    }

    console.log(data, 'data renderWorkpace');
    return (
      <View style={{flex: 1}}>
        {data.child.title && (
          <Text
            style={{
              fontSize: 18,
              marginTop: 8,
            }}>
            {data.child.title}
          </Text>
        )}

        <FlatList
          // horizontal={true}
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 16,
          }}
          numColumns={2}
          data={data.child.options}
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (this.state.workPlace == 0) {
                    this.setState({
                      herdSize: item,
                    });
                  } else {
                    this.setState({
                      paidOn: item,
                    });
                  }
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    this.state.workPlace == 0
                      ? item == this.state.herdSize
                        ? AgrxColors.primary
                        : 'transparent'
                      : item == this.state.paidOn
                      ? AgrxColors.primary
                      : 'transparent',
                  borderRadius: 5,

                  borderWidth: 0.4,
                  borderColor: AgrxColors.borderBottomColor,
                  padding: 12,
                  marginHorizontal: 5,
                  marginTop: 5,
                  alignSelf: 'center',
                  width: '45%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color:
                      this.state.workPlace == 0
                        ? item == this.state.herdSize
                          ? '#fff'
                          : '#000'
                        : item == this.state.paidOn
                        ? '#fff'
                        : '#000',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  render() {
    const {isDark} = this.props.agrxTheme;
    const {
      occupationCategory,
      farmerCategory,
      landOnLease,
      farmingPattern,
      waterAvailableType,
    } = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          ref={(ref) => {
            this.scroll = ref;
          }}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{marginTop: 28, paddingLeft: 12}}>
            <Text style={{fontSize: 32, color: '#009688', fontWeight: 'bold'}}>
              Almost there!
            </Text>
            <Text style={{fontSize: 16, color: '#6c757d', marginTop: 5}}>
              We need little more information to serve you better
            </Text>
            <Animatable.View animation="slideInRight" useNativeDriver={true}>
              {occupationCategory == null && (
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000',
                    marginTop: 25,
                    textAlign: 'left',
                  }}>
                  Your occupation category
                </Text>
              )}

              {occupationCategory == null && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 16,
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        occupationCategory: 0,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        occupationCategory == 0
                          ? AgrxColors.primary
                          : 'transparent',
                      borderRadius: 5,

                      borderWidth: 0.4,
                      borderColor: AgrxColors.borderBottomColor,
                      width: '45%',
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: occupationCategory == 0 ? '#fff' : '#000',
                        textAlign: 'center',
                      }}>
                      Producer / Grower
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        occupationCategory: 1,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        occupationCategory == 1
                          ? AgrxColors.primary
                          : 'transparent',
                      borderRadius: 5,

                      borderWidth: 0.4,
                      borderColor: AgrxColors.borderBottomColor,
                      width: '45%',
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: occupationCategory == 1 ? '#fff' : '#000',
                        textAlign: 'center',
                      }}>
                      Non farmer
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        occupationCategory: 2,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        occupationCategory == 2
                          ? AgrxColors.primary
                          : 'transparent',
                      borderRadius: 5,

                      borderWidth: 0.4,
                      borderColor: AgrxColors.borderBottomColor,
                      width: '45%',
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: occupationCategory == 2 ? '#fff' : '#000',
                        textAlign: 'center',
                      }}>
                      Corporate Seller
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        occupationCategory: 3,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        occupationCategory == 3
                          ? AgrxColors.primary
                          : 'transparent',
                      borderRadius: 5,

                      borderWidth: 0.4,
                      borderColor: AgrxColors.borderBottomColor,
                      width: '45%',
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: occupationCategory == 3 ? '#fff' : '#000',
                        textAlign: 'center',
                      }}>
                      Customer / Buyer
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        occupationCategory: 4,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        occupationCategory == 4
                          ? AgrxColors.primary
                          : 'transparent',
                      borderRadius: 5,

                      borderWidth: 0.4,
                      borderColor: AgrxColors.borderBottomColor,
                      width: '45%',
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: occupationCategory == 4 ? '#fff' : '#000',
                        textAlign: 'center',
                      }}>
                      Support Community
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        occupationCategory: 5,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        occupationCategory == 5
                          ? AgrxColors.primary
                          : 'transparent',
                      borderRadius: 5,

                      borderWidth: 0.4,
                      borderColor: AgrxColors.borderBottomColor,
                      width: '45%',
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: occupationCategory == 5 ? '#fff' : '#000',
                        textAlign: 'center',
                      }}>
                      Monitoring Community
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        occupationCategory: 6,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        occupationCategory == 6
                          ? AgrxColors.primary
                          : 'transparent',
                      borderRadius: 5,

                      borderWidth: 0.4,
                      borderColor: AgrxColors.borderBottomColor,
                      width: '45%',
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: occupationCategory == 6 ? '#fff' : '#000',
                        textAlign: 'center',
                      }}>
                      {'Labour & Employment'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        occupationCategory: 7,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        occupationCategory == 7
                          ? AgrxColors.primary
                          : 'transparent',
                      borderRadius: 5,

                      borderWidth: 0.4,
                      borderColor: AgrxColors.borderBottomColor,
                      width: '45%',
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: occupationCategory == 7 ? '#fff' : '#000',
                        textAlign: 'center',
                      }}>
                      Finance
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        occupationCategory: 8,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        occupationCategory == 8
                          ? AgrxColors.primary
                          : 'transparent',
                      borderRadius: 5,

                      borderWidth: 0.4,
                      borderColor: AgrxColors.borderBottomColor,
                      width: '45%',
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: occupationCategory == 8 ? '#fff' : '#000',
                        textAlign: 'center',
                      }}>
                      Others
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Animatable.View>

            <View>
              {occupationCategory == 0 ? (
                <View>
                  <View>{this.typeOfFarmer()}</View>
                  <View>{this.landOnLease()}</View>
                  <View>{this.farmerPractice()}</View>
                  <View>{this.waterAvailibility()}</View>
                  <Animatable.View
                    animation="slideInRight"
                    useNativeDriver={true}>
                    <Button
                      mode="contained"
                      style={{
                        borderRadius: 5,
                        width: '60%',
                        alignSelf: 'center',
                        marginTop: 40,
                        marginBottom: 40,
                      }}
                      labelStyle={{color: '#fff'}}
                      onPress={() => {
                        this.props.navigation.navigate('SelectFieldScreen');
                      }}>
                      Next
                    </Button>
                  </Animatable.View>
                </View>
              ) : occupationCategory == 1 ? (
                <View>
                  {this.nonnonFarmerOptions()}
                  <Animatable.View
                    animation="slideInRight"
                    useNativeDriver={true}>
                    <Button
                      mode="contained"
                      style={{
                        borderRadius: 5,
                        width: '60%',
                        alignSelf: 'center',
                        marginTop: 40,
                        marginBottom: 40,
                      }}
                      labelStyle={{color: '#fff'}}
                      onPress={() => {
                        this.props.navigation.navigate('Dashboard');
                      }}>
                      Next
                    </Button>
                  </Animatable.View>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => {
            this.scroll.scrollToEnd();
          }}
          style={{
            height: 45,
            width: 45,
            borderRadius: 45,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            position: 'absolute',
            right: 12,
            bottom: 12,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
          }}>
          <MaterialCommunityIcon
            name={'chevron-double-down'}
            size={30}
            color={AgrxColors.igesiaGray}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    agrxTheme: state.agrxTheme,
  };
};

export default connect(mapStateToProps, {})(ProfileDetails);
