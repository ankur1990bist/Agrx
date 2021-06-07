import React, {Component} from 'react';
import {Text, SafeAreaView} from 'react-native';

export class Dashboard extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Text style={{fontSize: 32, color: '#009688', fontWeight: 'bold'}}>
          {' '}
          Dashboard{' '}
        </Text>
      </SafeAreaView>
    );
  }
}

export default Dashboard;
