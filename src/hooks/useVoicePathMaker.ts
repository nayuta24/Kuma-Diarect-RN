import { voiceDatas } from "../_constants/voiceDatas";
import { voicePath } from "../_constants/voicePath";
import { useFormatDoubleDigits } from "./useFormatDoubleDigits";

// 音声ファイルのパスを作成
export const useVoicePathMaker = ( order: "a" | "b" | "c" | "b2", situationId: number, chapterId: number, partId: number, hasStandard:boolean ) =>
{
  var orderNum:number = 0
  order === "a" ? ( orderNum = 0 ) : order === "b" ? ( orderNum = 1 ) : order === "c" ? ( orderNum = 2 ) : ( orderNum = 3 );

  if ( hasStandard ){
    return voicePath[ situationId ].hasStandardVoice[ chapterId ][ partId ][orderNum];
  } else  {
    return voicePath[ situationId ].nonStandardVoice[ chapterId ][ partId ][orderNum];
  }
};
