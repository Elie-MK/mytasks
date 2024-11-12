import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { ImageSourcePropType } from "react-native";
import { Colors } from "../../constants/Color";

type Props = {
  image: ImageSourcePropType;
  leftText?: string;
  rightText: string;
  midleText: string;
  desc: string;
  isBlue?: boolean;
};

const width = Dimensions.get("window").width;

const OnboardingItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={props.image} />
        </View>
        {props.isBlue ? (
          <Text style={styles.title}>
            <Text style={styles.blueText}>{props.midleText}</Text>
            {props.rightText}
          </Text>
        ) : (
          <Text style={styles.title}>
            {props.leftText}
            <Text style={styles.blueText}>{props.midleText}</Text>
            {props.rightText}
          </Text>
        )}
        <View style={styles.descContainer}>
          <Text style={styles.desc}>{props.desc}</Text>
        </View>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Roboto-Bold",
  },
  blueText: {
    color: Colors.BLUE,
  },
  image: {
    width: 300,
  },
  descContainer: {
    marginTop: 20,
  },
  desc: {
    marginHorizontal: 20,
    fontSize: 16,
    textAlign: "center",
    color: Colors.GRAY,
  },
});
