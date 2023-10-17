interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <div className="hover:animate-pulse cursor-pointer text-white hover:text-gray-300 transition">
      {label}
    </div>
  );
};

export default NavbarItem;
