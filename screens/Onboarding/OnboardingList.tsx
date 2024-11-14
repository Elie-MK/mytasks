import { Animated, FlatList, StyleSheet, View, ViewToken } from "react-native";
import React, { useRef, useState } from "react";
import OnboardingItem from "./OnboardingItem";
import OnboardingDot from "./OnboardingDot";
import { OnboardingDatas } from "./OnboardingDatas";
import { IOnboarding } from "../../interfaces/IOnboarding";

type Props = {};

const OnboardingList = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanges = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<IOnboarding>[];
  }) => {
    setCurrentIndex(viewableItems[0].index!);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={OnboardingDatas}
        renderItem={({ item, index }) => (
          <OnboardingItem
            currentIndex={currentIndex}
            leftText={item.leftText}
            midleText={item.midleText}
            rightText={item.rightText}
            desc={item.desc}
            image={item.image}
            index={index}
          />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanges}
        keyExtractor={(item) => item.midleText}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      <View>
        <OnboardingDot datas={OnboardingDatas} scrollX={scrollX} />
      </View>
    </View>
  );
};

export default OnboardingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
