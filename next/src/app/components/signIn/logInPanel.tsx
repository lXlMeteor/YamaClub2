import EmailField from "./emailField";
import PassField from "./passField";

type LogInPanelProps = {
    isBlank: boolean;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export default function LogInPanel ({ isBlank, email, setEmail, passWord, setPassWord} : LogInPanelProps) {
    return (
        <div>
            { isBlank && <p>全ての項目を入力してください。</p>}
            <EmailField
                email = {email}
                setEmail = {setEmail}
            />
            <PassField
                passWord = {passWord}
                setPassWord = {setPassWord}
            />
        </div>
    )
}