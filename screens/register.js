import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  Alert,
  Image,
  Platform,
} from "react-native";
import useForm from "../hooks/useForm";
import ImgGualert from "../assets/gualert.jpg";
import datos_Server from "./datosGlobales";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [lati, setLati] = useState(0);
  const [longi, setLongi] = useState(0);
  const initialState = {
    name: "",
    email: "",
    password: "",
    secondpass: "",
  };

  useEffect(() => {
    setLoading(true);
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log(
        "Oops, esto no funcionará en Sketch en un emulador de Android. Pruébelo en su dispositivo!"
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }
        let location = await Location.getCurrentPositionAsync({});
        setLati(location.coords.latitude);
        setLongi(location.coords.longitude);
        setLoading(false);
      })();
    }
  }, []);

  const onSubmit = (values) => {
    const _storeData = async () => {
      try {
        let response = await fetch(
          datos_Server.ipBackend + "/api/user/register/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullname: values.name,
              email: values.email,
              password: values.password,
              location: { latitud: lati, longitud: longi },
            }),
          }
        );
        let data = await response.json();

        console.log(data);
        if (data.status) {
          await AsyncStorage.setItem("STORAGE_KEY", data.token);
          Alert.alert("Exito", "Usuario Creado Correctamente", [
            {
              text: "Ir al Inicio",
              onPress: () => navigation.navigate("Detalle"),
            },
          ]);
        } else {
          Alert.alert("Error", data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (values.password === values.secondpass) {
      _storeData();
    } else {
      Alert.alert("Error", "Las contraseñas no son iguales");
    }
  };

  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.paragraph}>Buscando ubicación...</Text>
      ) : (
        <>
          <Image source={ImgGualert} style={styles.imagen} />

          <TextInput
            value={inputs.name}
            onChangeText={subscribe("name")}
            style={styles.input}
            placeholder="Nombre"
          />
          <TextInput
            autoCapitalize="none" //Para que no inicie con mayuscules
            value={inputs.email}
            onChangeText={subscribe("email")}
            style={styles.input}
            placeholder="Correo"
          />
          <TextInput
            autoCapitalize="none" //Para que no inicie con mayuscules
            value={inputs.password}
            onChangeText={subscribe("password")}
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
          />
          <TextInput
            autoCapitalize="none" //Para que no inicie con mayuscules
            value={inputs.secondpass}
            onChangeText={subscribe("secondpass")}
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry={true}
          />
          <View style={styles.fila}>
            <Button title="Registrase" color="#363232" onPress={handleSubmit} />
            <Text style={{ width: 25 }} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#e2e3e3",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    alignSelf: "stretch",
    marginBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: "#d4fae4",
    marginTop: 10,
    borderRadius: 10,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
    marginTop: 10,
  },
  imagen: {
    height: 200,
    width: 350,
    resizeMode: "cover",
  },
});
