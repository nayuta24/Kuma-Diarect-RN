import { VFC } from "react";
import { IconButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
      size={wp("18%")}
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
      size={wp("18%")}
      onPress={onPress}
      disabled={disabled}
    />
  );
};
