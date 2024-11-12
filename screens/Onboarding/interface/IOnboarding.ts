import { ImageSourcePropType } from "react-native";

export interface IOnboarding {
  image: ImageSourcePropType;
  leftText?: string;
  midleText: string;
  rightText: string;
  desc: string;
}

export const OnboardingDatas: IOnboarding[] = [
  {
    image: require("../../../assets/images/illustration1.png"),
    leftText: "Easily ",
    midleText: "create",
    rightText: " new tasks",
    desc: "You can create your tasks quickly and easily by prioritizing.",
  },
  {
    image: require("../../../assets/images/illustration2.png"),
    leftText: "Handle and ",
    midleText: "organize",
    rightText: " tasks",
    desc: "See prioritize and organize tasks in an orderly way to manage them effectively.",
  },
  {
    image: require("../../../assets/images/illustration3.png"),
    midleText: "Plan ",
    rightText: "your time effectively",
    desc: "Plan your time effectively and set your prioritize to create more successful work routine.",
  },
];
