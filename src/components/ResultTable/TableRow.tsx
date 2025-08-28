import { memo, useMemo, type JSX } from 'react';
import type { CountryInfo } from '../../types/data';
import { getDataForYear } from '../../utils/getDataForYear';
import { defaultTableFields } from '../../constants/config';

type Props = {
  countryName: string;
  countryInfo: CountryInfo;
  selectedYear: number;
  selectedFields: string[];
};

function TableRow({
  countryName,
  countryInfo,
  selectedYear,
  selectedFields,
}: Props): JSX.Element {
  const dataForSelectedYear = useMemo(
    () => getDataForYear(countryInfo, selectedYear),
    [countryInfo, selectedYear]
  );

  const defaultFieldsMemo = useMemo(() => {
    return defaultTableFields.map((field) => {
      if (field === 'ISO') {
        return <td key="ISO">{countryInfo.iso_code ?? 'N/A'}</td>;
      }
      if (field === 'Country') {
        return <td key="Country">{countryName}</td>;
      }
      if (field === 'population') {
        return <td key="population">{dataForSelectedYear[field] || 'N/A'}</td>;
      }
      if (field === 'year') {
        return <td key="year">{dataForSelectedYear[field] || 'N/A'}</td>;
      }
      {
        return (
          <td key={field}>
            {dataForSelectedYear[field] !== undefined
              ? dataForSelectedYear[field].toFixed(4)
              : 'N/A'}
          </td>
        );
      }
    });
  }, [countryInfo, countryName, dataForSelectedYear]);

  const selectedFieldsMemo = useMemo(() => {
    return selectedFields.map((field) => (
      <td key={field}>
        {dataForSelectedYear[field] !== undefined
          ? dataForSelectedYear[field].toFixed(4)
          : 'N/A'}
      </td>
    ));
  }, [selectedFields, dataForSelectedYear]);

  return <tr>{[...defaultFieldsMemo, ...selectedFieldsMemo]}</tr>;
}

export default memo(TableRow);
