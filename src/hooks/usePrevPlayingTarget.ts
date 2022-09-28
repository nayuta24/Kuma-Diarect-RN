import { voiceDatas } from "../_constants/voiceDatas";
import { useFormatDoubleDigits } from "./useFormatDoubleDigits";

export const usePrevPlayingTarget = ( playingTarget:{
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
      if (part.id  > 0) {
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
            label: "part" + useFormatDoubleDigits(part.id),
            id: part.id - 1,
          },
        });
      } else if (chapter.id > 0) {
        return({
          situation: {
            label: situation.label,
            id: situation.id,
          },
          chapter: {
            label:
              voiceDatas[ situation.id ].datas.hasStandardVoice[ chapter.id - 1 ].title,
            id: chapter.id - 1,
          },
          hasStandardVoice: hasStandardVoice,
          part: {
            label: "part" + useFormatDoubleDigits(voiceDatas[ situation.id ].datas.hasStandardVoice[ chapter.id - 1 ].voiceTexts.length),
            id: voiceDatas[ situation.id ].datas.hasStandardVoice[ chapter.id - 1 ].voiceTexts.length - 1,
          },
        });
      } else {
        return({
          situation: {
            label: situation.label,
            id: situation.id,
          },
          chapter: {
            label: voiceDatas[situation.id].datas.hasStandardVoice[voiceDatas[situation.id].datas.hasStandardVoice.length - 1].title,
            id: voiceDatas[situation.id].datas.hasStandardVoice.length - 1,
          },
          hasStandardVoice: hasStandardVoice,
          part: {
            label: "part" + useFormatDoubleDigits(voiceDatas[situation.id].datas.hasStandardVoice[voiceDatas[situation.id].datas.hasStandardVoice.length - 1].voiceTexts.length),
            id: voiceDatas[situation.id].datas.hasStandardVoice[voiceDatas[situation.id].datas.hasStandardVoice.length - 1].voiceTexts.length - 1,
          },
        });
      }
    } else {
      if (part.id  > 0) {
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
            label: "part" + useFormatDoubleDigits(part.id),
            id: part.id - 1,
          },
        });
      } else if (chapter.id > 0) {
        return({
          situation: {
            label: situation.label,
            id: situation.id,
          },
          chapter: {
            label:
              voiceDatas[ situation.id ].datas.nonStandardVoice[ chapter.id - 1 ].title,
            id: chapter.id - 1,
          },
          hasStandardVoice: hasStandardVoice,
          part: {
            label: "part" + useFormatDoubleDigits(voiceDatas[ situation.id ].datas.nonStandardVoice[ chapter.id - 1 ].voiceTexts.length),
            id: voiceDatas[ situation.id ].datas.nonStandardVoice[ chapter.id - 1 ].voiceTexts.length - 1,
          },
        });
      } else {
        return({
          situation: {
            label: situation.label,
            id: situation.id,
          },
          chapter: {
            label: voiceDatas[situation.id].datas.nonStandardVoice[voiceDatas[situation.id].datas.nonStandardVoice.length - 1].title,
            id: voiceDatas[situation.id].datas.nonStandardVoice.length - 1,
          },
          hasStandardVoice: hasStandardVoice,
          part: {
            label: "part" + useFormatDoubleDigits(voiceDatas[situation.id].datas.nonStandardVoice[voiceDatas[situation.id].datas.nonStandardVoice.length - 1].voiceTexts.length),
            id: voiceDatas[situation.id].datas.nonStandardVoice[voiceDatas[situation.id].datas.nonStandardVoice.length - 1].voiceTexts.length - 1,
          },
        });
      }
    }
}
