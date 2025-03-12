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
                variant="outlined"
                slotProps={{
                    inputLabel: { shrink: true }
                }}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    "& .MuiInputBase-root": {
                        height: "6vh",
                    },
                    "& .MuiInputBase-input": {
                        fontSize: "2vh",
                    },
                    "& .MuiOutlinedInput-root": {
                        borderColor: '#FF9B83',
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: '#FF9B83',
                            borderWidth: 2,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: '#FF9B83',
                            borderWidth: 2,
                        },
                    },
                    "& .MuiFormLabel-root": {
                        color: '#4DAFFF',
                        fontWeight: 'bold',
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: '#4DAFFF',
                        fontWeight: 'bold',
                    },
                }}
            />
        </FormControl>
    );
}
