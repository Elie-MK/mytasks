import React from "react";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import Button from "../../../component/ui/Button";
import Input from "../../../component/ui/Input";
import { Colors } from "../../../constants/Color";
import { ISignin } from "../../../interfaces/ISignin";

type Props = {
  showPassword: boolean;
  handleShowPassword: () => void;
  submit: () => void;
  handleTextInput: (key: string, value: string) => void;
  signinInputs: ISignin;
  errors: string[];
  navigation: NativeStackNavigationProp<ParamListBase>;
  isRefresh?: boolean;
};

const SignInUI = ({
  showPassword,
  handleShowPassword,
  submit,
  handleTextInput,
  signinInputs,
  errors,
  navigation,
  isRefresh,
}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Sign In</Text>
                  <Text style={styles.desc}>
                    Sign in to continue using app.
                  </Text>
                </View>

                <View>
                  <View>
                    <Input
                      editable={!isRefresh}
                      isError={errors.length > 0}
                      title="Email address"
                      placeholder="Enter your email address"
                      value={signinInputs.email}
                      onChangeText={(value) => handleTextInput("email", value)}
                    />

                    <View>
                      {errors.map((error, index) => (
                        <Text key={index} style={{ color: Colors.RED }}>
                          {error}
                        </Text>
                      ))}
                    </View>
                  </View>

                  {/* Add password input */}
                  <View>
                    <Input
                      editable={!isRefresh}
                      value={signinInputs.password}
                      onChangeText={(value) =>
                        handleTextInput("password", value)
                      }
                      isPasswordField
                      isShowPassword={!showPassword}
                      handleShowPassword={handleShowPassword}
                      title="Password"
                      placeholder="Enter your password"
                    />
                  </View>
                </View>
                <View style={styles.forgotPasswdContainer}>
                  <TouchableOpacity>
                    <Text style={styles.forgotPasswd}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>
                <Button
                  disabled={isRefresh}
                  isRefresh={isRefresh}
                  onPress={submit}
                  title="Sign in"
                />
              </View>
              <View style={styles.registerContainer}>
                <View style={styles.registerTextContainer}>
                  <Text style={styles.dontHaveAccountText}>
                    Don&apos;t have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                    activeOpacity={0.5}
                  >
                    <Text style={styles.registerText}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollViewContent: {
    marginHorizontal: 20,
    flex: 1,
  },
  titleContainer: {
    marginBottom: 20,
  },
  forgotPasswdContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPasswd: {
    color: Colors.GRAY,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    marginTop: 10,
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
});
