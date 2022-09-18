import {atom} from "recoil"

export const situationState = atom( {
    key: 'situationState',
    default: {
        "label": "場面名",
        "id": 0
    }
})
