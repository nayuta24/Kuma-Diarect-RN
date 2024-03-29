import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { useRecoilState, useRecoilValue } from "recoil";

import { ChapterCard } from "../components/card/ChapterCard";
import { Header } from "../components/Header";
import { isCountState } from "../store/isCountState";
import { playingTargetState } from "../store/playingTargetState";
import { voiceDatas } from "../_constants/voiceDatas";

// 場面ごとのさらに細かいチャプター選択画面
const ChapterScreen = () => {
  const playingTarget = useRecoilValue(playingTargetState);
  const selectedSituationChapters =
    voiceDatas[playingTarget.situation.id].datas;

  const [isCount, setIsCount] = useRecoilState(isCountState);

  React.useEffect(() => {
    setIsCount(false);
  }, []);

  return (
    <>
      <Header pageTitle={playingTarget.situation.label} />
      <ScrollView>
        <View>
          <List.Section>
            <List.Subheader>標準語(ひょうじゅんご おんせい)なし</List.Subheader>
            {selectedSituationChapters.nonStandardVoice.map(
              (chapter, index) => (
                <ChapterCard
                  key={index}
                  title={chapter.title}
                  num={index + 1}
                  id={index}
                  hasStandardVoice={false}
                />
              )
            )}
            <List.Subheader>
              標準語音声(ひょうじゅんご おんせい)あり
            </List.Subheader>
            {selectedSituationChapters.hasStandardVoice.map(
              (chapter, index) => (
                <ChapterCard
                  key={index}
                  title={chapter.title}
                  num={index + 1}
                  id={index}
                  hasStandardVoice={true}
                />
              )
            )}
          </List.Section>
        </View>
      </ScrollView>
    </>
  );
};

export default ChapterScreen;
