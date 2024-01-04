import { getPokemonNameById } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { PokemonNameResponse, PokemonsResponseResult } from "types/poketmon";

const PokemonDetail = ({ data }: { data: PokemonsResponseResult }) => {
  const { url } = data;
  const id = url.split("/")[6];
  const { data: nameData } = useQuery<PokemonNameResponse>({
    queryKey: ["pokemonDetail", id],
    queryFn: () => getPokemonNameById(id),
  });

  const koreanName = nameData?.names.filter(
    ({ language }) => language.name === "ko"
  )[0];

  return (
    <div className="w-40 h-48 border rounded-md flex flex-col items-center">
      <img
        className="bg-red-50 aspect-square rounded-md w-36 my-1"
        src={import.meta.env.VITE_POKE_IMG_BASE_URL + id + ".png"}></img>
      <span>{koreanName?.name}</span>
    </div>
  );
};

export default PokemonDetail;
