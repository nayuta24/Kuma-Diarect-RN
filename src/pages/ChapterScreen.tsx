import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useRecoilValue } from "recoil";

import { ChapterCard } from "../components/card/ChapterCard";
import { Header } from "../components/Header";
import { situationState } from "../store/situationState";
import { voiceDatas } from "../_constants/voiceDatas";

type ChapterType = {
  title: string;
};

// 場面ごとのさらに細かいチャプター選択画面
const ChapterScreen = () => {
  const situation = useRecoilValue(situationState);
  const selectedSituationChapters = voiceDatas[situation.id].datas;

  return (
    <>
      <Header pageTitle={situation.label} />
      <ScrollView>
        <View>
          {selectedSituationChapters.map((chapter, index) => (
            <ChapterCard
              key={index}
              title={chapter.title}
              num={index + 1}
              id={index}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ChapterScreen;
