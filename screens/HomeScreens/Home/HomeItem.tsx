import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import HeaderHome from "./HeaderHome";
import CategoryList from "../../../component/Category/CategoryList";
import AddTaskButton from "../../../component/AddTaskButton";
import TaskCard from "../../../component/TaskCard/TaskCard";

type Props = {};

const HomeItem = (props: Props) => {
  const width = Dimensions.get("window").width;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderHome />

        <View style={styles.todayTaskContainer}>
          <Text style={styles.todayTaskText}>Today tasks</Text>
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <CategoryList />
      </View>

      <View style={styles.bodyContainer}>
        <View
          style={[styles.addTaskContainer, { top: width < 380 ? 270 : 470 }]}
        >
          <AddTaskButton />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: 20,
  },
  todayTaskContainer: {
    marginTop: 20,
  },
  todayTaskText: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
  },
  categoryContainer: {
    marginTop: 10,
    paddingBottom: 10,
  },
  bodyContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
  addTaskContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
