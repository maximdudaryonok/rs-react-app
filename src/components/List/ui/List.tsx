import React, { FC, SyntheticEvent, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { HeroResponse } from '../../../models';
import { Paths } from '../../../models/routerTypes';
import style from './List.module.scss';
import { ThemeContext } from 'app/store/Themecontext';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  addFavourite,
  removeFavourite,
} from 'features/controlFavoriteMovies/slices/favoriteSlice';
import { getFavourites } from 'features/controlFavoriteMovies';

interface ListProps {
  heroes: HeroResponse[];
}

const List: FC<ListProps> = ({ heroes }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const favourites = useSelector(getFavourites);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = (e: SyntheticEvent, id: number) => {
    e.stopPropagation();
    navigate(`${Paths.hero}${id}${location.search}`);
  };

  const handleFavouriteChange = (e: SyntheticEvent, hero: HeroResponse) => {
    e.stopPropagation();
    const isAlreadyFav = favourites.heroes.some((h) => h.id === hero.id);
    const item = {
      id: hero.id,
      name: hero.name,
      status: hero.status,
      species: hero.species,
      gender: hero.gender,
      location: { name: hero.location.name },
      image: hero.image,
    };

    if (isAlreadyFav) {
      dispatch(removeFavourite(item));
    } else {
      dispatch(addFavourite(item));
    }
  };

  return (
    <ul className={style.search_list}>
      {heroes.map((hero) => (
        <li
          key={hero.id}
          data-testid={`card-${hero.id}`}
          className={
            isDarkMode ? `${style.card} ${style.card_dark}` : style.card
          }
          onClick={(e) => handleCardClick(e, hero.id)}
        >
          <img src={hero.image} className={style.hero_img} alt={hero.name} />
          <h3 data-testid="cardItem" className={style.hero_desc}>
            {hero.name}
          </h3>
          <p className={style.hero_desc}>Location: {hero.location.name}</p>
          <div className={style.checkbox_wrapper}>
            <input
              type="checkbox"
              className={style.checkbox}
              checked={favourites.heroes.some((h) => h.id === hero.id)}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleFavouriteChange(e, hero)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export { List };
