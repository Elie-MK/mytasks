import { ImageSourcePropType } from "react-native";

export interface IOnboarding {
  image: ImageSourcePropType;
  leftText?: string;
  midleText: string;
  rightText: string;
  desc: string;
}
