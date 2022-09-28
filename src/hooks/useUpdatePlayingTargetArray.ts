import { voiceDatas } from "../_constants/voiceDatas";

export const useUpdatePlayingTargetArray = ( situationId: number, chapterId: number, hasStandardVoice: boolean, part: number ) =>
{

    if (hasStandardVoice) {
      return(
        voiceDatas[situationId].datas.hasStandardVoice[chapterId]
          .voiceTexts[part]
      );
    } else {
      return(
        voiceDatas[situationId].datas.nonStandardVoice[chapterId]
          .voiceTexts[part]
      );
    }
}
