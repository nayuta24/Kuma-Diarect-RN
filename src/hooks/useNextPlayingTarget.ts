import { voiceDatas } from "../_constants/voiceDatas";
import { useFormatDoubleDigits } from "./useFormatDoubleDigits";

export const useNextPlayingTarget = ( playingTarget:{
        situation: {
            label: string,
            id: number
        },
        chapter: {
            label: string,
            id: number
        },
        hasStandardVoice: boolean,
        part: {
            label: string,
            id: number
        },
    }) =>
{
    const { situation, chapter, hasStandardVoice, part } = playingTarget;

    var partMax = 0;
    var chapterMax = 0;

    if (hasStandardVoice) {
      partMax =
        voiceDatas[situation.id].datas.hasStandardVoice[chapter.id].voiceTexts
          .length;
      chapterMax = voiceDatas[ situation.id ].datas.hasStandardVoice.length;
        console.log( partMax )
        console.log( chapterMax )

      if (part.id + 1 < partMax) {
        return({
          situation: {
            label: situation.label,
            id: situation.id,
          },
          chapter: {
            label: chapter.label,
            id: chapter.id,
          },
          hasStandardVoice: hasStandardVoice,
          part: {
            label: "part" + useFormatDoubleDigits(part.id + 2),
            id: part.id + 1,
          },
        });
      } else if (chapter.id + 1 < chapterMax) {
        return({
          situation: {
            label: situation.label,
            id: situation.id,
          },
          chapter: {
            label:
              voiceDatas[ situation.id ].datas.hasStandardVoice[ chapter.id + 1 ].title,
            id: chapter.id + 1,
          },
          hasStandardVoice: hasStandardVoice,
          part: {
            label: "part01",
            id: 0,
          },
        });
      } else {
        return({
          situation: {
            label: situation.label,
            id: situation.id,
          },
          chapter: {
            label: voiceDatas[situation.id].datas.hasStandardVoice[0].title,
            id: 0,
          },
          hasStandardVoice: hasStandardVoice,
          part: {
            label: "part01",
            id: 0,
          },
        });
      }
    } else {
      partMax =
        voiceDatas[situation.id].datas.nonStandardVoice[chapter.id].voiceTexts
          .length;
      chapterMax = voiceDatas[ situation.id ].datas.nonStandardVoice.length;

      if (part.id + 1 < partMax) {
        return({
          situation: {
            label: situation.label,
            id: situation.id,
          },
          chapter: {
            label: chapter.label,
            id: chapter.id,
          },
          hasStandardVoice: hasStandardVoice,
          part: {
            label: "part" + useFormatDoubleDigits(part.id + 2),
            id: part.id + 1,
          },
        });
      } else if (chapter.id + 1 < chapterMax) {
        return({
          situation: {
            label: situation.label,
            id: situation.id,
          },
          chapter: {
            label:
              voiceDatas[situation.id].datas.nonStandardVoice[chapter.id + 1]
                .title,
            id: chapter.id + 1,
          },
          hasStandardVoice: hasStandardVoice,
          part: {
            label: "part01",
            id: 0,
          },
        });
      } else {
        return({
          situation: {
            label: situation.label,
            id: situation.id,
          },
          chapter: {
            label: voiceDatas[situation.id].datas.nonStandardVoice[0].title,
            id: 0,
          },
          hasStandardVoice: hasStandardVoice,
          part: {
            label: "part01",
            id: 0,
          },
        });
      }
    }
}
