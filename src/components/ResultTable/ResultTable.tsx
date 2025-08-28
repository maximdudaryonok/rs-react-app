import { memo, useMemo, type JSX } from 'react';
import { useAppSelector } from '../../hooks/redux';
import TableRow from './TableRow';
import { getDataForYear } from '../../utils/getDataForYear';
import type { CountryData } from '../../types/data';
import { defaultTableFields } from '../../constants/config';
import './tableStyle.scss';

type ResultTableProps = {
  dataCountries: CountryData;
};

function ResultTable({ dataCountries }: ResultTableProps): JSX.Element {
  const country = useAppSelector((state) => state.country.country);
  const selectedYear = useAppSelector((state) => state.year.selectedYear);
  const countryOrder = useAppSelector((state) => state.sort.countryOrder);
  const populationOrder = useAppSelector((state) => state.sort.populationOrder);
  const selectedFields = useAppSelector((state) => state.fields.selectedFields);

  const countries = useMemo(() => {
    let filteredData = Object.entries(dataCountries);

    if (selectedYear) {
      filteredData = filteredData.filter(([, countryInfo]) =>
        countryInfo.data.some((item) => item.year === selectedYear)
      );
    }

    if (country && country.trim() !== '') {
      filteredData = filteredData.filter(([countryName]) =>
        countryName.toLowerCase().includes(country.toLowerCase())
      );
    }

    filteredData = filteredData.sort(([countryA, dataA], [countryB, dataB]) => {
      if (countryOrder) {
        return countryOrder === 'asc'
          ? countryA.localeCompare(countryB)
          : countryB.localeCompare(countryA);
      }

      if (populationOrder) {
        const A = getDataForYear(dataA, selectedYear).population ?? 0;
        const B = getDataForYear(dataB, selectedYear).population ?? 0;

        return populationOrder === 'asc' ? A - B : B - A;
      }

      return 0;
    });
    return filteredData;
  }, [dataCountries, selectedYear, country, countryOrder, populationOrder]);
  const rowsMemo = useMemo(() => {
    return countries.map(([countryName, countryInfo]) => (
      <TableRow
        key={countryName}
        countryName={countryName}
        countryInfo={countryInfo}
        selectedYear={selectedYear}
        selectedFields={selectedFields}
      />
    ));
  }, [countries, selectedYear, selectedFields]);

  const headerMemo = useMemo(
    () => (
      <tr>
        {defaultTableFields.map((field) => (
          <th key={field}>{field}</th>
        ))}
        {selectedFields.map((field) => (
          <th key={field}>{field}</th>
        ))}
      </tr>
    ),
    [selectedFields]
  );
  return (
    <table>
      <thead>{headerMemo}</thead>
      <tbody>{rowsMemo}</tbody>
    </table>
  );
}

export default memo(ResultTable);
