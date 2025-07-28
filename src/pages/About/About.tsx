import React from 'react';
import style from './About.module.scss';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../models/routerTypes.ts';

export const About: React.FC = () => {
  return (
    <div className={style.container} data-testid="about-page">
      <h1 className={style.title}>Rick And Morty</h1>
      <h3 className={style.small}>by Maxim Dudaryonok</h3>

      <nav className={style.navbar}>
        <NavLink
          to={Paths.base}
          className={({ isActive }) =>
            isActive ? style.activeLink : style.link
          }
        >
          Home
        </NavLink>
      </nav>

      <p className={style.text}>
        Built with React, React Router, and TypeScript.
      </p>

      <p className={style.text}>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className={style.link}
        >
          RS School
        </a>
        .
      </p>
    </div>
  );
};
