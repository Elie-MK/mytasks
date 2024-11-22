import React from "react";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import HomeUI from "./HomeIUI";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Home = (props: Props) => {
  return <HomeUI navigation={props.navigation} />;
};

export default Home;
