import React, { useCallback, useRef } from "react";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet, Text, View } from "react-native";

import ProfileUI from "./ProfileUI";

type Props = {};

const Profile = (props: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  return <ProfileUI />;
};

export default Profile;

const styles = StyleSheet.create({});
