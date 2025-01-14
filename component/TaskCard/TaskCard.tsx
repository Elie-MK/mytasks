import React, { useRef } from "react";

import { Feather, Octicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, TouchableOpacity, ViewToken } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import TaskCardItem from "./TaskCardItem";
import { TaskResponse } from "../../api/types/models";
import { Colors } from "../../constants/Color";
import { RootStackParamList } from "../../types/RootStackParamList";

type Props = {
  viewableItems: SharedValue<ViewToken[]>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  item: number | undefined;
  task: TaskResponse;
  setLastSelectedTask: (item: {
    id: number;
    ref: SwipeableMethods | null;
  }) => void;
  lastSelectedTask: { id: number; ref: SwipeableMethods | null };
};

const TaskCard = React.memo((props: Props) => {
  TaskCard.displayName = "TaskCard";
  const { item, viewableItems } = props;

  const swipeableRef = useRef<SwipeableMethods>(null);

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

  const handleCloseIfAlreadyOpen = () => {
    if (props.lastSelectedTask.id !== props.task.id) {
      props.lastSelectedTask.ref?.close();
    }
    props.setLastSelectedTask({
      id: props.task.id!,
      ref: swipeableRef.current,
    });
  };

  return (
    <Animated.View style={animatedStyle}>
      <GestureHandlerRootView>
        <Swipeable
          ref={swipeableRef}
          onSwipeableOpen={handleCloseIfAlreadyOpen}
          renderRightActions={(item) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.dropDown, styles.edit]}
            >
              <Feather name="edit-2" size={25} color={Colors.WHITE} />
            </TouchableOpacity>
          )}
          renderLeftActions={() => (
            <TouchableOpacity activeOpacity={0.7} style={styles.dropDown}>
              <Octicons name="trash" size={25} color={Colors.WHITE} />
            </TouchableOpacity>
          )}
        >
          <TaskCardItem
            task={props.task}
            onPress={() =>
              props.navigation.navigate("TaskDetail", {
                idTask: props.task.id!,
              })
            }
            isDropdownVisible={true}
            percentage={0}
          />
        </Swipeable>
      </GestureHandlerRootView>
    </Animated.View>
  );
});

export default TaskCard;

const styles = StyleSheet.create({
  action: {
    width: 50,
    backgroundColor: "red",
  },
  dropDown: {
    width: 80,
    height: 140,
    backgroundColor: Colors.RED,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  deleteText: {
    color: Colors.WHITE,
    fontFamily: "Roboto-bold",
    fontSize: 14,
  },
  edit: {
    backgroundColor: Colors.GRAY,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
