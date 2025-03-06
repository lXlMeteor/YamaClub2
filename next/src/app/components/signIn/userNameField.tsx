import { TextField } from "@mui/material";

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
        <TextField
            label="ユーザー名"
            value={userName}
            onChange={handleChange}
            sx = {{
                width: "60vw",
            }}
        />
    );
}
