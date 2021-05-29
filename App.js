import {LogBox} from 'react-native';

import 'react-native-gesture-handler';
import * as React from 'react';

import persist from './src/config/store';
import {Provider} from 'react-redux';

import MainNavigator from './src/navigation/MainNavigator';
// import OneSignal from 'react-native-onesignal';

const persistStore = persist();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    LogBox.ignoreAllLogs();
  }

  render() {
    return (
      <Provider store={persistStore.store}>
        <MainNavigator />
      </Provider>
    );
  }
}

export default App;
