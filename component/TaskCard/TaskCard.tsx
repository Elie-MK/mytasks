import React from "react";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, ViewToken } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import TaskCardItem from "./TaskCardItem";
import { ITask } from "../../interfaces/ITask";

type Props = {
  viewableItems: SharedValue<ViewToken[]>;
  navigation: NativeStackNavigationProp<ParamListBase>;
  item: { id: number };
  task: ITask;
};

const TaskCard = React.memo((props: Props) => {
  TaskCard.displayName = "TaskCard";
  const { item, viewableItems } = props;

  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === item.id)
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.5),
        },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TaskCardItem
        task={props.task}
        onPress={() => props.navigation.navigate("TaskDetail")}
        percentage={0}
      />
    </Animated.View>
  );
});

export default TaskCard;

const styles = StyleSheet.create({});
