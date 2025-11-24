import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MesasScreen from '../screens/MesasScreen';
import MesaDetailScreen from '../screens/MesaDetailScreen';
import CuentaDetailScreen from '../screens/CuentaDetailScreen';

const Stack = createStackNavigator();

export default function MesaStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="MesasListado" component={MesasScreen} options={{ title: 'Mesas' }} />
      <Stack.Screen name="MesaDetalle" component={MesaDetailScreen} options={{ title: 'Detalle Mesa' }} />
      <Stack.Screen name="CuentaDetalle" component={CuentaDetailScreen} options={{ title: 'Cuenta' }} />
    </Stack.Navigator>
  );
}
