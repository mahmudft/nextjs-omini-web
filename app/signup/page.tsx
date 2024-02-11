
import SignUpForm from "../..//forms/sign-up-form";

export const metadata = {
  title: "Sign Up | Omini Chat",
};

export default async function Singup(){
    return (
    <div className={"w-full h-full flex items-center justify-center"}>
      <SignUpForm />
    </div>
    )
}