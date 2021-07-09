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

let initialState = {
  name: '',
  workData: [],
  selectedData: [],
  showSubmit: false,
  categoryDescription: '',
  categoryText: '',
  showOther: false,
  selectedOption: null,
};

export class ProfessionalDetails extends Component {
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
              this.getData(1);
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
    this.getData();
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

  getData = (id) => {
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
          marginTop: 8,
          marginHorizontal: 5,
        }}>
        <Text
          style={{
            fontSize: 16,
            padding: 12,
            color: this.state.selectedOption == item.id ? '#fff' : '#000',
            textAlign: 'center',
          }}>
          {item.name}
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

  render() {
    const {isDark} = this.props.agrxTheme;

    console.log(this.state.selectedData, 'selectedData');
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
              {this.state.workData.question}
            </Text>
            <FlatList
              ListFooterComponent={() => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        showOther: true,
                        showSubmit: true,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                      borderRadius: 5,

                      borderWidth: 0.4,
                      borderColor: AgrxColors.borderBottomColor,
                      width: '45%',
                      marginTop: 8,
                      marginHorizontal: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        padding: 12,
                        color: '#000',
                        textAlign: 'center',
                      }}>
                      Others
                    </Text>
                  </TouchableOpacity>
                );
              }}
              style={{marginTop: 8}}
              numColumns={2}
              data={this.state.workData.options}
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
                onPress={() => {
                  this.props.navigation.navigate('SelectFieldScreen');
                }}>
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
