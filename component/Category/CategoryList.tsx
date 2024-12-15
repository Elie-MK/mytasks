import React from "react";

import { ScrollView, StyleSheet } from "react-native";

import CategoryItem from "./CategoryItem";
import { TaskCategory } from "../../constants/TaskCategory";
import { ITask } from "../../interfaces/ITask";

type Props = {
  tasks: ITask[];
};

const CategoryList = (props: Props) => {
  const taskCounts = props.tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<TaskCategory, number>);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.container}
    >
      {Object.values(TaskCategory).map((category) => (
        <CategoryItem
          key={category}
          numberOfTasks={taskCounts[category] ?? 0}
          isSelected={false}
          title={category}
        />
      ))}
    </ScrollView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    gap: 15,
    marginLeft: 20,
    paddingRight: 20,
  },
});
