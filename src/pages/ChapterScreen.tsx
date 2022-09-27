import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { useRecoilValue } from "recoil";

import { ChapterCard } from "../components/card/ChapterCard";
import { Header } from "../components/Header";
import { playingTargetState } from "../store/playingTargetState";
import { voiceDatas } from "../_constants/voiceDatas";

// 場面ごとのさらに細かいチャプター選択画面
const ChapterScreen = () => {
  const playingTarget = useRecoilValue(playingTargetState);
  const selectedSituationChapters =
    voiceDatas[playingTarget.situation.id].datas;

  return (
    <>
      <Header pageTitle={playingTarget.situation.label} />
      <ScrollView>
        <View>
          <List.Accordion title="標準語ボイスなし">
            {selectedSituationChapters.nonStandardVoice.map(
              (chapter, index) => (
                <ChapterCard
                  key={index}
                  title={chapter.title}
                  num={index + 1}
                  id={index}
                  hasVoice={false}
                />
              )
            )}
          </List.Accordion>
          <List.Accordion title="標準語ボイスあり">
            {selectedSituationChapters.hasStandardVoice.map(
              (chapter, index) => (
                <ChapterCard
                  key={index}
                  title={chapter.title}
                  num={index + 1}
                  id={index}
                  hasVoice={true}
                />
              )
            )}
          </List.Accordion>
        </View>
      </ScrollView>
    </>
  );
};

export default ChapterScreen;
