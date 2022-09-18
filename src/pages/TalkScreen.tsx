import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useRecoilValue } from "recoil";
import { Audio, AVPlaybackSource } from "expo-av";

import { Header } from "../components/Header";
import { chapterState } from "../store/chapterState";
import { Button, Text } from "react-native-paper";
import { ChatBubbleButton } from "../components/button/ChatBubbleButton";

// 場面ごとのさらに細かいチャプター選択画面
const TalkScreen = () => {
  const chapter = useRecoilValue(chapterState);
  const [isVisivleMessage1, setIsVisibleMessage1] =
    React.useState<boolean>(false);
  const [isVisivleMessage2, setIsVisibleMessage2] =
    React.useState<boolean>(false);
  const [isVisivleMessage3, setIsVisibleMessage3] =
    React.useState<boolean>(false);

  async function playSound(soundSource: AVPlaybackSource) {
    try {
      await Audio.setIsEnabledAsync(true);
      const sound = new Audio.Sound();
      await sound.loadAsync(soundSource);
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
    let filenum = "01_01";
    let soundA = require("../assets/sounds/voices/nurse/" + filenum + "a.m4a");
    let soundB = require("../assets/sounds/voices/nurse/" + filenum + "b.m4a");
    let soundC = require("../assets/sounds/voices/nurse/" + filenum + "c.m4a");

    playSound(soundA);
    visivleMessage1();
    setTimeout(() => {
      playSound(soundB);
      visivleMessage2();
    }, 3000);
    setTimeout(() => {
      playSound(soundC);
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

  React.useEffect(() => {
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
