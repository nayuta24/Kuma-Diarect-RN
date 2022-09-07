import { VFC } from "react";
import { Button } from "react-native-paper";

type Props = {
  text: string;
  onPress: () => void;
};

export const CommonButton: VFC<Props> = (props) => {
  const { text, onPress } = props;
  return (
    <Button
      mode="contained"
      style={{ margin: 10, paddingHorizontal: 75, paddingVertical: 10 }}
      labelStyle={{ fontWeight: "bold", fontSize: 18 }}
      onPress={onPress}
    >
      {text}
    </Button>
  );
};
