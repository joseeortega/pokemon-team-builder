import PokeAxiosInstance from "./PokeAxiosClient";

export const PARAM_LIMIT = "limit";
export const PARAM_OFFSET = "offset";

export const getPokemons = async (pagination: {
  limit: number;
  offset: number;
}) => {
  return PokeAxiosInstance.getInstance().get("pokemon", {
    params: {
      [PARAM_LIMIT]: pagination.limit,
      [PARAM_OFFSET]: pagination.offset,
    },
  });
};

export const getPokemon = async (name: string) => {
  return PokeAxiosInstance.getInstance().get(`pokemon/${name}`);
};

export const getTypes = async () => {
  return PokeAxiosInstance.getInstance().get(`type`);
};
