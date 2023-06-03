import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { CommonButton } from "../components/button/CommonButton";
import { CircleIconButton } from "../components/button/CircleIconButton";
import { storage } from "../components/storage";
import { isCountState } from "../store/isCountState";
import { useSetRecoilState } from "recoil";
import moment from "moment";
import { AppTitle } from "../components/text/AppTitle";

type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;
const HomeScreen = () => {
  const navigation = useNavigation<homeScreenProp>();

  const setIsCount = useSetRecoilState(isCountState);

  const [todayPlayTimeData, setTodayPlayTimeData] = React.useState<{
    [key: string]: number;
  }>({});

  // 今日の再生時間データがなければ、デフォルト値として0をセットする
  React.useEffect(() => {
    const date = moment(new Date()).format("YYYY-MM-DD");
    storage
      .load({
        key: "playTime",
      })
      .then((data: { [key: string]: number }) => {
        data[date] || setTodayPlayTimeData({ ...data, [date]: 0 });
      })
      .catch((err) => {});
    setIsCount(false);
  }, []);

  React.useEffect(() => {
    storage.save({
      key: "playTime",
      data: todayPlayTimeData,
    });
  }, [todayPlayTimeData]);

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
        <AppTitle subTitle="聞いてみらんね！" title="介護の熊本弁" />

        <CommonButton
          text="スタート！"
          onPress={() => navigation.navigate("場面選択")}
        />
      </View>
      <View style={{ height: hp("15%") }}>
        <View style={{ marginLeft: wp("65%") }}>
          {/* <CircleIconButton
            icon="calendar"
            onPress={() => navigation.navigate("カレンダー")}
          /> */}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
