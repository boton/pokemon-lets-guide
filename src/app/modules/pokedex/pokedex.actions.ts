import { ActionCreator } from '../../../definitions/action-creator';

import {
  POKEDEX_CREATE,
  POKEDEX_FILTER,
  POKEDEX_LOAD_MORE,
  POKEDEX_RESET_FILTERS,
  POKEDEX_SORT,
} from '../../../constants/actionTypes';

import { createPokemonCollectionFromPokeLab } from './pokedex.models';

export const createPokedex: ActionCreator = () => dispatch => {
  // Send them to the store
  dispatch({
    payload: {
      collection: createPokemonCollectionFromPokeLab(),
    },
    type: POKEDEX_CREATE,
  });
};

interface ISort {
  sortBy: string;
  order: string;
}

export const sortPokedex: ActionCreator = (sort: ISort) => dispatch => {
  dispatch({
    payload: {
      sort,
    },
    type: POKEDEX_SORT,
  });
};

export const loadMorePokedex: ActionCreator = () => dispatch => {
  dispatch({
    type: POKEDEX_LOAD_MORE,
  });
};

interface IFilters {
  name: string;
  value: string | string[] | boolean;
}

export const filterPokedex: ActionCreator = (filters: IFilters[]) => dispatch => {
  dispatch({
    payload: { filters },
    type: POKEDEX_FILTER,
  });
};

export const resetPokedexFilters: ActionCreator = () => dispatch => {
  dispatch({
    type: POKEDEX_RESET_FILTERS,
  });
};
