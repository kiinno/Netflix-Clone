interface MobileMenuProps {
  visible?: boolean;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return;

  return (
    <div className="capitalize bg-black w-56 absolute top-8 left-0 py-5 flex-col flex border-2 border-gray-800 ">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-white hover:underline">home</div>
        <div className="px-3 text-white hover:underline">series</div>
        <div className="px-3 text-white hover:underline">films</div>

        <div className="px-3 text-white hover:underline">new & popular</div>
        <div className="px-3 text-white hover:underline">my list</div>
        <div className="px-3 text-white hover:underline">
          browse by languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
