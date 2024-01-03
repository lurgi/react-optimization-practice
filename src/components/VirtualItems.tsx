"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { PokemonsResponse } from "../../types/poketmon";

interface IProps {
  data: PokemonsResponse;
  containerRef: React.RefObject<HTMLDivElement>;
}

const VirtualItems: React.FC<IProps> = ({ data, containerRef }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemRenderCnt, setItemRenderCnt] = useState(18);

  const DIVIDE_STAND = 650;
  const ITEM_HEIGHT = 204;

  const [itemGridCol, setItemGridCol] = useState<2 | 3>(
    window.innerWidth < DIVIDE_STAND ? 2 : 3
  );

  window.onresize = () => {
    if (window.innerWidth < DIVIDE_STAND) {
      setItemGridCol(2);
    }
    if (window.innerWidth >= DIVIDE_STAND) {
      setItemGridCol(3);
    }
  };

  const responsiveWidth = {
    2: "grid-cols-2 w-[350px]",
    3: `grid-cols-3 w-[500px]`,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const newStartIndex =
          Math.floor(containerRef.current.scrollTop / ITEM_HEIGHT) *
          itemGridCol;
        const newItemCnt =
          (Math.ceil(containerRef.current.offsetHeight / ITEM_HEIGHT) + 3) *
          itemGridCol;

        setStartIndex(newStartIndex);
        setItemRenderCnt(newItemCnt);
      }
    };

    const istance = containerRef.current;
    if (istance) {
      istance.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (istance) {
        istance.removeEventListener("scroll", handleScroll);
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
  );
};

export default VirtualItems;
