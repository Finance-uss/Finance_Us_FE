import React, { useState } from 'react';
import styled from 'styled-components';
import { useSwipe } from '../../../../hooks/useSwipe';
import DeleteConfirmModal from '../DeleteConfirmModal';

const SwipeableCard = ({ children, onSwipeEnd }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { translateX, isSwiping, handlers } = useSwipe(onSwipeEnd);

    // 실제 삭제를 처리하는 함수
    const handleDelete = () => {
        console.log('삭제');
        setIsDeleteModalOpen(false);
    };

    return (
        <Wrapper>
            <DeleteArea onClick={() => setIsDeleteModalOpen(true)}>
                삭제
            </DeleteArea>
            <CardContent 
                $translateX={translateX} 
                $isSwiping={isSwiping} 
                {...handlers}
            >
                {children}
            </CardContent>
            {/* 삭제 확인 모달 */}
            {isDeleteModalOpen && (
                <DeleteConfirmModal
                title="가계부를 삭제하시겠습니까?"
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                />
            )}
        </Wrapper>
    );
};

export default SwipeableCard;

const Wrapper = styled.div`
    position: relative;
    background-color: #F7F7F7;
    border-radius: 5px;
    height: 90px;
    overflow: hidden;
`;

const DeleteArea = styled.div`
    position: absolute;
    top: 0;
    right: 1px;
    bottom: 1px;
    width: 62px;
    border-radius: 0 5px 5px 0;
    background-color: #F17357;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardContent = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: #F7F7F7;
    width: calc(100% - 32px);
    height: 50px;
    padding: 20px 16px;
    transform: translateX(${props => props.$translateX}px);
    transition: ${props => (props.$isSwiping ? 'none' : 'transform 0.3s ease')};
`;