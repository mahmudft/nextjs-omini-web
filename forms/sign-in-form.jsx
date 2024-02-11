"use client";
import {useState} from 'react'
import { Button, Link } from "@nextui-org/react";
import TextInput from "../app/components/form/text-input";
import PasswordInput from "../app/components/form/password-input";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import ErrorView from "../app/components/error-view"

const SignInForm = () => {
  const router = useRouter();
  const [message,setMessage] = useState("");
 

  return (
    <Formik
      initialValues={{  email: "", password: "" }}
      onSubmit={async (values) => {
        setMessage("");

        const response = await fetch("http://localhost:7089/login",{
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
              case 404:
                setMessage("User not found")
                break;
              case 500:
                setMessage("Invalid login or a problem accured")
              default:
                break;
            }
        }else {
          router.push('/chat', { scroll: false })
        }

      }}
    >
      {({isSubmitting}) => (
        <Form className={"w-[500px]  flex flex-col gap-4"}>
          <h1 className={"text-3xl  font-extrabold"}>Log in and start messaging</h1>
          <h2>
            Don&apos;t have an account? <Link href={"/signup"}>Sign up</Link>{" "}
          </h2>

          <TextInput name={"email"} label={"Email"} />

          <PasswordInput name={"password"} label={"Password"} />

          {message && (
            <ErrorView message={message} />
          )}

          <Button type={"submit"} color={"primary"} isLoading={isSubmitting}>
            Log in
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
