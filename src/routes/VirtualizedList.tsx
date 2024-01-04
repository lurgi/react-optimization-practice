"use client";

import { getPokemons } from "@/api";
import VirtualItems from "@/components/VirtualItems";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { PokemonsResponse } from "../../types/poketmon";

const VirtualizedList = () => {
  const { data, isLoading } = useQuery<PokemonsResponse>({
    queryKey: ["pokemons"],
    queryFn: getPokemons,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="h-[80vh] w-[80vw] overflow-y-auto overflow-x-hidden relative">
      <h1 className="text-center">Pokemon List</h1>
      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <VirtualItems data={data} containerRef={containerRef} />
      )}
    </div>
  );
};

export default VirtualizedList;
