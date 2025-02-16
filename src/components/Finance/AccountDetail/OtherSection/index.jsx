import React from "react";
import * as S from "../../../../styles/Finance/HandWrite/style.js";
import { useAccountDetail } from "../../../../contexts/AccountDetailContext.jsx";
import AddPhotoAlternate from "../../../../assets/icons/finance/AddPhotoAlternate.svg";

const satisfactionTexts = ["아쉬워요", "그저 그래요", "괜찮아요", "만족해요", "좋아요"];

const OtherSection = () => {
    const { formData, setFormField, modals, imageUrl, handleImageUpload, handleChange } = useAccountDetail();

    return (
        <S.OtherSection>
            <S.InputContainer>
                <S.Label>공개 여부</S.Label>
                <S.ToggleSwitch
                    onClick={() => setFormField("status", !formData.status)}
                    $checked={formData.status}
                >
                    <S.Slider $checked={formData.status} />
                </S.ToggleSwitch>
            </S.InputContainer>

            <S.InputContainer onClick={modals.ratingModal.openModal}>
                <S.StarContainer>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <S.Star key={num}>
                            {num <= formData.score ? "★" : "☆"}
                        </S.Star>
                    ))}
                </S.StarContainer>
                <S.SatisfactionText $bold={formData.score > 0}>{formData.score > 0 ? satisfactionTexts[formData.score - 1] : "(만족도)"}</S.SatisfactionText>
            </S.InputContainer>

            <S.ImageUpload>
                <label htmlFor="image-upload">
                    {imageUrl ? (
                        <S.UploadImage src={imageUrl} alt="업로드 이미지" />
                    ) : (
                        <img src={AddPhotoAlternate} alt="업로드 아이콘" />
                    )}
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </S.ImageUpload>

            <S.Textarea
                placeholder="메모 작성"
                value={formData.content}
                name="content"
                onChange={handleChange}
            />
        </S.OtherSection>
    )
}

export default OtherSection;