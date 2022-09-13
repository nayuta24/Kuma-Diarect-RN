import { VFC } from "react";
import { Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { chapterState } from "../../store/chapterState";
import { useSetRecoilState } from "recoil";

type Props = {
  num: number;
  title: string;
};

export const ChapterCard: VFC<Props> = (props) => {
  const { title, num } = props;
  const navigation = useNavigation();
  const setChapterLabel = useSetRecoilState(chapterState);

  const onCardButton = () => {
    navigation.navigate("トーク画面");
    setChapterLabel(title);
  };

  return (
    <>
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
    </>
  );
};
