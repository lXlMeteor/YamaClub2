import EmailField from "./emailField";
import PassField from "./passWordField";
import UserNameField from "./userNameField";

type SignUpPanelProps = {
    isBlank: boolean;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpPanel ({ isBlank, email, setEmail, userName, setUserName, passWord, setPassWord} : SignUpPanelProps) {
    return (
        <div>
            { isBlank ? <p>入力漏れがあります。</p> : <p></p>}
            <EmailField
                email = {email}
                setEmail = {setEmail}
            />
            <UserNameField
                userName = {userName}
                setUserName = {setUserName}
            />
            <PassField
                passWord = {passWord}
                setPassWord = {setPassWord}
            />
        </div>
    )
}