import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store/store';
import RootNavigator from './src/navigation/RootNavigator';
import useSocket from './src/hooks/useSocket';

function SocketManager() {
  useSocket();
  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <SocketManager />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
