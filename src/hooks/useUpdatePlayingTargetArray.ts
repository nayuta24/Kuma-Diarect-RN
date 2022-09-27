import { useRecoilState, useSetRecoilState } from "recoil";
import { playingTargetArrayState } from "../store/playingTargetArrayState"
import { voiceDatas } from "../_constants/voiceDatas";

export const useUpdatePlayingTargetArray = ( situationId: number, chapterId: number, hasStandardVoice: boolean, part: number ) =>
{
    const [playingTargetArray ,setPlayingTargetArray] = useRecoilState(playingTargetArrayState);

    if (hasStandardVoice) {
      setPlayingTargetArray(
        voiceDatas[situationId].datas.hasStandardVoice[chapterId]
          .voiceTexts[part]
      );
    } else {
      setPlayingTargetArray(
        voiceDatas[situationId].datas.nonStandardVoice[chapterId]
          .voiceTexts[part]
      );
    }
    
    console.log(voiceDatas[situationId].datas.nonStandardVoice[chapterId].voiceTexts[part]);
}
