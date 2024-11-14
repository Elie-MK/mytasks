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
import React from "react";
import { Colors } from "../../../constants/Color";
import { ISignin } from "../../../interfaces/ISignin";
import { ParamListBase } from "@react-navigation/native";
import Input from "../../../component/ui/Input";
import Button from "../../../component/ui/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ISignup } from "../../../interfaces/ISignup";

type Props = {
  showPassword: boolean;
  handleShowPassword: () => void;
  submit: () => void;
  handleTextInput: (key: string, value: string) => void;
  signinInputs: ISignup;
  errors: {
    emailErrors: string[];
    passwordErrors: string[];
  };
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const SignUpItem = ({
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
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.desc}>Sign in to continue using app.</Text>
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

                  <View>
                    {errors?.emailErrors.map((error, index) => (
                      <Text key={index} style={{ color: Colors.RED }}>
                        {error}
                      </Text>
                    ))}
                  </View>
                </View>

                <Input
                  isError={errors?.emailErrors.length > 0}
                  title="Full Name"
                  placeholder="Enter your full name"
                  value={signinInputs?.fullName}
                  onChangeText={(value) => handleTextInput("fullName", value)}
                />

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

                <View>
                  {errors?.passwordErrors.map((error, index) => (
                    <Text key={index} style={{ color: Colors.RED }}>
                      {error}
                    </Text>
                  ))}
                </View>

                <View>
                  <Input
                    isError={errors?.passwordErrors.length > 0}
                    value={signinInputs?.confirmPassword}
                    onChangeText={(value) =>
                      handleTextInput("confirmPassword", value)
                    }
                    isPasswordField
                    isShowPassword={!showPassword}
                    handleShowPassword={handleShowPassword}
                    title="Confirm Password"
                    placeholder="Enter your confirm password"
                  />
                </View>

                <View>
                  {errors?.passwordErrors.map((error, index) => (
                    <Text key={index} style={{ color: Colors.RED }}>
                      {error}
                    </Text>
                  ))}
                </View>

                <Input
                  isError={errors?.emailErrors.length > 0}
                  title="Job title"
                  placeholder="Enter your Job title"
                  value={signinInputs?.jobTitle}
                  onChangeText={(value) => handleTextInput("jobTitle", value)}
                />
              </View>

              <Button onPress={submit} title="Register" />
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
});
