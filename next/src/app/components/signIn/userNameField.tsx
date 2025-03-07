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
