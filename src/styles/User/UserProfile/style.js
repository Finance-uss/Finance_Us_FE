import styled from 'styled-components';

export const ProfileContainer = styled.div`
    position: absolute;
    top: 99px;
    left: 20px;
    display: flex;
    align-items: center;
`;

export const ProfileImage = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 5px;
    object-fit: cover;
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
`;

export const ProfileName = styled.p`
    font-size: 16px;
    margin-bottom: 8px;
`;

export const ProfileAgeJob = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #000000;
    margin: 0 0 8px 0;

    & > span:not(:last-child) {
        margin-right: 8px;
    }
`;

export const ProfileIntro = styled.p`
    font-size: 16px;
    margin-top: 0px;
    color: #000000;
`;
