import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    height: auto;
    padding: 44px 20px 24px 20px; // top right bottom left
    gap: 20px;

    /* 크롬, 사파리, 엣지에서 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }

    /* 파이어폭스에서 스크롤바 숨기기 */
    scrollbar-width: none;

    /* IE, Edge에서 스크롤바 숨기기 */
    -ms-overflow-style: none;
`;

export const Today = styled.div`
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
`;