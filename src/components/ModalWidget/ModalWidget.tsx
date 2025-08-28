import { useCallback, type JSX } from 'react';
import { addonInformValues } from '../../constants/config';
import './modalWidget.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleField } from '../../store/slicers/fieldsSlicer';

type ModatWidgetProps = {
  onClose: () => void;
};

function ModatWidget({ onClose }: ModatWidgetProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const selectedFields = useAppSelector((state) => state.fields.selectedFields);

  const toggleCard = useCallback(
    (value: string): void => {
      dispatch(toggleField(value));
    },
    [dispatch]
  );

  return (
    <div className="widget">
      <div className="widget-header">
        <button className="widget-close" onClick={onClose}>
          X
        </button>
      </div>

      <div className="widget-wrapper">
        {addonInformValues.map((item) => (
          <label className="widget-wrapper__item" key={item}>
            {item}
            <input
              type="checkbox"
              value={item}
              checked={selectedFields.includes(item)}
              onChange={() => toggleCard(item)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default ModatWidget;
