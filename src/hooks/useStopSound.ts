import { Audio } from "expo-av";
export async function useStopSound ()
{
    try {
      await Audio.setIsEnabledAsync(false);
    } catch (error) {
      // console.log("error audio stop");
    }
  }
