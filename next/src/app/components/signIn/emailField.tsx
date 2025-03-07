import { FormControl, TextField } from "@mui/material";

type EmailFieldProps = {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export default function EmailField({ email, setEmail } : EmailFieldProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        // console.log(email);
    };

    return (
        <FormControl sx={{ width: "45vw" }}>
            <TextField
                label = "メールアドレス"
                id="outlined-textarea"
                value={email}
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
