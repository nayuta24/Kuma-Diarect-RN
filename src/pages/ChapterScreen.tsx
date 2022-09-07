import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Avatar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

import { ChapterCard } from "../components/card/ChapterCard";
import Chapters from "../_constants/chapter.json";

type ChapterType = {
  title: string;
};

const SceneListScreen = () => {
  const navigation = useNavigation();
  const chapters: Array<ChapterType> = Chapters;
  return (
    <ScrollView>
      <View>
        {chapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.title}
            title={chapter.title}
            num={index + 1}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default SceneListScreen;
