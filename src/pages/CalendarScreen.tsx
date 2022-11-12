import * as React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Header } from "../components/Header";
import { playTimeDatas } from "../_constants/playTimeDatas";

const CalendarScreen = () => {
  const task01 = { key: "01", color: "red" };

  playTimeDatas.map;

  return (
    <View>
      <Header pageTitle={"カレンダー"} />
      <Calendar
        markedDates={{
          "2022-11-12": { dots: [task01], disabled: true },
          "2022-11-25": { dots: [task01], disabled: true },
          "2022-11-26": { dots: [task01], disabled: true },
        }}
        markingType={"multi-dot"}
      />
    </View>
  );
};

export default CalendarScreen;
