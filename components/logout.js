import React, { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import datos_Server from "../screens/datosGlobales";

export default ({ navigation }) => {
  const logout = async () => {
    let TOKEN_PHONE = await AsyncStorage.getItem("TOKEN_PHONE");
    let CORREO_US = await AsyncStorage.getItem("CORREO_US");
    let response = await fetch(datos_Server.ipBackend + "/api/user/logout/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: CORREO_US,
        token: TOKEN_PHONE,
      }),
    });
    let data = await response.json();
  };

  useEffect(() => {
    salir();
    navigation.addListener("willFocus", salir);
  }, []);

  const salir = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Esta seguro de salir?",
      [
        {
          text: "No",
          onPress: () => navigation.navigate("Detalle"),
          style: "cancel",
        },
        {
          text: "Si",
          onPress: () => {
            AsyncStorage.removeItem("STORAGE_KEY");
            logout();
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
