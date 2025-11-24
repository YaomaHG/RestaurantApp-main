import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MesasScreen from '../screens/MesasScreen';
import MesaStack from './MesaStack';
import LoginScreen from '../screens/LoginScreen';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Drawer = createDrawerNavigator();

export default function RootNavigator(){
  const auth = useSelector((s:RootState)=>s.auth);
  const isLogged = !!auth.accessToken;
  return (
    <Drawer.Navigator>
      {isLogged ? (
        <>
          <Drawer.Screen name="Mesas" component={MesaStack} />
        </>
      ) : (
        <Drawer.Screen name="Auth" component={AuthStack} options={{ headerShown:false }} />
      )}
    </Drawer.Navigator>
  );
}
