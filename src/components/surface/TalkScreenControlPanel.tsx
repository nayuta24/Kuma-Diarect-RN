import React, { VFC } from "react";
import { View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
        height: hp("30%"),
        borderTopRightRadius: hp("2%"),
        borderTopLeftRadius: hp("2%"),
        alignItems: "center",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: hp("4%"),
          fontWeight: "bold",
          color: "purple",
          marginTop: hp("4%"),
        }}
      >
        {"パート" + useFormatDoubleDigits(partId)}
      </Text>
      <View
        style={{
          width: wp("100%"),
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
        <View style={{ width: wp("45%") }}>
          {isContinueModeOn ? (
            flgPlayFinished ? (
              <Text
                style={{
                  marginVertical: "10%",
                  textAlign: "center",
                  fontSize: hp("3%"),
                  color: "black",
                }}
              >
                {countdown}
              </Text>
            ) : (
              <Text
                style={{
                  marginVertical: hp("2%"),
                  textAlign: "center",
                  fontSize: hp("4%"),
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
              style={{ marginVertical: hp("1%") }}
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
