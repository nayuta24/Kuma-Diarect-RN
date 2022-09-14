import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useRecoilValue } from "recoil";

import { ChapterCard } from "../components/card/ChapterCard";
import Chapters from "../_constants/chapter.json";
import { Header } from "../components/Header";
import { situationState } from "../store/situationState";

type ChapterType = {
  title: string;
};

// 場面ごとのさらに細かいチャプター選択画面
const ChapterScreen = () => {
  const chapters: Array<ChapterType> = Chapters;
  const situationLabel = useRecoilValue(situationState);

  return (
    <>
      <Header pageTitle={situationLabel} />
      <ScrollView>
        <View>
          {chapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.title}
              title={chapter.title}
              num={index + 1}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ChapterScreen;
