import { Checkbox, FormControlLabel } from "@mui/material";
import CustomCategoryField from "./customCategoryField";
import styles from '@/app/statics/styles/categoryField.module.css';
import { useState } from "react";

type CategoryFieldProps = {
    category: string | null;
    setCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CategoryField({ category, setCategory } : CategoryFieldProps) {

    const [isHover, setIsHover] = useState<boolean>(false);

    const handleCategoryChange = (selectedCategory: string) => {
        if (selectedCategory === category) {
            setCategory(null);
        } else {
            setCategory(selectedCategory);
        }
    };

    return (
        <div className={styles.categoryField}>
            <form>
                <fieldset 
                    className={isHover ? styles.isHover : styles.fieldset}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <legend className={styles.legend}>カテゴリ</legend>
                    <div className={styles.formControlLabels}>
                        <FormControlLabel
                            control={<Checkbox checked={category === "学校"} onChange={() => handleCategoryChange("学校")} />}
                            label="学校"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={category === "恋愛"} onChange={() => handleCategoryChange("恋愛")} />}
                            label="恋愛"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={category === "仕事"} onChange={() => handleCategoryChange("仕事")} />}
                            label="仕事"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={category !== null && !["学校", "恋愛", "仕事"].includes(category)}
                                    onChange={() => handleCategoryChange("その他")}
                                />
                            }
                            label="その他"
                        />
                    </div>

                    {category !== null && !["学校", "恋愛", "仕事"].includes(category) && (
                        <CustomCategoryField category={category} setCategory={setCategory} />
                    )}
                </fieldset>
            </form>
        </div>
    );
}
