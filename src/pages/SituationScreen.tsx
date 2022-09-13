import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { ScrollView } from "react-native-gesture-handler";

import { SituationCard } from "../components/card/SituationCard";
import Situations from "../_constants/situation.json";
import { Header } from "../components/Header";
import { situationState } from "../store/situationState";
import { voiceDatas } from "../_constants/voiceDatas";

type SituationsType = {
  title: string;
  paragraph: string;
  image: string;
};

// 場面選択画面
const SituationScreen = () => {
  const situations: Array<SituationsType> = Situations;
  const navigation = useNavigation();
  const situationLabel = useRecoilValue(situationState);

  return (
    <>
      <Header pageTitle="場面選択" />
      <ScrollView>
        <View>
          {voiceDatas.map((voiceData) => (
            <SituationCard
              key={voiceData.title}
              title={voiceData.title}
              paragraph={voiceData.explanation}
              image={voiceData.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default SituationScreen;
