import React from "react";

import { ScrollView, StyleSheet, Text, View } from "react-native";

import CategoryItem from "./CategoryItem";

type Props = {};

const CategoryList = (props: Props) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.container}
    >
      <CategoryItem numberOfTasks={5} isSelected={false} title="UI/UX Design" />
      <CategoryItem numberOfTasks={2} isSelected={false} title="Frontend" />
      <CategoryItem numberOfTasks={1} isSelected={false} title="Backend" />
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
