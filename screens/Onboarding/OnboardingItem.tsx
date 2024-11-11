import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { ImageSourcePropType } from "react-native";

type Props = {
  image: ImageSourcePropType;
};

const width = Dimensions.get("window").width;

const OnboardingItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={props.image} />
        </View>
        <Text>
          Easily <Text>create</Text> new tasks
        </Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: 300,
  },
});
