import EmailField from "./emailField";
import PassField from "./passField";

type LogInPanelProps = {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export default function LogInPanel ({ email, setEmail, passWord, setPassWord} : LogInPanelProps) {
    return (
        <div>
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