import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

import { TextLarge } from "../components/text/TextLarge";
import { CommonButton } from "../components/button/CommonButton";

type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;
const HomeScreen = () => {
  const navigation = useNavigation<homeScreenProp>();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextLarge text="熊本弁学習アプリ" />
      <CommonButton
        text="スタート！"
        onPress={() => navigation.navigate("状況をえらぶ")}
      />
    </View>
  );
};

export default HomeScreen;
