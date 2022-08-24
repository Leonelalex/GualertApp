import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  button: {
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ScrollView: {
    paddingTop: 45,
    paddingBottom: 35,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  item: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    //height: 50,
    justifyContent: "center",
    padding: 15,
  },
  lista: {
    paddingBottom: height * 0.18,
  },
});

const Lista = (datos, item_) => {
  //   console.log(this.props);
  return (
    // <ScrollView contentContainerStyle={styles.ScrollView}>
    <View style={styles.lista}>
      <FlatList
        nestedScrollEnabled={true}
        data={datos}
        renderItem={(item) => <View style={styles.item}>{item_(item)}</View>}
        keyExtractor={(item, index) => {
          return String(index);
        }}
      />
    </View>
    // </ScrollView>
  );
};

export default Lista;
