import React, { useState, useEffect } from 'react';
import { FormContainer, InputGroup, Label, Input, Row, Select, NicknameMessage } from '../../../styles/User/ProfileForm/style'; // 스타일 파일 import

const ProfileForm = ({ initialData, onChange, nicknameMessage, isNicknameValid }) => {
    const [formData, setFormData] = useState(initialData);
    const [isCustomJob, setIsCustomJob] = useState(initialData.job === "기타(직접 입력)");

    // `initialData`가 변경될 때 `formData` 업s데이트
    useEffect(() => {
        setFormData(initialData);
        setIsCustomJob(initialData.job === "기타(직접 입력)");
    }, [initialData]);

    const handleJobChange = (e) => {
        const { value } = e.target;
        if (value === "기타(직접 입력)") {
            setIsCustomJob(true);
            setFormData({ ...formData, jobCategory: "" });
        } else {
            setIsCustomJob(false);
            setFormData({ ...formData, jobCategory: value });
        }
        onChange({ target: { name: "jobCategory", value: value === "기타(직접 입력)" ? "" : value } });
    };

    const handleCustomJobInput = (e) => {
        setFormData({ ...formData, jobCategory: e.target.value });
        onChange(e);
    };

    // 입력 필드에서 벗어났을 때 드롭다운으로 복귀
    const handleBlur = () => {
        if (formData.jobCategory.trim() !== "") {
            setIsCustomJob(false); 
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const mappedValue = name === "ageGroup" ? `${value}` : value; 
        setFormData({ ...formData, [name]: mappedValue });
        onChange(e);
    };
    
    return (
        <FormContainer>
            <InputGroup>
                <Label>닉네임</Label>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {nicknameMessage && <NicknameMessage isValid={isNicknameValid}>{nicknameMessage}</NicknameMessage>}
            </InputGroup>

            <Row>
                <InputGroup>
                    <Label>나이대</Label>
                    <Select 
                        name="ageGroup" 
                        value={formData.ageGroup} 
                        onChange={handleChange}
                    >
                        <option value="10대">10대</option>
                        <option value="20대">20대</option>
                        <option value="30대">30대</option>
                        <option value="40대">40대</option>
                        <option value="50대">50대</option>
                        <option value="60대 이상">60대 이상</option>
                    </Select>
                </InputGroup>
                <InputGroup>
                    <Label>직업</Label>
                    {isCustomJob ? (
                        <Input
                            type="text"
                            name="jobCategory"
                            placeholder="직업을 입력하세요"
                            value={formData.jobCategory}
                            onChange={handleCustomJobInput} // 직접 입력 핸들러 사용
                            onBlur={handleBlur}
                            autoFocus
                        />
                    ) : (
                        <Select 
                            name="jobCategory" 
                            value={formData.jobCategory} 
                            onChange={handleJobChange} // 드롭다운 선택 핸들러
                        >
                            <option value="학생">학생</option>
                            <option value="기획/전략">기획/전략</option>
                            <option value="마케팅/광고">마케팅/광고</option>
                            <option value="영업/판매">영업/판매</option>
                            <option value="재무/회계">재무/회계</option>
                            <option value="인사/교육">인사/교육</option>
                            <option value="고객 서비스">고객 서비스</option>
                            <option value="IT/개발">IT/개발</option>
                            <option value="디자이너">디자이너</option>
                            <option value="생산/품질 관리">생산/품질 관리</option>
                            <option value="연구/설계">연구/설계</option>
                            <option value="전문직(의료/법률/회계 등)">전문직(의료/법률/회계 등)</option>
                            <option value="창업/프리랜서">창업/프리랜서</option>
                            <option value="공공/행정직">공공/행정직</option>
                            <option value={formData.jobCategory}>{formData.jobCategory}</option>
                            <option value="기타(직접 입력)">기타(직접 입력)</option>
                        </Select>
                    )}
                </InputGroup>
            </Row>

            <InputGroup>
                <Label>한 줄 소개</Label>
                <Input
                    type="text"
                    name="one_liner"
                    value={formData.one_liner}
                    onChange={handleChange}
                />
            </InputGroup>
        </FormContainer>
    );
};

export default ProfileForm;
