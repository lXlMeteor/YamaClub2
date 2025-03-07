import { Checkbox, FormControlLabel } from "@mui/material";
import CustomCategoryField from "./customCategoryField";

type CategoryFieldProps = {
    category: string | null;
    setCategory: React.Dispatch<React.SetStateAction<string | null>>;
    customCategory: string;
    setCustomCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function CategoryField({ category, setCategory, customCategory, setCustomCategory } : CategoryFieldProps) {

    const handleCategoryChange = (selectedCategory: string) => {
        if (selectedCategory === category) {
            setCategory(null); // 同じカテゴリが選ばれた場合、解除
        } else {
            setCategory(selectedCategory); // 新しいカテゴリを選択
        }
    };

    return (
        <div>
            <h3>カテゴリ選択</h3>

            <FormControlLabel
                control = {
                  <Checkbox
                      checked = {category === "学校"}
                      onChange = {() => handleCategoryChange("学校")}
                  />
                }
                label = "学校"
            />

            <FormControlLabel
                control = {
                    <Checkbox
                        checked = {category === "恋愛"}
                        onChange = {() => handleCategoryChange("恋愛")}
                    />
                }
                label = "恋愛"
            />

            <FormControlLabel
                control = {
                    <Checkbox
                        checked = {category === "仕事"}
                        onChange = {() => handleCategoryChange("仕事")}
                    />
                  }
                label = "仕事"
            />

            <FormControlLabel
                control = {
                    <Checkbox
                        checked = {category === "その他"}
                        onChange = {() => handleCategoryChange("その他")}
                    />
                }
                label = "その他"
            />

            {category === "その他" && (
                <CustomCategoryField
                    customCategory = {customCategory}
                    setCustomCategory = {setCustomCategory}
                />
            )}
        </div>
    );
}
