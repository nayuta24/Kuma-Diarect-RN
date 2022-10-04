import { VFC } from "react";
import { IconButton } from "react-native-paper";

type Props = {
  onPress: () => void;
  disabled: boolean;
};

export const PrevButton: VFC<Props> = (props) => {
  const { onPress, disabled } = props;
  return (
    <IconButton
      icon={"menu-left"}
      iconColor={"purple"}
      size={60}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

export const NextButton: VFC<Props> = (props) => {
  const { onPress, disabled } = props;
  return (
    <IconButton
      icon={"menu-right"}
      iconColor={"purple"}
      size={60}
      onPress={onPress}
      disabled={disabled}
    />
  );
};
