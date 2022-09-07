import { VFC } from "react";
import { Text } from "react-native-paper";

type Props = {
  text: string;
};

export const TextLarge: VFC<Props> = (props) => {
  const { text } = props;
  return (
    <Text variant="headlineLarge" style={{ margin: 30 }}>
      {text}
    </Text>
  );
};
