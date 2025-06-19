import React from "react";
import { View } from "react-native";
import ToggleTheme from "~/components/ToggleTheme";

export default function Page() {
  return (
    <View className="flex flex-1 justify-center items-center dark:bg-black">
      <ToggleTheme />
    </View>
  );
}
