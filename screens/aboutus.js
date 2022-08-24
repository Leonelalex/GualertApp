import React, { Component, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Alert,
  Button,
  Linking,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ahambre from "../assets/ahambre.png";
import euah from "../assets/euah.png";
import gb from "../assets/gb.png";
import lconred from "../assets/lconred.png";
const { width, height } = Dimensions.get("window");
const hpantalla = height;
const apnatalla = width;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    marginLeft: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    marginTop: 16,
    paddingLeft: 5,
    fontWeight: "900",
    color: "#5fb181",
    textAlign: "center",
  },
  title0: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 16,
    fontWeight: "bold",
    color: "#5fb181",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 2,
    marginTop: 2,
    fontWeight: "bold",
  },
  textMenu1: {
    fontSize: 18,
    marginBottom: 2,
    marginTop: 2,
    marginLeft: 10,
    color: "#ffffff",
    fontWeight: "bold",
  },
  textMenu2: {
    fontSize: 15,
    marginBottom: 2,
    marginTop: 2,
    marginLeft: 10,
    color: "#ffffff",
    fontWeight: "bold",
  },
  caja: {
    backgroundColor: "#363232",
    marginBottom: 5,
    marginTop: 5,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
  },
  bullets: {
    paddingBottom: 10,
    flex: 1,
  },
  fondo: {
    backgroundColor: "#e1e1e1",
    height: hpantalla + 100,
    textAlign: "justify",
  },
  imagen: {
    height: 100,
    width: 150,
    resizeMode: "cover",
  },
  imagen2: {
    height: 80,
    width: 130,
    resizeMode: "cover",
  },
  imagen3: {
    height: 120,
    width: 130,
    resizeMode: "cover",
  },
  imagen4: {
    height: 80,
    width: 250,
    resizeMode: "cover",
  },
  fila2: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 15,
    marginTop: 45,
  },
});

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`No se pudo abrir el siguiente link: ${url}`);
    }
  }, [url]);

  return <Button color="#363232" title={children} onPress={handlePress} />;
};
export default class AboutUs extends Component {
  state = {};

  render() {
    return (
      <View style={styles.fondo}>
        <View style={styles.fila2}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          >
            <MaterialCommunityIcons name="menu" size={35} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title0}>{"Sobre Nosotros"}</Text>
        <ScrollView>
          <View alignItems="center">
            <Text style={styles.title}>Gualert</Text>
            <Text
              style={{ marginLeft: 20, marginRight: 25, textAlign: "justify" }}
            >
              Gualert es una{" aplicación "} la cual busca{" "}
              {"la divulgación y sensibilización de la información referente a albergues y alertas manejadas por CONRED de forma inmediata, " +
                "siendo este un aspecto clave y primordial para los Sistemas de Alerta Temprana."}
            </Text>
            <Text style={{ height: 10 }} />
            <Text style={styles.title}>Origen</Text>
            <Text style={{ height: 10 }} />
            <Text
              style={{ marginLeft: 20, marginRight: 25, textAlign: "justify" }}
            >
              Gualert se origina gracias a la oportunidad presentada por las
              instituciones organizadoras del HackathonGT 2020
            </Text>
            <Text style={{ height: 10 }} />

            <View style={styles.fila}>
              <Image source={ahambre} style={styles.imagen2} />
              <Image source={lconred} style={styles.imagen} />
            </View>
            <View style={styles.fila}>
              <Image source={gb} style={styles.imagen4} />
            </View>
            <View style={styles.fila}>
              <Image source={euah} style={styles.imagen3} />
            </View>
            <Text style={{ height: 10 }} />
            <Text style={styles.title}>Equipo de Desarrollo</Text>
            <Text
              style={{ marginLeft: 20, marginRight: 25, textAlign: "justify" }}
            >
              {
                "El equipo a cargo de la planificación y desarrollo de la aplicación movil Gualert se conformó por los siguientes profesionales:"
              }
            </Text>
            <Text style={{ height: 20 }} />
          </View>
          <View style={styles.caja}>
            <Text style={{ height: 10 }} />

            <View style={styles.fila}>
              <OpenURLButton
                url={
                  "https://www.linkedin.com/in/carlos-rodrigo-estrada-najarro-61a6851b9/"
                }
              >
                Carlos Estrada
              </OpenURLButton>
              <OpenURLButton
                url={"https://www.linkedin.com/in/gerardo-chay-97967b197/"}
              >
                Gerardo Chay
              </OpenURLButton>
            </View>
            <View style={styles.fila}>
              <OpenURLButton
                url={
                  "https://www.linkedin.com/in/raquel-illescas-rivas-3774751b4/"
                }
              >
                Raquel Illescas
              </OpenURLButton>
              <OpenURLButton
                url={"https://www.linkedin.com/in/erik-flores-051923122/"}
              >
                Erik Flores
              </OpenURLButton>
            </View>

            <Text style={{ height: 80 }} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
