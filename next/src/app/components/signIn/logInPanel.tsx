import EmailField from "./emailField";
import PassField from "./passWordField";

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
            { isBlank ? <p>入力漏れがあります。</p> : <p></p>}
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