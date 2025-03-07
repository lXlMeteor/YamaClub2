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
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
