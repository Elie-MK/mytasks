import React from "react";

import { Skeleton } from "@rneui/themed";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

type Props = {};

const width = Dimensions.get("window").width;

const HomeSkeletonUI = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <FlatList
          data={[1, 2, 3, 4]}
          contentContainerStyle={{ gap: 8 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={() => (
            <View>
              <Skeleton animation="wave" width={100} height={40} />
            </View>
          )}
          keyExtractor={(item) => item.toString()}
        />

        <View style={{ marginTop: 20 }}>
          <FlatList
            data={[1, 2, 3, 4]}
            contentContainerStyle={{ gap: 8 }}
            showsVerticalScrollIndicator={false}
            renderItem={() => (
              <View>
                <Skeleton animation="wave" width={width} height={120} />
              </View>
            )}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeSkeletonUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});
