import React from "react";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";

import AssignedTo from "../../../component/AssignedTo";
import DateTimePicker from "../../../component/DateTimePicker";
import Button from "../../../component/ui/Button";
import CustomCheckBox from "../../../component/ui/CheckBox";
import Input from "../../../component/ui/Input";
import InputDropdown from "../../../component/ui/InputDropdown";
import { Colors } from "../../../constants/Color";
import { ITask } from "../../../interfaces/ITask";
import { IUser } from "../../../interfaces/IUser";

type Props = {
  handleCreateTask: () => void;
  handleValueChange: (inputName: string, value: string) => void;
  task: ITask;
  coworkers: IUser[];
  navigation: NativeStackNavigationProp<ParamListBase>;
  isDatePickerVisible: boolean;
  handleConfirm: (date: Date) => void;
  hideDatePicker: () => void;
  showDatePicker: (nameInput: string) => void;
  inputDateName: string;
};

const CreateTaskUI = (props: Props) => {
  const startDate = moment(props.task.startDate).format("MM/DD/YYYY");
  const endDate = moment(props.task.endDate).format("MM/DD/YYYY");

  let startDateFormat: Date = new Date();
  let endDateFormat: Date = new Date();

  if (props.task.startDate) {
    startDateFormat = new Date(props.task.startDate);
  }

  if (props.task.endDate) {
    endDateFormat = new Date(props.task.endDate);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              value={props.task.title}
              placeholder="Enter task name"
              title="Task name"
              onChangeText={(value) => props.handleValueChange("title", value)}
            />
            <Input
              value={props.task.startDate ? startDate : ""}
              placeholder="mm/dd/yyyy"
              title="Start date"
              onChangeText={(value) =>
                props.handleValueChange("startDate", value)
              }
              onPress={() => props.showDatePicker("startDate")}
            />
            <DateTimePicker
              onConfirm={props.handleConfirm}
              onCancel={props.hideDatePicker}
              maximumDate={
                props.inputDateName === "startDate" ? endDateFormat : undefined
              }
              minimumDate={
                props.inputDateName === "endDate" ? startDateFormat : undefined
              }
              isVisible={props.isDatePickerVisible}
            />

            <Input
              value={props.task.endDate ? endDate : ""}
              placeholder="mm/dd/yyyy"
              title="End date"
              onChangeText={(value) =>
                props.handleValueChange("endDate", value)
              }
              onPress={() => props.showDatePicker("endDate")}
            />

            <View>
              <Text style={styles.title}>Category</Text>
              <CustomCheckBox
                title="UI/UX Design"
                check={props.task.category === "UI/UX Design"}
                handleCheck={() =>
                  props.handleValueChange("category", "UI/UX Design")
                }
              />
              <CustomCheckBox
                title="Frontend"
                check={props.task.category === "Frontend"}
                handleCheck={() =>
                  props.handleValueChange("category", "Frontend")
                }
              />
              <CustomCheckBox
                title="Backend"
                check={props.task.category === "Backend"}
                handleCheck={() =>
                  props.handleValueChange("category", "Backend")
                }
              />
            </View>
            <View>
              <Text style={styles.title}>Assign to</Text>
              {props.coworkers.length < 1 && <InputDropdown />}
              {props.coworkers.length > 0 && (
                <View>
                  <AssignedTo
                    navigation={props.navigation}
                    users={props.coworkers}
                  />
                </View>
              )}
            </View>
            <View>
              <Input
                value={props.task.description}
                placeholder="Enter description"
                title="Description"
                optionalText="(Optional)"
                onChangeText={(value) =>
                  props.handleValueChange("description", value)
                }
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Button onPress={props.handleCreateTask} title="Create Task" />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateTaskUI;

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
