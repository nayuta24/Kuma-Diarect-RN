import { VFC } from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { playingTargetState } from "../../store/playingTargetState";

type Props = {
  title: string;
  paragraph: string;
  image: string;
  id: number;
};

export const SituationCard: VFC<Props> = (props) => {
  const { title, paragraph, image, id } = props;
  const navigation = useNavigation();
  const [playingTarget, setPlayingTarget] = useRecoilState(playingTargetState);

  const onCardButtonPress = () => {
    navigation.navigate("チャプター選択");
    setPlayingTarget({
      situation: {
        label: title,
        id: id,
      },
      chapter: {
        label: playingTarget.chapter.label,
        id: playingTarget.chapter.id,
      },
      part: {
        label: playingTarget.part.label,
        id: playingTarget.part.id,
      },
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
