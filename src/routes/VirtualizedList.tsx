"use client";

import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "../../types/poketmon";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type Result = {
  name: string;
  url: string;
};

interface PokemonResponse {
  count: number;
  results: Result[];
}

// https://pokeapi.co/api/v2/pokemon-species/1/ 여기서 korean네임 구할 수 있음.

const getPokemons = () => {
  return fetch(import.meta.env.VITE_POKE_API_URL).then((r) => r.json());
};

const VirtualizedList = () => {
  const res = useQuery<PokemonResponse>({
    queryKey: ["pokemons"],
    queryFn: getPokemons,
  });

  const [startIndex, setStartIndex] = useState(0);
  const [itemRenderCnt, setItemRenderCnt] = useState(18);
  const ref = useRef<HTMLDivElement>(null);
  const [itemCol, setItemCol] = useState<2 | 3>(
    window.innerWidth < 650 ? 2 : 3
  );
  const itemHeight = 204;

  window.onresize = () => {
    if (window.innerWidth < 650) {
      setItemCol(2);
    }
    if (window.innerWidth >= 650) {
      setItemCol(3);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const newStartIndex =
          Math.floor(ref.current.scrollTop / itemHeight) * itemCol;
        const newItemCnt =
          (Math.ceil(ref.current.offsetHeight / itemHeight) + 3) * itemCol;

        setStartIndex(newStartIndex);
        setItemRenderCnt(newItemCnt);
      }
    };

    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [itemCol]);

  console.log(res.data);
  return (
    <div ref={ref} className="h-[80vh] overflow-y-scroll">
      <h1>Pokemon List</h1>
      <div
        style={{
          height: Math.ceil(((res.data?.count || 0) / itemCol) * itemHeight),
        }}>
        <div
          className={twMerge(
            "grid gap-3 ",
            itemCol === 2 ? "grid-cols-2" : `grid-cols-3`
          )}
          style={{ marginTop: (startIndex / itemCol) * itemHeight }}>
          {res.data?.results
            .slice(startIndex, startIndex + itemRenderCnt)
            .map(({ name, url }, index) => (
              <div
                key={index}
                className="w-40 h-48 border rounded-md flex flex-col items-center">
                <img
                  className="bg-red-50 aspect-square rounded-md w-36 my-1"
                  src={
                    import.meta.env.VITE_POKE_IMG_BASE_URL +
                    url.split("/")[6] +
                    ".png"
                  }></img>
                <span>{name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;
