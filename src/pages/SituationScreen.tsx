import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { SituationCard } from "../components/card/SituationCard";
import { Header } from "../components/Header";
import { voiceDatas } from "../_constants/voiceDatas";

// 場面選択画面
const SituationScreen = () => {
  return (
    <>
      <Header pageTitle="場面選択(ばめんせんたく)" />
      <ScrollView>
        <View>
          {voiceDatas.map((voiceData, index) => (
            <SituationCard
              key={voiceData.title}
              title={voiceData.title}
              paragraph={voiceData.explanation}
              image={voiceData.image}
              id={index}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default SituationScreen;
