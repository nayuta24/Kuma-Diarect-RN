import { VFC } from "react";
import { IconButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  icon: string;
  onPress: () => void;
};

export const CircleIconButton: VFC<Props> = (props) => {
  const { icon, onPress } = props;
  return (
    <IconButton
      mode="contained"
      icon={icon}
      style={{
        width: hp("8%"),
        height: hp("8%"),
        borderRadius: hp("100%"),
      }}
      onPress={onPress}
    ></IconButton>
  );
};
