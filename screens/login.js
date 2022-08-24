import React from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  Alert,
  Image,
} from "react-native";
import useForm from "../hooks/useForm";
import ImgGualert from "../assets/gualert.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import datos_Server from "./datosGlobales";

export default ({ navigation }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const onSubmit = (values) => {
    const _storeData = async () => {
      try {
        let TOKEN_PHONE = await AsyncStorage.getItem("TOKEN_PHONE");
        await AsyncStorage.setItem("CORREO_US", values.email);
        let response = await fetch(
          datos_Server.ipBackend + "/api/user/login/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
              token: TOKEN_PHONE,
            }),
          }
        );
        let data = await response.json();

        //console.log(data);
        if (data.status) {
          await AsyncStorage.setItem("STORAGE_KEY", data.token);
          navigation.navigate("Detalle");
        } else {
          Alert.alert("Error", "Credenciales invalidas");
        }
      } catch (error) {
        console.log(error);
      }
    };
    _storeData();
  };

  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <Image source={ImgGualert} style={styles.imagen} />

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
      <View style={styles.fila}>
        <Button title="Iniciar Sesión" color="#363232" onPress={handleSubmit} />
        <Text style={{ width: 25 }} />
        <Button
          title="Registrarse"
          color="#363232"
          onPress={() => navigation.navigate("Registro")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 20,
  },
  imagen: {
    height: 200,
    width: 350,
    resizeMode: "cover",
  },
});
