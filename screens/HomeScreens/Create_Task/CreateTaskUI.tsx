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

import { TaskResponse } from "../../../api/types/models";
import AssignedTo from "../../../component/AssignedTo";
import DateTimePicker from "../../../component/DateTimePicker";
import Button from "../../../component/ui/Button";
import CustomCheckBox from "../../../component/ui/CheckBox";
import Input from "../../../component/ui/Input";
import InputDropdown from "../../../component/ui/InputDropdown";
import { Colors } from "../../../constants/Color";
import { TaskCategory } from "../../../constants/TaskCategory";
import { ITaskInputsErrors } from "../../../interfaces/ITaskInputsErrors";
import { IUser } from "../../../interfaces/IUser";

type Props = {
  handleCreateTask: () => void;
  handleValueChange: (inputName: string, value: string) => void;
  task: TaskResponse;
  coworkers: IUser[];
  navigation: NativeStackNavigationProp<ParamListBase>;
  isDatePickerVisible: boolean;
  handleConfirm: (date: Date) => void;
  hideDatePicker: () => void;
  showDatePicker: (nameInput: string) => void;
  inputDateName: string;
  errorsInput: ITaskInputsErrors;
};

const CreateTaskUI = (props: Props) => {
  const startDate = moment(props.task.startDate).format("MM/DD/YYYY");
  const endDate = moment(props.task.endDate).format("MM/DD/YYYY");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              value={props.task.name}
              isRequire
              placeholder="Enter task name"
              title="Task name"
              onChangeText={(value) => props.handleValueChange("name", value)}
              isError={props.errorsInput.title.length > 0}
            />
            {props.errorsInput.title.length > 0 &&
              props.errorsInput.title.map((error, index) => (
                <Text key={index} style={{ color: Colors.RED, marginTop: 5 }}>
                  {error}
                </Text>
              ))}

            <Input
              value={props.task.startDate ? startDate : ""}
              isRequire
              placeholder="mm/dd/yyyy"
              title="Start date"
              onChangeText={(value) =>
                props.handleValueChange("startDate", value)
              }
              onPress={() => props.showDatePicker("startDate")}
            />
            {props.errorsInput.startDate.length > 0 &&
              props.errorsInput.startDate.map((error, index) => (
                <Text key={index} style={{ color: Colors.RED, marginTop: 5 }}>
                  {error}
                </Text>
              ))}

            <DateTimePicker
              onConfirm={props.handleConfirm}
              onCancel={props.hideDatePicker}
              isVisible={props.isDatePickerVisible}
            />

            <Input
              value={props.task.endDate ? endDate : ""}
              isRequire
              placeholder="mm/dd/yyyy"
              title="End date"
              onChangeText={(value) =>
                props.handleValueChange("endDate", value)
              }
              onPress={() => props.showDatePicker("endDate")}
            />
            {props.errorsInput.endDate.length > 0 &&
              props.errorsInput.endDate.map((error, index) => (
                <Text key={index} style={{ color: Colors.RED, marginTop: 5 }}>
                  {error}
                </Text>
              ))}

            <View>
              <Text style={styles.title}>Category*</Text>
              <CustomCheckBox
                title="UI/UX Design"
                check={props.task.category === TaskCategory.DESIGN}
                handleCheck={() =>
                  props.handleValueChange("category", TaskCategory.DESIGN)
                }
              />
              <CustomCheckBox
                title="Frontend"
                check={props.task.category === TaskCategory.FRONTEND}
                handleCheck={() =>
                  props.handleValueChange("category", TaskCategory.FRONTEND)
                }
              />
              <CustomCheckBox
                title="Backend"
                check={props.task.category === TaskCategory.BACKEND}
                handleCheck={() =>
                  props.handleValueChange("category", TaskCategory.BACKEND)
                }
              />
              <CustomCheckBox
                title="Personal"
                check={props.task.category === TaskCategory.PERSONAL}
                handleCheck={() =>
                  props.handleValueChange("category", TaskCategory.PERSONAL)
                }
              />

              {props.errorsInput.category.length > 0 &&
                props.errorsInput.category.map((error, index) => (
                  <Text key={index} style={{ color: Colors.RED, marginTop: 5 }}>
                    {error}
                  </Text>
                ))}
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
