import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import HomeUI from "./HomeIUI";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Home = (props: Props) => {
  return <HomeUI navigation={props.navigation} />;
};

export default Home;
