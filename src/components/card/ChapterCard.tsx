import { VFC } from "react";
import { Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { playingTargetState } from "../../store/playingTargetState";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useFormatDoubleDigits } from "../../hooks/useFormatDoubleDigits";
import { playingTargetArrayState } from "../../store/playingTargetArrayState";
import { voiceDatas } from "../../_constants/voiceDatas";
import { useUpdatePlayingTargetArray } from "../../hooks/useUpdatePlayingTargetArray";

type Props = {
  num: number;
  title: string;
  id: number;
  hasVoice: boolean;
};

export const ChapterCard: VFC<Props> = (props) => {
  const { title, num, id, hasVoice } = props;
  const navigation = useNavigation();
  const [playingTarget, setPlayingTarget] = useRecoilState(playingTargetState);
  const setPlayingTargetArray = useSetRecoilState(playingTargetArrayState);

  const onCardButton = () => {
    navigation.navigate("トーク画面");

    setPlayingTarget({
      situation: {
        label: playingTarget.situation.label,
        id: playingTarget.situation.id,
      },
      chapter: {
        label: title,
        id: id,
      },
      hasVoice: hasVoice,
      part: {
        label: "part01",
        id: 0,
      },
    });

    useUpdatePlayingTargetArray(playingTarget.situation.id, id, hasVoice, 0);
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
          {useFormatDoubleDigits(num - 1)}
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
