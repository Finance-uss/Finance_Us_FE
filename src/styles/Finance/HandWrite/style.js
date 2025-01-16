import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center; /* 세로 정렬 */
    justify-content: space-between; /* 가로 정렬 */
`;

export const Label = styled.label`
    font-size: 14px;
    color: #333;
`;

export const Input = styled.input`
    padding: 10px;
    border: 0;
    text-align: right;

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

export const ToggleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ToggleSwitch = styled.div`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: ${(props) => (props.$checked ? "#35C75A" : "#ccc")};
    border-radius: 20px;
    transition: background-color 0.4s ease;
    cursor: pointer;
`;

export const Slider = styled.span`
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
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
    color: ${(props) => (props.$filled ? "#142755" : "#ccc")};
    cursor: pointer;
`;

export const SatisfactionText = styled.p`
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${(props) => (props.$bold ? "#000" : "#B4B4B4")};
`;

export const ImageUpload = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ImagePlaceholder = styled.div`
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #ccc;
`;

export const UploadedImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 5px;
    object-fit: cover;
`;

export const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 100px;

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
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;

export const ModalLine = styled.img`
    width: 40%;
    height: 5px;

    cursor: pointer; /* ✅ 클릭 가능하도록 설정 */
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: fit-content;
    background: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px 0px;
    text-align: center;
    
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
    margin: 0;
`;

export const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 66px;
    height: 66px;
    padding: 20px 0;
    border-bottom: 2px solid #f0f0f0; /* ✅ 밑줄 추가 */
    
    &:last-child {
        border-bottom: none; /* ✅ 마지막 요소에는 밑줄 제거 */
    }
`;

export const SubCategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
`;

export const SubCategoryButton = styled.button`
    background-color: ${(props) => (props.$selected ? "#142755" : "#f0f0f0")};
    color: ${(props) => (props.$selected ? "white" : "#000")};
    border: none;
    width: 25%;
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
`;

export const ModalStar = styled.span`
    font-weight: 500;
    font-size: 40px;
    line-height: 40px;
    color: ${(props) => (props.$filled ? "#142755" : "#ccc")};
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