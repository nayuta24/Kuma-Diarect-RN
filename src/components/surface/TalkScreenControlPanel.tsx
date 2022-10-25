import React, { VFC } from "react";
import { View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { useFormatDoubleDigits } from "../../hooks/useFormatDoubleDigits";
import { NextButton, PrevButton } from "../button/PrevAndNextButton";
import { TextToggle } from "../button/TextToggle";

type Props = {
  partId: number;
  flgPlayFinished: boolean;
  isContinueModeOn: boolean;
  playPrev: () => void;
  playNext: () => void;
  countdown: number;
  onContinueModeSwitch: () => void;
  sequenceAudioAndChat: () => void;
};

export const TalkScreenControlPanel: VFC<Props> = (props) => {
  const {
    partId,
    flgPlayFinished,
    isContinueModeOn,
    playPrev,
    playNext,
    onContinueModeSwitch,
    countdown,
    sequenceAudioAndChat,
  } = props;

  return (
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
      <Text
        style={{
          textAlign: "center",
          fontSize: 33,
          fontWeight: "bold",
          color: "purple",
          marginVertical: 20,
        }}
      >
        {"パート" + useFormatDoubleDigits(partId)}
      </Text>
      <View
        style={{
          width: "100%",
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
          }}
        />
        <View style={{ width: "45%" }}>
          {isContinueModeOn ? (
            flgPlayFinished ? (
              <Text
                style={{
                  marginVertical: "10%",
                  textAlign: "center",
                  fontSize: 30,
                  color: "black",
                }}
              >
                {countdown}
              </Text>
            ) : (
              <Text
                style={{
                  marginVertical: "10%",
                  textAlign: "center",
                  fontSize: 30,
                  color: "lightgray",
                }}
              >
                {countdown}
              </Text>
            )
          ) : (
            <Button
              mode="contained"
              onPress={sequenceAudioAndChat}
              style={{ marginVertical: 10 }}
              disabled={!flgPlayFinished}
            >
              もう一度再生
            </Button>
          )}
        </View>
        <NextButton
          disabled={!flgPlayFinished || isContinueModeOn}
          onPress={() => {
            playNext();
          }}
        />
      </View>
      <TextToggle
        value={isContinueModeOn}
        onValueChange={onContinueModeSwitch}
        text="自動再生モード"
      />
    </Surface>
  );
};
