import { TextField } from "@mui/material";

type ContentFieldProps = {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function ContentField ({ content, setContent } : ContentFieldProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }

    return (
        <TextField
            id="outlined-textarea"
            value = {content}
            onChange={handleChange}
            label="本文"
            multiline
            rows={8}
            slotProps={{
                inputLabel: { shrink: true }
            }}
            sx={{
                width: "75vw",
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                "& .MuiInputBase-root": {
                    maxHeight: "28vh",
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
    )
}