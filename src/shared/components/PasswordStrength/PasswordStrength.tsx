import { FC, useEffect, useState } from 'react';
import style from './PasswordStrength.module.css';
import { PASSWORD_STRENGTH_COLORS } from '../../types/validation.ts';
import { getPasswordStrength } from '../../lib/utils/helpers.ts';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: FC<PasswordStrengthProps> = ({ password }) => {
  const [strength, setStrength] = useState<number>(0);

  useEffect(() => {
    const computedStrength = getPasswordStrength(password);
    setStrength(computedStrength);
  }, [password]);

  const strengthColor = PASSWORD_STRENGTH_COLORS[strength - 1];

  return (
    <>
      <div className={style.wrapper}>
        <div
          className={style.progress}
          style={{ width: `${strength === 0 ? 1 : strength * 25}%`, backgroundColor: strengthColor }}
        ></div>
      </div>
      <p className={style.label} style={{ color: strengthColor }}>
        {strength === 4 ? 'Strong' : strength === 3 ? 'Medium' : strength === 2 ? 'Weak' : 'Very weak'}
      </p>
    </>
  );
};
