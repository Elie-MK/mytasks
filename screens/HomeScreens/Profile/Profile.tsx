import React, { useCallback, useRef } from "react";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import ProfileUI from "./ProfileUI";
import { RootStackParamList } from "../../../types/RootStackParamList";

type Props = {};

const Profile = (props: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  return <ProfileUI navigation={navigation} />;
};

export default Profile;

const styles = StyleSheet.create({});
