import { TextField } from "@mui/material";

type PassWordFieldProps = {
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
};

export default function PassWordField({ passWord, setPassWord } : PassWordFieldProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassWord(event.target.value);
        // console.log(passWord);
    };

    return (
        <TextField
            label="パスワード"
            value={passWord}
            onChange={handleChange}
            sx = {{
                width: "60vw",
            }}
        />
    );
}
