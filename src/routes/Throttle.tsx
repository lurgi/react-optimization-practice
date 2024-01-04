import { getPokemons } from "@/api";
import VirtualItems from "@/components/VirtualItems";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { PokemonsResponse } from "types/poketmon";

const Throttle = () => {
  const { data, isLoading } = useQuery<PokemonsResponse>({
    queryKey: ["pokemons", "throttle"],
    queryFn: getPokemons,
  });

  const [keyword, setKeyword] = useState("");
  const handleChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setKeyword(value);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-[80vh] w-[80vw] max-w-[650px]">
      <h1>Search</h1>
      <Input onChange={handleChange} value={keyword} className="my-2" />
      <div
        ref={containerRef}
        className="h-[75vh] overflow-y-auto overflow-x-hidden relative">
        <h1 className="text-center">Pokemon List</h1>
        {isLoading || !data ? (
          <div>Loading...</div>
        ) : (
          <VirtualItems
            data={data}
            containerRef={containerRef}
            filter={keyword}
          />
        )}
      </div>
    </div>
  );
};

export default Throttle;
