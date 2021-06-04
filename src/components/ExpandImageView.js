import React, {Component} from 'react';
import {
  View,
  Image,
  AsyncStorage,
  Dimensions,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-view';

const win = Dimensions.get('window');

export default class ExpandImageView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      visible: true,
      isModalVisible: false,
    };
  }

  componentWillUnount() {}

  componentDidMount() {
    this.setState({
      isModalVisible: this.props.isModalVisible,
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ImageView
          glideAlways
          animationType="fade"
          images={[
            {
              source: {
                uri: this.props.image,
              },
              width: win.width - 20,
              height: win.height - 50,
            },
          ]}
          backgroundColor={'#000'}
          imageIndex={0}
          isVisible={this.state.isModalVisible}
          onClose={() => {
            this.setState({
              isModalVisible: false,
            });
          }}
          renderFooter={(currentImage) => (
            <View style={{flex: 1}}>
              <Text uppercase style={styles.nameStyle}>
                {' '}
                {this.props.name}{' '}
              </Text>
            </View>
          )}
        />

        {(() => {
          return (
            <TouchableOpacity
              style={this.props.style}
              onPress={() => {
                this.setState({isModalVisible: true});
              }}>
              <FastImage
                style={this.props.style}
                resizeMode={FastImage.resizeMode.cover}
                source={
                  this.props.image != ''
                    ? {uri: this.props.image}
                    : require('../../assets/solo-icon.png')
                }
              />
            </TouchableOpacity>
          );
        })()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  optionImage: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    borderRadius: 30,
  },

  closeIcon: {
    fontSize: 30,
  },
  closeIconTouchable: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    height: 30,
    width: Platform.OS == 'ios' ? 40 : 55,
  },
  pinchStyle: {
    alignSelf: 'flex-end',
    paddingRight: Platform.OS == 'ios' ? 20 : 30,
    color: '#9e9e9e',
  },
  expandIcon: {
    fontSize: 25,
  },
  expandIconTouchable: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    height: 30,
    width: 30,
    alignItems: 'center',
    textAlign: 'center',
  },
  nameStyle: {
    fontSize: 18,
    textAlign: 'center',
    padding: 8,
    color: '#fff',
  },
});
