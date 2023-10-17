import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
interface AccountMenuProps {
  visible?: boolean;
}
const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: user, isLoading } = useCurrentUser();
  if (!visible) return;

  return (
    <div className="capitalize bg-black w-56 absolute top-14 right-0 py-5 flex-col flex border-2 border-gray-800 ">
      {isLoading || !user ? (
        <div className="flex items-center justify-center">
          <div className="border-[1.5px] border-l-transparent border-gray-800 animate-spin w-7 h-7 rounded-full"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
            <img
              src={user?.image ? user?.image : "/images/default-blue.png"}
              width={75}
              height={75}
              alt="avatar"
              className="w-8 rounded-md"
            />
            <div>
              <p className="text-white text-sm group-hover/item:underline">
                {user?.name}
              </p>
              <p className="lowercase text-gray-500 text-[11px] font-semibold">
                {user?.email}
              </p>
            </div>
          </div>
          <hr className="bg-gray-600 border-0 h-px my-2" />
          <div
            onClick={async () => {
              await signOut({
                callbackUrl: "/auth",
                redirect: true,
              });
            }}
            className="px-3 text-center text-red-500 text-sm hover:underline"
          >
            Sign Out of Netflix
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
