import { TextField } from "@mui/material";

type TitleFieldProps = {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export default function TitleField({ title, setTitle } : TitleFieldProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        // console.log(title);
    };

    return (
        <TextField
            label="タイトル"
            value={title}
            onChange={handleChange}
            slotProps={{
                inputLabel: { shrink: true }
            }}
            sx={{
                width: "75vw",
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                "& .MuiInputBase-root": {
                    height: "6vh",
                },
                "& .MuiInputBase-input": {
                    fontSize: "1.2vh",
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
    );
}
