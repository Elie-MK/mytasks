import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { Colors } from "../../constants/Color";

type Props = {
  isSelected: boolean;
} & TouchableOpacityProps;

const SelectButton = (props: Props) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.5}
      style={[
        styles.container,
        { backgroundColor: props.isSelected ? Colors.GRAY : Colors.BLUE },
      ]}
    >
      <View>
        <Text style={styles.text}>
          {props.isSelected ? "Selected" : "Select"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SelectButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLUE,
    padding: 15,
    borderRadius: 8,
  },
  text: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: "Roboto-Bold",
  },
});
