import * as React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextLarge } from "../components/text/TextLarge";
import { Card, Button, Avatar, IconButton } from "react-native-paper";
const SceneListScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Card>
        <Card.Title
          title="まぶしい"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
        />
      </Card>
    </View>
  );
};

export default SceneListScreen;
