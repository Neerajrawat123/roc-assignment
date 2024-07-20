import React from "react";
import TopHeader from "../_components/TopHeader";
import Banner from "../_components/Banner";
import Card from "../_components/Card";
import InputField from "../_components/InputField";
import Button from "../_components/Button";
import Link from "next/link";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

interface Form {
  email: string ;
  password: string ;
}

function Login() {
  const submit = async (formData: FormData) => {
    "use server";

    const rawFormData: Form = {
      email: formData.get("email") as string ,
      password: formData.get("password") as string ,
    };
    let userQuery;

    try {
      userQuery = await api.auth.login(rawFormData);
      console.log(userQuery);
    } catch (error) {
      console.log("error", error);
    }
    if (userQuery?.status === 201) {
      redirect("/");
    }
  };

  return (
    <div>
      <TopHeader />
      <Banner />
      <div className="mt-10 flex justify-center">
        <Card>
          <h2 className="text-[32px] font-semibold leading-10 ">Login</h2>
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-2xl font-medium leading-7">
              Welcome back to ECOMMERCE
            </p>
            <p className="">The next gen business marketplace</p>
          </div>
        
          <form action={submit}>
            <div className="flex flex-col gap-5 border-b-[1px] py-7 text-start ">

              <InputField name="email" type="text" />
              <InputField name="password" type="password" />
              <Button >Login</Button>
            </div>
          </form>

          <div className="mt-8 flex justify-center gap-1">
            <p className="text-secondary">Don’t have an Account?</p>{" "}
            <Link href={"/register"} className="tracking-wid font-bold">
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
