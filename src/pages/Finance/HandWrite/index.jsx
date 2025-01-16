import React, {useState} from 'react';
import * as S from '../../../styles/Finance/HandWrite/style';
import FinanceButton from '../../../components/common/FinanceButton';
import SubmitButton from '../../../components/common/SubmitButton';
import CategoryModal from './CategoryModal';
import AssetModal from './AssetModal';
import RatingModal from './RatingModal';
import useModal from '../../../hooks/useModal';

const satisfactionTexts = ["아쉬워요", "그저 그래요", "괜찮아요", "만족해요", "좋아요"];

const HandWrite = () => {
    const [activeButton, setActiveButton] = useState("expense");
    const [date, setDate] = useState("20xx년 00월 00일");
    const [category, setCategory] = useState("");
    const [asset, setAsset] = useState("");
    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [rating, setRating] = useState(0);
    const [memo, setMemo] = useState("");
    const [image, setImage] = useState(null);

    // 모달 상태
    const categoryModal = useModal();
    const assetModal = useModal();
    const ratingModal = useModal();

    // 이미지 업로드 핸들러
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <S.Container>
            {/* 지출/수익 버튼 */}
            <FinanceButton activeButton={activeButton} setActiveButton={setActiveButton} />

            {/* 입력 필드 */}
            <S.InputContainer>
                <S.Label>일자</S.Label>
                <S.Input type="text" value={date} readOnly />
            </S.InputContainer>
            
            {/* 카테고리 선택 필드 */}
            <S.InputContainer onClick={categoryModal.openModal}>
                <S.Label>카테고리</S.Label>
                <S.Input type="text" placeholder="(카테고리)" value={category} readOnly />
            </S.InputContainer>

            {/* 자산 선택 필드 */}
            <S.InputContainer onClick={assetModal.openModal}>
                <S.Label>자산</S.Label>
                <S.Input type="text" placeholder="(자산)" value={asset} readOnly />
            </S.InputContainer>

            <S.InputContainer>
                <S.Label>금액</S.Label>
                <S.Input type="number" placeholder="(금액)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </S.InputContainer>

            <S.InputContainer>
                <S.Label>내용</S.Label>
                <S.Input type="text" placeholder="(Title)" value={title} onChange={(e) => setTitle(e.target.value)} />
            </S.InputContainer>
            

            {/* 공개 여부 토글 */}
            <S.ToggleContainer>
                <S.Label>공개 여부</S.Label>
                <S.ToggleSwitch onClick={() => setIsPublic(!isPublic)} $checked={isPublic}>
                    <S.Slider $checked={isPublic}/>
                </S.ToggleSwitch>
            </S.ToggleContainer>

            {/* 별점 선택 - 클릭 시 바텀 시트 표시 */}
            <S.InputContainer onClick={ratingModal.openModal}>
                <S.StarContainer>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <S.Star key={num} $filled={num <= rating}>
                            ★
                        </S.Star>
                    ))}
                </S.StarContainer>
                <S.SatisfactionText $bold={rating > 0}>{rating > 0 ? satisfactionTexts[rating - 1] : "(만족도)"}</S.SatisfactionText>
            </S.InputContainer>


            {/* 이미지 업로드 */}
            <S.ImageUpload>
                <input type="file" onChange={handleImageUpload} />
                {image ? <S.UploadedImage src={image} alt="업로드 이미지" /> : <S.ImagePlaceholder>📷</S.ImagePlaceholder>}
            </S.ImageUpload>

            {/* 메모 입력 */}
            <S.Textarea placeholder="메모 작성" value={memo} onChange={(e) => setMemo(e.target.value)} />

            <SubmitButton text="작성 완료" />

            {/* 모달 컴포넌트 */}
            <CategoryModal isOpen={categoryModal.isOpen} onClose={categoryModal.closeModal} category={category} setCategory={setCategory} />
            <AssetModal isOpen={assetModal.isOpen} onClose={assetModal.closeModal} asset={asset} setAsset={setAsset} />
            <RatingModal isOpen={ratingModal.isOpen} onClose={ratingModal.closeModal} rating={rating} setRating={setRating} />
        </S.Container>
    );
};

export default HandWrite;