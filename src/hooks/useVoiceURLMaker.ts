import { voiceDatas } from "../_constants/voiceDatas";
import { useFormatDoubleDigits } from "./useFormatDoubleDigits";

// 音声ファイルのパスを作成
export const useVoiceURLMaker = ( order: "a" | "b" | "c" | "b2", situationId: number, chapterId: number, partId: number, hasStandard:boolean ) =>
{
    var situationName: string = situationId === 0 ? situationName = "nurse" :
        situationId === 1 ? situationName = "meal"
      : situationName = "life";

  if ( hasStandard )
  {
    console.log(`http://ilab.watson.jp/Test/NakamuraYutaTest/voices/${ situationName }/${ useFormatDoubleDigits( chapterId + voiceDatas[ chapterId].datas.nonStandardVoice.length)}_${ useFormatDoubleDigits( partId )}${order}.m4a`)
    return `http://ilab.watson.jp/Test/NakamuraYutaTest/voices/${ situationName }/${ useFormatDoubleDigits( chapterId + voiceDatas[ chapterId].datas.nonStandardVoice.length)}_${ useFormatDoubleDigits( partId )}${order}.m4a`;
  }
  else
  {
    console.log(`http://ilab.watson.jp/Test/NakamuraYutaTest/voices/${situationName}/${useFormatDoubleDigits( chapterId ) }_${useFormatDoubleDigits( partId)}${order}.m4a`)
    return `http://ilab.watson.jp/Test/NakamuraYutaTest/voices/${situationName}/${useFormatDoubleDigits( chapterId)  }_${useFormatDoubleDigits(partId)}${order}.m4a`;
  }
};
