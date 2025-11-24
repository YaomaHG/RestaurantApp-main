import React from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMesasQuery } from '../api/restaurantApi';

export default function MesasScreen(){
  const { data, refetch, isFetching } = useMesasQuery();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={data||[]}
        keyExtractor={(item)=>String(item.id)}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        renderItem={({item})=> (
          <TouchableOpacity onPress={()=>navigation.navigate('MesaDetalle' as never, { mesaId: item.id, numero: item.numero } as never)} style={[styles.card, item.estado==='ocupada' && styles.ocupada]}> 
            <Text style={styles.numero}>Mesa {item.numero}</Text>
            <Text style={styles.estado}>{item.estado}</Text>
            <Text style={styles.ver}>Ver pedidos ▶</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16},
  card:{padding:16,borderRadius:8,backgroundColor:'#f5f5f5',marginBottom:12},
  ocupada:{backgroundColor:'#ffd2d2'},
  numero:{fontSize:18,fontWeight:'600'},
  estado:{marginTop:4,fontSize:14,color:'#555'},
  ver:{marginTop:6,fontSize:12,color:'#0066cc'}
});
