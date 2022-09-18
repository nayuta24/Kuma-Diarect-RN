import {atom} from "recoil"

export const partState = atom( {
    key: 'partState',
    default: {
        label: "part01",
        id: 0
    }
})
