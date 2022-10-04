import * as React from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import { Button, IconButton, Surface, Text, Switch } from "react-native-paper";

import { Header } from "../components/Header";
import { playingTargetState } from "../store/playingTargetState";
import { ChatBubbleButton } from "../components/button/ChatBubbleButton";
import { useFormatDoubleDigits } from "../hooks/useFormatDoubleDigits";
import { useVoiceURLMaker } from "../hooks/useVoiceURLMaker";
import { usePlaySound } from "../hooks/usePlaySound";
import { useStopSound } from "../hooks/useStopSound";
import { playingTargetArrayState } from "../store/playingTargetArrayState";
import { useUpdatePlayingTargetArray } from "../hooks/useUpdatePlayingTargetArray";
import { useNextPlayingTarget } from "../hooks/useNextPlayingTarget";
import { usePrevPlayingTarget } from "../hooks/usePrevPlayingTarget";

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
  const [playingTargetArray, setPlayingTargetArray] = useRecoilState(
    playingTargetArrayState
  );
  const { situation, chapter, hasStandardVoice, part } = playingTarget;

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

  const [isLeadyForPlay, setIsLeadyForPlay] = React.useState<boolean>(false);

  const [flgPlayA, setFlgPlayA] = React.useState<boolean>(false);
  const [flgPlayB, setFlgPlayB] = React.useState<boolean>(false);
  const [flgPlayC, setFlgPlayC] = React.useState<boolean>(false);
  const [flgPlayB2, setFlgPlayB2] = React.useState<boolean>(false);
  const [flgPlayFinished, setFlgPlayFinished] = React.useState<boolean>(false);

  const [isPlayingSequence, setIsPlayingSequence] =
    React.useState<boolean>(true);
  const [isPlayingFinished, setIsPlayingFinished] =
    React.useState<boolean>(false);
  const [isDisabledReplayButton, setIsDisabledReplayButton] =
    React.useState<boolean>(true);
  const [continueMode, setContinueMode] = React.useState<boolean>(false);

  // 音声とテキストを順番に再生するためのフラグを順番にtrueにしていく
  const sequenceAudioAndChat = () => {
    setIsLeadyForPlay(false);
    setFlgPlayA(false);
    setFlgPlayB(false);
    setFlgPlayC(false);
    setFlgPlayB2(false);

    setFlgPlayFinished(false);

    setIsPlayingSequence(true);
    setIsPlayingFinished(false);
    setIsDisabledReplayButton(true);
    const TimeFirstStart = 1200;

    if (hasStandardVoice) {
      setTimeout(() => {
        setFlgPlayA(true);
      }, TimeFirstStart);
      setTimeout(() => {
        setFlgPlayB(true);
      }, TimeFirstStart + voicesAndTexts.voiceA.playTime);
      setTimeout(() => {
        setFlgPlayB2(true);
      }, TimeFirstStart + voicesAndTexts.voiceA.playTime + voicesAndTexts.voiceB.playTime);
      setTimeout(() => {
        setFlgPlayC(true);
      }, TimeFirstStart + voicesAndTexts.voiceA.playTime + voicesAndTexts.voiceB.playTime + voicesAndTexts.voiceB2.playTime);
      setTimeout(() => {
        setFlgPlayFinished(true);
      }, TimeFirstStart + voicesAndTexts.voiceA.playTime + voicesAndTexts.voiceB.playTime + voicesAndTexts.voiceB2.playTime + voicesAndTexts.voiceC.playTime);
    } else {
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
    }
  };

  // それぞれのフラグがtrueになった時点でそれぞれの音声を再生
  React.useEffect(() => {
    flgPlayA &&
      isPlayingSequence &&
      usePlaySound(voicesAndTexts.voiceA.voiceSrc);
  }, [flgPlayA]);
  React.useEffect(() => {
    flgPlayB &&
      isPlayingSequence &&
      usePlaySound(voicesAndTexts.voiceB.voiceSrc);
  }, [flgPlayB]);
  React.useEffect(() => {
    flgPlayB2 &&
      isPlayingSequence &&
      usePlaySound(voicesAndTexts.voiceB2.voiceSrc);
  }, [flgPlayB2]);
  React.useEffect(() => {
    flgPlayC &&
      isPlayingSequence &&
      usePlaySound(voicesAndTexts.voiceC.voiceSrc);
  }, [flgPlayC]);
  // 再生終了後の処理発動用
  React.useEffect(() => {
    flgPlayFinished && isPlayingSequence && setIsDisabledReplayButton(false);
  }, [flgPlayFinished]);

  // 再生ストップ
  const stopSequence = () => {
    useStopSound();
    setIsPlayingSequence(false);
  };

  // 再生対象が変更されたら、再生対象配列を更新
  React.useEffect(() => {
    setPlayingTargetArray(
      useUpdatePlayingTargetArray(
        situation.id,
        chapter.id,
        hasStandardVoice,
        part.id
      )
    );
  }, [playingTarget]);

  // 再生対象配列が更新されたら、音声URL・テキスト・再生時間をセット
  React.useEffect(() => {
    setVoicesAndTexts({
      voiceA: {
        text: playingTargetArray[0],
        voiceSrc: useVoiceURLMaker(
          "a",
          situation.id,
          chapter.id,
          part.id,
          hasStandardVoice
        ),
        playTime: playingTargetArray[0].length * 400,
      },
      voiceB: {
        text: playingTargetArray[1],
        voiceSrc: useVoiceURLMaker(
          "b",
          situation.id,
          chapter.id,
          part.id,
          hasStandardVoice
        ),
        playTime: playingTargetArray[1].length * 400,
      },
      voiceC: {
        text: playingTargetArray[2],
        voiceSrc: useVoiceURLMaker(
          "c",
          situation.id,
          chapter.id,
          part.id,
          hasStandardVoice
        ),
        playTime: playingTargetArray[2].length * 400,
      },
      voiceB2: {
        text: playingTargetArray[3],
        voiceSrc: useVoiceURLMaker(
          "b2",
          situation.id,
          chapter.id,
          part.id,
          hasStandardVoice
        ),
        playTime: playingTargetArray[3].length * 400,
      },
    });
    setIsLeadyForPlay(true);
  }, [playingTargetArray]);

  // 音声URL etcがセットされ、再生準備が完了したら音声を再生する
  React.useEffect(() => {
    if (isLeadyForPlay) {
      sequenceAudioAndChat();
      console.log("わ");
    }
  }, [voicesAndTexts]);

  // 次の音声再生
  const playNext = () => {
    setPlayingTarget(useNextPlayingTarget(playingTarget));
  };
  const playPrev = () => {
    setPlayingTarget(usePrevPlayingTarget(playingTarget));
  };

  return (
    <>
      <Header pageTitle={chapter.label} onPress={stopSequence} />
      <View>
        {flgPlayA && (
          <ChatBubbleButton speaker={1} text={voicesAndTexts.voiceA.text} />
        )}
        {flgPlayB && (
          <ChatBubbleButton speaker={2} text={voicesAndTexts.voiceB.text} />
        )}
        {flgPlayB2 && (
          <ChatBubbleButton speaker={3} text={voicesAndTexts.voiceB2.text} />
        )}
        {flgPlayC && (
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
              onPress={playPrev}
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
              onPress={playNext}
            />
          </View>
        </View>
      </Surface>
      {!flgPlayFinished && (
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
            backgroundColor: "lightgray",
            opacity: 0.2,
          }}
        >
          <></>
        </Surface>
      )}
    </>
  );
};

export default TalkScreen;
