import React from "react";

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TouchableOpacityProps,
} from "react-native";

type Props = {
  title: string;
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  isWitch?: boolean;
} & TouchableOpacityProps;

const MenuItem = (props: Props) => {
  return (
    <>
      {props.isWitch ? (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View>{props.leftIcon}</View>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <View>{props.rightIcon}</View>
        </View>
      ) : (
        <TouchableOpacity
          {...props}
          activeOpacity={0.7}
          style={styles.container}
        >
          <View style={styles.titleContainer}>
            <View>{props.leftIcon}</View>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto-regular",
  },
});
