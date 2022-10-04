import { VFC } from "react";
import {} from "react-native";
import { Button, Card, Paragraph, Text } from "react-native-paper";

type Props = {
  speaker: 1 | 2 | 3;
  text: string;
  onPress?: () => void;
};

export const ChatBubbleButton: VFC<Props> = (props) => {
  const { speaker, text, onPress } = props;

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
          onPress={() => onPress}
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
          onPress={() => onPress}
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
          onPress={() => onPress}
        >
          <Card.Content>
            <Paragraph> {text}</Paragraph>
          </Card.Content>
        </Card>
      )}
    </>
  );
};
