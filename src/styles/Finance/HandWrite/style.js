import styled from "styled-components";

export const TextSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
`;

export const OtherSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const InputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center; /* 세로 정렬 */
    justify-content: space-between; /* 가로 정렬 */
    height: 19px;
`;

export const Label = styled.label`
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
`;

export const Input = styled.input`
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    border: 0;
    color: #000000;
    text-align: right;

    &::placeholder {
        color: #B4B4B4;
    }

    /* 화살표 제거 */
    -moz-appearance: textfield; /* Firefox */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* ✅ 클릭(포커스) 시 테두리 제거 */
    &:focus {
        outline: none;
        border: none;
        box-shadow: none;
    }
`;

export const Line = styled.div`
    position: relative;
    width: 100%;
    height: 0.5px;
    background-color: #D7D8D9;
    margin-top: 20px;
    margin-bottom: 9.5px;
`;

export const ToggleSwitch = styled.div`
    position: relative;
    display: inline-block;
    width: 52px;
    height: 30px;
    background-color: ${(props) => (props.$checked ? "#35C75A" : "#ccc")};
    border-radius: 20px;
    transition: background-color 0.4s ease;
    cursor: pointer;
`;

export const Slider = styled.span`
    position: absolute;
    top: 2px;
    left: 2px;
    width: 26px;
    height: 26px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.4s ease;
    transform: ${(props) => (props.$checked ? "translateX(20px)" : "translateX(0)")};
`;

export const StarContainer = styled.div`
    display: flex;
    gap: 5px;
`;

export const Star = styled.span`
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    color: "#142755";
    cursor: pointer;
`;

export const SatisfactionText = styled.p`
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${(props) => (props.$bold ? "#000" : "#B4B4B4")};
    margin: 0;
`;

export const ImageUpload = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    background-color: #F7F7F7;
    box-shadow: 0px 0px 3px 0px #00000040;

    &:hover {
        border-color: #888;
    }

    label {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer
    }

    input {
        display: none;
    }
`;

export const UploadImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
`;


export const Textarea = styled.textarea`
    position: relative;
    width: calc(100% - 20px);
    padding: 10px;
    border: 0;
    border-radius: 5px;
    height: 115px;
    margin-bottom: 40px;
    background-color: #F7F7F7;
    box-shadow: 0px 0px 3px 0px #00000040;

    /* ✅ 클릭(포커스) 시 테두리 제거 */
    &:focus {
        outline: none;
        box-shadow: none;
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: calc(100% - 40px);
    height: 100%;
    padding: 0px 20px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 1000;
`;

export const Blank1 = styled.div`
    position: fixed;
    top: ${(props) => props.$top}px;
    width: calc(100% - 40px);
    left: 20px;
    height: 33px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: white;
`;

export const Blank2 = styled.div`
    position: relative;
    display: block;
    width: 100%;
    min-height: 13px;
    height: 13px;
    background-color: white;
    color: white;
`;

export const ModalLine = styled.div`
    position: fixed;
    top: ${(props) => props.$top + 20}px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 5px;
    background-color: #D9D9D9;
    color: #D9D9D9;
    border-radius: 100px;
    border: none;

    cursor: pointer; /* ✅ 클릭 가능하도록 설정 */
    
`;

export const ContentWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-height: 481px;
    overflow: hidden;
`;

export const ModalContent = styled.div`
    width: 100%;
    height: auto;
    background: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    text-align: center;
    z-index: 1001;
    overflow-y: auto;

    -ms-overflow-style: none;  /* ✅ IE, Edge에서 스크롤바 숨기기 */
    scrollbar-width: none;  /* ✅ Firefox에서 스크롤바 숨기기 */

    &::-webkit-scrollbar {
        display: none; /* ✅ Chrome, Safari에서 스크롤바 숨기기 */
    }
`;

export const ModalTitle = styled.h3`
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    color: #000000;
    margin-bottom: 15px;
`;

export const MainCategory = styled.div`
    width: 90%;
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    text-align: left;
    margin-bottom: 20px;
`;

export const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px 0;
    border-bottom: 2px solid #f0f0f0; /* ✅ 밑줄 추가 */
    
    &:last-child {
        border-bottom: none; /* ✅ 마지막 요소에는 밑줄 제거 */
    }
`;

export const SubCategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
    row-gap: 20px;
`;

export const SubCategoryButton = styled.button`
    background-color: ${(props) => (props.$selected ? "#142755" : "#f0f0f0")};
    color: ${(props) => (props.$selected ? "white" : "#000")};
    border: none;
    padding: 0px;
    width: 25%;
    margin-right: 12.5%;
    height: 29px;
    border-radius: 5px;

    cursor: pointer;
    font-weight: 400;
    font-size: clamp(12px, 1vw, 16px);
    line-height: 19px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap; /* ✅ 줄바꿈 방지 */
    overflow: hidden; /* ✅ 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* ✅ 너무 긴 경우 말줄임표 (...) 추가 */
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);

    &:nth-child(3n) {
        margin-right: 0px; /* ✅ 3의 배수인 버튼의 margin-right을 제거 */
    }
`;

export const ModalStar = styled.span`
    font-weight: 500;
    font-size: 40px;
    line-height: 40px;
    color: "#142755";
    cursor: pointer;
`;

export const ModalSatisfactionText = styled.p`
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    min-height: 18px;
    color: #142755;
    display: flex;
    align-items: center;
    justify-content: center;
`;