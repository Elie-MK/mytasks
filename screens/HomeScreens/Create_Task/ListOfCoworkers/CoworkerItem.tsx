import React from "react";

import { Avatar } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";

import SelectButton from "../../../../component/ui/SelectButton";
import { Colors } from "../../../../constants/Color";

type Props = {};

const CoworkerItem = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={styles.imageContainer}>
        <Avatar
          size={70}
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>John Doe</Text>
          <Text style={styles.jobTitleText}>Designer</Text>
        </View>
      </View>
      <SelectButton />
    </View>
  );
};

export default CoworkerItem;

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
  },
  jobTitleText: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: Colors.GRAY,
  },
});
