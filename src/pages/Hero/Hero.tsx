import { useLocation, useNavigate } from 'react-router-dom';
import style from './Hero.module.scss';
import { Paths } from 'models/routerTypes';
import { type JSX, useContext } from 'react';
import { ThemeContext } from 'app/store/Themecontext';
import { useGetHeroQuery } from 'shared/api';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from 'vitest';
import { StatusBarHero } from '../../components/StatusBarHero';

export const Hero = (): JSX.Element | undefined => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const locationPath = useLocation();

  const idParam = locationPath.pathname.split('/').pop() ?? '';
  const id = Number(idParam);

  const {
    data: hero,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetHeroQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const handleCloseClick = () => {
    navigate(Paths.base + locationPath.search);
  };

  if (isLoading) {
    return (
      <div
        className={
          isDarkMode ? `${style.wrapper} ${style.wrapper_dark}` : style.wrapper
        }
      >
        <button className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
        <div>Loading hero...</div>
      </div>
    );
  }

  function isFetchBaseQueryError(err: unknown): err is FetchBaseQueryError {
    return typeof err === 'object' && err !== null && 'data' in err;
  }

  interface MessageObj {
    message: string;
  }
  function isMessageObj(obj: unknown): obj is MessageObj {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'message' in obj &&
      typeof (obj as Record<string, unknown>).message === 'string'
    );
  }

  function isSerializedError(err: unknown): err is SerializedError {
    return isMessageObj(err);
  }

  if (isError) {
    let message = 'Unknown error';

    if (isFetchBaseQueryError(error)) {
      const { data } = error;

      if (typeof data === 'string') {
        message = data;
      } else if (isMessageObj(data)) {
        message = data.message;
      }
    } else if (isSerializedError(error)) {
      message = error.message;
    }

    return (
      <div
        className={
          isDarkMode ? `${style.wrapper} ${style.wrapper_dark}` : style.wrapper
        }
      >
        <button className={style.close_btn} onClick={handleCloseClick}>
          &times;
        </button>
        <div>Error loading hero: {message}</div>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  if (hero) {
    const { name, image, gender, species, status, location } = hero;
    const locationName = location?.name;

    return (
      <div
        className={
          isDarkMode ? `${style.wrapper} ${style.wrapper_dark}` : style.wrapper
        }
        data-testid="hero"
      >
        <button
          data-testid="close"
          className={style.close_btn}
          onClick={handleCloseClick}
        >
          &times;
        </button>

        <StatusBarHero
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={error}
          stayVisibleMs={1500}
        />

        <div>
          <img src={image} className={style.hero_img} alt={name} />
        </div>

        <h3 className={style.hero_desc}>{name}</h3>

        {locationName && (
          <p className={style.hero_info}>
            <b>Location:</b> {locationName}
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
    );
  }
};
