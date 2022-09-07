import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Avatar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
const SceneListScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView>
        <Card>
          <Card.Title
            title="まぶしい"
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
          />
        </Card>
      </ScrollView>
    </View>
  );
};

export default SceneListScreen;
