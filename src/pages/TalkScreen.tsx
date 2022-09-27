import * as React from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import { Button, IconButton, Surface, Text, Switch } from "react-native-paper";

import { Header } from "../components/Header";
import { playingTargetState } from "../store/playingTargetState";
import { ChatBubbleButton } from "../components/button/ChatBubbleButton";
import { voiceDatas } from "../_constants/voiceDatas";
import { useFormatDoubleDigits } from "../hooks/useFormatDoubleDigits";
import { useVoiceURLMaker } from "../hooks/useVoiceURLMaker";
import { usePlaySound } from "../hooks/usePlaySound";
import { useStopSound } from "../hooks/useStopSound";

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

  // 音声とテキストを順番に再生するためのフラグを順番にtrueにしていく
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

  // それぞれのフラグがtrueになった時点でそれぞれの音声を再生
  React.useEffect(() => {
    flgPlayA &&
      isPlayingSequence &&
      (usePlaySound(voicesAndTexts.voiceA.voiceSrc), visivleMessageA());
  }, [flgPlayA]);
  React.useEffect(() => {
    flgPlayB &&
      isPlayingSequence &&
      (usePlaySound(voicesAndTexts.voiceB.voiceSrc), visivleMessageB());
  }, [flgPlayB]);
  React.useEffect(() => {
    flgPlayC &&
      isPlayingSequence &&
      (usePlaySound(voicesAndTexts.voiceC.voiceSrc), visivleMessageC());
  }, [flgPlayC]);
  // 再生終了後の処理発動用
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

  // 再生ストップ
  const stopSequence = () => {
    useStopSound();
    setIsPlayingSequence(false);
  };

  // 画面表示後、音声とテキストをセット
  React.useEffect(() => {
    setVoicesAndTexts({
      voiceA: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][0],
        voiceSrc: useVoiceURLMaker("a", situation.id, chapter.id, part.id),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][0]
            .length * 300,
      },
      voiceB: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][1],
        voiceSrc: useVoiceURLMaker("b", situation.id, chapter.id, part.id),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][1]
            .length * 300,
      },
      voiceC: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][2],
        voiceSrc: useVoiceURLMaker("c", situation.id, chapter.id, part.id),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][2]
            .length * 300,
      },
      voiceB2: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][3],
        voiceSrc: useVoiceURLMaker("b2", situation.id, chapter.id, part.id),
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
        voiceSrc: useVoiceURLMaker("a", situation.id, chapter.id, part.id),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][0]
            .length * 300,
      },
      voiceB: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][1],
        voiceSrc: useVoiceURLMaker("b", situation.id, chapter.id, part.id),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][1]
            .length * 300,
      },
      voiceC: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][2],
        voiceSrc: useVoiceURLMaker("c", situation.id, chapter.id, part.id),
        playTime:
          voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][2]
            .length * 300,
      },
      voiceB2: {
        text: voiceDatas[situation.id].datas[chapter.id].voiceTexts[part.id][3],
        voiceSrc: useVoiceURLMaker("b2", situation.id, chapter.id, part.id),
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
            {"チャプター" + useFormatDoubleDigits(part.id)}
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
    </>
  );
};

export default TalkScreen;
