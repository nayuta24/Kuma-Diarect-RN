import { VFC } from "react";
import { Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { chapterState } from "../../store/chapterState";
import { useSetRecoilState } from "recoil";
import { partState } from "../../store/partState";

type Props = {
  num: number;
  title: string;
  id: number;
};

export const ChapterCard: VFC<Props> = (props) => {
  const { title, num, id } = props;
  const navigation = useNavigation();
  const setChapter = useSetRecoilState(chapterState);
  const setPart = useSetRecoilState(partState);

  const onCardButton = () => {
    navigation.navigate("トーク画面");
    setChapter({
      label: title,
      id: id,
    });
    setPart({
      label: "part01",
      id: 0,
    });
  };

  return (
    <Card
      onPress={() => onCardButton()}
      style={{
        marginVertical: 5,
        marginHorizontal: 15,
      }}
    >
      <Card.Content style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 15,
          }}
        >
          {("0" + num).slice(-2)}
        </Text>
        <Title
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "purple",
            paddingLeft: 20,
          }}
        >
          {title}
        </Title>
      </Card.Content>
    </Card>
  );
};
