import React, { Component } from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import datos_Server from "./datosGlobales";
import moment from "moment";

const hpantalla = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363232",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    backgroundColor: "#363232",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  ScrollView: {
    paddingTop: 45,
    paddingBottom: 35,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginLeft: 50,
  },
  title2: {
    fontSize: 22,
    marginBottom: 10,
    //marginTop: 16,
    fontWeight: "900",
    paddingTop: 20,
    color: "#5fb181",
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
  lista: {
    paddingBottom: hpantalla * 0.18,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
    marginTop: 5,
  },
  fila2: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 15,
    paddingTop: 15,
    marginBottom: 15,
  },
});

class VerAlertas2 extends Component {
  state = {
    alertas: [],
    datos: [],
    refreshing: false,
    depto_: [{ label: "Todos" }],
    muni: [{ label: "Todos" }],
    Nomb_: [{ label: "Todos" }],
    loading1: true,
  };

  vista = ({ item }) => (
    <View style={styles.container2}>
      <Text style={styles.title2}>{item.evento}</Text>
      <View style={{ alignContent: "flex-start" }}>
        <Text style={{ color: "#ffffff", fontSize: 20, marginBottom: 5 }}>
          {moment(item.fecha).format("DD-MM-YY")}
        </Text>
      </View>
      <View style={styles.fila}>
        <View style={styles.container}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ color: "#ffffff", fontSize: 12, textAlign: "left" }}>
              {"Tipo: " + item.tipo}
            </Text>
            <Text style={{ color: "#ffffff", fontSize: 12, textAlign: "left" }}>
              {"Nivel: " + item.nivel}
            </Text>
            <Text style={{ color: "#ffffff", fontSize: 12, textAlign: "left" }}>
              {"Departamento: " + item.ubicacion.departamento}
            </Text>
            <Text style={{ color: "#ffffff", fontSize: 12, textAlign: "left" }}>
              {"Ciudad: " + item.ubicacion.ciudad}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <Foundation name="alert" size={80} color={item.alerta.color} />
        </View>
      </View>
      <Text style={{ color: "#ffffff", padding: 15 }}>{item.descripcion}</Text>
    </View>
  );

  async componentDidMount() {
    fetch(datos_Server.ipBackend + "/api/alertas/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          alertas: data.Alertas.filter(
            (obj) => obj.alerta.nombre != "VERDE" && "ubicacion" in obj
          ),
        });
        this.f5Deptos("Todos");
        this.setState({ loading1: false });
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
            height: hpantalla * 0.8,
            backgroundColor: "#ffffff",
          }}
        >
          {this.state.loading1 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 10,
              }}
            >
              <ActivityIndicator size="large" color="#4b95b0" />
            </View>
          ) : (
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
          )}
        </View>

        <View style={styles.fila}>
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

        <View style={styles.fila2}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          >
            <MaterialCommunityIcons name="menu" size={35} />
          </TouchableOpacity>
          <Text style={styles.title}>Alertas</Text>
        </View>
      </View>
    );
  }

  getDeptos = () => {
    let d = [{ label: "Todos" }];
    for (let i = 0; i < this.state.alertas.length - 1; i++) {
      if ("ubicacion" in this.state.alertas[i]) {
        if (
          !d.some(
            (e) => e.label === this.state.alertas[i].ubicacion.departamento
          )
        ) {
          d.push({ label: this.state.alertas[i].ubicacion.departamento });
        }
      }
    }
    return d;
  };

  getNombres = () => {
    let d = [{ label: "Todos" }];
    for (let i = 0; i < this.state.alertas.length; i++) {
      if (!d.some((e) => e.label === this.state.alertas[i].nombre)) {
        d.push({ label: this.state.alertas[i].nombre });
      }
    }
    return d;
  };

  getMun = (dep) => {
    let d = [{ label: "Todos" }];
    for (let i = 0; i < this.state.alertas.length - 1; i++) {
      if ("ubicacion" in this.state.alertas[i]) {
        if (
          !d.some((e) => e.label === this.state.alertas[i].ubicacion.ciudad)
        ) {
          if (
            dep == "Todos" ||
            this.state.alertas[i].ubicacion.departamento == dep
          ) {
            d.push({ label: this.state.alertas[i].ubicacion.ciudad });
          }
        }
      }
    }
    return d;
  };
  f5Deptos = (depto) => {
    this.setState({ depto_: this.getDeptos() });
    if (depto == "Todos") {
      this.setState({ datos: this.state.alertas });
      this.setState({ muni: this.getMun("Todos") });
    } else {
      this.setState({
        datos: this.state.alertas.filter((item) => {
          return "ubicacion" in item && item.ubicacion.departamento == depto;
        }),
      });
      this.setState({ muni: this.getMun(depto) });
    }
  };
  f5Mun = (mun) => {
    this.setState({ depto_: this.getDeptos() });
    if (mun == "Todos") {
      this.setState({ datos: this.state.alertas });
      this.setState({ muni: this.getMun("Todos") });
    } else {
      this.setState({
        datos: this.state.alertas.filter((item) => {
          return "ubicacion" in item && item.ubicacion.ciudad == mun;
        }),
      });
    }
  };

  f5Nombre = (mun) => {
    this.setState({ Nomb_: this.getNombres() });
    if (mun == "Todos") {
      this.setState({ datos: this.state.alertas });
    } else {
      this.setState({
        datos: this.state.alertas.filter((item) => {
          return item.nombre == mun;
        }),
      });
    }
  };

  async onRefresh() {
    try {
      fetch(datos_Server.ipBackend + "/api/alertas/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data.Alertas);
          this.setState({
            alertas: data.Alertas.filter(
              (obj) => obj.alerta.nombre != "VERDE" && "ubicacion" in obj
            ),
          });
          this.f5Deptos("Todos");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      //console.error(error);
      this.setState({ alertas: [] });
      this.f5Deptos("Todos");
    }
  }
}

export default VerAlertas2;
