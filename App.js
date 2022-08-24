import { createAppContainer } from "react-navigation";
import { Mapa, info, VerAlberg2, VerAlertas2, AboutUs } from "./screens";
import { CustomDrawer } from "./components";
import React from "react";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "react-navigation-drawer";
import * as Location from "expo-location";
import datos_Server from "./screens/datosGlobales";
import moment from "moment";

const AppNavigator = createDrawerNavigator(
  {
    Mapa: {
      screen: Mapa,
      navigationOptions: {
        drawerLabel: "Mapa",
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="map-search"
            size={28}
            color={tintColor}
          />
        ),
      },
    },

    Albergues: {
      screen: VerAlberg2,
      navigationOptions: {
        drawerLabel: "Albergues",
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="shield-home-outline"
            size={28}
            color={tintColor}
          />
        ),
      },
    },

    Alerts: {
      screen: VerAlertas2,
      navigationOptions: {
        drawerLabel: "Alertas",
        drawerIcon: ({ tintColor }) => (
          <Foundation name="alert" size={28} color={tintColor} />
        ),
      },
    },

    Detalle: {
      screen: info,
      navigationOptions: {
        drawerLabel: "Info",
        drawerIcon: ({ tintColor }) => (
          <Foundation name="info" size={28} color={tintColor} />
        ),
      },
    },
    AboutUs: {
      screen: AboutUs,
      navigationOptions: {
        drawerLabel: "Sobre Nosotros",
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="account-group"
            size={28}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: "Detalle",
    contentOptions: {
      activeTintColor: "#2C5A3F",
      style: {
        backgroundColor: "#c8e2e5",
      },
    },
    contentComponent: CustomDrawer,
  }
);

const MainMenu = createAppContainer(AppNavigator);

const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    await AsyncStorage.setItem("TOKEN_PHONE", token);
    // post a base de datos-----------------------
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#217543",
    });
  }
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const AppContainer = createAppContainer(MainMenu);

export default class App extends React.Component {
  state = {};

  componentDidMount() {
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        return alert(
          "No se tiene los permisos necesarios para acceder a su Localización"
        );
      }
      let location = await Location.getCurrentPositionAsync({});
      datos_Server.coordenadas.latitude = location.coords.latitude;
      datos_Server.coordenadas.longitude = location.coords.longitude;
      datos_Server.anioActual = moment(location.timestamp).format("YYYY");
    })();
  }

  render() {
    return <AppContainer></AppContainer>;
  }
}
