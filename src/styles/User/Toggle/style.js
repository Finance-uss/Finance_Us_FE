import styled from 'styled-components';

export const ToggleLabel = styled.label`
    position: absolute; /* 절대 위치로 설정 */
    right: 0; /* 화면 오른쪽에서 20px 떨어짐 */
    top: 50%; /* 수직 중앙 정렬 */
    transform: translateY(-50%); /* 정확히 중앙에 배치 */
    display: inline-block;
    width: 52px;
    height: 30px;
`;

export const ToggleInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

export const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 4px; /* before 원형 요소의 위치 조정 */
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;

    /* 원형 요소 렌더링 */
    &::before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 2px; /* 초기 위치 */
        bottom: 2px; /* 초기 위치 */
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }
`;

/* checked 상태 스타일 */
export const StyledToggleInput = styled(ToggleInput)`
    &:checked + ${Slider} {
        background-color: #4caf50;
    }

    &:checked + ${Slider}::before {
        transform: translateX(22px);
    }
`;
