import React from "react";

import { Avatar } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";

import SelectButton from "../../../../component/ui/SelectButton";
import { Colors } from "../../../../constants/Color";
import { IUser } from "../../../../interfaces/IUser";

type Props = {
  user: IUser;
  handleSelectCoworker: (coworkerId: number) => void;
  coworkers: number[];
};

const CoworkerItem = (props: Props) => {
  const isCoworkerSelected = props.coworkers.includes(props.user.id);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <View style={styles.imageContainer}>
        <Avatar size={70} rounded source={{ uri: props.user.image }} />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{props.user.name}</Text>
          <Text style={styles.jobTitleText}>{props.user.jobTitle}</Text>
        </View>
      </View>
      <SelectButton
        isSelected={isCoworkerSelected}
        onPress={() => props.handleSelectCoworker(props.user.id)}
      />
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
