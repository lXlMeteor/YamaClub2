import { useState } from "react";
import { TextField } from "@mui/material";

export default function EmailField () {
    const [email, setEmail] = useState<string>("");

    return (
        <TextField
            // id="outlined-textarea"
            // value = {email}
            // // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // //     if (e.target.value.length <= 255) {
            // //         handleEmail(e);
            // //     }
            // // }}
            // label="メールアドレスを記入してください。"
            // multiline
            // rows={1}
            // slotProps={{
            //     inputLabel: { shrink: true } // これを使う
            // }}
            // sx={{
            //     width: '75vw',
            //     backgroundColor: 'white',
            // }}
        />
    )
}