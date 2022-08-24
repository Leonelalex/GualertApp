import React, {useEffect, useState} from 'react';
import { StyleSheet, Text ,View, Button} from 'react-native';

const DetalleScreen = ({ navigation }) => {
    const [cont, setCont] = useState(0)
    const incrementar = () => setCont(cont+1)

    const lala = navigation.getParam('lala','Valor por defecto')
    return(
      <View style={styles.container}>
        <Text>Soy la pantalla de detalle {cont}</Text>
        <Button
          title="Volver"
          onPress={() => incrementar()}
        />
      </View>
    )
  }
  
  DetalleScreen.navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title','Detalle'),
      headerRight: (
        <Button
          onPress = {navigation.getParam('incrementar')}
          title='Mas 1'
          color="#555"
        />
      )
    }
  }


  export default DetalleScreen

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });