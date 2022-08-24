import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { default as Modal } from "./modal";
import datos_Server from "../screens/datosGlobales";

const styles = StyleSheet.create({
  space: {
    width: 20,
    height: 25,
  },
  global: {
    flexDirection: "column-reverse",
    zIndex: 0,
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column-reverse",
  },
  ScrollView: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 16,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 2,
    marginTop: 2,
    fontWeight: "bold",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 2,
    alignSelf: "stretch",
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  seleted: {
    height: 50,
    width: 150,
    alignSelf: "stretch",
  },
});

export default ({
  visibility,
  submit,
  changeNombre,
  changeDepto,
  Deptito,
  changeMuni,
  changeRadio,
  nameIcon,
  color,
  titulo,
  cierre,
}) => {
  return (
    <Modal visibility={visibility}>
      <View style={styles.global}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el nombre"
          onChangeText={changeNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese el radio"
          onChangeText={changeRadio}
        />

        <DropDownPicker
          items={datos_Server.mun[Deptito]}
          placeholder="Seleccione un municipio"
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa", marginBottom: 5, marginTop: 5 }}
          itemStyle={{ justifyContent: "flex-start" }}
          dropDownStyle={{ backgroundColor: "#fafafa", height: 80 }}
          onChangeItem={changeMuni}
        />

        <DropDownPicker
          items={datos_Server.depto}
          placeholder="Seleccione un Departamento"
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa", marginBottom: 5, marginTop: 5 }}
          itemStyle={{ justifyContent: "flex-start" }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={changeDepto}
        />
        <View style={styles.space} />
        <Button title="Cerrar" color="#c64639" onPress={cierre} />
        <View style={styles.space} />
        <Button title="Guardar" onPress={submit} />
        <View style={styles.space} />
        <View style={styles.container}>
          <MaterialCommunityIcons name={nameIcon} size={80} color={color} />
          <Text style={styles.title}>Registro {titulo}</Text>
        </View>
        <Text style={{ height: 20 }} />
      </View>
    </Modal>
  );
};
