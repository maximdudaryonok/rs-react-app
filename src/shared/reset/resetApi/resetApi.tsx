import { useDispatch } from 'react-redux';
import { heroesApi } from '../../api/heroesApi/heroesApi.ts';
import style from './resetApi.module.scss';

export function AdminControls() {
  const dispatch = useDispatch();

  const handleInvalidate = () => {
    dispatch(heroesApi.util.invalidateTags(['Hero', 'HeroList']));
  };

  const handleReset = () => {
    dispatch(heroesApi.util.resetApiState());
  };

  return (
    <>
      <button className={style.refetchButton} onClick={handleInvalidate}>
        Refresh All Heroes
      </button>

      <button className={style.refetchButton} onClick={handleReset}>
        Reset Heroes Cache
      </button>
    </>
  );
}
