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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const farmerType = {
  0: 'Farmer',
  1: 'Non Farmer',
};

const farmerCategories = {
  0: 'Marginal Farmers',
  1: 'Small Farmers',
  2: 'Semi Medium Farmers',
  3: 'Medium Farmers',
  4: 'Large Farmers',
  5: `Doesn't own Land`,
};

const landOnLease = {
  0: 'Written Contact',
  1: 'Enforceable Lease',
  2: 'Cash Lease',
  3: 'Crop Share Lease',
};

const farmingPattern = {
  0: 'Mono Cropping',
  1: 'Multiple Cropping',
  2: 'Inter Cropping',
  3: 'Medium Farmers',
};

const waterType = {
  0: 'Rainfed Water',
  1: 'Irrigated Farming',
};

export class ProfileDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      occupationCategory: null, // 0 = farmer , 1 = non farmer
      farmerCategory: null,
      landOnLease: null,
      farmingPattern: null,
      waterAvailableType: null,
    };
  }

  onChangeText = (text) => {
    this.setState({
      name: text,
    });
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
              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  marginTop: 25,
                  textAlign: 'left',
                }}>
                Your occupation category
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
                    minWidth: '45%',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      padding: 12,
                      color: occupationCategory == 0 ? '#fff' : '#000',
                    }}>
                    Farmer
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
                    minWidth: '45%',
                    marginLeft: 12,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      padding: 12,
                      color: occupationCategory == 1 ? '#fff' : '#000',
                    }}>
                    Non farmer
                  </Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
            {true && (
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
                      }}>
                      Marginal Farmers
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 12,
                        paddingBottom: 8,
                        color: this.state.farmerCategory == 0 ? '#fff' : '#000',
                        fontStyle: 'italic',
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
                      }}>
                      Small farmerCategories
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 12,
                        paddingBottom: 8,
                        color: this.state.farmerCategory == 1 ? '#fff' : '#000',
                        fontStyle: 'italic',
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
                      }}>
                      Semi Medium Farmers
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 12,
                        paddingBottom: 8,
                        color: this.state.farmerCategory == 2 ? '#fff' : '#000',
                        fontStyle: 'italic',
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
                      }}>
                      Medium Farmers
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 12,
                        paddingBottom: 8,
                        color: this.state.farmerCategory == 3 ? '#fff' : '#000',
                        fontStyle: 'italic',
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
                      }}>
                      Large Farmers
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 12,
                        paddingBottom: 8,
                        color: this.state.farmerCategory == 4 ? '#fff' : '#000',
                        fontStyle: 'italic',
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
                      }}>
                      Doesn't own Land
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 12,
                        paddingBottom: 8,
                        color: this.state.farmerCategory == 5 ? '#fff' : '#000',
                        fontStyle: 'italic',
                      }}>
                      Farmers who does farming on others land
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            )}
            {true && (
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
                      minWidth: '45%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: this.state.landOnLease == 2 ? '#fff' : '#000',
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
                      minWidth: '45%',
                      marginLeft: 12,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: this.state.landOnLease == 3 ? '#fff' : '#000',
                      }}>
                      Crop share Lease
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            )}
            {true && (
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
                      }}>
                      Mono Cropping
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 12,
                        paddingBottom: 8,
                        color: this.state.farmingPattern == 0 ? '#fff' : '#000',
                        fontStyle: 'italic',
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
                      }}>
                      Multiple Cropping
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 12,
                        paddingBottom: 8,
                        color: this.state.farmingPattern == 1 ? '#fff' : '#000',
                        fontStyle: 'italic',
                      }}>
                      Farmers grows two or more crops on farm land in one
                      calendar year
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
                      }}>
                      Inter Cropping
                    </Text>

                    <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 12,
                        paddingBottom: 8,
                        color: this.state.farmingPattern == 2 ? '#fff' : '#000',
                        fontStyle: 'italic',
                      }}>
                      Farmers grows two or more crops simultaneously on the same
                      field in one calendar year
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            )}
            {true && (
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
                      minWidth: '45%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color:
                          this.state.waterAvailableType == 0 ? '#fff' : '#000',
                      }}>
                      Farmer
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
                      minWidth: '45%',
                      marginLeft: 12,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color:
                          this.state.waterAvailableType == 1 ? '#fff' : '#000',
                      }}>
                      Non farmer
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            )}

            <Animatable.View animation="slideInRight" useNativeDriver={true}>
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
                onPress={() => {}}>
                Submit
              </Button>
            </Animatable.View>
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
