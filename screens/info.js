import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ImgDesastres from "../assets/desastres.jpg";
import ImgAlerta from "../assets/alerta.jpg";
import {
  Foundation,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
const { width, height } = Dimensions.get("window");
const hpantalla = height;
const apnatalla = width;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    marginLeft: 20,
    textAlign: "justify",
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
    justifyContent: "space-between",
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
  },
  imagen: {
    height: 200,
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

export default class Items extends React.Component {
  state = { activeIndex: 0 };

  tarjetas1 = [
    {
      title: "Alerta Verde",
      bold: "Vigilancia: ",
      contenido: "Continúa con actividades normales.",
      icono: <Foundation name="alert" size={80} color="green" />,
      imagen: "",
    },
    {
      title: "Alerta Amarilla",
      bold: "Prevención: ",
      contenido:
        "Prepárate para actuar. Atiende las instrucciones y recomendaciones de las autoridades.",
      icono: <Foundation name="alert" size={80} color="yellow" />,
      imagen: "",
    },
    {
      title: "Alerta Naranja",
      bold: "Peligro: ",
      contenido:
        "¡Mantente alerta! Observa cualquier signo de peligro, si es necesario evacua zonas de peligro, dirigete a refugios provisionales. Atiende las instrucciones de las autoridades.",
      icono: <Foundation name="alert" size={80} color="orange" />,
      imagen: "",
    },
    {
      title: "Alerta Roja",
      bold: "Emergencia: ",
      contenido:
        "Evacúa zonas de peligro. Permanece en refugios provisionales. Sigue las instrucciones emitidas por autoridades.",
      icono: <Foundation name="alert" size={80} color="red" />,
      imagen: "",
    },
  ];

  tarjetas2 = [
    {
      title: "Alerta Institucional",
      bold: " ",
      contenido:
        "Esta Alerta opera únicamente para el personal de la " +
        "Secretaría Ejecutiva de la Coordinadora Nacional para la " +
        "Reducción de Desastres -SE-CONRED- y para enlaces " +
        "interinstitucionales del Sistema, declarada por el Coordinador " +
        "de la Junta Ejecutiva.",
      icono: <Foundation name="alert" size={80} color="#fe5000" />,
      imagen: "",
    },
    {
      title: "Alerta Pública",
      bold: " ",
      contenido:
        "Opera para la población en general y será declarada " +
        "únicamente por el Consejo Nacional para la Reducci\u00F3n de Desastres de CONRED a propuesta del Coordinador " +
        "de la Junta Ejecutiva. Esta Alerta, dependiendo de la intensidad " +
        "del fen\u00F3meno natural, puede ser Verde, Amarilla, " +
        "Anaranjada o Roja.",
      icono: <Foundation name="alert" size={80} color="#fe5000" />,
      imagen: "",
    },
  ];

  tarjetas3 = [
    {
      title: "Temblor",
      bold: "",
      contenido: (
        <>
          <Text style={styles.bullets}>
            {"\u2B24" +
              " " +
              "Conserve la calma y este atento a las indicaciones de las autoridades"}
          </Text>
          {"\n \n"}
          <Text style={styles.bullets}>
            {"\u2B24" + " " + "Retirese de ventanas y objetos que puedan caer"}
          </Text>
          {"\n \n"}
          <Text style={styles.bullets}>
            {"\u2B24" + " " + "No use elevadores"}
          </Text>
          <Text>
            {"\n \n"}
            <Text style={styles.bullets}>
              {"\u2B24" + " " + "Ubiquese en zonas seguras: "}
            </Text>
            Colocarse debajo de un lugar seguro (como una mesa o escritorio
            resistente).{" "}
          </Text>
          {"\n \n"}
          <Text style={styles.bullets}>
            {"\u2B24" +
              " " +
              "Localice la ruta de evacuaci\u00F3n y de ser posible desaloje el inmueble."}
          </Text>
        </>
      ),
      icono: <MaterialCommunityIcons name="earth" size={80} color="#b2884e" />,
      imagen: "",
    },
    {
      title: "Inundación",
      bold: " ",
      contenido: (
        <>
          <Text style={styles.bullets}>
            {"\u2B24" +
              " " +
              "Conserve la calma y siga las recomendaciones de las autoridades"}
          </Text>
          {"\n \n"}
          <Text style={styles.bullets}>
            {"\u2B24" +
              " " +
              "Retirar objetos que puedan ser arrastrados por el agua"}
          </Text>
          {"\n \n"}
          <Text style={styles.bullets}>
            {"\u2B24" + " " + "Cerrar suministros de gas, electricidad y agua"}
          </Text>
          {"\n \n"}
          <Text style={styles.bullets}>
            {"\u2B24" +
              " " +
              "Usar ropa protectora y solo beber agua embotellada"}
          </Text>
          <Text>
            {"\n \n"}
            <Text style={styles.bullets}>
              {"\u2B24" +
                " " +
                "Permanecer en sitios elevados de ser necesario abandonar la vivienda "}
            </Text>
          </Text>
          <Text>
            {"\n \n"}
            <Text style={styles.bullets}>
              {"\u2B24" + " " + "Evitar transitar por zonas inundadas. "}
            </Text>
          </Text>
        </>
      ),
      icono: <FontAwesome5 name="water" size={80} color="#6495f7" />,
      imagen: "",
    },
    {
      title: "Actividad Volcánica",
      bold: "",
      contenido: (
        <>
          <Text style={styles.bullets}>
            {"\u2B24" +
              " " +
              "Acerquese a autoridades locales para conocer el plan de respuesta"}
          </Text>
          {"\n \n"}
          <Text style={styles.bullets}>
            {"\u2B24" +
              " " +
              "Ante la caida de ceniza, cubra los depositos de agua y utilice mascarilla"}
          </Text>
          {"\n \n"}
          <Text style={styles.bullets}>
            {"\u2B24" + " " + "Ubique las rutas de evacuaci\u00F3n"}
          </Text>
          {"\n \n"}
          <Text style={styles.bullets}>
            {"\u2B24" +
              " " +
              "Atienda las recomendaciones de las autoridades, y evacue de ser necesario"}
          </Text>
          {"\n \n"}
          <Text style={styles.bullets}>
            {"\u2B24" +
              " " +
              "Mantengase informado a traves de noticieros y redes sociales"}
          </Text>
        </>
      ),
      icono: <FontAwesome5 name="fire" size={80} color="#f91c05" />,
      imagen: "",
    },
  ];

  _renderItem({ item, index }) {
    return (
      <View
        style={{
          alignItems: "center",
          width: 255,
          borderRadius: 50,
          marginLeft: 55,
        }}
      >
        {item.imagen === "" ? (
          <View
            style={{
              backgroundColor: "#eefcf2",
            }}
          >
            <Text style={styles.container}>
              {"\n \n"}
              <Text style={{ fontWeight: "bold" }}>{item.bold}</Text>
              {item.contenido}
              {"\n \n"}
            </Text>
            <View style={styles.caja}>
              <Text style={{ height: 10 }} />
              <View style={styles.fila}>
                <Text style={styles.textMenu1}>{item.title}</Text>
                <Text>{item.icono}</Text>
                <Text style={{ width: 55 }} />
              </View>
            </View>
          </View>
        ) : (
          <>
            <Image source={item.imagen} style={styles.imagen} />
            <View style={styles.caja}>
              <Text style={{ height: 15 }} />
              <Text style={styles.textMenu1}>{item.title}</Text>
              <Text style={{ width: apnatalla * 0.65 }} />
              <Text style={{ height: 15 }} />
            </View>
          </>
        )}
      </View>
    );
  }
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
        <View alignItems="center">
          <Text style={styles.title0}>{"Información General"}</Text>
        </View>
        <ScrollView>
          <View alignItems="center">
            <Text style={styles.title}>Niveles de Alerta</Text>
          </View>
          <Carousel
            layout={"stack"}
            ref={(ref) => (this.carousel = ref)}
            data={this.tarjetas1}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
          <Text style={{ height: 10 }} />
          <View alignItems="center">
            <Text style={styles.title}>Tipos de Alerta</Text>
          </View>
          <Carousel
            layout={"stack"}
            ref={(ref) => (this.carousel = ref)}
            data={this.tarjetas2}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
          <Text style={{ height: 10 }} />
          <View alignItems="center">
            <Text style={styles.title}>Consejos en caso de desastres</Text>
          </View>
          <Carousel
            layout={"stack"}
            ref={(ref) => (this.carousel = ref)}
            data={this.tarjetas3}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />

          <Text style={{ height: 100 }} />
        </ScrollView>
      </View>
    );
  }
}
