import React from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View, ViewToken } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import CoworkerItem from "./CoworkerItem";
import { users } from "./dummyUsers";
import Button from "../../../../component/ui/Button";
import { RootStackParamList } from "../../../../types/RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "Coworker">;

const Coworkers: React.FC<Props> = ({ navigation, route }) => {
  const { datas } = route.params || [];
  const isDatas = datas ? datas : [];

  const [coworkers, setCoworkers] = React.useState<number[]>(isDatas);

  const handleSelectCoworker = (coworkerId: number) => {
    const isCoworkerSelected = coworkers.includes(coworkerId);
    if (isCoworkerSelected) {
      setCoworkers(coworkers.filter((id) => id !== coworkerId));
    } else {
      setCoworkers([...coworkers, coworkerId]);
    }
  };

  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select members</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        renderItem={({ item }) => (
          <CoworkerItem
            coworkers={coworkers}
            handleSelectCoworker={handleSelectCoworker}
            user={item}
            viewableItems={viewableItems}
          />
        )}
      />
      <View>
        <Button
          title="Done"
          onPress={() =>
            navigation.navigate("CreateTask", { datas: coworkers })
          }
        />
      </View>
    </View>
  );
};

export default Coworkers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
