import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Avatar } from "@rneui/themed";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/Color";
import { IUser } from "../interfaces/IUser";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  users?: IUser[];
};

const AssignedTo = (props: Props) => {
  const sliceUsers = props.users?.slice(0, 3);
  const restUsers = props.users?.slice(3);
  const userIds = props.users?.map((user) => user.id);

  return (
    <View style={styles.imagesContainer}>
      {sliceUsers?.map((user) => (
        <Avatar
          key={user.id}
          size="medium"
          rounded
          source={{ uri: user.image }}
          containerStyle={{ marginRight: -10 }}
        />
      ))}
      {restUsers && restUsers.length > 0 && (
        <View style={styles.moreUsers}>
          <Text style={styles.moreUsersText}>+{restUsers?.length}</Text>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.moreUsers,
          {
            backgroundColor: Colors.BLUE,
            marginLeft: sliceUsers && sliceUsers?.length > 0 ? 10 : 0,
          },
        ]}
        onPress={() =>
          props.navigation.navigate("Coworker", { datas: userIds })
        }
      >
        <AntDesign name="plus" size={24} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

export default AssignedTo;

const styles = StyleSheet.create({
  assignedContainer: {
    marginTop: 20,
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  moreUsers: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: Colors.GRAY,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  moreUsersText: {
    fontSize: 14,
    color: Colors.WHITE,
  },
});
