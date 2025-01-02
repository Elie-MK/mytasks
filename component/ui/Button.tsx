import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import RefreshActivity from "./RefreshActivity";
import { Colors } from "../../constants/Color";

type Props = {
  title: string;
  textStyle?: object;
  isRefresh?: boolean;
} & TouchableOpacityProps;

const Button = (props: Props) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={[
        styles.container,
        props.style,
        props.isRefresh && { opacity: 0.5 },
      ]}
    >
      {props.isRefresh && <RefreshActivity />}
      {!props.isRefresh && (
        <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLUE,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily: "Roboto-Bold",
  },
});
