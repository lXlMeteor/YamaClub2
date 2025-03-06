import { TextField } from "@mui/material";

type ContentFieldProps = {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function ContentField ({ content, setContent } : ContentFieldProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
        console.log(content);
    }

    return (
        <TextField
            id="outlined-textarea"
            value = {content}
            onChange={handleChange}
            label="本文を記入してください。"
            multiline
            rows={8}
            sx={{
                width: '75vw',
                backgroundColor: 'white',
            }}
        />
    )
}