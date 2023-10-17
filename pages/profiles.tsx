import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

function Profiles() {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl">Who is watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div>
            <div className="group flex-row w-32 mx-auto justify-center items-center">
              <div
                onClick={async () => {
                  await router.push("/");
                }}
                className="w-32 h-32 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden"
              >
                <Image
                  alt="Profile Image"
                  src="/images/default-blue.png"
                  width={160}
                  height={160}
                  className="w-100"
                />
              </div>
              <div className="text-center mt-4 text-gray-400 text-1xl group-hover:text-white">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
        <button className="mt-8 capitalize bg-zinc-800 border rounded border-zinc-600 w-48 h-12 text-gray-500 font-semibold text-lg">
          Mange profiles
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  return {
    props: {},
  };
}

export default Profiles;
