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
import { storage } from "../components/storage";
import { isCountState } from "../store/isCountState";
import { useRecoilState } from "recoil";
import moment from "moment";

type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;
const HomeScreen = () => {
  const navigation = useNavigation<homeScreenProp>();

  const [isCount, setIsCount] = useRecoilState(isCountState);

  React.useEffect(() => {
    const date = moment(new Date()).format("YYYY-MM-DD");
    var newData: { [key: string]: number } = {};
    storage
      .load({
        key: "playTime",
      })
      .then((data: { [key: string]: number }) => {
        newData = data;
        newData[date] || (newData[date] = 0);
        storage.save({
          key: "playTime",
          data: newData,
        });
      })
      .catch((err) => {});

    setIsCount(false);
  }, []);

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
        <TextLarge text="聞いてみらんね　介護の熊本弁" />

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
