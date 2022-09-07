import * as React from "react";
import { View } from "react-native";

import { SituationCard } from "../components/card/SituationCard";
import { ScrollView } from "react-native-gesture-handler";

const SituationListScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView>
        <SituationCard
          title="ナースコール"
          paragraph="症状を正しく聞き取り、すばやく適切な行動が取れるようになりましょう。"
          image="http://ilab.watson.jp/Test/NakamuraYutaTest/images/situation/nursecall.jpg"
        />
        <SituationCard
          title="食事"
          paragraph="症状を正しく聞き取り、すばやく適切な行動が取れるようになりましょう。"
          image="http://ilab.watson.jp/Test/NakamuraYutaTest/images/situation/eat.jpg"
        />
        <SituationCard
          title="日常生活"
          paragraph="症状を正しく聞き取り、すばやく適切な行動が取れるようになりましょう。"
          image="http://ilab.watson.jp/Test/NakamuraYutaTest/images/situation/life.jpg"
        />
      </ScrollView>
    </View>
  );
};

export default SituationListScreen;
