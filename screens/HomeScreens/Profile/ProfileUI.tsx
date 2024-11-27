import React from "react";

import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Avatar, Switch } from "@rneui/themed";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import MenuItem from "../../../component/MenuItem";
import { Colors } from "../../../constants/Color";

type Props = {};

const ProfileUI = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Profile</Text>
      <View style={styles.imageContainer}>
        <Avatar
          size={120}
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <Text style={styles.nameText}>John Doe </Text>
        <Text style={styles.jobTitleText}>UI/UX Designer</Text>
      </View>

      <View style={styles.menuItemContainer}>
        {/* Account */}
        <View>
          <Text style={styles.title}>Account</Text>

          <View style={styles.accountItemsContainer}>
            <MenuItem
              leftIcon={
                <MaterialCommunityIcons
                  name="pencil-circle"
                  size={35}
                  color="black"
                />
              }
              title="Edit profile"
            />
            <MenuItem
              leftIcon={
                <MaterialIcons name="dark-mode" size={35} color="black" />
              }
              rightIcon={<Switch value={false} />}
              title="Dark mode"
              isWitch
            />
          </View>
        </View>

        {/* General Setting */}

        <View>
          <Text style={styles.title}>General Setting</Text>
          <View style={styles.accountItemsContainer}>
            <MenuItem
              leftIcon={
                <Ionicons name="navigate-circle" size={35} color="black" />
              }
              title="Email notification"
              rightIcon={<Switch value={false} />}
              isWitch
            />
            <MenuItem
              leftIcon={
                <Entypo name="help-with-circle" size={35} color="black" />
              }
              title="Helps & Supports"
            />
            <MenuItem
              leftIcon={<Entypo name="log-out" size={35} color="black" />}
              title="Logout"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  textHeader: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Roboto-bold",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  nameText: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "Roboto-bold",
  },
  jobTitleText: {
    fontSize: 16,
    fontFamily: "Roboto-regular",
    color: Colors.GRAY,
  },
  menuItemContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
  },
  accountItemsContainer: {
    marginTop: 10,
  },
});
