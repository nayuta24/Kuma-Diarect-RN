import * as React from "react";
import { View } from "react-native";

import { SituationCard } from "../components/card/SituationCard";
import { ScrollView } from "react-native-gesture-handler";
import Situations from "../_constants/situation.json";

type SituationsType = {
  title: string;
  paragraph: string;
  image: string;
};

const SituationListScreen = () => {
  const situations: Array<SituationsType> = Situations;

  return (
    <View>
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

export default SituationListScreen;
