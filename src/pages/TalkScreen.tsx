import * as React from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import { Button, IconButton, Surface, Text, Switch } from "react-native-paper";

import { Header } from "../components/Header";
import { playingTargetState } from "../store/playingTargetState";
import { ChatBubbleButton } from "../components/button/ChatBubbleButton";
import { useFormatDoubleDigits } from "../hooks/useFormatDoubleDigits";
import { useVoiceURLMaker } from "../hooks/useVoiceURLMaker";
import { useLocalPlaySound, useUriPlaySound } from "../hooks/usePlaySound";
import { useStopSound } from "../hooks/useStopSound";
import { playingTargetArrayState } from "../store/playingTargetArrayState";
import { useUpdatePlayingTargetArray } from "../hooks/useUpdatePlayingTargetArray";
import { useNextPlayingTarget } from "../hooks/useNextPlayingTarget";
import { usePrevPlayingTarget } from "../hooks/usePrevPlayingTarget";
import { TextToggle } from "../components/button/TextToggle";
import { NextButton, PrevButton } from "../components/button/PrevAndNextButton";
import { AVPlaybackSource } from "expo-av";
import { useVoicePathMaker } from "../hooks/useVoicePathMaker";

type voicesAndTextsType = {
  voiceA: {
    text: string;
    voiceSrc: AVPlaybackSource;
    playTime: number;
  };
  voiceB: {
    text: string;
    voiceSrc: AVPlaybackSource;
    playTime: number;
  };
  voiceC: {
    text: string;
    voiceSrc: AVPlaybackSource;
    playTime: number;
  };
  voiceB2: {
    text: string;
    voiceSrc: AVPlaybackSource;
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
        voiceSrc: require("../assets/sounds/nurse/01_01a.m4a"),
        playTime: 3000,
      },
      voiceB: {
        text: "",
        voiceSrc: require("../assets/sounds/nurse/01_01b.m4a"),
        playTime: 3000,
      },
      voiceC: {
        text: "",
        voiceSrc: require("../assets/sounds/nurse/01_01c.m4a"),
        playTime: 3000,
      },
      voiceB2: {
        text: "",
        voiceSrc: require("../assets/sounds/nurse/14_11b2.m4a"),
        playTime: 3000,
      },
    });

  const [isReadyForPlay, setIsReadyForPlay] = React.useState<boolean>(false);

  const [flgPlayA, setFlgPlayA] = React.useState<boolean>(false);
  const [flgPlayB, setFlgPlayB] = React.useState<boolean>(false);
  const [flgPlayC, setFlgPlayC] = React.useState<boolean>(false);
  const [flgPlayB2, setFlgPlayB2] = React.useState<boolean>(false);
  const [flgPlayFinished, setFlgPlayFinished] = React.useState<boolean>(false);

  const [isPlayingSequence, setIsPlayingSequence] =
    React.useState<boolean>(false);
  const [isContinueModeOn, setIsContinueModeOn] = React.useState<boolean>(true);
  const [countDown, setCountDown] = React.useState<number>(3);
  const [flgPlayNext, setFlgPlayNext] = React.useState<boolean>(false);

  // 音声とテキストを順番に再生するためのフラグを順番にtrueにしていく
  const sequenceAudioAndChat = () => {
    setIsReadyForPlay(false);
    setFlgPlayA(false);
    setFlgPlayB(false);
    setFlgPlayC(false);
    setFlgPlayB2(false);

    setFlgPlayFinished(false);
    setIsPlayingSequence(true);
    setFlgPlayNext(false);

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
      useLocalPlaySound(voicesAndTexts.voiceA.voiceSrc);
  }, [flgPlayA]);
  React.useEffect(() => {
    flgPlayB &&
      isPlayingSequence &&
      useLocalPlaySound(voicesAndTexts.voiceB.voiceSrc);
  }, [flgPlayB]);
  React.useEffect(() => {
    flgPlayB2 &&
      isPlayingSequence &&
      useLocalPlaySound(voicesAndTexts.voiceB2.voiceSrc);
  }, [flgPlayB2]);
  React.useEffect(() => {
    flgPlayC &&
      isPlayingSequence &&
      useLocalPlaySound(voicesAndTexts.voiceC.voiceSrc);
  }, [flgPlayC]);
  // 再生終了後の処理発動用
  React.useEffect(() => {
    // 連続再生モードの場合は、次の音声をカウントダウン後に再生
    if (flgPlayFinished && isContinueModeOn) {
      setCountDown(3);
      setTimeout(() => {
        setCountDown(2);
      }, 1000);
      setTimeout(() => {
        setCountDown(1);
      }, 2000);
      setTimeout(() => {
        setFlgPlayNext(true);
      }, 3000);
    }
  }, [flgPlayFinished, isContinueModeOn]);

  React.useEffect(() => {
    if (isContinueModeOn && flgPlayNext) {
      playNext();
    }
  }, [flgPlayNext]);

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
        voiceSrc: useVoicePathMaker(
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
        voiceSrc: useVoicePathMaker(
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
        voiceSrc: useVoicePathMaker(
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
        voiceSrc: useVoicePathMaker(
          "b2",
          situation.id,
          chapter.id,
          part.id,
          hasStandardVoice
        ),
        playTime: playingTargetArray[3].length * 400,
      },
    });
    setIsReadyForPlay(true);
  }, [playingTargetArray]);

  // 音声URLetcがセットされ、再生準備が完了したら音声を再生する
  React.useEffect(() => {
    if (isReadyForPlay) {
      sequenceAudioAndChat();
    }
  }, [voicesAndTexts]);

  // 次の音声再生
  const playNext = () => {
    setPlayingTarget(useNextPlayingTarget(playingTarget));
  };
  const playPrev = () => {
    setPlayingTarget(usePrevPlayingTarget(playingTarget));
  };

  // 連続再生モードの切り替え
  const onContinueModeSwitch = () => {
    setIsContinueModeOn(!isContinueModeOn);
    // 再生終了状態の場合、次の音声を再生
    if (flgPlayFinished && !isContinueModeOn) {
      playNext();
      setFlgPlayFinished(false);
    }
  };

  return (
    <>
      <Header pageTitle={chapter.label} onPress={stopSequence} />
      <View style={{ height: "100%" }}>
        {flgPlayA && (
          <ChatBubbleButton
            speaker={1}
            text={voicesAndTexts.voiceA.text}
            voiceSrc={voicesAndTexts.voiceA.voiceSrc}
          />
        )}
        {flgPlayB && (
          <ChatBubbleButton
            speaker={2}
            text={voicesAndTexts.voiceB.text}
            voiceSrc={voicesAndTexts.voiceB.voiceSrc}
          />
        )}
        {flgPlayB2 && (
          <ChatBubbleButton
            speaker={3}
            text={voicesAndTexts.voiceB2.text}
            voiceSrc={voicesAndTexts.voiceB2.voiceSrc}
          />
        )}
        {flgPlayC && (
          <ChatBubbleButton
            speaker={1}
            text={voicesAndTexts.voiceC.text}
            voiceSrc={voicesAndTexts.voiceC.voiceSrc}
          />
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
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PrevButton
            disabled={!flgPlayFinished || isContinueModeOn}
            onPress={() => {
              playPrev();
              setFlgPlayNext(false);
            }}
          />
          <NextButton
            disabled={!flgPlayFinished || isContinueModeOn}
            onPress={() => {
              playNext();
              setFlgPlayNext(false);
            }}
          />
        </View>
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
          {!isContinueModeOn && (
            <Button
              mode="contained"
              onPress={sequenceAudioAndChat}
              style={{ marginVertical: 10 }}
              disabled={!flgPlayFinished}
            >
              もう一度再生
            </Button>
          )}
          <TextToggle
            value={isContinueModeOn}
            onValueChange={onContinueModeSwitch}
            text="自動再生モード"
          />
        </View>
        {isContinueModeOn && flgPlayFinished && (
          <Text
            style={{
              marginVertical: "10%",
              textAlign: "center",
              fontSize: 30,
            }}
          >
            {countDown}
          </Text>
        )}
      </Surface>
    </>
  );
};

export default TalkScreen;
