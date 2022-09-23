/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import { Provider } from 'react-redux';
 import { applyMiddleware, combineReducers, createStore, ReducersMapObject } from 'redux';
 import { COMBINE_NAME_PROFILE } from './src/redux/reducers/CombineName';
 import ProfileReducer from './src/redux/reducers/ProfileReducer';
 import createSagaMiddleware from '@redux-saga/core';
 import { ApiRequest } from './src/common/ApiRequest';
import AppNavigation from './src/navigations';
import AppSaga from './src/redux/sagas';
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
 sagaMiddleware.run(AppSaga);
 export default App;
 