"use client";
import { Button, Link } from "@nextui-org/react";
import TextInput from "../app/components/form/text-input";
import PasswordInput from "../app/components/form/password-input";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ErrorView from "../app/components/error-view"

const SignUpForm = () => {
  const router = useRouter();
  const [message,setMessage] = useState("");
 

  return (
    <Formik
      initialValues={{ name:"", email: "", password: "" }}
      onSubmit={async (values) => {
        setMessage("");

        const response = await fetch("http://localhost:7089/signup",{
          body: JSON.stringify(values),
          method: "POST",
          credentials:"include",
          withCredentials:true,
          headers: {
            "Content-Type": "application/json"
          }
        });


        if(!response.ok){
            const status = response.status;
            switch (status) {
              case 400:
                setMessage("User already exist")
                break;
              case 500:
                setMessage("Invalid login or a problem accured")
              default:
                break;
            }
        }else {
          router.push('/login', { scroll: false })
        }

      }}
    >
      {({isSubmitting}) => (
        <Form className={"w-[500px]  flex flex-col gap-4"}>
          <h1 className={"text-3xl  font-extrabold"}>Log in and start messaging</h1>
          <h2>
            Have an account? <Link href={"/login"}>Login</Link>{" "}
          </h2>

          <TextInput name={"name"} label={"Name"} />

          <TextInput name={"email"} label={"Email"} />

          <PasswordInput name={"password"} label={"Password"} />

          {message && (
            <ErrorView message={message} />
          )}

          <Button type={"submit"} color={"primary"} isLoading={isSubmitting}>
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
