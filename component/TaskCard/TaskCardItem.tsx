import React from "react";

import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Avatar, LinearProgress } from "@rneui/base";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { Colors } from "../../constants/Color";
import { ITask } from "../../interfaces/ITask";

type Props = {
  percentage: number;
  task: ITask;
} & TouchableOpacityProps;

const TaskCardItem = (props: Props) => {
  const width = Dimensions.get("window").width;
  console.log(props.task);
  const sliceUsers = props.task.assignedTo && props.task.assignedTo.slice(0, 3);

  return (
    <TouchableOpacity {...props} activeOpacity={0.8} style={styles.container}>
      <View style={styles.contentsContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.text, { fontSize: width < 380 ? 14 : 16 }]}>
            {props.task.title}
          </Text>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={24} color={Colors.GRAY} />
          </TouchableOpacity>
        </View>
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View>
            <View style={styles.textInprogressContainer}>
              <Text
                style={[styles.progress, { fontSize: width < 380 ? 12 : 14 }]}
              >
                In progress
              </Text>
              <Text
                style={[styles.progress, { fontSize: width < 380 ? 12 : 14 }]}
              >
                50%
              </Text>
            </View>
            <LinearProgress
              color={Colors.BLUE}
              value={props.percentage}
              trackColor={Colors.GRAY}
              variant="determinate"
              style={styles.linearProgress}
            />
          </View>
          <View style={styles.imagesContainer}>
            {sliceUsers?.map((user) => (
              <Avatar
                key={user.id}
                size={32}
                rounded
                source={{ uri: user.image }}
              />
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
              {props.task.startDate} - {props.task.endDate}
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
              10 comments
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCardItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 5,
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
