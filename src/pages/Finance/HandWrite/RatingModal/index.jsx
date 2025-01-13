import React from 'react';
import * as S from '../../../../styles/Finance/HandWrite/style';
import line from '../../../../assets/icons/finance/Line.svg';

const satisfactionTexts = ["아쉬워요", "그저 그래요", "괜찮아요", "만족해요", "좋아요"];

const RatingModal = ({ isOpen, onClose, rating, setRating }) => {
    if (!isOpen) return null;

    return (
        <S.ModalOverlay>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                {/* ✅ 모달 닫기 버튼 */}
                <S.ModalLine src={line} alt="닫기 버튼" onClick={onClose} />

                <S.ModalTitle>만족도 설정</S.ModalTitle>
                
                {/* ⭐ 별점 선택 UI */}
                <S.StarContainer>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <S.ModalStar key={num} onClick={() => setRating(num)} $filled={num <= rating}>
                            ★
                        </S.ModalStar>
                    ))}
                </S.StarContainer>

                {/* 선택된 만족도 텍스트 */}
                <S.ModalSatisfactionText>
                    {rating > 0 ? satisfactionTexts[rating - 1] : " "}
                </S.ModalSatisfactionText>
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default RatingModal;
