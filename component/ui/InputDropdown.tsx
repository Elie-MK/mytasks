import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/Color";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {};

const InputDropdown = (props: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Coworker")}
        activeOpacity={0.7}
        style={styles.inputContainer}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: Colors.GRAY,
            }}
          >
            Select members
          </Text>
          <AntDesign name="caretdown" size={20} color={Colors.GRAY} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputDropdown;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    padding: 17,
    gap: 8,
    backgroundColor: Colors.LIGHT_GRAY,
  },
});
