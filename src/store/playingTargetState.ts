import {atom} from "recoil"

export const playingTargetState = atom( {
    key: 'playingTargetState',
    default: {
        situation: {
            label: "場面名",
            id: 0
        },
        chapter: {
            label: "チャプター名",
            id: 0
        },
        hasVoice: false,
        part: {
            label: "パート番号",
            id: 0
        },
    }
})
