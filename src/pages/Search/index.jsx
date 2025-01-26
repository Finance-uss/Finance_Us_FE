import React, { useState } from 'react';
import SearchBar from '../../components/Community/SearchBar';
import RecentSearch from '../../components/Community/Search/RecentSearch';

const Search = () => {
 
    return (
        <>
            <SearchBar/>
            <RecentSearch/>
        </>
    );
};

export default Search;
