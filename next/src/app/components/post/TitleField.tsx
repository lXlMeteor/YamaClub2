import { TextField } from "@mui/material";

type EmailFieldProps = {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export default function TitleField({ title, setTitle } : EmailFieldProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        // console.log(title);
    };

    return (
        <TextField
            label="タイトル"
            value={title}
            onChange={handleChange}
            sx = {{
                width: "75vw",
                backgroundColor: 'white',
            }}
        />
    );
}
