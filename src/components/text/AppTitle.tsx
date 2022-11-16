import { VFC } from "react";
import { Text } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  subTitle: string;
  title: string;
};

export const AppTitle: VFC<Props> = (props) => {
  const { subTitle, title } = props;
  return (
    <>
      <Text
        style={{
          fontSize: hp("3%"),
          fontWeight: "bold",
        }}
      >
        {subTitle}
      </Text>
      <Text
        style={{
          fontSize: hp("5%"),
          fontWeight: "bold",
          marginBottom: hp("5%"),
        }}
      >
        {title}
      </Text>
    </>
  );
};
