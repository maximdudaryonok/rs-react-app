import type { RootState } from 'app/providers/storeProvider';
import type { FavouriteShema } from '../types/favoriteTypes';

const getFavourites = (state: RootState): FavouriteShema => {
  return state.favourite;
};

export { getFavourites };
