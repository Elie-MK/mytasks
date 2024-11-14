import {
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

import { Colors } from "../../../constants/Color";
import Input from "../../../component/ui/Input";
import Button from "../../../component/ui/Button";
import { ISignin } from "../../../interfaces/ISignin";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

type Props = {
  showPassword: boolean;
  handleShowPassword: () => void;
  submit: () => void;
  handleTextInput: (key: string, value: string) => void;
  signinInputs: ISignin;
  errors: {
    emailErrors: string[];
    passwordErrors: string[];
  };
  navigation: NavigationProp<ParamListBase>;
};

const SignInItem = ({
  showPassword,
  handleShowPassword,
  submit,
  handleTextInput,
  signinInputs,
  errors,
  navigation,
}: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "padding"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Sign In</Text>
              <Text style={styles.desc}>Sign in to continue using app.</Text>
            </View>

            <View>
              <View>
                <Input
                  isError={errors.emailErrors.length > 0}
                  title="Email address"
                  placeholder="Enter your email address"
                  value={signinInputs.email}
                  onChangeText={(value) => handleTextInput("email", value)}
                />

                <View>
                  {errors.emailErrors.map((error, index) => (
                    <Text key={index} style={{ color: Colors.RED }}>
                      {error}
                    </Text>
                  ))}
                </View>
              </View>

              {/* Add password input */}
              <View>
                <Input
                  isError={errors.passwordErrors.length > 0}
                  value={signinInputs.password}
                  onChangeText={(value) => handleTextInput("password", value)}
                  isPasswordField
                  isShowPassword={!showPassword}
                  handleShowPassword={handleShowPassword}
                  title="Password"
                  placeholder="Enter your password"
                />
              </View>

              <View>
                {errors.passwordErrors.map((error, index) => (
                  <Text key={index} style={{ color: Colors.RED }}>
                    {error}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.forgotPasswdContainer}>
              <TouchableOpacity>
                <Text style={styles.forgotPasswd}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <Button onPress={submit} title="Sign in" />
          </View>
          <View style={styles.registerContainer}>
            <View style={styles.registerTextContainer}>
              <Text style={styles.dontHaveAccountText}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                activeOpacity={0.5}
              >
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignInItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
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
