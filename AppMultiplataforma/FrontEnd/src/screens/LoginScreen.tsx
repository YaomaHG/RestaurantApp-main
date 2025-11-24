import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../api/restaurantApi';

export default function LoginScreen(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [login,{isLoading,error}] = useLoginMutation();

  const handleLogin = () => {
    login({email,password});
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput placeholder="Email" autoCapitalize="none" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      {error && <Text style={styles.error}>Credenciales inválidas</Text>}
      <Button title={isLoading? '...' : 'Entrar'} onPress={handleLogin} />
      <View style={{ marginTop: 12 }}>
        <Button title="Registrarse" onPress={() => (navigation as any).navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',padding:24},
  title:{fontSize:24,fontWeight:'600',marginBottom:16},
  input:{borderWidth:1,borderColor:'#ccc',marginBottom:12,padding:10,borderRadius:6},
  error:{color:'red',marginBottom:8}
});
