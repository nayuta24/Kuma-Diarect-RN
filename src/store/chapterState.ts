import {atom} from "recoil"

export const chapterState = atom( {
    key: 'chapterState',
    default: {
        label: "チャプター名",
        id: 0
    }
})
