import './SearchBlock.styles.scss';

import { useEffect, useState } from 'react';

import StreetcodesApi from '@/app/api/streetcode/streetcodes.api';
import StreetcodeFilterRequestDTO, { StreetcodeFilterResultDTO } from '@/models/filters/streetcode-filter.model';

import SearchResultItem from './SearchResultItem/SearchItem.component';

interface Props {
    searchQuery: string;
}
const SearchBlock = ({ searchQuery } : Props) => {
    const [searchResult, setSearchResult] = useState<StreetcodeFilterResultDTO[]>([]);

    useEffect(() => {
        if (searchQuery.length === 0) {
            setSearchResult([]);
            return;
        }

        const filter: StreetcodeFilterRequestDTO = { searchQuery };

        StreetcodesApi.getByFilter(filter)
            .then((response: StreetcodeFilterResultDTO[]) => {
                setSearchResult(response);
            });
    }, [searchQuery]);

    return (
        <div className="searchResultsBlock">
            {searchResult.map((searchResultItem: StreetcodeFilterResultDTO) => (
                <SearchResultItem searchResultItem={searchResultItem} />
            ))}
        </div>
    );
};

export default SearchBlock;
