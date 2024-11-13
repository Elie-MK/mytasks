import { StyleSheet, Text, TextInputProps, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { Colors } from "../../constants/Color";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

type Props = {
  isShowPassword?: boolean;
  handleShowPassword?: () => void;
  title: string;
  isError?: boolean;
  isPasswordField?: boolean;
} & TextInputProps;

const Input = (props: Props) => {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: props.isError ? Colors.RED : "",
            borderWidth: props.isError ? 2 : 0,
          },
        ]}
      >
        <TextInput
          secureTextEntry={props.isShowPassword}
          {...props}
          style={[
            styles.input,
            { width: props.isPasswordField ? "88%" : "100%" },
          ]}
        />
        {props.isPasswordField && (
          <TouchableOpacity
            onPress={props.handleShowPassword}
            activeOpacity={0.6}
          >
            <Entypo
              name={props.isShowPassword ? "eye" : "eye-with-line"}
              size={24}
              color={Colors.GRAY}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    fontSize: 18,
    color: Colors.BLUE,
    fontFamily: "Roboto-Bold",
  },
  inputContainer: {
    marginTop: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  input: {
    padding: 17,
  },
});
