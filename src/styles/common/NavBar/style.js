import styled from "styled-components";

export const NavBarWrapper = styled.div`
    position: ${(props) => props.$position || "relative"}; /* ✅ position 속성 추가 */
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: ${(props) => (props.$position === "fixed" ? "calc(100% - 40px)" : "100%")};
    height: 24px; /* ✅ 높이 지정 */
    z-index: 1000;
    margin-top: ${(props) => props.$marginTop || "0px"}
`;

export const Blank = styled.div`
    position: fixed;
    width: 100%;
    height: 44px;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 100;
`;


