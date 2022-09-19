import { useNavigation } from "@react-navigation/native";
import { VFC } from "react";
import { Appbar } from "react-native-paper";

type Props = {
  pageTitle: string;
  onPress?: () => void;
};

export const Header: VFC<Props> = (props) => {
  const { pageTitle, onPress } = props;
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => (navigation.goBack(), onPress)}
        size={23}
        color="purple"
      />
      <Appbar.Content
        title={pageTitle}
        titleStyle={{ fontSize: 23, fontWeight: "bold" }}
      />
    </Appbar.Header>
  );
};
