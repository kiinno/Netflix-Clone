import React, { useCallback, useMemo } from "react";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: user, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = user?.favoritesIds || [];
    return list.includes(movieId);
  }, [movieId, user]);

  const toggleFavorites = useCallback(async () => {
    let response;
    try {
      if (isFavorite) {
        response = await axios.delete("/api/favorite", {
          data: { movieId },
        });
      } else {
        response = await axios.post("/api/favorite", {
          movieId,
        });
      }
      const updatedFavoritesIds = response?.data?.favoritesIds;
      mutate({
        ...user,
        favoritesIds: updatedFavoritesIds,
      });
      mutateFavorites();
    } catch (error) {
      console.log(error);
    }
  }, [isFavorite, movieId, mutate, mutateFavorites, user]);

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      {isFavorite ? <AiOutlineCheck size={15} /> : <AiOutlinePlus size={15} />}
    </div>
  );
};

export default FavoriteButton;
