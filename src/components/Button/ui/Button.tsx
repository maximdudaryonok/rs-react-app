import { ThemeContext } from 'app/store/Themecontext';
import { type JSX, type ReactNode, useContext } from 'react';
import style from './Button.module.scss';

const Button: ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => JSX.Element = ({ children, onClick }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <button
      className={
        isDarkMode ? `${style.button} ${style.button_dark}` : style.button
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
