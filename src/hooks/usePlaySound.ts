import { Audio, AVPlaybackSource } from "expo-av";

export async function useUriPlaySound ( soundSource: string )
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

export async function useLocalPlaySound ( soundSource: AVPlaybackSource )
{
    try {
      await Audio.setIsEnabledAsync(true);
      const sound = new Audio.Sound();
      await sound.loadAsync(soundSource);
      await sound.playAsync();
      if (await sound) {
        // console.log("sound is loaded");
      }
    } catch (error) {
      console.log("error audio play");
    }
  }
