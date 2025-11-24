import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { usePedidosPorMesaQuery, useCambiarEstadoPedidoMutation } from '../api/restaurantApi';

interface RouteParams { mesaId: number; numero: number; }

export default function MesaDetailScreen(){
  const route = useRoute();
  const { mesaId, numero } = route.params as RouteParams;
  const navigation = useNavigation();
  const { data: pedidos = [], refetch, isFetching } = usePedidosPorMesaQuery(mesaId);
  const [cambiarEstado] = useCambiarEstadoPedidoMutation();

  const avanzar = (pedido:any) => {
    const next = pedido.estado === 'preparacion' ? 'listo' : pedido.estado === 'listo' ? 'servido' : 'servido';
    cambiarEstado({ id: pedido.id, estado: next });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Mesa {numero}</Text>
        <Button title="Cuenta" onPress={()=>navigation.navigate('CuentaDetalle' as never, { mesaId, numero } as never)} />
      </View>
      <FlatList
        refreshing={isFetching}
        onRefresh={refetch}
        data={pedidos}
        keyExtractor={p=>String(p.id)}
        renderItem={({item}) => (
          <View style={[styles.card, item.estado==='listo' && styles.listo, item.estado==='servido' && styles.servido]}> 
            <Text style={styles.header}>Pedido #{item.id}</Text>
            <Text style={styles.estado}>Estado: {item.estado}</Text>
            {item.instrucciones && <Text style={styles.instr}>Notas: {item.instrucciones}</Text>}
            {item.estado!=='servido' && <Button title="Avanzar" onPress={()=>avanzar(item)} />}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16},
  title:{fontSize:22,fontWeight:'700',marginBottom:12},
  headerRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
  card:{padding:14,backgroundColor:'#f3f3f3',borderRadius:8,marginBottom:12},
  listo:{backgroundColor:'#fff7d1'},
  servido:{backgroundColor:'#d4ffd4'},
  header:{fontSize:16,fontWeight:'600'},
  estado:{marginTop:4,fontSize:14},
  instr:{marginTop:4,fontStyle:'italic'}
});
