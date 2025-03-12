import Image from "next/image";
import obousanImg from "@/app/statics/images/obousan.png";

export default function Obousan () {
    return (
        <Image
            src={obousanImg}
            alt="Obousan"
            width="230"
            height="100"
            style={{
                width: "13vw",
                height: "30vh"
            }}
        />
    );
}