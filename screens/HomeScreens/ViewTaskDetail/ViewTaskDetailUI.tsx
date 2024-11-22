import React, { useEffect } from "react";

import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Avatar, LinearProgress } from "@rneui/themed";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Input from "../../../component/ui/Input";
import { Colors } from "../../../constants/Color";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const ViewTaskDetailUI = (props: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.subContainer}
      >
        <View style={styles.taskNameContainer}>
          <Text style={styles.taskTitle}>Task Name</Text>
          <View style={styles.daysContainer}>
            <MaterialCommunityIcons
              name="timer-outline"
              size={24}
              color={Colors.BLUE}
            />
            <Text style={styles.dayTitle}>4 days</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressTitleContainer}>
            <Text style={styles.text}>In progress</Text>
            <Text style={styles.text}>80%</Text>
          </View>
          <LinearProgress
            color={Colors.BLUE}
            // value={}
            trackColor={Colors.LIGHT_GRAY}
            variant="determinate"
            style={styles.linearProgress}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionContainerText}>
            <Text style={styles.taskTitle}>Description</Text>
            <Text style={styles.categoryText}>UI/UX Design</Text>
          </View>
          <View style={styles.descTextContainer}>
            <Text style={styles.descText}>{"\u2B22"}</Text>
            <Text style={styles.descText}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
              quam laudantium sapiente quod asperiores dolores dolorum, rerum
              tempora obcaecati dolore quis odio eligendi consectetur quidem
              velit ea id numquam qui.
            </Text>
          </View>
        </View>

        <View style={styles.assignedContainer}>
          <Text style={styles.taskTitle}>Assigned To</Text>
          <View style={styles.imagesContainer}>
            <Avatar
              size={60}
              rounded
              source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            />
            <Avatar
              size={60}
              rounded
              source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            />
            <Avatar
              size={60}
              rounded
              source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            />
            <View style={styles.moreUsers}>
              <Text style={styles.moreUsersText}>+4</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.moreUsers,
                { backgroundColor: Colors.BLUE, marginLeft: -10 },
              ]}
              onPress={() => props.navigation.navigate("Coworker")}
            >
              <AntDesign name="plus" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filesContainer}>
          <Text style={styles.taskTitle}>Files</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.FileItemContainer}
          >
            <View style={styles.fileIconContainer}>
              <Entypo name="image-inverted" size={35} color={Colors.GRAY} />
              <Text style={styles.fileText}>Image.png</Text>
            </View>
            <Feather name="download" size={30} color={Colors.BLUE} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.FileItemContainer}
          >
            <View style={styles.fileIconContainer}>
              <MaterialIcons
                name="picture-as-pdf"
                size={35}
                color={Colors.RED}
                style={{ opacity: 0.6 }}
              />
              <Text style={styles.fileText}>Documentation.pdf</Text>
            </View>
            <Feather name="download" size={30} color={Colors.BLUE} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.FileItemContainer}
          >
            <View style={styles.fileIconContainer}>
              <FontAwesome name="folder" size={35} color={Colors.GRAY} />
              <Text style={styles.fileText}>Icon package</Text>
            </View>
            <Feather name="download" size={30} color={Colors.BLUE} />
          </TouchableOpacity>
        </View>

        <View style={styles.commentsContainer}>
          <Text style={styles.taskTitle}>Comments</Text>
          <Input title="" placeholder="Add comment" />
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewTaskDetailUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  taskNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
  },
  daysContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dayTitle: {
    fontSize: 14,
    fontFamily: "Roboto-regular",
    color: Colors.BLUE,
  },
  linearProgress: {
    height: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  progressTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    fontFamily: "Roboto-regular",
  },
  progressContainer: {
    marginTop: 20,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionContainerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 16,
    fontFamily: "Roboto-regular",
    color: Colors.BLUE,
  },
  descTextContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "baseline",
    gap: 5,
  },
  descText: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  assignedContainer: {
    marginTop: 20,
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  moreUsers: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: Colors.GRAY,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  moreUsersText: {
    fontSize: 14,
    color: Colors.WHITE,
  },
  filesContainer: {
    marginTop: 20,
  },
  FileItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  fileIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  fileText: {
    fontSize: 14,
    fontFamily: "Roboto-regular",
  },
  commentsContainer: {
    marginTop: 20,
  },
});
