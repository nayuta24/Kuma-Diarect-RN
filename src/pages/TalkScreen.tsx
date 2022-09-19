import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useRecoilValue } from "recoil";
import { Audio } from "expo-av";
import { Button } from "react-native-paper";

import { Header } from "../components/Header";
import { chapterState } from "../store/chapterState";
import { ChatBubbleButton } from "../components/button/ChatBubbleButton";
import { situationState } from "../store/situationState";
import { partState } from "../store/partState";
import { voiceDatas } from "../_constants/voiceDatas";

// 場面ごとのさらに細かいチャプター選択画面
const TalkScreen = () => {
  const situation = useRecoilValue(situationState);
  const chapter = useRecoilValue(chapterState);
  const part = useRecoilValue(partState);

  const [voiceTexts, setVoiceTexts] = React.useState<Array<string>>([]);
  const [voiceSrcA, setVoiceSrcA] = React.useState<string>("");
  const [voiceSrcB, setVoiceSrcB] = React.useState<string>("");
  const [voiceSrcC, setVoiceSrcC] = React.useState<string>("");

  const [isVisivleMessage1, setIsVisibleMessage1] =
    React.useState<boolean>(false);
  const [isVisivleMessage2, setIsVisibleMessage2] =
    React.useState<boolean>(false);
  const [isVisivleMessage3, setIsVisibleMessage3] =
    React.useState<boolean>(false);

  async function playSound(soundSource: string) {
    try {
      await Audio.setIsEnabledAsync(true);
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: soundSource });
      await sound.playAsync();
      if (await sound) {
        // console.log("sound is loaded");
      }
    } catch (error) {
      console.log("error audio");
    }
  }

  async function stopSound() {
    try {
      await Audio.setIsEnabledAsync(false);
    } catch (error) {
      console.log("error audio");
    }
  }

  const sequenceAudioAndChat = () => {
    playSound(voiceSrcA);
    visivleMessage1();
    setTimeout(() => {
      playSound(voiceSrcB);
      visivleMessage2();
    }, 3000);
    setTimeout(() => {
      playSound(voiceSrcC);
      visivleMessage3();
    }, 6000);
  };

  const visivleMessage1 = () => {
    setIsVisibleMessage1(true);
  };
  const visivleMessage2 = () => {
    setIsVisibleMessage2(true);
  };
  const visivleMessage3 = () => {
    setIsVisibleMessage3(true);
  };

  const formatDoubleDigits = (num: number) => {
    const formted = ("0" + (num + 1)).slice(-2);
    return formted;
  };

  const situationJudger = (situationId: number) => {
    var situationName: string = "";
    situationId === 0
      ? (situationName = "nurse")
      : situationId === 1
      ? (situationName = "meal")
      : (situationName = "life");
    return situationName;
  };

  const voiceSourceMaker = (order: "a" | "b" | "c") => {
    var src: string =
      "http://ilab.watson.jp/Test/NakamuraYutaTest/voices/" +
      situationJudger(situation.id) +
      "/" +
      formatDoubleDigits(chapter.id) +
      "_" +
      formatDoubleDigits(part.id) +
      order +
      ".m4a";

    console.log(src);
    return src;
  };

  React.useEffect(() => {
    setVoiceTexts(
      voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id]
    );
    setVoiceSrcA(voiceSourceMaker("a"));
    setVoiceSrcB(voiceSourceMaker("b"));
    setVoiceSrcC(voiceSourceMaker("c"));
    setIsVisibleMessage1(false);
    setIsVisibleMessage2(false);
    setIsVisibleMessage3(false);
  }, []);

  return (
    <>
      <Header pageTitle={chapter.label} />
      <ScrollView>
        <View>
          <Button onPress={sequenceAudioAndChat}>音声再生</Button>
          {isVisivleMessage1 && (
            <ChatBubbleButton speaker={1} text="カーテンを開けましょうか？" />
          )}
          {isVisivleMessage2 && (
            <ChatBubbleButton speaker={2} text="まぶいかけん、よかたい。" />
          )}
          {isVisivleMessage3 && (
            <ChatBubbleButton speaker={1} text="開けるときは呼んでください。" />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default TalkScreen;
