import EmailField from "./emailField";
import PassField from "./passField";
import UserNameField from "./userNameField";

type SignUpPanelProps = {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpPanel ({ email, setEmail, userName, setUserName, passWord, setPassWord} : SignUpPanelProps) {
    return (
        <div>
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