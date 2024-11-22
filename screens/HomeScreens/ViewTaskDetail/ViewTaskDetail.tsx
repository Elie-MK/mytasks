import React, { useEffect } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ViewTaskDetailUI from "./ViewTaskDetailUI";

type Props = {};

const ViewTaskDetail = (props: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: "Roboto-bold",
      },
      headerTitle: "Task Details",
    });
  }, [navigation]);

  return <ViewTaskDetailUI navigation={navigation} />;
};

export default ViewTaskDetail;
