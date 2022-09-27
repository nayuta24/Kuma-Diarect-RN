import { Audio } from "expo-av";

export async function usePlaySound ( soundSource: string )
{
    try {
      await Audio.setIsEnabledAsync(true);
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: soundSource });
      await sound.playAsync();
      if (await sound) {
        // console.log("sound is loaded");
      }
    } catch (error) {
      console.log("error audio play");
    }
  }
