import { TextField } from "@mui/material";

type CustomCategoryFieldProps = {
    customCategory: string;
    setCustomCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function CustomCategoryField ({ customCategory, setCustomCategory } : CustomCategoryFieldProps) {
    return (
        <TextField
            label = "その他のカテゴリ"
            variant = "outlined"
            fullWidth
            value = {customCategory}
            onChange = {(e) => setCustomCategory(e.target.value)}
            margin = "normal"
            sx = {{
            width: "75vw",
            backgroundColor: 'white',
            }}
        />
    )
}