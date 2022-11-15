import { AVPlaybackSource } from "expo-av";
import { useMemo, VFC } from "react";
import { Card, Paragraph } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useLocalPlaySound } from "../../hooks/usePlaySound";

type Props = {
  speaker: 1 | 2 | 3;
  text: string;
  voiceSrc: AVPlaybackSource;
  flgPlayFinished: boolean;
};

export const ChatBubbleButton: VFC<Props> = (props) => {
  const { speaker, text, voiceSrc, flgPlayFinished } = props;

  return (
    <>
      {speaker === 1 ? (
        <Card
          style={{
            borderRadius: hp("2%"),
            borderBottomRightRadius: 0,
            alignSelf: "flex-end",
            width: wp("70%"),
            marginRight: wp("4%"),
            marginTop: hp("4%"),
          }}
          onPress={() => flgPlayFinished && useLocalPlaySound(voiceSrc)}
        >
          <Card.Content>
            <Paragraph style={{ fontSize: hp("1.8%") }}>{text}</Paragraph>
          </Card.Content>
        </Card>
      ) : speaker === 2 ? (
        <Card
          style={{
            borderRadius: hp("2%"),
            borderBottomLeftRadius: 0,
            alignSelf: "flex-start",
            width: wp("70%"),
            marginLeft: wp("4%"),
            marginTop: hp("4%"),
          }}
          onPress={() => flgPlayFinished && useLocalPlaySound(voiceSrc)}
        >
          <Card.Content>
            <Paragraph style={{ fontSize: hp("1.8%") }}>{text}</Paragraph>
          </Card.Content>
        </Card>
      ) : (
        <Card
          style={{
            borderRadius: hp("2%"),
            alignSelf: "flex-start",
            width: wp("70%"),
            marginLeft: wp("4%"),
            marginTop: hp("1%"),
            marginBottom: hp("2%"),
            backgroundColor: "lavender",
          }}
          onPress={() => flgPlayFinished && useLocalPlaySound(voiceSrc)}
        >
          <Card.Content>
            <Paragraph style={{ fontSize: hp("1.8%") }}>{text}</Paragraph>
          </Card.Content>
        </Card>
      )}
    </>
  );
};
