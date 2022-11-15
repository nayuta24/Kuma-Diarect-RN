import * as React from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { Header } from "../components/Header";
import { playingTargetState } from "../store/playingTargetState";
import { ChatBubbleButton } from "../components/button/ChatBubbleButton";
import { useLocalPlaySound } from "../hooks/usePlaySound";
import { useStopSound } from "../hooks/useStopSound";
import { playingTargetArrayState } from "../store/playingTargetArrayState";
import { useUpdatePlayingTargetArray } from "../hooks/useUpdatePlayingTargetArray";
import { useNextPlayingTarget } from "../hooks/useNextPlayingTarget";
import { usePrevPlayingTarget } from "../hooks/usePrevPlayingTarget";
import { AVPlaybackSource } from "expo-av";
import { useVoicePathMaker } from "../hooks/useVoicePathMaker";
import { TalkScreenControlPanel } from "../components/surface/TalkScreenControlPanel";
import { storage } from "../components/storage";
import moment from "moment";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isCountState } from "../store/isCountState";

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
      setCountDown(3);
    }
  }, [voicesAndTexts]);

  // 次の音声再生
  const playNext = () => {
    setPlayingTarget(useNextPlayingTarget(playingTarget));
    setFlgPlayNext(false);
  };
  const playPrev = () => {
    setPlayingTarget(usePrevPlayingTarget(playingTarget));
    setFlgPlayNext(false);
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

  const [isCount, setIsCount] = useRecoilState(isCountState);

  var date = moment(new Date()).format("YYYY-MM-DD");
  var newData: { [key: string]: number } = {};
  // 10秒に一回、日付を確認
  setInterval(() => {
    date = moment(new Date()).format("YYYY-MM-DD");
  }, 10000);

  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      storage
        .load({
          key: "playTime",
        })
        .then((data: { [key: string]: number }) => {
          newData = data;
          newData[date] ? (newData[date] += 1) : (newData[date] = 1);
          console.log(newData);
          setCount(newData[date]);

          storage.save({
            key: "playTime",
            data: newData,
          });
        })
        .catch((err) => {});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // const storageRemove = () => {
  //   storage.remove({
  //     key: "playTime",
  //   });
  // };

  // const storageLoadTest = () => {
  //   storage
  //     .load({
  //       key: "playTime",
  //     })
  //     .then((data: { [key: string]: number }) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {});
  // };

  // const storageSave = () => {
  //   storage.save({
  //     key: "playTime",
  //     data: newData,
  //   });
  // };

  return (
    <>
      <Header pageTitle={chapter.label} onPress={stopSequence} />
      <View style={{ height: hp("100%") }}>
        <Text>{count}</Text>
        {flgPlayA && (
          <ChatBubbleButton
            speaker={1}
            text={voicesAndTexts.voiceA.text}
            voiceSrc={voicesAndTexts.voiceA.voiceSrc}
            flgPlayFinished={flgPlayFinished}
          />
        )}
        {flgPlayB && (
          <ChatBubbleButton
            speaker={2}
            text={voicesAndTexts.voiceB.text}
            voiceSrc={voicesAndTexts.voiceB.voiceSrc}
            flgPlayFinished={flgPlayFinished}
          />
        )}
        {flgPlayB && (
          <ChatBubbleButton
            speaker={3}
            text={voicesAndTexts.voiceB2.text}
            voiceSrc={voicesAndTexts.voiceB2.voiceSrc}
            flgPlayFinished={flgPlayFinished}
          />
        )}
        {flgPlayC && (
          <ChatBubbleButton
            speaker={1}
            text={voicesAndTexts.voiceC.text}
            voiceSrc={voicesAndTexts.voiceC.voiceSrc}
            flgPlayFinished={flgPlayFinished}
          />
        )}
        {/* <Button onPress={storageSave}>あ</Button>
        <Button onPress={storageLoadTest}>あ</Button> */}
      </View>
      <TalkScreenControlPanel
        partId={part.id}
        flgPlayFinished={flgPlayFinished}
        isContinueModeOn={isContinueModeOn}
        playNext={playNext}
        playPrev={playPrev}
        onContinueModeSwitch={onContinueModeSwitch}
        countdown={countDown}
        sequenceAudioAndChat={sequenceAudioAndChat}
      />
    </>
  );
};

export default TalkScreen;
