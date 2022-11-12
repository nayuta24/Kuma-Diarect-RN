import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RecoilRoot } from "recoil";

import HomeScreen from "./pages/HomeScreen";
import SituationScreen from "./pages/SituationScreen";
import ChapterScreen from "./pages/ChapterScreen";
import TalkScreen from "./pages/TalkScreen";
import CalendarScreen from "./pages/CalendarScreen";

export type RootStackParamList = {
  Home: undefined;
  SceneList: undefined;
  SituationList: undefined;
};

const Stack = createStackNavigator();

function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"HomeScreen"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name={"ホーム"} component={HomeScreen} />
          <Stack.Screen name={"場面選択"} component={SituationScreen} />
          <Stack.Screen name={"チャプター選択"} component={ChapterScreen} />
          <Stack.Screen name={"トーク画面"} component={TalkScreen} />
          <Stack.Screen name={"カレンダー"} component={CalendarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
