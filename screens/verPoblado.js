import React, { Component } from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Button,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import datos_Server from "./datosGlobales";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const hpantalla = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e1e1",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    backgroundColor: "#e1e1e1",
    alignItems: "center",
    justifyContent: "center",
  },
  ScrollView: {
    paddingTop: 45,
    paddingBottom: 35,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 16,
    fontWeight: "900",
    textAlign: "center",
  },
  title2: {
    fontSize: 20,
    marginBottom: 16,
    //marginTop: 16,
    fontWeight: "bold",
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 2,
    marginTop: 2,
    fontWeight: "bold",
  },
  numeros: {
    color: "#3db226",
    fontSize: 25,
    marginBottom: 2,
    marginTop: 2,
    fontWeight: "bold",
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 1,
  },
  lista: {
    paddingBottom: hpantalla * 0.18,
  },
});

class VerPoblados extends Component {
  state = {
    albergues: [],
    datos: [],
    refreshing: false,
    depto_: [{ label: "Todos" }],
    muni: [{ label: "Todos" }],
  };

  confirmarDelete = async (_id) => {
    let DEMO_TOKEN = await AsyncStorage.getItem("STORAGE_KEY");
    try {
      let response = await fetch(
        datos_Server.ipBackend + "/api/poblado/" + _id,
        {
          method: "DELETE",
          headers: {
            "access-token": DEMO_TOKEN,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();

      if (data.status) {
        this.onRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  vista = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.fila}>
        <View style={styles.container}>
          <Text style={styles.title2}>{item.nombre}</Text>
          <Text style={{ color: "#5fb181" }}>Departamento:</Text>
          <Text style={styles.subtitle}>{item.departamento}</Text>
          <Text style={{ color: "#5fb181" }}>Municipio:</Text>
          <Text style={styles.subtitle}>{item.municipio}</Text>
        </View>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="home-group"
            size={100}
            color="#363232"
          />
        </View>
      </View>
      <Button
        title="Eliminar"
        color="#4b95b0"
        onPress={() => this.confirmarDelete(item._id)}
      >
        Eliminar
      </Button>
    </View>
  );

  async componentDidMount() {
    let DEMO_TOKEN = await AsyncStorage.getItem("STORAGE_KEY");
    console.log(DEMO_TOKEN);
    fetch(datos_Server.ipBackend + "/api/poblado/", {
      method: "GET",
      headers: {
        "access-token": DEMO_TOKEN,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ albergues: data });
        this.f5Deptos("Todos");
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <View
        style={{
          paddingTop: 30,
          flexDirection: "column-reverse",
          backgroundColor: "#539371",
        }}
      >
        <View
          style={{
            height: hpantalla * 0.78,
            paddingBottom: hpantalla * 0.135,
            backgroundColor: "#ffffff",
          }}
        >
          <FlatList
            nestedScrollEnabled={true}
            data={this.state.datos}
            renderItem={(item) => (
              <View style={styles.item}>{this.vista(item)}</View>
            )}
            keyExtractor={(item, index) => {
              return String(index);
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          />
        </View>

        <View style={styles.fila}>
          <Text style={styles.subtitle}>Municipio</Text>
          <DropDownPicker
            items={this.state.muni}
            placeholder="Seleccione un Municipio"
            containerStyle={{ height: 40, width: 245 }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => this.f5Mun(item.label)}
            searchable={true}
            searchablePlaceholder="Busque un municipio"
            searchablePlaceholderTextColor="gray"
            seachableStyle={{}}
            searchableError={() => <Text>Not Found</Text>}
          />
        </View>
        <View style={styles.fila}>
          <Text style={styles.subtitle}>Departamento</Text>
          <DropDownPicker
            items={this.state.depto_}
            placeholder="Seleccione un Departamento"
            containerStyle={{ height: 40, width: 245 }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => this.f5Deptos(item.label)}
            searchable={true}
            searchablePlaceholder="Busque un depto."
            searchablePlaceholderTextColor="gray"
            seachableStyle={{}}
            searchableError={() => <Text>Not Found</Text>}
          />
        </View>
        <Text style={styles.title}>Lugares Poblados</Text>
      </View>
    );
  }

  getDeptos = () => {
    let d = [{ label: "Todos" }];
    for (let i = 0; i < this.state.albergues.length; i++) {
      if (!d.some((e) => e.label === this.state.albergues[i].departamento)) {
        d.push({ label: this.state.albergues[i].departamento });
      }
    }
    return d;
  };
  getMun = (dep) => {
    let d = [{ label: "Todos" }];
    for (let i = 0; i < this.state.albergues.length; i++) {
      if (!d.some((e) => e.label === this.state.albergues[i].municipio)) {
        if (dep == "Todos" || this.state.albergues[i].departamento == dep) {
          d.push({ label: this.state.albergues[i].municipio });
        }
      }
    }
    return d;
  };
  f5Deptos = (depto) => {
    this.setState({ depto_: this.getDeptos() });
    if (depto == "Todos") {
      this.setState({ datos: this.state.albergues });
      this.setState({ muni: this.getMun("Todos") });
    } else {
      this.setState({
        datos: this.state.albergues.filter((item) => {
          return item.departamento == depto;
        }),
      });
      this.setState({ muni: this.getMun(depto) });
    }
  };
  f5Mun = (mun) => {
    this.setState({ depto_: this.getDeptos() });
    if (mun == "Todos") {
      this.setState({ datos: this.state.albergues });
      this.setState({ muni: this.getMun("Todos") });
    } else {
      this.setState({
        datos: this.state.albergues.filter((item) => {
          return item.municipio == mun;
        }),
      });
    }
  };

  async onRefresh() {
    try {
      let DEMO_TOKEN = await AsyncStorage.getItem("STORAGE_KEY");
      console.log(DEMO_TOKEN);
      fetch(datos_Server.ipBackend + "/api/poblado/", {
        method: "GET",
        headers: {
          "access-token": DEMO_TOKEN,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ albergues: data });
          this.f5Deptos("Todos");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
      this.setState({ albergues: [] });
      this.f5Deptos("Todos");
    }
  }
}

export default VerPoblados;
