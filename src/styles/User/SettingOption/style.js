import styled from 'styled-components';

export const SettingContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
`;

export const Title = styled.p`
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
`;

export const ButtonGroup = styled.div.attrs((props) => ({
    "data-multi-row": props.multiRow || false, // multiRow를 data-* 속성으로 전달
}))`
    display: flex;
    flex-wrap: ${(props) => (props.multiRow ? 'wrap' : 'nowrap')}; /* 다줄 처리 */
    justify-content: center;
    gap: 15px;
    width: 100%;

    /* 다줄 레이아웃일 경우 버튼 정렬 */
    ${(props) =>
        props.multiRow &&
        `
        justify-content: center;
        row-gap: 16px;
    `}
`;

export const Button = styled.button`
    flex: 1 0 calc(50% - 7.5px); /* 부모 컨테이너의 50% 너비 */
    max-width: calc(50% - 7.5px); /* 최대 너비 설정 */
    height: 32px;
    border-radius: 5px;
    background-color: #f7f7f7;
    border: none;
    box-shadow: 0px 0px 1px #5C5C5C;
    font-size: 16px;
    text-align: center;
    color: #000000;
    cursor: pointer;
    font-family: 'Pretendard', Arial, sans-serif;
    padding: 0;
    margin: 0;
`;
