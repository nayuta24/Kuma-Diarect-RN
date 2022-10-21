import { AVPlaybackSource } from "expo-av";
import { VFC } from "react";
import { Card, Paragraph } from "react-native-paper";
import { useLocalPlaySound } from "../../hooks/usePlaySound";

type Props = {
  speaker: 1 | 2 | 3;
  text: string;
  voiceSrc: AVPlaybackSource;
};

export const ChatBubbleButton: VFC<Props> = (props) => {
  const { speaker, text, voiceSrc } = props;

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
            marginVertical: 20,
          }}
          onPress={() => useLocalPlaySound(voiceSrc)}
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
            marginVertical: 20,
          }}
          onPress={() => useLocalPlaySound(voiceSrc)}
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
            marginBottom: 20,
            backgroundColor: "lavender",
          }}
          onPress={() => useLocalPlaySound(voiceSrc)}
        >
          <Card.Content>
            <Paragraph> {text}</Paragraph>
          </Card.Content>
        </Card>
      )}
    </>
  );
};
