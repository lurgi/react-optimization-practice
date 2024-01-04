import { getPokemons } from "@/api";
import VirtualItems from "@/components/VirtualItems";
import { Input } from "@/components/ui/input";
import useThrottle from "@/hooks/useThrottle";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useTransition } from "react";
import { PokemonsResponse } from "types/poketmon";

const THROTTLE_DELAY = 800;

const Throttle = () => {
  const { data, isLoading } = useQuery<PokemonsResponse>({
    queryKey: ["pokemons", "throttle"],
    queryFn: getPokemons,
  });

  const [keyword, setKeyword] = useState("");
  const [defferedKeyword, setDefferedKeyword] = useState("");
  const [isPending, startTransition] = useTransition();
  const throttleValue = useThrottle(defferedKeyword, THROTTLE_DELAY);

  const handleChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setKeyword(value);

    startTransition(() => {
      setDefferedKeyword(value);
    });
  };

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-[80vh] w-[80vw] max-w-[650px]">
      <h1>Search</h1>
      <Input
        onChange={handleChange}
        value={keyword}
        placeholder="검색 키워드를 입력하세요"
        className="my-2"
      />
      <Input
        value={throttleValue}
        placeholder="Throttle Value 키워드 입니다."
        className="my-2"
        disabled
      />
      <div
        ref={containerRef}
        className="h-[75vh] overflow-y-auto overflow-x-hidden relative">
        <h1 className="text-center">Pokemon List</h1>
        {isLoading || isPending || !data ? (
          <div>Loading...</div>
        ) : (
          <VirtualItems
            data={data}
            containerRef={containerRef}
            filter={throttleValue}
          />
        )}
      </div>
    </div>
  );
};

export default Throttle;
