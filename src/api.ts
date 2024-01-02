export const getPokemons = () => {
  return fetch(import.meta.env.VITE_POKE_API_URL).then((r) => r.json());
};
