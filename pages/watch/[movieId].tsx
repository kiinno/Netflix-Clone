import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

import React from "react";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          size={25}
          className="text-white cursor-pointer hover:text-gray-300 transition-colors"
          onClick={async () => await router.push("/")}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="text-light">Watching: </span>
          {data?.title}
        </p>
      </nav>
      <video
        controls
        poster={data?.thumbnailUrl}
        className="w-full h-full"
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
