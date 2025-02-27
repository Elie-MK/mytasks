import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View , TouchableOpacity } from "react-native";

import { Colors } from "../../constants/Color";

type Props = {};

const SeachInput = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 10 }}>
        <Ionicons name="search" size={24} color={Colors.GRAY} />
      </View>
      <TextInput
        placeholderTextColor={Colors.GRAY}
        placeholder="Search task"
        style={styles.input}
      />
      <TouchableOpacity>
        <Ionicons name="filter-sharp" size={24} color={Colors.BLUE} />
      </TouchableOpacity>
    </View>
  );
};

export default SeachInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_GRAY,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
  },
  input: {
    padding: 10,
    width: "80%",
  },
});
