import {
  memo,
  useMemo,
  useState,
  useCallback,
  type JSX,
  useEffect,
} from 'react';
import Select from '../elements/SelectYear';
import SelectSort from '../elements/SelectSort';
import { getAllYears } from '../../utils/getAllYears';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setAllYears, setSelectedYear } from '../../store/slicers/yearSlicer';
import {
  setCountryOrder,
  setPopulationOrder,
} from '../../store/slicers/sortSlicer';
import { setSearchCountry } from '../../store/slicers/countrySlicer';
import {
  COUNTRY_SORT_OPTIONS,
  POPULATION_SORT_OPTIONS,
} from '../../constants/searchPanel';
import type { CountryData } from '../../types/data';
import type { SortOrder } from '../../types/table';
import ModatWidget from '../ModalWidget/ModalWidget';
import './searchPanel.scss';
import SearchCountryInput from '../elements/SearchCountryInput';

type SearchPanelProps = {
  dataCountries: CountryData;
};

function SearchPanel({ dataCountries }: SearchPanelProps): JSX.Element {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state) => state.country.country);
  const selectedYear = useAppSelector((state) => state.year.selectedYear);
  const countryOrder = useAppSelector((state) => state.sort.countryOrder);
  const populationOrder = useAppSelector((state) => state.sort.populationOrder);
  const yearsList = useMemo(() => getAllYears(dataCountries), [dataCountries]);
  useEffect(() => {
    dispatch(setAllYears(getAllYears(dataCountries)));
  }, [dataCountries, dispatch]);

  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const handleSelectedYear = useCallback(
    (value: string) => dispatch(setSelectedYear(+value)),
    [dispatch]
  );

  const handleSelectedOrderCountry = useCallback(
    (value: SortOrder) => {
      dispatch(setCountryOrder(value));
    },
    [dispatch]
  );

  const handleSelectedOrderPopul = useCallback(
    (value: SortOrder) => {
      dispatch(setPopulationOrder(value));
    },
    [dispatch]
  );

  const handleSearchCountry = useCallback(
    (value: string) => dispatch(setSearchCountry(value)),
    [dispatch]
  );

  return (
    <div className="search-panel">
      <div className="search-wrapper">
        <SearchCountryInput
          className="search-wrapper__input"
          value={country}
          onChange={handleSearchCountry}
          placeholder="Search country"
        />

        <Select
          id="select-year"
          className="search-wrapper__select"
          options={yearsList}
          value={selectedYear}
          onChange={handleSelectedYear}
        />
      </div>
      <div className="sort-panel">
        <div className="sort-wrapper">
          <label className="sort-wrapper__label">Sort by:</label>
          <SelectSort
            id="country-order"
            className="sort-wrapper__select"
            options={COUNTRY_SORT_OPTIONS}
            value={countryOrder}
            onChange={handleSelectedOrderCountry}
          />
          <SelectSort
            id="population-order"
            className="sort-wrapper__select"
            options={POPULATION_SORT_OPTIONS}
            value={populationOrder}
            onChange={handleSelectedOrderPopul}
          />
        </div>
        <div className="settings-wrapper">
          <button onClick={() => setIsWidgetOpen(true)}>⚙</button>
        </div>
      </div>
      {isWidgetOpen && <ModatWidget onClose={() => setIsWidgetOpen(false)} />}
    </div>
  );
}

export default memo(SearchPanel);
