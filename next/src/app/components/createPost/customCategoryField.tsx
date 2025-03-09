import { TextField } from "@mui/material";

type CustomCategoryFieldProps = {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CustomCategoryField ({ category, setCategory } : CustomCategoryFieldProps) {
    return (
        <TextField
            label = "その他のカテゴリ"
            variant = "outlined"
            fullWidth
            value = {category}
            onChange = {(e) => setCategory(e.target.value)}
            margin = "normal"
            sx={{
                width: "73.5vw",
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                "& .MuiInputBase-root": {
                    height: "6vh",
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