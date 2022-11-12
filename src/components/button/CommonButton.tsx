import { VFC } from "react";
import { Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  text: string;
  onPress: () => void;
};

export const CommonButton: VFC<Props> = (props) => {
  const { text, onPress } = props;
  return (
    <Button
      mode="contained"
      style={{
        margin: wp("2%"),
        paddingHorizontal: wp("15%"),
        paddingVertical: hp("1.2%"),
      }}
      labelStyle={{ fontWeight: "bold", fontSize: hp("2.5%") }}
      onPress={onPress}
    >
      {text}
    </Button>
  );
};
