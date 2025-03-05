import { TextField } from "@mui/material";

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
        <TextField
            label="メールアドレス"
            value={email}
            onChange={handleChange}
            sx = {{
                width: "60vw",
            }}
        />
    );
}
