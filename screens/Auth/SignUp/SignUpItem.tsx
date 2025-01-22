import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Button from "../../../component/ui/Button";
import Input from "../../../component/ui/Input";
import { Colors } from "../../../constants/Color";
import { ISignup } from "../../../interfaces/ISignup";
import { ISignupErrors } from "../../../interfaces/ISignupErrors";

type Props = {
  showPassword: boolean;
  handleShowPassword: () => void;
  submit: () => void;
  handleTextInput: (key: string, value: string) => void;
  signinInputs: ISignup;
  errors: ISignupErrors;
  navigation: NativeStackNavigationProp<ParamListBase>;
  isRegistering: boolean;
};

const SignUpItem = ({
  showPassword,
  handleShowPassword,
  submit,
  handleTextInput,
  signinInputs,
  errors,
  navigation,
  isRegistering,
}: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "padding"}
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons
                name="arrow-back-ios-new"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.desc}> Create your account</Text>
              </View>

              <View>
                <View>
                  <Input
                    isError={errors?.emailErrors.length > 0}
                    title="Email address"
                    placeholder="Enter your email address"
                    value={signinInputs?.email}
                    onChangeText={(value) => handleTextInput("email", value)}
                  />
                  {errors?.emailErrors.map((error, index) => (
                    <View key={index} style={styles.errorContainer}>
                      <Text style={{ color: Colors.RED }}>{error}</Text>
                    </View>
                  ))}
                </View>

                <Input
                  isError={errors?.fullNameErrors.length > 0}
                  title="Full Name"
                  placeholder="Enter your full name"
                  value={signinInputs?.fullName}
                  onChangeText={(value) => handleTextInput("fullName", value)}
                />

                {errors?.fullNameErrors.map((error, index) => (
                  <View key={index} style={styles.errorContainer}>
                    <Text style={{ color: Colors.RED }}>{error}</Text>
                  </View>
                ))}

                {/* Add password input */}
                <View>
                  <Input
                    isError={errors?.passwordErrors.length > 0}
                    value={signinInputs?.password}
                    onChangeText={(value) => handleTextInput("password", value)}
                    isPasswordField
                    isShowPassword={!showPassword}
                    handleShowPassword={handleShowPassword}
                    title="Password"
                    placeholder="Enter your password"
                  />
                </View>

                {errors?.passwordErrors.map((error, index) => (
                  <View key={index} style={styles.errorContainer}>
                    <Text style={{ color: Colors.RED }}>{error}</Text>
                  </View>
                ))}

                <Input
                  isError={errors?.jobTitleErrors.length > 0}
                  title="Job title"
                  placeholder="Enter your Job title"
                  value={signinInputs?.jobTitle}
                  onChangeText={(value) => handleTextInput("jobTitle", value)}
                />
                {errors?.jobTitleErrors.map((error, index) => (
                  <View key={index} style={styles.errorContainer}>
                    <Text style={{ color: Colors.RED }}>{error}</Text>
                  </View>
                ))}

                <Input
                  isError={errors?.organizationNameErrors.length > 0}
                  title="Organization Name"
                  placeholder="Enter your organization name"
                  value={signinInputs?.organizationName}
                  onChangeText={(value) =>
                    handleTextInput("organizationName", value)
                  }
                />
                {errors?.organizationNameErrors.map((error, index) => (
                  <View key={index} style={styles.errorContainer}>
                    <Text style={{ color: Colors.RED }}>{error}</Text>
                  </View>
                ))}
                <Input
                  isError={errors?.organizationEmailErrors.length > 0}
                  title="Organization email"
                  placeholder="Enter your organization email"
                  value={signinInputs?.organizationEmail}
                  onChangeText={(value) =>
                    handleTextInput("organizationEmail", value)
                  }
                />
                {errors?.organizationEmailErrors.map((error, index) => (
                  <View key={index} style={styles.errorContainer}>
                    <Text style={{ color: Colors.RED }}>{error}</Text>
                  </View>
                ))}
              </View>

              <Button
                isRefresh={isRegistering}
                onPress={submit}
                title="Register"
              />
            </View>
            <View style={styles.registerContainer}>
              <View style={styles.registerTextContainer}>
                <Text style={styles.dontHaveAccountText}>
                  Have an account ?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.5}
                >
                  <Text style={styles.registerText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Roboto-Bold",
    marginBottom: 10,
  },
  desc: {
    color: Colors.GRAY,
    fontSize: 18,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  registerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    color: Colors.BLUE,
    fontFamily: "Roboto-bold",
    fontSize: 16,
  },
  dontHaveAccountText: {
    color: Colors.GRAY,
    fontFamily: "Roboto-Regular",
  },
  backArrow: {
    padding: 10,
    backgroundColor: Colors.LIGHT_GRAY,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  errorContainer: {
    marginTop: 3,
  },
});
