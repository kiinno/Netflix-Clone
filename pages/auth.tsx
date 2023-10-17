import Input from "@/components/Input";
import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { NextPageContext } from "next";

export default function Auth() {
  const session = useSession();
  const [email, setEmail] = useState("admin@developer.com");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("admin");
  const [variant, setVariant] = useState("login");

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      await login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  const logout = useCallback(async () => {
    try {
      await signOut({
        callbackUrl: "/auth",
        redirect: true,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full md:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" width={170} height={170} alt="logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black text-white px-16 py-16 self-center bg-opacity-70 mt-2 md:w-2/4 md:max-w-md rounded-md w-full">
            <h2 className="text-white text-3xl mb-8 font-semibold">
              {variant === "register" ? "Sign Up" : "Sign In"}
            </h2>
            <div className="flex flex-row items-center justify-center gap-4 my-8">
              <div
                onClick={async (ev: any) => {
                  try {
                    await signIn("google", {
                      callbackUrl: "/profiles",
                      redirect: false,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="w-10 h-10 flex justify-center items-center bg-white rounded-full cursor-pointer transition-opacity hover:opacity-80"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={async (ev: any) => {
                  try {
                    await signIn("github", {
                      callbackUrl: "/profiles",
                      redirect: false,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="w-10 h-10 flex justify-center items-center bg-slate-700 rounded-full cursor-pointer transition-opacity hover:opacity-80"
              >
                <FaGithub size={42} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="username"
                  type="text"
                  label="Username"
                  onChange={(ev: any) => {
                    setName(ev.target.value);
                  }}
                  value={name}
                />
              )}

              <Input
                id="email"
                type="email"
                label="Email"
                onChange={(ev: any) => {
                  setEmail(ev.target.value);
                }}
                value={email}
              />

              <Input
                id="password"
                type="password"
                label="Password"
                onChange={(ev: any) => {
                  setPassword(ev.target.value);
                }}
                value={password}
              />
              <button
                onClick={variant === "register" ? register : login}
                className="bg-red-600 py-3 mt-5 rounded-md hover:bg-red-700 transition-colors w-full capitalize font-semibold"
              >
                {variant === "register" ? "Sign Up" : "Sign In"}
              </button>
              {session.status === "authenticated" && (
                <button
                  onClick={logout}
                  className="bg-red-600 py-3 mt-5 rounded-md hover:bg-red-700 transition-colors w-full capitalize font-semibold"
                >
                  Logout {session.data.user?.name}
                </button>
              )}

              {variant === "login" && (
                <div className="flex flex-row justify-between align-items-center">
                  <div className="flex align-items-center flex-row justify-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="accent-red-600 mr-1"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm text-zinc-500 font-semibold"
                    >
                      Remember me
                    </label>
                  </div>
                  <p className="text-sm text-zinc-500 font-semibold">
                    Need help?
                  </p>
                </div>
              )}
              <p className="text-neutral-500 mt-2 text-sm">
                {variant === "register"
                  ? "Already have an account"
                  : "New to netflix"}
                ?
                <span
                  className="
                  text-white
                  ml-1
                  hover:underline
                  cursor-pointer
                "
                  onClick={(ev: any) => {
                    setVariant((prevVariant) =>
                      prevVariant === "register" ? "login" : "register"
                    );
                  }}
                >
                  {variant === "register" ? "Login now" : "Create an account"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: {},
  };
}
