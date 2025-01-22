import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px; 
    margin-bottom: 20px;
    width: 353px;
`;

export const CategoryLabelWrapper = styled.div`
    display: flex;
    justify-content: space-between; 
    align-items: center;
`;

export const EditableText = styled.span`
    font-family: Pretendard;
    font-size: ${(props) => (props.isMainCategory ? '18px' : '16px')};
    font-weight: ${(props) => (props.isMainCategory ? '600' : '400')};
    color: ${(props) => (props.isMainCategory ? '#333' : '#666')};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

export const EditableInput = styled.input`
    font-family: Pretendard;
    font-size: ${(props) => (props.isMainCategory ? '18px' : '16px')};
    font-weight: ${(props) => (props.isMainCategory ? '600' : '400')};
    color: ${(props) => (props.isMainCategory ? '#333' : '#666')};
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    width: ${(props) => (props.isMainCategory ? '120px' : '100px')}; 
    background: none;
`;

export const MainCategory = styled.span`
    font-weight: 500;
    color: #333;
`;

export const SubCategory = styled.span`
    font-weight: 400; 
    color: #666; 
`;

export const RemoveButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
        
    img {
        width: 20px;
        height: 20px;
    }
`;

export const AmountInputWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 353px;
`;
