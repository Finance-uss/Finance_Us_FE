import styled from 'styled-components';

export const SettingContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    margin: 0 auto;
`;

export const Title = styled.p`
    font-size: 18px;
    font-weight: bold;
    line-height: 18px;
    margin-bottom: 20px;
    text-align: left;
    width: 100%;
`;

export const ButtonGroup = styled.div.attrs((props) => ({
    "data-multi-row": props.multiRow || false, // multiRow를 data-* 속성으로 전달
}))`
    display: flex;
    flex-wrap: ${(props) => (props.multiRow ? 'wrap' : 'nowrap')}; /* 다줄 처리 */
    justify-content: center;
    gap: 20px;
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
    width: 185px; /* 나중에 수정 */
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
