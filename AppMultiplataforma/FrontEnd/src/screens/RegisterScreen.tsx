import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRegisterMutation } from '../api/restaurantApi';
import { useDispatch } from 'react-redux';
import { setTokens } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen(){
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSubmit = async () => {
    if(!nombre || !email || !password){
      Alert.alert('Error','Completa todos los campos');
      return;
    }
    try{
      const result = await register({ nombre, email, password }).unwrap();
      // result should contain { user, accessToken, refreshToken }
      if(result?.accessToken){
        dispatch(setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken }));
        // navegar al listado principal de mesas
        (navigation as any).navigate('Mesas');
      } else {
        Alert.alert('Registro', 'Registrado correctamente. Por favor inicia sesión.');
        (navigation as any).navigate('Login');
      }
    }catch(err:any){
      console.log('register error', err);
      // Extraer mensaje de error de diferentes formas que puede devolver RTK Query / fetch
      const message = err?.data?.msg || err?.data?.message || err?.error || err?.message || JSON.stringify(err);
      Alert.alert('Error', message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title={isLoading ? 'Registrando...' : 'Registrarse'} onPress={onSubmit} disabled={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, justifyContent:'center' },
  title: { fontSize:20, marginBottom:16, textAlign:'center' },
  input: { borderWidth:1, borderColor:'#ccc', padding:8, marginBottom:12, borderRadius:6 }
});
