import React, { useState } from "react";
import styled from "styled-components";

const BasicInfoModal = ({ basicInfo, setBasicInfo, onClose }) => {
  const [formState, setFormState] = useState(basicInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setBasicInfo(formState);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>기본 정보 수정</ModalTitle>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </ModalHeader>
        <ModalBody>
          <InputRow>
            <InputLabel>이름</InputLabel>
            <Input name="name" value={formState.name} onChange={handleChange} />
          </InputRow>
          <InputRow>
            <InputLabel>성별</InputLabel>
            <Select name="sex" value={formState.sex} onChange={handleChange}>
              <option value="남">남</option>
              <option value="여">여</option>
            </Select>
          </InputRow>
          <InputRow>
            <InputLabel>국적</InputLabel>
            <Input
              name="nationality"
              value={formState.nationality}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>영어 이름</InputLabel>
            <Input
              name="nameEng"
              value={formState.nameEng}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>생년월일</InputLabel>
            <Input
              name="birthdate"
              value={formState.birthdate}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>신장</InputLabel>
            <Input
              name="height"
              value={formState.height}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>몸무게</InputLabel>
            <Input
              name="weight"
              value={formState.weight}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>혈액형</InputLabel>
            <Select
              name="bloodtype"
              value={formState.bloodtype}
              onChange={handleChange}
            >
              <option value="RH+ A">RH+ A</option>
              <option value="RH- A">RH- A</option>
              <option value="RH+ B">RH+ B</option>
              <option value="RH- B">RH- B</option>
              <option value="RH+ AB">RH+ AB</option>
              <option value="RH- AB">RH- AB</option>
              <option value="RH+ O">RH+ O</option>
              <option value="RH- O">RH- O</option>
            </Select>
          </InputRow>
          <InputRow>
            <InputLabel>임신여부</InputLabel>
            <Select
              name="pregnant"
              value={formState.pregnant}
              onChange={handleChange}
            >
              <option value="임신 중">임신 중</option>
              <option value="임신 중 아님">임신 중 아님</option>
              <option value="가능성 있음">가능성 있음</option>
            </Select>
          </InputRow>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BasicInfoModal;

const ModalOverlay = styled.div`
  position: fixed;
  max-width: 393px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  height: 560px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const ModalTitle = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const ModalBody = styled.div`
  margin-top: 41px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputLabel = styled.label`
  color: #6f6f6f;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  flex: 1;
`;

const Input = styled.input`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  flex: 2;
  padding: 5px;
  border: none;
  border-bottom: none;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  flex: 2;
  padding: 5px;
  border: none;
  border-bottom: none;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const SaveButton = styled.button`
  font-family: Pretendard;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a7dff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  right: 0;
`;
