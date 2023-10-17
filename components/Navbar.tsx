import Image from "next/image";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";

interface NavbarProps {
  user: any;
  isLoading: boolean;
}

const TOP_OFFSET = 60;

const Navbar: React.FC<NavbarProps> = ({ user, isLoading }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) setShowBackground(true);
      else setShowBackground(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(
    () => setShowMobileMenu((prev) => !prev),
    []
  );

  const toggleAccountMenu = useCallback(
    () => setShowAccountMenu((prev) => !prev),
    []
  );

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-5 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <Image src="/images/logo.png" width={100} height={100} alt="logo" />
        <div className="capitalize flex-row ml-8 gap-5 hidden lg:flex">
          <NavbarItem label="home" />
          <NavbarItem label="series" />
          <NavbarItem label="films" />
          <NavbarItem label="new & popular" />
          <NavbarItem label="my list" />
          <NavbarItem label="browse by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden ml-8 flex flex-row items-center gap-2 self-start cursor-pointer relative visible"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className="text-white transition" />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition hover:animate-pulse">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition hover:animate-pulse">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded overflow-hidden">
              <img
                src={user?.image ? user?.image : "/images/default-blue.png"}
                alt="avatar"
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu && "rotate-180 animate-pulse"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
