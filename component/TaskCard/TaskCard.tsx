import React from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ViewToken } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import TaskCardItem from "./TaskCardItem";
import { TaskResponse } from "../../api/types/models";
import { RootStackParamList } from "../../types/RootStackParamList";

type Props = {
  viewableItems: SharedValue<ViewToken[]>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  item: number | undefined;
  task: TaskResponse;
};

const TaskCard = React.memo((props: Props) => {
  TaskCard.displayName = "TaskCard";
  const { item, viewableItems } = props;

  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === item)
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
        onPress={() =>
          props.navigation.navigate("TaskDetail", { idTask: props.task.id! })
        }
        percentage={0}
      />
    </Animated.View>
  );
});

export default TaskCard;
