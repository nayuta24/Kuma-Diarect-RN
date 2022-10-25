import { AVPlaybackSource } from "expo-av";
import { VFC } from "react";
import { Card, Paragraph } from "react-native-paper";
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
            borderRadius: 20,
            borderBottomRightRadius: 0,
            alignSelf: "flex-end",
            width: 250,
            marginRight: 10,
            marginTop: 20,
          }}
          onPress={() => flgPlayFinished && useLocalPlaySound(voiceSrc)}
        >
          <Card.Content>
            <Paragraph>{text}</Paragraph>
          </Card.Content>
        </Card>
      ) : speaker === 2 ? (
        <Card
          style={{
            borderRadius: 20,
            borderBottomLeftRadius: 0,
            alignSelf: "flex-start",
            width: 250,
            marginLeft: 10,
            marginTop: 40,
          }}
          onPress={() => flgPlayFinished && useLocalPlaySound(voiceSrc)}
        >
          <Card.Content>
            <Paragraph> {text}</Paragraph>
          </Card.Content>
        </Card>
      ) : (
        <Card
          style={{
            borderRadius: 20,
            alignSelf: "flex-start",
            width: 250,
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 20,
            backgroundColor: "lavender",
          }}
          onPress={() => flgPlayFinished && useLocalPlaySound(voiceSrc)}
        >
          <Card.Content>
            <Paragraph> {text}</Paragraph>
          </Card.Content>
        </Card>
      )}
    </>
  );
};
