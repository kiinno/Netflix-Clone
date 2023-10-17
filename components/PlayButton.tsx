import React from "react";
import { useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button
      onClick={async () => await router.push(`/watch/${movieId}`)}
      className="bg-white rounded py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg drop-shadow-xl font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-gray-900 gap-1 cursor-pointer"
    >
      <FaPlay className="text-gray-900" size={15} />
      Play
    </button>
  );
};

export default PlayButton;
