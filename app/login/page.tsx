
import SignInForm from "../../forms/sign-in-form.jsx";


export const metadata = {
    title: "Sign In | Omini Chat",
};

export default async function Login() {
    return (
        <div className={"w-full h-full flex items-center justify-center"}>
            <SignInForm />
        </div>
    )
}