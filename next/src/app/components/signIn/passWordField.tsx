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
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    "& .MuiOutlinedInput-root": {
                        borderColor: '#FF9B83', // 枠線の色を設定
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: '#FF9B83', // ホバー時の枠線の色を設定
                            borderWidth: 2,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: '#FF9B83', // フォーカス時の枠線の色を設定
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
