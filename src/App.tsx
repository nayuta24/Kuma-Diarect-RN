import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./pages/HomeScreen";
import SituationListScreen from "./pages/SituationListScreen";
import SceneListScreen from "./pages/SceneListScreen";

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
        <Stack.Screen name={"状況をえらぶ"} component={SituationListScreen} />
        <Stack.Screen name={"詳細場面をえらぶ"} component={SceneListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
