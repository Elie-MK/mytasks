import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TaskResponse, UserResponse } from "../../../api/types/models";
import SeachInput from "../../../component/ui/SeachInput";
import { Colors } from "../../../constants/Color";

type Props = {
  tasks: TaskResponse[];
  user?: UserResponse;
};

const HeaderHome = (props: Props) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.nameText}>Hey {props.user?.fullName},</Text>
          <Text style={styles.taskText}>
            You have {props.tasks.length ?? 0} tasks.
          </Text>
        </View>
        <View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="bell" size={30} color={Colors.GRAY} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <SeachInput />
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
  },
  taskText: {
    fontSize: 16,
    fontFamily: "Roboto-regular",
    color: Colors.GRAY,
    marginTop: 8,
  },
  searchContainer: {
    marginTop: 16,
  },
});
