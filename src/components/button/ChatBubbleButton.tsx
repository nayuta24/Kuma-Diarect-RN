import { VFC } from "react";
import {} from "react-native";
import { Card, Paragraph } from "react-native-paper";

type Props = {
  speaker: 1 | 2 | 3;
  text: string;
};

export const ChatBubbleButton: VFC<Props> = (props) => {
  const { speaker, text } = props;

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
        >
          <Card.Content>
            <Paragraph> {text}</Paragraph>
          </Card.Content>
        </Card>
      )}
    </>
  );
};
