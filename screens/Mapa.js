import React, { useState, useEffect, useRef } from "react";
import { Platform, StyleSheet, Dimensions, View, Text, ScrollView,TouchableOpacity,ActivityIndicator, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";
import Constants from "expo-constants";
import { Directions } from "../components";
import datos_Server from "../screens/datosGlobales";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons,Foundation } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = (width*2) / height;
const LATITUDE_DELTA = 0.90;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [albergues, setAlbergues] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [muni, setMuni] = useState([]);
  const [destination, setDestination] = useState({latitude: 0, longitude: 0, title: ''});
  const [origin, setOrigin] = useState({latitude: datos_Server.coordenadas.latitude, longitude: datos_Server.coordenadas.longitude, title: ''});
  const isMountedRef = useRef({current:true});
  const [verAlert,setVerAlert]=useState(false)
  const [verMuni,setVerMuni]=useState(false)
  const [verAlber,setVerAlber]=useState(false)
  const categories = [
    {
      name: 'Menu',
      icon: <MaterialCommunityIcons name="menu" style={styles.chipsIcon} size={18}  />,
      onPress: () => { navigation.openDrawer() }
    },
    {
      name: 'Albergues',
      icon: <MaterialCommunityIcons name="home" style={styles.chipsIcon} size={18}  />,
      onPress: () => { setVerAlert(false); setVerAlber(true); setVerMuni(false); setDestination({latitude: 0, longitude: 0, title: ''}); }
    },
    { 
      name: 'Departamentales', 
      icon: <MaterialCommunityIcons style={styles.chipsIcon} name="alert-circle" size={18} />,
      onPress: () => { setVerAlert(true); setVerAlber(false); setVerMuni(false); setDestination({latitude: 0, longitude: 0, title: ''}); }
    },
    {
      name: 'Municipales',
      icon: <MaterialCommunityIcons name="alert" style={styles.chipsIcon} size={18} />,
      onPress: () => { setVerAlert(false); setVerAlber(false); setVerMuni(true); setDestination({latitude: 0, longitude: 0, title: ''}); }
    },
    {
      name: 'Ninguno',
      icon: <MaterialCommunityIcons name="stop-circle" style={styles.chipsIcon} size={18}  />,
      onPress: () => { setVerAlert(false); setVerAlber(false); setVerMuni(false); setDestination({latitude: 0, longitude: 0, title: ''}); }
    },
  ]

  const fetchAlbergue = async () => {
    let DEMO_TOKEN = await AsyncStorage.getItem("STORAGE_KEY");
    await fetch(datos_Server.ipBackend + "/api/albergue/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMountedRef.current) {
          let lista = [];
          data.forEach((obj, index) => {
            try {
              if (obj.latitude) {
                lista.push({
                  departamento: obj.departamento,
                  municipio: obj.municipio,
                  ubicacion: {
                    latitude: obj.latitude,
                    longitude: obj.longitude,
                  },
                  nombre: obj.albergue,
                });
              }
            } catch (error) {
              console.log(error);
            }
          });

          setAlbergues(lista);
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchAlerta = async () => {
    let DEMO_TOKEN = await AsyncStorage.getItem("STORAGE_KEY");
    await fetch(datos_Server.ipBackend + "/api/alertas/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMountedRef.current) {
          let lista = [];
          let lista2 = [];
          let pila = []
          
          data.Alertas.forEach((obj, index) => {
            try {

              if(obj.nivel){
                
                if(obj.nivel.toUpperCase() == "DEPARTAMENTAL"){
                      //console.log(obj)
                      let pasar = true;
                      pila.forEach( nombre => {
                        if( nombre == obj.ubicacion.departamento.toUpperCase()){
                          pasar = false
                        }
                      })

                      if(pasar == true){
                        let listaPuntos = []
                        //console.log('Departamento ',obj.ubicacion.departamento.toUpperCase())
                        //const depta = "Zacapa"
                        for(let i = 0; i < datos_Server.poligonoDepto.length; i++){
                          if(obj.ubicacion.departamento.toUpperCase() == datos_Server.poligonoDepto[i].nombre.toUpperCase()){
                            //console.log('Poligono Depto ',datos_Server.poligonoDepto[i].nombre.toUpperCase())
                            const puntos = datos_Server.poligonoDepto[i].puntos
                            puntos.forEach( pun => {
                              listaPuntos.push({
                                latitude: pun[1],
                                longitude: pun[0]
                              })
                            })
                            pila.push(datos_Server.poligonoDepto[i].nombre.toUpperCase())
                            break;
                          }
                        }
                        lista.push({
                          nombre: obj.evento,
                          alerta: obj.alerta,
                          puntos: listaPuntos,
                          ciudad: obj.ubicacion.ciudad
                        });
                      }

                }else{

                  if(obj.fecha){
                    var ano = obj.fecha.split('-')
                    var d = new Date();
                    var n = d.getFullYear();
    
                    if(n == ano[0]){
                      let color = "red";
                      if(obj.alerta.nombre.toUpperCase() == "ANARANJADA")
                        color="orange"
                      else if(obj.alerta.nombre.toUpperCase() == "AMARILLA")
                        color="yellow"
                      else if(obj.alerta.nombre.toUpperCase() == "VERDE")
                        color="green"
                      //console.log(obj.alerta.nombre)
                      lista2.push({
                        ubicacion: {
                          latitude: obj.ubicacion.latitude,
                          longitude: obj.ubicacion.longitude,
                        },
                        nombre: "Inundación",
                        alerta: obj.alerta,
                        color: color,
                      });
                    }
                  }

                }
              }
            } catch (error) {
              console.log(error)
            }
          });

          setAlertas(lista);
          setMuni(lista2);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log(
        "Oops, esto no funcionará en Sketch en un emulador de Android. Pruébelo en su dispositivo!"
      );
    } else {
      (async () => {
        await fetchAlbergue();
        await fetchAlerta();
        navigation.addListener("willFocus", actualizarT);
      })();
    }
    return () => (isMountedRef.current = false);
  }, []);

  const actualizarT = async () => {
    await fetchAlbergue();
    await fetchAlerta();
  };

  const irAlbergue = (coordenadas, titulo) => {
    //console.log(coordenadas);
    if (destination) {
      if (
        destination.latitude === coordenadas.latitude &&
        destination.longitude === coordenadas.longitude
      ) {
        setDestination({latitude: 0, longitude: 0, title: ''});
      } else {
        setDestination({
          latitude: coordenadas.latitude,
          longitude: coordenadas.longitude,
          title: titulo,
        });
      }
    } else {
      setDestination({
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude,
        title: titulo,
      });
    }
  };


  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1,justifyContent: "center",flexDirection: "row",justifyContent: "space-around",padding: 10}}>
          <ActivityIndicator size="large" color="#4b95b0" />
        </View>
      ) : (
        <>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            loadingEnabled={true}
            rotateEnabled={true}
            followsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            { verAlert == true && alertas.map((x, i) => (
              <Polygon
                key={i}
                coordinates = {x.puntos}
                fillColor = {x.alerta.color}
                tappable = {true}
                onPress = {() => Alert.alert(
                    `${x.alerta.descripcion}`,
                    `${x.nombre} `,
                    [
                      {
                        text: "Cerrar",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      }
                    ],
                    { cancelable: false }
                  ) }
              />
            ))}

            { verMuni == true && muni.map((x, i) => (
              <Marker
                key={i}
                title={x.nombre}
                coordinate={x.ubicacion}
              >
                <Foundation
                  name="alert"
                  size={34}
                  color={x.color}
                />
              </Marker>
            ))}
            
            { verAlber == true && albergues.map((x, i) => (
              <Marker
                key={i}
                title={x.nombre}
                coordinate={x.ubicacion}
                onPress={() => irAlbergue(x.ubicacion, x.nombre)}
              >
                <MaterialCommunityIcons
                  name="home-map-marker"
                  size={25}
                  color="black"
                />
              </Marker>
              
            )) }

            { destination.latitude != 0 && destination.longitude != 0 && (
              <Directions origin={origin} destination={destination} />
            )}
          </MapView>

          <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            height={50}
            style={styles.chipsScrollView}
            contentInset={{ // iOS only
              top:0,
              left:0,
              bottom:0,
              right:20
            }}
            contentContainerStyle={{
              paddingRight: Platform.OS === 'android' ? 20 : 0
            }}
          >
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.chipsItem} onPress={category.onPress}>
                {category.icon}
                <Text >{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

        </>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#FFFF', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 60 : 50,
    paddingHorizontal:10
  },
  space: {
    width: 20,
    height: 25,
  },
  map: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
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
});
