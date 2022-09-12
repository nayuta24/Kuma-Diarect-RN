import * as React from "react";
import { View } from "react-native";

import { SituationCard } from "../components/card/SituationCard";
import { ScrollView } from "react-native-gesture-handler";
import Situations from "../_constants/situation.json";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/Header";
import { useRecoilValue } from "recoil";
import { situationState } from "../store/situationState";

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
    <View>
      <Header pageTitle="場面選択" />
      <ScrollView>
        {situations.map((situation) => (
          <SituationCard
            key={situation.title}
            title={situation.title}
            paragraph={situation.paragraph}
            image={situation.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default SituationScreen;
