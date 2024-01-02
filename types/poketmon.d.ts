interface abilitie {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Form {
  name: string;
  url: string;
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  abilities: abilitie[];
  base_experience: number;
  forms: Form[];
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    other: {
      dream_world: {
        front_default?: string;
        front_female?: string;
      };
      home: {
        front_default?: string;
        front_female?: string;
        front_shiny?: string;
        front_shiny_female?: string;
      };
      "official-artwork": {
        front_default?: string;
        front_shiny?: string;
      };
      showdown: {
        back_default?: string;
        back_female?: string;
        back_shiny?: string;
        back_shiny_female: null;
        front_default?: string;
        front_female?: string;
        front_shiny?: string;
        front_shiny_female?: string;
      };
    };
  };
  types: Type[];
  weight: number;
}
