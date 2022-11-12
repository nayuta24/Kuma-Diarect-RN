import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { TextLarge } from "../components/text/TextLarge";
import { CommonButton } from "../components/button/CommonButton";
import { CircleIconButton } from "../components/button/CircleIconButton";

type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;
const HomeScreen = () => {
  const navigation = useNavigation<homeScreenProp>();

  const onPressCalendarButton = () => {};
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ height: hp("15%") }}></View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: hp("70%"),
        }}
      >
        <TextLarge text="熊本弁学習アプリ" />
        <CommonButton
          text="スタート！"
          onPress={() => navigation.navigate("場面選択")}
        />
      </View>
      <View style={{ height: hp("15%") }}>
        <View style={{ marginLeft: wp("65%") }}>
          <CircleIconButton
            icon="calendar"
            onPress={() => navigation.navigate("カレンダー")}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
