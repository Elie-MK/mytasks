import * as Haptics from "expo-haptics";

export function handleHaptics() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
}
