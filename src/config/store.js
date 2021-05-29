import { createStore, compose, applyMiddleware } from 'redux';
import {AsyncStorage} from 'react-native';
import rootReducer from '../reducers/index';
import { persistStore, persistReducer } from 'redux-persist'
import ReduxThunk from 'redux-thunk';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk))
  let persistor = persistStore(store)
  return { store, persistor }
}

