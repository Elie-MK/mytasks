import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../../../constants/Color";
import Input from "../../../component/ui/Input";
import CustomCheckBox from "../../../component/ui/CheckBox";
import Button from "../../../component/ui/Button";
import InputDropdown from "../../../component/ui/InputDropdown";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const CreateTask = (props: Props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      title: "Create Task",
    });
  }, [props.navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "padding"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input placeholder="Enter task name" title="Task name" />
            <Input placeholder="mm/dd/yyyy" title="Start date" />
            <Input placeholder="mm/dd/yyyy" title="End date" />

            <View>
              <Text style={styles.title}>Category</Text>
              <CustomCheckBox
                title="UI/UX Design"
                check={false}
                hanndleCheck={() => {}}
              />
              <CustomCheckBox
                title="Frontend"
                check={false}
                hanndleCheck={() => {}}
              />
              <CustomCheckBox
                title="Backend"
                check={false}
                hanndleCheck={() => {}}
              />
            </View>
            <View>
              <Text style={styles.title}>Assign to</Text>
              <InputDropdown />
            </View>
            <View>
              <Input
                placeholder="Enter description"
                title="Description"
                optionalText="(Optional)"
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Button title="Create Task" />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    marginTop: 15,
    color: Colors.BLUE,
    fontFamily: "Roboto-bold",
  },
});
