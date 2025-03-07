import { FormControl, TextField } from "@mui/material";

type UserNameFieldProps = {
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export default function EmailField({ userName, setUserName } : UserNameFieldProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
        // console.log(email);
    };

    return (
        <FormControl sx={{ width: "45vw" }}>
            <TextField
                label="ユーザー名"
                value={userName}
                onChange={handleChange}
                slotProps={{
                    inputLabel: { shrink: true }
                }}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
