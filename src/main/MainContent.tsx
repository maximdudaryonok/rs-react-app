import { use, type JSX } from 'react';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ResultTable from '../components/ResultTable/ResultTable';
import { dataPromise } from '../api/getData';

function MainContent(): JSX.Element {
  const dataCountries = use(dataPromise);
  return (
    <div className="table-wrapper">
      <SearchPanel dataCountries={dataCountries} />
      <ResultTable dataCountries={dataCountries} />
    </div>
  );
}
export default MainContent;
