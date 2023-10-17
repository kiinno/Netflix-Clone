import React from "react";
import { useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";

import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import { GoChevronDown } from "react-icons/go";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        src={data?.thumbnailUrl}
        alt="thumbnail"
        className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 w-full h-[12vw]"
      />
      <div
        className="
        opacity-0
        absolute top-0 transition z-10 invisible sm:visible w-full scale-0 
        duration-500
        group-hover:scale-110 
        group-hover:-translate-y-[6vw] 
        group-hover:translate-x-[2vw] 
        group-hover:opacity-100
      "
      >
        <img
          src={data?.thumbnailUrl}
          alt="thumbnail"
          className="cursor-pointer object-cover transition shadow-xl rounded-t-md w-full h-[12vw]"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={async () => await router.push(`/watch/${data?._id}`)}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <FaPlay className="text-gray-600" size={15} />
            </div>
            <FavoriteButton movieId={data?._id} />
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 rounded-full flex justify-center items-center transition ml-auto border-white border-2 hover:border-neutral-300"
              onClick={() => openModal(data?._id)}
            >
              <GoChevronDown
                size={15}
                className="text-white group-hover/item:text-neutral-300"
              />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {data?.duration}
            </p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data?.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
