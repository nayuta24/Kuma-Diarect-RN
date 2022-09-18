import { VFC } from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";
import { situationState } from "../../store/situationState";

type Props = {
  title: string;
  paragraph: string;
  image: string;
  id: number;
};

export const SituationCard: VFC<Props> = (props) => {
  const { title, paragraph, image, id } = props;
  const navigation = useNavigation();
  const setSituation = useSetRecoilState(situationState);

  const onCardButtonPress = () => {
    navigation.navigate("チャプター選択");
    setSituation({
      label: title,
      id: id,
    });
  };

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
        <Button mode="outlined" onPress={() => onCardButtonPress()}>
          はじめる
        </Button>
      </Card.Actions>
    </Card>
  );
};
