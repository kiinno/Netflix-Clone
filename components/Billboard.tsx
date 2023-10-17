import useBillBoard from "@/hooks/useBillBoard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import { useCallback } from "react";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
  const { data } = useBillBoard();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?._id);
  }, [data?._id, openModal]);

  return (
    <div className="relative w-full h-[56.25vw] lg:h-[44.25vw] ">
      <video
        src={data?.videoUrl}
        autoPlay
        loop
        poster={data?.thumbnailUrl}
        muted
        className="w-full object-cover h-full"
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="capitalize text-white text-1xl md:text-5xl w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p
          className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%]
        lg:w-[50%]"
        >
          {data?.description.slice(0, 200)}
          {data?.description && data?.description.length > 200 ? "..." : ""}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?._id} />
          <button
            onClick={handleOpenModal}
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center justify-center hover:bg-opacity-20 transition gap-1"
          >
            <AiOutlineInfoCircle /> <span className="mb-[1px]">More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
