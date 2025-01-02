import React from "react";

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/Color";

type Props = {};

const RefreshActivity = (props: Props) => {
  return <ActivityIndicator size={"small"} color={Colors.WHITE} />;
};

export default RefreshActivity;

const styles = StyleSheet.create({});
