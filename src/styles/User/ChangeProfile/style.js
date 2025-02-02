import styled from 'styled-components';

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 107px;
    height: 141px;
`;

export const ProfileText = styled.div`
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
`;

export const ProfileButton = styled.button`
    width: 107px;
    height: 107px;
    border: none;
    background: none;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const ProfileImage = styled.img`
    width: 107px;
    height: 107px;
    border-radius: 5px;
    object-fit: cover; /* 이미지를 버튼 안에 맞추기 */
`;

export const HiddenInput = styled.input`
    display: none;
`;