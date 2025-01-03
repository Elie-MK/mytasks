import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TaskResponse } from "../../../api/types/models";
import SeachInput from "../../../component/ui/SeachInput";
import { Colors } from "../../../constants/Color";
import { ITask } from "../../../interfaces/ITask";

type Props = {
  tasks: TaskResponse[];
};

const HeaderHome = (props: Props) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.nameText}>Hey Elie MK,</Text>
          <Text style={styles.taskText}>
            You have {props.tasks.length ?? 0} tasks today.
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
