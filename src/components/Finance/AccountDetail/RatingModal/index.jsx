import React from "react";
import * as S from "../../../../styles/Finance/HandWrite/style.js";
import { useAccountDetail } from "../../../../contexts/AccountDetailContext.jsx";

const satisfactionTexts = ["아쉬워요", "그저 그래요", "괜찮아요", "만족해요", "좋아요"];

const RatingModal = () => {
    const { formData, setFormField, modals } = useAccountDetail();
    if (!modals.ratingModal.isOpen) return null;

    return (
        <S.ModalOverlay onClick={modals.ratingModal.closeModal}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <S.ModalLine onClick={modals.ratingModal.closeModal} />
                <S.ModalTitle>만족도 설정</S.ModalTitle>
                <S.StarContainer>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <S.ModalStar
                            key={num}
                            onClick={() => setFormField("score", num)}
                        >
                            {num <= formData.score ? "★" : "☆"}
                        </S.ModalStar>
                    ))}
                </S.StarContainer>
                <S.ModalSatisfactionText>
                    {formData.score > 0 ? satisfactionTexts[formData.score - 1] : ""}
                </S.ModalSatisfactionText>
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default RatingModal;
