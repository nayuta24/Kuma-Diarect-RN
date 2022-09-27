import {atom} from "recoil"

export const playingTargetArrayState = atom( {
    key: 'playingTargetArrayState',
    default: ["テキストA", "テキストB", "テキストC", "テキストB2"]
})
