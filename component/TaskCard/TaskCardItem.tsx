import React from "react";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Avatar, LinearProgress } from "@rneui/base";
import moment from "moment";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { TaskResponse } from "../../api/types/models";
import { Colors } from "../../constants/Color";

type Props = {
  percentage: number;
  task: TaskResponse;
  isDropdownVisible?: boolean;
} & TouchableOpacityProps;

const TaskCardItem = (props: Props) => {
  const width = Dimensions.get("window").width;
  const sliceUsers = props.task?.assignedUserIds?.slice(0, 3);
  const startDate = moment(props.task.startDate).format("DD MMM");
  const endDate = moment(props.task.endDate).format("DD MMM");

  return (
    <View style={styles.container}>
      <TouchableOpacity {...props} activeOpacity={0.8}>
        <View style={styles.contentsContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.text, { fontSize: width < 380 ? 14 : 16 }]}>
              {props.task.name}
            </Text>
          </View>
          {/* Progress */}
          <View style={styles.progressContainer}>
            <View>
              <View style={styles.textInprogressContainer}>
                <Text
                  style={[styles.progress, { fontSize: width < 380 ? 12 : 14 }]}
                >
                  {props.task.isCompleted ? "Completed" : "In progress"}
                </Text>
              </View>
              <LinearProgress
                color={props.task.isCompleted ? Colors.GREEN : Colors.ORANGE}
                trackColor={
                  props.task?.isCompleted ? Colors.GREEN : Colors.ORANGE
                }
                value={1.0}
                variant="determinate"
                style={styles.linearProgress}
              />
            </View>
            <View style={styles.imagesContainer}>
              {sliceUsers?.map((user) => (
                <Avatar key={user} size={32} rounded />
              ))}
            </View>
          </View>

          {/* Bottom */}

          <View style={styles.bottomContainer}>
            <View style={styles.calendarContainer}>
              <MaterialIcons
                name="calendar-month"
                size={width < 380 ? 18 : 24}
                color={Colors.BLUE}
              />
              <Text
                style={[styles.commonText, { fontSize: width < 380 ? 12 : 14 }]}
              >
                {startDate} - {endDate}
              </Text>
            </View>

            <View style={styles.commentsContainer}>
              <Ionicons
                name="chatbubble"
                size={width < 380 ? 18 : 24}
                color={Colors.BLUE}
              />
              <Text
                style={[styles.commonText, { fontSize: width < 380 ? 12 : 14 }]}
              >
                {props.task?.comments?.length} comments
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TaskCardItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 5,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    marginBottom: 20,
    height: 140,
  },
  contentsContainer: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-bold",
  },
  progressContainer: {
    flexDirection: "row",
    // alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
  progress: {
    fontFamily: "Roboto-regular",
    color: Colors.GRAY,
  },
  linearProgress: {
    height: 10,
    borderRadius: 10,
    width: 200,
  },
  textInprogressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  calendarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  commentsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  commonText: {
    fontSize: 14,
    fontFamily: "Roboto-regular",
    color: Colors.GRAY,
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
