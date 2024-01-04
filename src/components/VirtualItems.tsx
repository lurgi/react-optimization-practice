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

    if (!filter && instance) {
      instance.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (!filter && instance) {
        instance.removeEventListener("scroll", handleScroll);
      }
    };
  }, [itemGridCol, containerRef, filter]);

  return (
    <div
      style={{
        height: !filter
          ? Math.ceil((data?.count / itemGridCol) * ITEM_HEIGHT)
          : "auto",
      }}
      className="relative flex flex-col items-center">
      <div
        className={twMerge("grid gap-3 absolute", responsiveWidth[itemGridCol])}
        style={{ top: (startIndex / itemGridCol) * ITEM_HEIGHT }}>
        {filter
          ? data?.results.map((data, index) => (
              <PokemonDetail key={index} filter={filter} data={data} />
            ))
          : data?.results
              .slice(startIndex, startIndex + itemRenderCnt)
              .map((data, index) => <PokemonDetail key={index} data={data} />)}
      </div>
    </div>
  );
};

export default VirtualItems;
