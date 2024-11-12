import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  BounceIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from "react-native-reanimated";
import { ImageSourcePropType } from "react-native";
import { Colors } from "../../constants/Color";

type Props = {
  image: ImageSourcePropType;
  leftText?: string;
  rightText: string;
  midleText: string;
  desc: string;
  isBlue?: boolean;
  currentIndex?: number;
  index?: number;
};

const width = Dimensions.get("window").width;

const OnboardingItem = (props: Props) => {
  const [entering, setEntering] = React.useState(false);
  useEffect(() => {
    setEntering(true);
  }, [props.currentIndex]);
  return (
    <View style={styles.container}>
      <View>
        {props.currentIndex === props.index && (
          <Animated.View
            entering={FadeInUp.duration(800)}
            style={styles.imgContainer}
          >
            <Image style={styles.image} source={props.image} />
          </Animated.View>
        )}
        {props.currentIndex === props.index && (
          <Animated.View entering={BounceIn.duration(800)}>
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
          </Animated.View>
        )}
        {props.currentIndex === props.index && (
          <Animated.View
            entering={FadeInDown.duration(800)}
            style={styles.descContainer}
          >
            <Text style={styles.desc}>{props.desc}</Text>
          </Animated.View>
        )}
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
