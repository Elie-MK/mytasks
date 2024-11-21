import React from "react";
import HomeItem from "./HomeItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Home = (props: Props) => {
  return <HomeItem navigation={props.navigation} />;
};

export default Home;
