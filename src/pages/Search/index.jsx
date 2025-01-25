import React, { useState } from 'react';
import SearchBar from '../../components/Community/SearchBar';
import RecentSearch from '../../components/Community/Search/RecentSearch';
import { Container } from '../../styles/Community/Search/style'

const Search = () => {
 
    return (
        <Container>
            <SearchBar/>
            <RecentSearch/>
        </Container>
    );
};

export default Search;
