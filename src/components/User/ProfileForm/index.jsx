import React, { useState } from 'react';
import { FormContainer, InputGroup, Label, Input, Row } from '../../../styles/User/ProfileForm/style'; // 스타일 파일 import

const ProfileForm = ({ initialData }) => {
    const [formData, setFormData] = useState(initialData);

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
                    <Input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </InputGroup>
                <InputGroup>
                    <Label>직업</Label>
                    <Input
                        type="text"
                        name="job"
                        value={formData.job}
                        onChange={handleChange}
                    />
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
