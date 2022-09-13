type voiceDatasType = [
    {
        title: string;
        explanation: string;
        image: string;
        datas: [
            {
                title: string;
                voiceTexts: Array<string>;
                voiceUrls: Array<string>;
            }
        ]
    },
    {
        title: string;
        explanation: string;
        image: string;
        datas: [
            {
                title: string;
                voiceTexts: Array<string>;
                voiceUrls: Array<string>;
            }
        ]
    },
    {
        title: string;
        explanation: string;
        image: string;
        datas: [
            {
                title: string;
                voiceTexts: Array<string>;
                voiceUrls: Array<string>;
            }
        ]
    }
]

export const voiceDatas: voiceDatasType = [
    {
        title: "ナースコール",
        explanation: "症状を正しく聞き取り、すばやく適切な行動が取れるようになりましょう。",
        image: "http://ilab.watson.jp/Test/NakamuraYutaTest/images/situation/nursecall.jpg",
        datas: [
            {
                title: "",
                voiceTexts: [],
                voiceUrls: []
            }
        ]
    },
    {
        title: "食事",
        explanation: "上手に要望を聞き取り、患者の食生活をサポートしましょう。",
        image: "http://ilab.watson.jp/Test/NakamuraYutaTest/images/situation/eat.jpg",
        datas: [
            {
                title: "",
                voiceTexts: [],
                voiceUrls: []
            }
        ]
    },
    {
        title: "日常生活",
        explanation: "症状を正しく聞き取り、すばやく適切な行動が取れるようになりましょう。",
        image: "日常のコミュニケーションから患者の状態を把握しましょう。",
        datas: [
            {
                title: "",
                voiceTexts: [],
                voiceUrls: []
            }
        ]
    },
]
