import { useLocation, useNavigate } from 'react-router-dom';
import type { HeroResponse } from 'models/index';
import { Paths } from 'models/routerTypes';
import style from './Hero.module.scss';
import { useEffect, useState } from 'react';
import { getSingleHero } from '../../utils/api/get-data.ts';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Hero = () => {
  const navigate = useNavigate();
  const locationPath = useLocation();
  const [hero, setHero] = useState<HeroResponse>();
  const [loading, setLoading] = useState(true);

  const getData = async (id: string) => {
    setLoading(true);
    try {
      const [data] = await Promise.all([getSingleHero(id), sleep(1000)]);

      setHero(data);
    } catch {
      setHero(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const parts = locationPath.pathname.split('/');
    const id = parts[parts.length - 1];

    getData(id);
  }, [locationPath]);

  const handleCloseClick = () => {
    navigate(Paths.base + locationPath.search);
  };

  if (loading) {
    return (
      <div className={style.wrapper}>
        <button className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
        <div>Loading...</div>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className={style.wrapper}>
        <button className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
        <div>Failed to load hero.</div>
      </div>
    );
  }

  const { name, image, gender, species, status, location: loc } = hero;

  return (
    <>
      <div className={style.overlay} onClick={handleCloseClick} />
      <div className={style.wrapper} data-testid="hero">
        <button
          data-testid="close"
          className={style.close_btn}
          onClick={handleCloseClick}
        >
          &times;
        </button>

        <div>
          <img src={image} className={style.hero_img} alt={name} />
        </div>
        <h3 className={style.hero_desc}>{name}</h3>

        {loc?.name && (
          <p className={style.hero_info}>
            <b>Location:</b> {loc.name}
          </p>
        )}
        {gender && (
          <p className={style.hero_info}>
            <b>Gender:</b> {gender}
          </p>
        )}
        {species && (
          <p className={style.hero_info}>
            <b>Species:</b> {species}
          </p>
        )}
        {status && (
          <p className={style.hero_info}>
            <b>Status:</b> {status}
          </p>
        )}
      </div>
    </>
  );
};

export { Hero };
