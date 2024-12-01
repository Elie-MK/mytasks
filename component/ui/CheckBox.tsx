import React from "react";

import { CheckBox } from "@rneui/themed";
import { StyleSheet } from "react-native";

type Props = {
  check: boolean;
  handleCheck: () => void;
  title: string;
};

const CustomCheckBox = (props: Props) => {
  return (
    <CheckBox
      title={props.title}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={props.check}
      onPress={props.handleCheck}
      containerStyle={styles.checkBoxContainer}
      fontFamily="Roboto-regular"
      textStyle={{ fontSize: 18 }}
    />
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  checkBoxContainer: {
    marginBottom: -15,
    marginLeft: -10,
  },
});
