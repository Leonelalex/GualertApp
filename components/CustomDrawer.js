import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import ImgAlerta from "../assets/logo5.png";

export default({ ...props }) => {
    return (
        <View style={styles.container}>
            <View style={styles.userArea}>
                <Text style={styles.title0}>GUALERT</Text>
                <Image 
                    source={ImgAlerta}
                    style={styles.user}
                />
            </View>
            <View
                style={{
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    margin: 10
                }}
            />
            <DrawerNavigatorItems   {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    userArea: {
        marginBottom: 15,
        marginLeft: 10,
        marginTop: 25,
        alignItems:"center",
    },
    user: {
        width: 125,
        height: 125
    },
    title0: {
        fontSize: 40,
        marginBottom: 20,
        marginTop: 20,
        fontWeight: "bold",
        color: "#5fb181",
    }
});