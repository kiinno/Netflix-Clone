import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMoviesList from "@/hooks/useMoviesList";
import type { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";

export default function Home() {
  const { data: user, error, isLoading } = useCurrentUser();
  const { data: movies, isLoading: moviesIsLoading } = useMoviesList();
  const { data: favorites, isLoading: favoritesIsLoading } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar user={user} isLoading={isLoading} />
      <Billboard />
      <div className="pb-40">
        <MovieList
          {...{
            data: movies,
            isLoading: moviesIsLoading,
            title: "Trending Now",
          }}
        />
        <MovieList
          {...{
            data: favorites,
            isLoading: favoritesIsLoading,
            title: "Favorites",
          }}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
//  if (!session)
//    return {
//      redirect: {
 //       destination: "/auth",
 //       permanent: false,
  //    },
//    };
  return {
    props: {},
  };
}
