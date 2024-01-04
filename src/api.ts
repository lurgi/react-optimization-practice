export const getPokemons = () => {
  return fetch(import.meta.env.VITE_POKE_API_URL)
    .then((r) => r.json())
    .catch((e) => {
      throw new Error(e.message);
    });
};

export const getPokemonNameById = (id: string) => {
  return fetch(import.meta.env.VITE_POKE_SPECIES_URL + `${id}/`)
    .then((r) => r.json())
    .catch((e) => {
      throw new Error(e.message);
    });
};
