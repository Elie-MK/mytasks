import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Color";
import { Dimensions } from "react-native";

type Props = {
  title: string;
  isSelected: boolean;
  numberOfTasks: number;
  handleSelect?: () => void;
};

const CategoryItem = (props: Props) => {
  const width = Dimensions.get("window").width;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: props.isSelected
            ? Colors.MEDIUM_GRAY
            : Colors.LIGHT_GRAY,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize: width < 380 ? 14 : 16 }]}>
        {props.title} ({props.numberOfTasks})
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 3,
  },
  text: {
    fontSize: 16,
    fontFamily: "Roboto-regular",
  },
});
