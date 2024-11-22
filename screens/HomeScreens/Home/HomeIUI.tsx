import React from "react";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

import HeaderHome from "./HeaderHome";
import AddTaskButton from "../../../component/AddTaskButton";
import CategoryList from "../../../component/Category/CategoryList";
import TaskCard from "../../../component/TaskCard/TaskCard";


type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const HomeUI = (props: Props) => {
  const data = new Array(50).fill(0).map((_, index) => ({ id: index }));
  const width = Dimensions.get("window").width;

  const viewableItems = useSharedValue<ViewToken[]>([]);
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
          <AddTaskButton navigation={props.navigation} />
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems;
          }}
          renderItem={({ item }) => (
            <TaskCard
              navigation={props.navigation}
              item={item}
              viewableItems={viewableItems}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeUI;

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
