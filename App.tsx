/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, {type PropsWithChildren} from 'react';
 import { Provider } from 'react-redux';
 import { applyMiddleware, combineReducers, createStore, ReducersMapObject } from 'redux';
 import { COMBINE_NAME_PROFILE } from './src/redux/reducers/CombineName';
 import ProfileReducer from './src/redux/reducers/ProfileReducer';
 import createSagaMiddleware from '@redux-saga/core';
 import ProfileSagas from './src/redux/sagas/ProfileSagas';
 import { ApiRequest } from '@teiresource/commonconfig/ApiRequest';
import AppNavigation from './src/navigations';
 const combine: ReducersMapObject = {};
 combine[`${COMBINE_NAME_PROFILE}`] = ProfileReducer;
 const sagaMiddleware = createSagaMiddleware();
 const store = createStore(combineReducers(combine), applyMiddleware(sagaMiddleware));
 const App = () => {
   ApiRequest.token = "H3FizGTaUakQUQjlFAtki41lOjHOURTyXATmxsXV";
   ApiRequest.applicationId = "10";
   return <Provider store={store}>
     <AppNavigation />
   </Provider>
 };
 sagaMiddleware.run(ProfileSagas);
 export default App;
 