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

const farmerData = {
  farmerCategories: [
    {
      id: 0,
      value: 'Marginal Farmers',
      description: 'Farmers who have less than 1 hectare of land',
    },
    {
      id: 1,
      value: 'Small Farmers',
      description: 'Farmers who have 1 to 2 hectare of land',
    },
    {
      id: 2,
      value: 'Semi Medium Farmers',
      description: 'Farmers who have 2 to 4 hectare of land',
    },
    {
      id: 3,
      value: 'Medium Farmers',
      description: 'Farmers who have 4 to 10 hectare of land',
    },
    {
      id: 4,
      value: 'Large Farmers',
      description: 'Farmers who have 10 hectare or above of land',
    },
    {
      id: 5,
      value: `Doesn't own Land`,
      description: 'Farmers who does farming on others land',
    },
  ],

  landOnLease: [
    {id: 0, value: 'Written Contract'},
    {id: 1, value: 'Enforceable Lease'},
    {id: 2, value: 'Cash Lease'},
    {id: 3, value: 'Crop Share Lease'},
  ],

  farmingPattern: [
    {
      id: 0,
      value: 'Mono Cropping',
      description: 'Only one crop is grown on farm land year after year',
    },
    {
      id: 1,
      value: 'Multiple Cropping',
      description:
        'Farmers grows two or more crops on farm land in one calendar year',
    },
    {
      id: 2,
      value: 'Inter Cropping',
      description:
        'Farmers grows two or more crops simultaneously on the same field in one calendar year',
    },
  ],

  waterType: [
    {id: 0, value: 'Rainfed Water'},
    {id: 1, value: 'Irrigated Farming'},
  ],
};

const nonFarmerData = [
  'Cattleman',
  'Labour',
  'Orchadists',
  'Viticulturist',
  'Buyers',
  'Seed Keepers',
  'Village Trader',
  'Commission Agent',
  'Transport Operators',
  'Storage Operators',
  'Weighman',
  'Processors',
  'Wholesaler',
  'Retailer',
];

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
      categoryText: '',
    };
  }

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
              minWidth: '45%',
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.waterAvailableType == 0 ? '#fff' : '#000',
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
              minWidth: '45%',
              marginLeft: 12,
            }}>
            <Text
              style={{
                fontSize: 16,
                padding: 12,
                color: this.state.waterAvailableType == 1 ? '#fff' : '#000',
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

  nonFarmerOptions = () => {
    const {isDark} = this.props.agrxTheme;
    const {farmerOption} = this.state;
    return (
      <Animatable.View animation="slideInRight" useNativeDriver={true}>
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            marginTop: 25,
            textAlign: 'left',
          }}>
          Please select any one
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
                farmerOption: 0,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 0
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
                color: this.state.farmerOption == 0 ? '#fff' : '#000',
              }}>
              Cattleman
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerOption: 1,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 1
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
                color: this.state.farmerOption == 1 ? '#fff' : '#000',
              }}>
              Labour
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
                farmerOption: 2,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 2
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
                color: this.state.farmerOption == 2 ? '#fff' : '#000',
              }}>
              Orchadists
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerOption: 3,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 3
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
                color: this.state.farmerOption == 3 ? '#fff' : '#000',
              }}>
              Viticulturist
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
                farmerOption: 4,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 4
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
                color: this.state.farmerOption == 4 ? '#fff' : '#000',
              }}>
              Buyers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerOption: 5,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 5
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
                color: this.state.farmerOption == 5 ? '#fff' : '#000',
              }}>
              Seed Keepers
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
                farmerOption: 6,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 6
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
                color: this.state.farmerOption == 6 ? '#fff' : '#000',
              }}>
              Village Trader
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerOption: 7,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 7
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
                color: this.state.farmerOption == 7 ? '#fff' : '#000',
              }}>
              Commission Agent
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
                farmerOption: 8,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 8
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
                color: this.state.farmerOption == 8 ? '#fff' : '#000',
              }}>
              Transport Operators
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerOption: 9,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 9
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
                color: this.state.farmerOption == 9 ? '#fff' : '#000',
              }}>
              Storage Operators
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
                farmerOption: 10,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 10
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
                color: this.state.farmerOption == 10 ? '#fff' : '#000',
              }}>
              Weighman
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerOption: 11,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 11
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
                color: this.state.farmerOption == 11 ? '#fff' : '#000',
              }}>
              Processors
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
                farmerOption: 12,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 12
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
                color: this.state.farmerOption == 12 ? '#fff' : '#000',
              }}>
              Wholesaler
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                farmerOption: 13,
              });
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.farmerOption == 13
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
                color: this.state.farmerOption == 13 ? '#fff' : '#000',
              }}>
              Retailer
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setState({
              farmerOption: 14,
            });
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              this.state.farmerOption == 14
                ? AgrxColors.primary
                : 'transparent',
            borderRadius: 5,

            borderWidth: 0.4,
            borderColor: AgrxColors.borderBottomColor,
            width: '65%',
            marginTop: 8,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              padding: 12,
              color: this.state.farmerOption == 14 ? '#fff' : '#000',
            }}>
            Other
          </Text>
        </TouchableOpacity>

        {this.state.farmerOption == 14 && (
          <Animatable.View animation="slideInRight" useNativeDriver={true}>
            <TextInput
              mode="outlined"
              keyboardType="default"
              placeholder="Kindly specify"
              value={this.state.categoryText}
              onChangeText={this.onChangeText}
              style={{
                width: '80%',
                backgroundColor: '#fff',
                alignSelf: 'center',
                marginTop: 18,
              }}
              underlineColor="transparent"
              underlineColorAndroid="transparent"
            />
          </Animatable.View>
        )}
      </Animatable.View>
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
    console.log(occupationCategory, 'occupationCategory');
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
                      Submit
                    </Button>
                  </Animatable.View>
                </View>
              ) : occupationCategory == 1 ? (
                <View>
                  {this.nonFarmerOptions()}
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
                      Submit
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
