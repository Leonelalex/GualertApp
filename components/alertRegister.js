import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Foundation } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { default as Modal } from "./modal";

const styles = StyleSheet.create({
  space: {
    width: 20,
    height: 25,
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 16,
    fontWeight: "900",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    alignSelf: "stretch",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  seleted: {
    height: 50,
    width: 150,
    alignSelf: "stretch",
  },
  space: {
    width: 20,
    height: 25,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default ({
  visibility,
  submit,
  OnChangeItem,
  changeRadio,
  changeDescrip,
  changeNombre,
  cierre,
}) => {
  return (
    <Modal visibility={visibility}>
      <View style={styles.container}>
        {/*<Foundation name="alert" size={100} color={colorcito} />*/}
        <Text style={styles.title}>Registro de Alertas</Text>
        <Text>Nivel de Alerta:</Text>
        <DropDownPicker
          items={[
            {
              label: "Verde",
              value: "v1",
              icon: () => <Foundation name="alert" size={18} color="green" />,
            },
            {
              label: "Amarillo",
              value: "v2",
              icon: () => <Foundation name="alert" size={18} color="yellow" />,
            },
            {
              label: "Naranja",
              value: "v3",
              icon: () => <Foundation name="alert" size={18} color="orange" />,
            },
            {
              label: "Rojo",
              value: "v4",
              icon: () => <Foundation name="alert" size={18} color="red" />,
            },
          ]}
          defaultValue="v1"
          placeholder="Seleccione nivel de alerta"
          containerStyle={{ height: 30, width: 110 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={OnChangeItem}
        />
        <View style={styles.space} />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={changeNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          multiline={true}
          numberOfLines={5}
          onChangeText={changeDescrip}
        />
        <TextInput
          style={styles.input}
          placeholder="Radio en metros"
          onChangeText={changeRadio}
        />
        <Button title="Guardar" onPress={submit} />
        <View style={styles.space} />
        <Button title="Cerrar" color="#c64639" onPress={cierre} />
      </View>
    </Modal>
  );
};
