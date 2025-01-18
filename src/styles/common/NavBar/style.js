import styled from "styled-components";

export const NavBarWrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    top: 44px;
    left: 5%;
    height: 24px; 
    gap: 6px;
    margin-bottom: 7px;
`;

export const DateSelectContiner = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SelectedDateText = styled.div`
    font-size: 22px;
    font-weight: 600;
    line-height: 22px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

`;

export const DropdownIcon = styled.img`
    cursor: pointer;
`;

export const AlertIcon = styled.img`
    cursor: pointer;
`;