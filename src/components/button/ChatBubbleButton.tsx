import { VFC } from "react";
import {} from "react-native";
import { Button, Text } from "react-native-paper";

type Props = {
  speaker: 1 | 2;
  text: string;
};

export const ChatBubbleButton: VFC<Props> = (props) => {
  const { speaker, text } = props;

  return (
    <>
      {speaker === 1 ? (
        <Button
          mode="contained-tonal"
          style={{
            borderBottomRightRadius: 0,
            alignSelf: "flex-end",
            width: 250,
            marginRight: 10,
            marginVertical: 20,
          }}
          contentStyle={{ alignSelf: "flex-start" }}
        >
          {text}
        </Button>
      ) : (
        <Button
          mode="contained-tonal"
          style={{
            borderBottomLeftRadius: 0,
            alignSelf: "flex-start",
            width: 250,
            marginLeft: 10,
            marginVertical: 20,
          }}
          contentStyle={{ alignSelf: "flex-start" }}
        >
          {text}
        </Button>
      )}
    </>
  );
};
