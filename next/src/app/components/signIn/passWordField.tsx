import { FormControl, TextField } from "@mui/material";

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
        <FormControl sx={{ width: "45vw" }}>
            <TextField
                label="パスワード"
                value={passWord}
                onChange={handleChange}
                slotProps={{
                    inputLabel: { shrink: true }
                }}
                sx={{
                    "& .MuiInputBase-root": {
                        height: "6vh",
                    },
                    "& .MuiInputBase-input": {
                        fontSize: "2vh",
                    },
                }}
            />
        </FormControl>
    );
}
