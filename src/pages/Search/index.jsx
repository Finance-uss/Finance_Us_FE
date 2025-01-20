import React, { useState } from 'react';
import SearchBar from '../../components/Community/SearchBar';
import SearchResult from './SearchResult';

import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
`;

const Search = () => {
 
    return (
        <Container>
            <SearchBar/>
            <SearchResult/>
        </Container>
    );
};

export default Search;
