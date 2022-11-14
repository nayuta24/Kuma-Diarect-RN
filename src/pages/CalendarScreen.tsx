import moment from "moment";
import * as React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { Header } from "../components/Header";
import { TextLarge } from "../components/text/TextLarge";
import { playTimeDatas } from "../_constants/playTimeDatas";

type markedDatasType = {
  [key: string]: { dots: [{ key: string; color: string }]; disabled?: boolean };
};

const CalendarScreen = () => {
  const task01 = { key: "01", color: "red" };
  const task02 = { key: "01", color: "cyan" };

  const markedDates: markedDatasType = {};

  const date = moment(new Date());
  const dateFormat = date.format("YYYY-MM-DD");

  playTimeDatas.map((data) => {
    if (data.h > 0 || data.min >= 20) {
      markedDates[data.date] = { dots: [task01], disabled: true };
    } else if (data.h > 0 || data.min > 0 || data.sec > 0) {
      markedDates[data.date] = { dots: [task02], disabled: true };
    }
  });

  return (
    <View>
      <Header pageTitle={"カレンダー"} />
      <Calendar markedDates={markedDates} markingType={"multi-dot"} />
      <TextLarge text={dateFormat} />
    </View>
  );
};

export default CalendarScreen;
