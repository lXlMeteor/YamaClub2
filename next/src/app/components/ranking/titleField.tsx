import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
    weight: "900",
    subsets: ["latin"],
});

export default function TitleField() {
    return (
        <div>
            <h2 className={ZenMaruGothicFont.className} style={{color: "#99D1FF", fontSize: "6vh", margin: "3vh 0"}}>〜らんきんぐ〜</h2>
        </div>
    );
}