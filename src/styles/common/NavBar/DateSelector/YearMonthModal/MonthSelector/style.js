import styled from "styled-components";

export const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100px;
    height: 170px;
    gap: 4px;
    overflow-y: scroll;
    position: relative;

    /* 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE, Edge */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Edge */
    }
`;

export const ListItem = styled.li`
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({ $isSelected }) => ($isSelected ? "bold" : "normal")};
    opacity: ${({ $isSelected }) => ($isSelected ? 1 : 0.4)};
`;