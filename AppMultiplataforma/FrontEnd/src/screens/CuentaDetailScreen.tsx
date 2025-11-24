import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert, TextInput, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useCuentaActivaQuery, useAbrirCuentaMutation, useAgregarItemCuentaMutation, useCerrarCuentaMutation, useAgregarPagoCuentaMutation, useActualizarAjustesCuentaMutation } from '../api/restaurantApi';

interface Params { mesaId:number; numero:number; }

export default function CuentaDetailScreen(){
  const { params } = useRoute();
  const { mesaId, numero } = params as Params;
  const { data: cuenta, isFetching, refetch, error } = useCuentaActivaQuery(mesaId);
  const [abrirCuenta] = useAbrirCuentaMutation();
  const [agregarItem] = useAgregarItemCuentaMutation();
  const [cerrarCuenta, cerrarRes] = useCerrarCuentaMutation();
  const [agregarPago] = useAgregarPagoCuentaMutation();
  const [actualizarAjustes] = useActualizarAjustesCuentaMutation();
  const [metodo, setMetodo] = useState('efectivo');
  const [monto, setMonto] = useState('');
  const [descuento, setDescuento] = useState('0');
  const [propina, setPropina] = useState('0');

  useEffect(()=>{
    // Solo abrir automáticamente si error es 404 (sin cuenta)
    // @ts-ignore
    if(error && error.status === 404){
      abrirCuenta(mesaId).then(()=>refetch());
    }
  },[error]);

  if(isFetching && !cuenta) return <View style={styles.center}><ActivityIndicator /></View>;
  if(!cuenta) return <View style={styles.center}><Text>No hay cuenta.</Text></View>;

  const totalPagado = (cuenta.Pagos||[]).reduce((s:any,p:any)=> s + Number(p.monto||p.amount||0),0);
  const pendiente = (cuenta.total||0) - totalPagado;

  const handleAgregar = () => agregarItem({ mesaId, price: 50 }).then(()=>refetch());
  const handleAgregarPago = () => {
    const valor = Number(monto);
    if(!valor || valor <=0){ Alert.alert('Monto inválido'); return; }
    agregarPago({ mesaId, metodo, monto: valor }).then(()=>{ setMonto(''); refetch(); });
  };
  const handleActualizarAjustes = () => {
    actualizarAjustes({ mesaId, descuento: Number(descuento), propina: Number(propina) }).then(()=>refetch());
  };
  const handleCerrar = () => {
    if(pendiente > 0){
      Alert.alert('Pendiente','Aún hay saldo sin pagar');
      return;
    }
    cerrarCuenta({ mesaId, pagos: [], descuento: cuenta.descuento||0, propina: cuenta.propina||0 }).then(()=>refetch());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuenta Mesa {numero}</Text>
      <Text style={styles.line}>Subtotal: {cuenta.subtotal}</Text>
      <Text style={styles.line}>Descuento: {cuenta.descuento}</Text>
      <Text style={styles.line}>Propina: {cuenta.propina}</Text>
      <Text style={styles.line}>Total: {cuenta.total}</Text>
      <Text style={styles.line}>Pagado: {totalPagado}</Text>
      <Text style={styles.line}>Pendiente: {pendiente}</Text>
      {!cuenta.closed && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ajustes</Text>
          <View style={styles.row}>
            <Text>Descuento:</Text>
            <TextInput style={styles.input} keyboardType='numeric' value={descuento} onChangeText={setDescuento} />
            <Text>Propina:</Text>
            <TextInput style={styles.input} keyboardType='numeric' value={propina} onChangeText={setPropina} />
            <Button title="Aplicar" onPress={handleActualizarAjustes} />
          </View>
        </View>
      )}
      {!cuenta.closed && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pagos</Text>
          <View style={styles.row}>
            <Text>Método:</Text>
            <TextInput style={styles.input} value={metodo} onChangeText={setMetodo} placeholder='efectivo/tarjeta' />
            <Text>Monto:</Text>
            <TextInput style={styles.input} keyboardType='numeric' value={monto} onChangeText={setMonto} />
            <Button title="Añadir" onPress={handleAgregarPago} />
          </View>
          <FlatList
            data={cuenta.Pagos||[]}
            keyExtractor={(p:any)=>String(p.id)}
            renderItem={({item})=> <Text style={styles.pagoItem}>{item.metodo}: {item.monto}</Text> }
          />
        </View>
      )}
      <View style={styles.buttons}>
        {!cuenta.closed && <Button title="Agregar 50" onPress={handleAgregar} />}
        {!cuenta.closed && <Button title="Cerrar cuenta" color="#b30000" onPress={handleCerrar} />}
      </View>
      {cuenta.closed && <Text style={styles.cerrada}>Cuenta cerrada</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16},
  title:{fontSize:22,fontWeight:'700',marginBottom:12},
  line:{fontSize:14,marginBottom:4},
  buttons:{flexDirection:'row',gap:12,marginTop:16},
  section:{marginTop:18},
  sectionTitle:{fontSize:16,fontWeight:'600',marginBottom:8},
  row:{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:8},
  input:{borderWidth:1,borderColor:'#ccc',paddingHorizontal:6,paddingVertical:4,minWidth:70,borderRadius:4},
  pagoItem:{fontSize:12,marginBottom:4},
  cerrada:{marginTop:20,fontSize:16,color:'#006600',fontWeight:'600'},
  center:{flex:1,alignItems:'center',justifyContent:'center'}
});