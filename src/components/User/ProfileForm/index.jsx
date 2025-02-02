import React, { useState } from 'react';
import { FormContainer, InputGroup, Label, Input, Row, Select } from '../../../styles/User/ProfileForm/style'; // 스타일 파일 import

const ProfileForm = ({ initialData }) => {
    const [formData, setFormData] = useState(initialData);
    const [isCustomJob, setIsCustomJob] = useState(initialData.job === "기타(직접 입력)");

    const handleJobChange = (e) => {
        const { value } = e.target;
        
        if (value === "기타(직접 입력)") {
            setIsCustomJob(true);
            setFormData({ ...formData, job: "" });  // 기존값 유지
        } else {
            setIsCustomJob(false);
            setFormData({ ...formData, job: value }); 
        }
    };

    const handleCustomJobInput = (e) => {
        setFormData({ ...formData, job: e.target.value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
            </InputGroup>

            <Row>
                <InputGroup>
                    <Label>나이대</Label>
                    <Select 
                        name="age" 
                        value={formData.age} 
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
                            name="job"
                            placeholder="직업을 입력하세요"
                            value={formData.job}
                            onChange={handleCustomJobInput} // 직접 입력 핸들러 사용
                        />
                    ) : (
                        <Select 
                            name="job" 
                            value={formData.job} 
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
                            <option value="기타(직접 입력)">기타(직접 입력)</option>
                        </Select>
                    )}
                </InputGroup>
            </Row>

            <InputGroup>
                <Label>한 줄 소개</Label>
                <Input
                    type="text"
                    name="intro"
                    value={formData.intro}
                    onChange={handleChange}
                />
            </InputGroup>
        </FormContainer>
    );
};

export default ProfileForm;
