import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSwipe } from '../../../../hooks/useSwipe';
import useApi from '../../../../hooks/useApi';
import DeleteConfirmModal from '../DeleteConfirmModal';

const SwipeableCard = ({ 
    children, 
    onSwipeStart,
    onSwipeEnd, 
    onClick, 
    itemId, 
    boxShadow, 
    borderRadius, 
    paddingLeft, 
    onDeleteSuccess,
    activeSwipeId 
}) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { request, loading } = useApi();
    const { translateX, isSwiping, handlers, resetSwipe } = useSwipe(onSwipeStart, onSwipeEnd, onClick);

    useEffect(() => {
        if (activeSwipeId !== itemId && translateX !== 0) {
            resetSwipe();
        }
    }, [activeSwipeId, itemId, translateX, resetSwipe]);

    // 실제 삭제를 처리하는 함수
    const handleDelete = async () => {
        try {
            await request({
                method: "DELETE",
                url: `/api/account/${itemId}`,
            });

            setIsDeleteModalOpen(false);
            onSwipeEnd && onSwipeEnd(); // UI 업데이트를 위한 콜백 호출
            resetSwipe();
            if (onDeleteSuccess) {
                onDeleteSuccess();
            }
        } catch (error) {
            console.error("삭제 중 오류 발생", error);
        }
    };

    return (
        <Wrapper 
            $boxShadow={boxShadow}
            $borderRadius={borderRadius}
        >
            <DeleteArea 
                onClick={() => setIsDeleteModalOpen(true)}
                $borderRadius={borderRadius}
            >
                삭제
            </DeleteArea>
            <CardContent 
                $translateX={translateX} 
                $isSwiping={isSwiping}
                $paddingLeft={paddingLeft}
                onMouseDown={onSwipeStart}
                onTouchStart={onSwipeStart}
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
    border-radius: ${({ $borderRadius }) => $borderRadius || '0px'};
    height: 90px;
    overflow: hidden;
    box-shadow: ${({ $boxShadow }) => $boxShadow || 'none'};
`;

const DeleteArea = styled.div`
    position: absolute;
    top: 1px;
    right: 1px;
    bottom: 1px;
    width: 62px;
    border-radius: ${({ $borderRadius = '0px' }) => `0px ${$borderRadius} ${$borderRadius} 0px`};
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
    width: calc(100% - 16px - ${({ $paddingLeft = '16px' }) => $paddingLeft});
    height: 50px;
    padding: 20px 16px 20px ${({ $paddingLeft = '16px' }) => $paddingLeft};
    transform: translateX(${props => props.$translateX}px);
    transition: ${props => (props.$isSwiping ? 'none' : 'transform 0.3s ease')};
`;