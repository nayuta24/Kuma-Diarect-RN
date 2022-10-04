import { VFC } from "react";
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";

type Props = {
  value: boolean;
  onValueChange: () => void;
  text: string;
};

export const TextToggle: VFC<Props> = (props) => {
  const { value, onValueChange, text } = props;
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 15,
          marginRight: 10,
        }}
      >
        {text}
      </Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};
