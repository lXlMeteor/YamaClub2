import { TextField } from "@mui/material";

type CommentField = {
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
}

export default function CommentField({ comment, setComment } : CommentField) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    }

    return (
        <TextField
            id="outlined-textarea"
            value = {comment}
            onChange={handleChange}
            label="コメントを記入してください。"
            multiline
            rows={20}
            slotProps={{
                inputLabel: { shrink: true }
            }}
            sx={{
                width: "70vw",
                height: "30%",
                // maxHeight: "60vh",
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                "& .MuiInputBase-root": {
                    maxHeight: "60%",
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