import React from 'react';
import style from './List.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '../../models/routerTypes';
import type { HeroResponse } from '../../models';

interface ListProps {
  heroes: HeroResponse[];
}

const List: React.FC<ListProps> = ({ heroes }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = (e: React.SyntheticEvent, id: number) => {
    e.stopPropagation();
    navigate(`${Paths.hero}${id}${location.search}`);
  };

  return (
    <ul className={style.search_list}>
      {heroes.map((hero) => (
        <li
          key={hero.id}
          data-testid={`card-${hero.id}`}
          className={style.card}
          onClick={(e) => handleCardClick(e, hero.id)}
        >
          <img src={hero.image} className={style.hero_img} alt={hero.name} />
          <h3 className={style.hero_desc} data-testid="cardItem">
            {hero.name}
          </h3>
          <p className={style.hero_desc}>Location: {hero.location.name}</p>
        </li>
      ))}
    </ul>
  );
};

export { List };
