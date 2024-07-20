import TopHeader from "../_components/TopHeader";
import Banner from "../_components/Banner";
import Card from "../_components/Card";
import InputField from "../_components/InputField";
import Button from "../_components/Button";
import { redirect } from "next/navigation";
import Link from "next/link";
import { api } from "~/trpc/server";

interface Form {
  email: string;
  password: string;
  name: string;
}


async function Register() {
  const submit = async (formData: FormData) => {
    "use server";
    console.log("working");
    const rawFormData: Form = {
      name: formData?.get("name") as string,
      email: formData?.get("email") as string,
      password: formData?.get("password") as string,
    };
    let data;

    try {
      data = await api.auth.register(rawFormData);
      console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log("error", error.message);
    }
    if (data?.status === 201) {
      redirect("/");
    }
  };

  return (
    <div>
      <TopHeader />
      <Banner />
      <div className="mt-10 flex justify-center">
        <Card>
          <h2 className="text-[32px] font-semibold leading-10 ">
            Create your account
          </h2>

          <form action={submit}>
            <div className="flex flex-col gap-5 border-b-[1px] py-7 text-start ">
              <InputField name="name" type="text" />

              <InputField name="email" type="text" />
              <InputField name="password" type="password" />
              <Button >Create Account</Button>
            </div>
          </form>

          <div className="mt-8 flex justify-center gap-2">
            <p className="text-secondary">Have an Account?</p>{" "}
            <Link
              href={"/login"}
              className="tracking-wid text-lg font-semibold uppercase "
            >
              Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Register;
