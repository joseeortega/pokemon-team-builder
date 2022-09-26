import AxiosInstance from './axios-client';

export const PARAM_LIMIT = 'limit'
export const PARAM_OFFSET = 'offset'


export const getPokemons = async (pagination : {limit: number, offset: number}) => {

    return AxiosInstance.getInstance().get('pokemon', {
        params: {
          [PARAM_LIMIT]: pagination.limit,
          [PARAM_OFFSET]: pagination.offset,
        },
      });
}