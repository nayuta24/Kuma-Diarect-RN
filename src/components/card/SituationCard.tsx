import { VFC } from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
  paragraph: string;
  image: string;
};

export const SituationCard: VFC<Props> = (props) => {
  const { title, paragraph, image } = props;
  const navigation = useNavigation();

  return (
    <Card
      style={{
        marginVertical: 8,
        marginHorizontal: 15,
      }}
    >
      <Card.Content>
        <Title style={{ fontWeight: "bold" }}>{title}</Title>
        <Paragraph>{paragraph}</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: image }} />
      <Card.Actions>
        <Button mode="outlined" onPress={() => navigation.navigate(title)}>
          はじめる
        </Button>
      </Card.Actions>
    </Card>
  );
};
