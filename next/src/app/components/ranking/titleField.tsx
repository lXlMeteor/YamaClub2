import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
    weight: "500",
    subsets: ["latin"],
});

export default function TitleField() {
    return (
        <div>
            <h2 className={ZenMaruGothicFont.className} style={{color: "#99D1FF", fontSize: "4vh", margin: "7vh 0"}}>〜らんきんぐ〜</h2>
        </div>
    );
}