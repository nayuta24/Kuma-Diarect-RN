import { useFormatDoubleDigits } from "./useFormatDoubleDigits";

// 音声ファイルのパスを作成
export const useVoiceURLMaker = ( order: "a" | "b" | "c" | "b2", situationId: number, chapterId: number, partId: number ) =>
{
    var situationName: string = situationId === 0 ? situationName = "nurse" :
        situationId === 1 ? situationName = "meal"
        : situationName = "life";

    var src: string =
      "http://ilab.watson.jp/Test/NakamuraYutaTest/voices/" +
      situationName +
      "/" +
      useFormatDoubleDigits(chapterId) +
      "_" +
      useFormatDoubleDigits(partId) +
      order +
      ".m4a";

    // console.log(src);
    return src;
  };
