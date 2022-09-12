import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Header } from "../components/Header";
import { useRecoilValue } from "recoil";
import { chapterState } from "../store/chapterState";

// 場面ごとのさらに細かいチャプター選択画面
const TalkScreen = () => {
  const chapterLabel = useRecoilValue(chapterState);

  return (
    <>
      <Header pageTitle={chapterLabel} />
      <ScrollView>
        <View></View>
      </ScrollView>
    </>
  );
};

export default TalkScreen;
