import * as React from "react";
import { View } from "react-native";
import { useRecoilValue } from "recoil";
import { Audio } from "expo-av";
import {
  Button,
  IconButton,
  Surface,
  Text,
  MD3Colors,
  Switch,
  ActivityIndicator,
} from "react-native-paper";

import { Header } from "../components/Header";
import { chapterState } from "../store/chapterState";
import { ChatBubbleButton } from "../components/button/ChatBubbleButton";
import { situationState } from "../store/situationState";
import { partState } from "../store/partState";
import { voiceDatas } from "../_constants/voiceDatas";

type voicesAndTextsType = {
  voiceA: {
    text: string;
    voiceSrc: string;
  };
  voiceB: {
    text: string;
    voiceSrc: string;
  };
  voiceC: {
    text: string;
    voiceSrc: string;
  };
  voiceB2: {
    text: string;
    voiceSrc: string;
  };
};

// 場面ごとのさらに細かいチャプター選択画面
const TalkScreen = () => {
  const situation = useRecoilValue(situationState);
  const chapter = useRecoilValue(chapterState);
  const part = useRecoilValue(partState);

  const [voicesAndTexts, setVoicesAndTexts] =
    React.useState<voicesAndTextsType>({
      voiceA: {
        text: "",
        voiceSrc: "",
      },
      voiceB: {
        text: "",
        voiceSrc: "",
      },
      voiceC: {
        text: "",
        voiceSrc: "",
      },
      voiceB2: {
        text: "",
        voiceSrc: "",
      },
    });

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
    setIsVisibleMessage1(false);
    setIsVisibleMessage2(false);
    setIsVisibleMessage3(false);
    setTimeout(() => {
      playSound(voicesAndTexts.voiceA.voiceSrc);
      visivleMessage1();
    }, 1000);
    setTimeout(() => {
      playSound(voicesAndTexts.voiceB.voiceSrc);
      visivleMessage2();
    }, 4000);
    setTimeout(() => {
      playSound(voicesAndTexts.voiceC.voiceSrc);
      visivleMessage3();
    }, 7000);
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

  // 音声ファイルのパスを作成
  const voiceSourceMaker = (order: "a" | "b" | "c" | "b2") => {
    var src: string =
      "http://ilab.watson.jp/Test/NakamuraYutaTest/voices/" +
      situationJudger(situation.id) +
      "/" +
      formatDoubleDigits(chapter.id) +
      "_" +
      formatDoubleDigits(part.id) +
      order +
      ".m4a";

    // console.log(src);
    return src;
  };

  // 画面表示後、音声とテキストをセット
  React.useEffect(() => {
    setVoicesAndTexts({
      voiceA: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][0],
        voiceSrc: voiceSourceMaker("a"),
      },
      voiceB: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][1],
        voiceSrc: voiceSourceMaker("b"),
      },
      voiceC: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][2],
        voiceSrc: voiceSourceMaker("c"),
      },
      voiceB2: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][3],
        voiceSrc: voiceSourceMaker("b2"),
      },
    });
  }, []);

  // 場面かチャプターが変わったら音声とテキストをセットしなおす
  React.useEffect(() => {
    setVoicesAndTexts({
      voiceA: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][0],
        voiceSrc: voiceSourceMaker("a"),
      },
      voiceB: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][1],
        voiceSrc: voiceSourceMaker("b"),
      },
      voiceC: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][2],
        voiceSrc: voiceSourceMaker("c"),
      },
      voiceB2: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][3],
        voiceSrc: voiceSourceMaker("b2"),
      },
    });
  }, [chapter.id, part.id]);

  // 音声とテキストがセットされたら音声再生
  React.useEffect(() => {
    sequenceAudioAndChat();
  }, [voicesAndTexts]);

  return (
    <>
      <Header pageTitle={chapter.label} />
      <View>
        {isVisivleMessage1 && (
          <ChatBubbleButton speaker={1} text={voicesAndTexts.voiceA.text} />
        )}
        {isVisivleMessage2 && (
          <ChatBubbleButton speaker={2} text={voicesAndTexts.voiceB.text} />
        )}
        {isVisivleMessage3 && (
          <ChatBubbleButton speaker={1} text={voicesAndTexts.voiceC.text} />
        )}
      </View>
      <Surface
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 250,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 33,
              fontWeight: "bold",
              color: "purple",
              marginVertical: 20,
            }}
          >
            {"チャプター" + formatDoubleDigits(part.id)}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton
              icon={"arrow-left-bold-circle-outline"}
              iconColor={"purple"}
              size={60}
              style={{ marginHorizontal: 25 }}
            />
            <View style={{ marginBottom: 20 }}>
              <Button
                mode="contained"
                onPress={sequenceAudioAndChat}
                style={{ marginVertical: 10 }}
              >
                もう一度再生
              </Button>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    marginRight: 10,
                  }}
                >
                  自動再生モード
                </Text>
                <Switch value={false}></Switch>
              </View>
            </View>
            <IconButton
              icon={"arrow-right-bold-circle-outline"}
              iconColor={"purple"}
              size={60}
              style={{ marginHorizontal: 25 }}
            />
          </View>
        </View>
      </Surface>

      {/* 押せないようにカバーする */}
      <Surface
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 250,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "gray",
          opacity: 0.2,
        }}
      >
        <ActivityIndicator animating={true} color="purple" size={90} />
      </Surface>
    </>
  );
};

export default TalkScreen;
