import moment from "moment";
import * as React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { Text } from "react-native-paper";
import { Header } from "../components/Header";
import { storage } from "../components/storage";
import { TextLarge } from "../components/text/TextLarge";
import { playTimeDatas } from "../_constants/playTimeDatas";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type markedDatasType = {
  [key: string]: { dots: [{ key: string; color: string }]; disabled?: boolean };
};

const CalendarScreen = () => {
  const task01 = { key: "01", color: "red" };
  const task02 = { key: "01", color: "cyan" };

  const markedDates: markedDatasType = {};

  const date = moment(new Date());
  const dateFormat = date.format("YYYY-MM-DD");

  const [playTimeDatas, setPlayTimeDatas] = React.useState<{
    [key: string]: number;
  }>({});

  const [todayPlaytime, setTodayPlaytime] = React.useState<{
    h: number;
    min: number;
    sec: number;
  }>();

  const keys = Object.keys(playTimeDatas);

  React.useEffect(() => {
    storage
      .load({
        key: "playTime",
      })
      .then((data: { [key: string]: number }) => {
        setPlayTimeDatas(data);
      })
      .catch((err) => {});
  }, []);

  React.useEffect(() => {
    setTodayPlaytime({
      h: Math.floor(playTimeDatas[dateFormat] / 3600),
      min: Math.floor((playTimeDatas[dateFormat] % 3600) / 60),
      sec: (playTimeDatas[dateFormat] % 3600) % 60,
    });
  }, [playTimeDatas]);

  keys.map((key) => {
    const sec = playTimeDatas[key];
    if (sec >= 1200) {
      markedDates[key] = { dots: [task01], disabled: true };
    } else if (sec > 0) {
      markedDates[key] = { dots: [task02], disabled: true };
    }
  });

  return (
    <View>
      <Header pageTitle={"カレンダー"} />
      <Calendar markedDates={markedDates} markingType={"multi-dot"} />
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View style={{ marginTop: "%" }}></View>
        <TextLarge text={dateFormat} />
        <Text style={{ fontSize: hp("3.5%"), fontWeight: "bold" }}>
          {"今日の再生時間"}
        </Text>
        <Text
          style={{
            fontSize: hp("2.5%"),
            fontWeight: "400",
            marginTop: hp("2%"),
          }}
        >{`${todayPlaytime?.h}時間${todayPlaytime?.min}分${todayPlaytime?.sec}秒`}</Text>
      </View>
    </View>
  );
};

export default CalendarScreen;
