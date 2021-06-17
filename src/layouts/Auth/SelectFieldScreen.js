import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {TextInput, Button} from 'react-native-paper';
import AgrxColors from '../../config/AgrxColors';
import AgrxStyle from '../../config/AgrxStyle';
import {
  SEARCH_ADDRESS,
  MAP_API_KEY,
  SEARCH_AUTOCOMPLETE,
} from '../../config/settings';
import Geolocation from 'react-native-geolocation-service';

const {width, height} = Dimensions.get('window');

export class SelectFieldScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      address: [],
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
      finalAddress: '',
    };
    this.timeout = null;
  }

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        this.getLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position, 'position');
        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  onChangeText = (text) => {
    clearTimeout(this.timeout);
    this.setState({
      searchText: text,
    });
    this.timeout = setTimeout(() => {
      this.searchLocation(text);
    }, 800);
  };

  onMapDrag = (e) => {
    const location = e.nativeEvent.coordinate;
    console.log(location, 'eeeee');
    clearTimeout(this.mapTimeout);

    this.mapTimeout = setTimeout(() => {
      this.getAddressFromLocation(location.latitude, location.longitude);
    }, 800);
  };

  getAddressFromLocation = (lat, lang) => {
    console.log(lat, lang, 'lat, lang');
    fetch(SEARCH_ADDRESS + `json?latlng=${lat},${lang}&key=` + MAP_API_KEY, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
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
          console.log(responseJson, 'responseJSON');
          this.setState({
            finalAddress: responseJson?.results[0]?.formatted_address,
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
  searchLocation = (text) => {
    fetch(SEARCH_AUTOCOMPLETE + `json?input=${text}&key=` + MAP_API_KEY, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
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
          console.log(responseJson, 'responseJSON');
          this.setState({
            address: responseJson.predictions,
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

  renderAddress = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            finalAddress: item.description,
          });
        }}
        style={{
          backgroundColor: '#fff',
          // borderRadius: 5,

          borderBottomColor: AgrxColors.borderBottomColor,
          borderBottomWidth: 0.2,
          paddingVertical: 5,
        }}>
        <Text style={{padding: 5, fontSize: 16}}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {latitudeDelta, latitude, longitudeDelta, longitude} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{marginTop: 12, paddingHorizontal: 12}}>
            <Text style={{fontSize: 32, color: '#009688', fontWeight: 'bold'}}>
              Where is your field located?
            </Text>
            <Text style={{fontSize: 16, color: '#6c757d', marginTop: 5}}>
              Either type your field address or select from map
            </Text>

            <Text style={{fontSize: 18, marginTop: 15, fontWeight: 'bold'}}>
              {this.state.finalAddress}
            </Text>

            <View
              style={{
                marginVertical: 8,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
                borderRadius: 5,
                backgroundColor: '#fff',
                // maxHeight: 300,
                marginTop: 25,
              }}>
              <TextInput
                mode="flat"
                keyboardType="default"
                placeholder="Enter address"
                value={this.state.searchText}
                onChangeText={this.onChangeText}
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  alignSelf: 'center',
                }}
                underlineColor="transparent"
                underlineColorAndroid="transparent"
              />

              {this.state.address.length > 0 && (
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      // color: '#6c757d',
                      marginTop: 5,
                      paddingHorizontal: 5,
                      fontWeight: 'bold',
                    }}>
                    Select your address from below list
                  </Text>
                  <FlatList
                    style={{
                      width: '100%',
                      backgroundColor: '#f4f4f4',
                      marginVertical: 8,
                      maxHeight: 120,
                    }}
                    data={this.state.address}
                    renderItem={this.renderAddress}
                    keyExtractor={(item) => item.place_id}
                  />
                </View>
              )}

              <MapView
                ref={(ref) => {
                  this.map = ref;
                }}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{
                  width: '100%',
                  height: 200,
                  alignSelf: 'center',
                }}
                onPanDrag={(e) => {
                  this.onMapDrag(e);
                }}
                draggable
                showsUserLocation={true}
                loadingEnabled={true}
                region={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: latitudeDelta,
                  longitudeDelta: longitudeDelta,
                }}></MapView>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 50,
            }}>
            <Button
              mode="contained"
              style={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate('HomeTab')}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: '500',
                }}>
                Confrim
              </Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SelectFieldScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    // marginTop: 12,
    width: '100%',
    height: 200,
    alignSelf: 'center',
  },
  buttonStyle: {
    borderRadius: 2.5,
    marginTop: 3,
    marginBottom: 12,
    width: '80%',
    alignSelf: 'center',
  },
});
