import * as React from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { Audio } from "expo-av";
import {
  Button,
  IconButton,
  Surface,
  Text,
  Switch,
  ActivityIndicator,
} from "react-native-paper";

import { Header } from "../components/Header";
import { playingTargetState } from "../store/playingTargetState";
import { ChatBubbleButton } from "../components/button/ChatBubbleButton";
import { situationState } from "../store/situationState";
import { partState } from "../store/partState";
import { voiceDatas } from "../_constants/voiceDatas";

type voicesAndTextsType = {
  voiceA: {
    text: string;
    voiceSrc: string;
    playTime: number;
  };
  voiceB: {
    text: string;
    voiceSrc: string;
    playTime: number;
  };
  voiceC: {
    text: string;
    voiceSrc: string;
    playTime: number;
  };
  voiceB2: {
    text: string;
    voiceSrc: string;
    playTime: number;
  };
};

// 場面ごとのさらに細かいチャプター選択画面
const TalkScreen = () => {
  const [playingTarget, setPlayingTarget] = useRecoilState(playingTargetState);
  const { situation, chapter, part } = playingTarget;

  const [voicesAndTexts, setVoicesAndTexts] =
    React.useState<voicesAndTextsType>({
      voiceA: {
        text: "",
        voiceSrc: "",
        playTime: 3000,
      },
      voiceB: {
        text: "",
        voiceSrc: "",
        playTime: 3000,
      },
      voiceC: {
        text: "",
        voiceSrc: "",
        playTime: 3000,
      },
      voiceB2: {
        text: "",
        voiceSrc: "",
        playTime: 3000,
      },
    });

  const [flgPlayA, setFlgPlayA] = React.useState<boolean>(false);
  const [flgPlayB, setFlgPlayB] = React.useState<boolean>(false);
  const [flgPlayC, setFlgPlayC] = React.useState<boolean>(false);
  const [flgPlayFinished, setFlgPlayFinished] = React.useState<boolean>(false);

  const [isPlayingSequence, setIsPlayingSequence] =
    React.useState<boolean>(true);
  const [isPlayingFinished, setIsPlayingFinished] =
    React.useState<boolean>(false);
  const [isDisabledReplayButton, setIsDisabledReplayButton] =
    React.useState<boolean>(true);
  const [continueMode, setContinueMode] = React.useState<boolean>(false);

  const [isVisivleMessageA, setIsVisibleMessageA] =
    React.useState<boolean>(false);
  const [isVisivleMessageB, setIsVisibleMessageB] =
    React.useState<boolean>(false);
  const [isVisivleMessageC, setIsVisibleMessageC] =
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
      console.log("error audio play");
    }
  }

  async function stopSound() {
    try {
      await Audio.setIsEnabledAsync(false);
    } catch (error) {
      // console.log("error audio stop");
    }
  }

  const sequenceAudioAndChat = () => {
    setFlgPlayA(false);
    setFlgPlayB(false);
    setFlgPlayC(false);
    setFlgPlayFinished(false);
    setIsPlayingSequence(true);
    setIsVisibleMessageA(false);
    setIsVisibleMessageB(false);
    setIsVisibleMessageC(false);
    setIsPlayingFinished(false);
    setIsDisabledReplayButton(true);
    const TimeFirstStart = 1200;

    setTimeout(() => {
      setFlgPlayA(true);
    }, TimeFirstStart);
    setTimeout(() => {
      setFlgPlayB(true);
    }, TimeFirstStart + voicesAndTexts.voiceA.playTime);
    setTimeout(() => {
      setFlgPlayC(true);
    }, TimeFirstStart + voicesAndTexts.voiceA.playTime + voicesAndTexts.voiceB.playTime);
    setTimeout(() => {
      setFlgPlayFinished(true);
    }, TimeFirstStart + voicesAndTexts.voiceA.playTime + voicesAndTexts.voiceB.playTime + voicesAndTexts.voiceC.playTime);
  };

  React.useEffect(() => {
    flgPlayA &&
      isPlayingSequence &&
      (playSound(voicesAndTexts.voiceA.voiceSrc), visivleMessageA());
  }, [flgPlayA]);
  React.useEffect(() => {
    flgPlayB &&
      isPlayingSequence &&
      (playSound(voicesAndTexts.voiceB.voiceSrc), visivleMessageB());
  }, [flgPlayB]);
  React.useEffect(() => {
    flgPlayC &&
      isPlayingSequence &&
      (playSound(voicesAndTexts.voiceC.voiceSrc), visivleMessageC());
  }, [flgPlayC]);
  React.useEffect(() => {
    flgPlayFinished && isPlayingSequence && setIsDisabledReplayButton(false);
  }, [flgPlayFinished]);

  const visivleMessageA = () => {
    setIsVisibleMessageA(true);
  };
  const visivleMessageB = () => {
    setIsVisibleMessageB(true);
  };
  const visivleMessageC = () => {
    setIsVisibleMessageC(true);
  };

  const stopSequence = () => {
    stopSound();
    setIsPlayingSequence(false);
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
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][0]
            .length * 300,
      },
      voiceB: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][1],
        voiceSrc: voiceSourceMaker("b"),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][1]
            .length * 300,
      },
      voiceC: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][2],
        voiceSrc: voiceSourceMaker("c"),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][2]
            .length * 300,
      },
      voiceB2: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][3],
        voiceSrc: voiceSourceMaker("b2"),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][3]
            .length * 300,
      },
    });
  }, []);

  // チャプターが変わったら音声とテキストをセットしなおす
  React.useEffect(() => {
    setVoicesAndTexts({
      voiceA: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][0],
        voiceSrc: voiceSourceMaker("a"),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][0]
            .length * 300,
      },
      voiceB: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][1],
        voiceSrc: voiceSourceMaker("b"),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][1]
            .length * 300,
      },
      voiceC: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][2],
        voiceSrc: voiceSourceMaker("c"),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][2]
            .length * 300,
      },
      voiceB2: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][3],
        voiceSrc: voiceSourceMaker("b2"),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][3]
            .length * 300,
      },
    });
  }, [playingTarget]);

  // 音声とテキストがセットされたら音声再生
  React.useEffect(() => {
    sequenceAudioAndChat();
  }, [voicesAndTexts]);

  const playNextPart = () => {
    const maxChapterId = voiceDatas[situation.id].datas.length - 1;
    const maxPartId =
      voiceDatas[situation.id].datas[chapter.id].voiceTexts.length - 1;
    if (part.id < maxPartId) {
      setPlayingTarget({
        situation: { id: situation.id, label: situation.label },
        chapter: { id: chapter.id, label: chapter.label },
        part: { id: part.id + 1, label: part.label },
      });
    } else if (chapter.id < maxChapterId) {
      setPlayingTarget({
        situation: { id: situation.id, label: situation.label },
        chapter: { id: chapter.id + 1, label: chapter.label },
        part: { id: 0, label: part.label },
      });
    } else {
      setPlayingTarget({
        situation: { id: situation.id, label: situation.label },
        chapter: { id: 0, label: chapter.label },
        part: { id: 0, label: part.label },
      });
    }
  };

  return (
    <>
      <Header pageTitle={chapter.label} onPress={stopSequence} />
      <View>
        {isVisivleMessageA && (
          <ChatBubbleButton speaker={1} text={voicesAndTexts.voiceA.text} />
        )}
        {isVisivleMessageB && (
          <ChatBubbleButton speaker={2} text={voicesAndTexts.voiceB.text} />
        )}
        {isVisivleMessageC && (
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
              disabled={chapter.id === 0 && part.id === 0}
              onPress={() => playNextPart()}
            />
            <View style={{ marginBottom: 20 }}>
              <Button
                mode="contained"
                onPress={sequenceAudioAndChat}
                style={{ marginVertical: 10 }}
                disabled={isDisabledReplayButton}
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
              onPress={stopSequence}
            />
          </View>
        </View>
      </Surface>

      {/* 押せないようにカバーする */}
      {/* <Surface
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
        } }      >
        <ActivityIndicator animating={true} color="purple" size={90} />
      </Surface> */}
    </>
  );
};

export default TalkScreen;
