import { TextField } from "@mui/material";

type CustomCategoryFieldProps = {
    category: string | null;
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
            sx = {{
            width: "75vw",
            backgroundColor: 'white',
            }}
        />
    )
}