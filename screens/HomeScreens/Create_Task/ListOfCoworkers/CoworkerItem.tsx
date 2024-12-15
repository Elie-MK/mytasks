import React from "react";

import { Avatar } from "@rneui/themed";
import { StyleSheet, Text, View, ViewToken } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import SelectButton from "../../../../component/ui/SelectButton";
import { Colors } from "../../../../constants/Color";
import { IUser } from "../../../../interfaces/IUser";

type Props = {
  user: IUser;
  handleSelectCoworker: (coworkerId: number) => void;
  coworkers: number[];
  viewableItems: SharedValue<ViewToken[]>;
};

const CoworkerItem = (props: Props) => {
  const isCoworkerSelected = props.coworkers.includes(props.user.id);

  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      props.viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === props.user.id)
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
    </Animated.View>
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
