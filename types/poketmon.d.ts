export type PokemonsResponseResult = {
  name: string;
  url: string;
};

export interface PokemonsResponse {
  count: number;
  results: PokemonsResponseResult[];
}

interface Name {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface PokemonNameResponse {
  names: Name[];
}
