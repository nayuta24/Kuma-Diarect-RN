import { VFC } from "react";
import { Avatar, Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

type Props = {
  num: number;
  title: string;
};

export const ChapterCard: VFC<Props> = (props) => {
  const { title, num } = props;
  const navigation = useNavigation();

  return (
    <>
      <Card
        onPress={() => navigation.navigate()}
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
