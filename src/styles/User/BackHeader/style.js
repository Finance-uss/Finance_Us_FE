import styled from 'styled-components';

export const HeaderContainer = styled.div`
    width: 353px;
    height: 24px;
    padding: 44px 20px 0;
    display: flex;
    align-items: center;
    position: relative; /* BackButton과 Title 위치를 조정하기 위해 사용 */
`;

export const BackButton = styled.button`
    width: 24px;
    height: 24px;
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 20px;
    cursor: pointer;

    img {
        width: 24px;
        height: 24px;
    }
`;

export const Title = styled.h1`
    font-family: 'Pretendard', Arial, sans-serif;
    font-size: 22px;
    font-weight: 700;
    line-height: 22px;
    text-align: center;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin: 0 auto;
    flex: 1; /* 가운데 정렬을 위해 flex 사용 */
`;
