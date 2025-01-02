import React, { useCallback } from "react";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Colors } from "../constants/Color";
import Button from "./ui/Button";
import { RootStackParamList } from "../types/RootStackParamList";

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const LogoutModal = (props: Props) => {
  async function handleLogout() {
    await AsyncStorage.multiRemove(["token", "refresh_token"]).then(() => {
      props.navigation.replace("SignIn");
    });
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={props.bottomSheetModalRef}
          backgroundStyle={{
            backgroundColor: Colors.WHITE,
            shadowColor: Colors.BLACK,
            opacity: 0.1,
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
          }}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.text}>
              Are you sure you would like to log out?{" "}
            </Text>
            <View style={styles.contentsContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Button
                  title="LOG OUT"
                  onPress={handleLogout}
                  style={{
                    width: 180,
                    height: 50,
                    backgroundColor: Colors.RED,
                  }}
                  textStyle={{ fontSize: 18 }}
                />
                <Button
                  title="CANCEL"
                  style={{ width: 180, height: 50, marginRight: 10 }}
                  textStyle={{ fontSize: 18 }}
                />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    elevation: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
  },
  contentsContainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
