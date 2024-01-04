"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { PokemonsResponse } from "../../types/poketmon";
import PokemonDetail from "./PokemonDetail";

interface IProps {
  data: PokemonsResponse;
  containerRef: React.RefObject<HTMLDivElement>;
  filter?: string;
}

const VirtualItems: React.FC<IProps> = ({ data, containerRef, filter }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemRenderCnt, setItemRenderCnt] = useState(18);

  const DIVIDE_STAND = 650;
  const ITEM_HEIGHT = 204;
  const GRID_COLS = (width: number) => (width < DIVIDE_STAND ? 2 : 3);

  const [itemGridCol, setItemGridCol] = useState<2 | 3>(
    GRID_COLS(window.innerWidth)
  );

  window.onresize = () => {
    setItemGridCol(GRID_COLS(window.innerWidth));
  };

  const responsiveWidth = {
    2: "grid-cols-2 w-[350px]",
    3: `grid-cols-3 w-[500px]`,
  };

  useEffect(() => {
    const instance = containerRef.current;

    const handleScroll = () => {
      if (instance) {
        const newStartIndex =
          Math.floor(instance.scrollTop / ITEM_HEIGHT) * itemGridCol;
        const newItemCnt =
          (Math.ceil(instance.offsetHeight / ITEM_HEIGHT) + 3) * itemGridCol;

        setStartIndex(newStartIndex);
        setItemRenderCnt(newItemCnt);
      }
    };

    if (instance) {
      instance.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (instance) {
        instance.removeEventListener("scroll", handleScroll);
      }
    };
  }, [itemGridCol, containerRef]);

  return (
    <div
      style={{
        height: Math.ceil((data?.count / itemGridCol) * ITEM_HEIGHT),
      }}
      className="relative flex flex-col items-center">
      <div
        className={twMerge("grid gap-3 absolute", responsiveWidth[itemGridCol])}
        style={{ top: (startIndex / itemGridCol) * ITEM_HEIGHT }}>
        {data?.results
          .slice(startIndex, startIndex + itemRenderCnt)
          .map((data, index) => (
            <div key={index}>
              <PokemonDetail filter={filter} data={data} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default VirtualItems;
