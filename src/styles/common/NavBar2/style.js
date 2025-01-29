import styled from "styled-components";

export const NavBarWrapper = styled.div`
    position: relative; // 화면하고 같이 스크롤 되도록 수정하기
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 24px; /* ✅ 높이 지정 */
    z-index: 1000;
    margin-top: ${(props) => props.$marginTop || "0px"};
`;
