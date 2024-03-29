import { voiceDatas } from "../_constants/voiceDatas";
import { useFormatDoubleDigits } from "./useFormatDoubleDigits";

// 音声ファイルのパスを作成
export const useVoiceURLMaker = ( order: "a" | "b" | "c" | "b2", situationId: number, chapterId: number, partId: number, hasStandard:boolean ) =>
{
    var situationName: string = situationId === 0 ? situationName = "nurse" :
        situationId === 1 ? situationName = "meal"
      : situationName = "life";

  const maxNonStandardChapterLength = voiceDatas[situationId].datas.nonStandardVoice.length
  if ( hasStandard )
  {
    return `http://ilab.watson.jp/Test/NakamuraYutaTest/voices/${ situationName }/${ useFormatDoubleDigits( chapterId + maxNonStandardChapterLength)}_${ useFormatDoubleDigits( partId )}${order}.m4a`;
  }
  else
  {
    return `http://ilab.watson.jp/Test/NakamuraYutaTest/voices/${situationName}/${useFormatDoubleDigits( chapterId)  }_${useFormatDoubleDigits(partId)}${order}.m4a`;
  }
};
