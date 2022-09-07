import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./pages/HomeScreen";
import SituationListScreen from "./pages/SituationListScreen";
import SceneListScreen from "./pages/ChapterScreen";

export type RootStackParamList = {
  Home: undefined;
  SceneList: undefined;
  SituationList: undefined;
};

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"HomeScreen"}>
        <Stack.Screen name={"ホーム"} component={HomeScreen} />
        <Stack.Screen name={"場面選択"} component={SituationListScreen} />
        <Stack.Screen
          name={"ナースコール"}
          component={SceneListScreen}
          options={({ route }) => ({
            title: "ナースコール",
          })}
        />
        <Stack.Screen name={"食事"} component={SceneListScreen} />
        <Stack.Screen name={"日常生活"} component={SceneListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
