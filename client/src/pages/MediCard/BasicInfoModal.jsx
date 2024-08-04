import React, { useState } from "react";
import axios from "axios"; // axios 불러오기
import styled from "styled-components";

const BasicInfoModal = ({ basicInfo, setBasicInfo, onClose }) => {
  const [formState, setFormState] = useState(basicInfo);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const bloodTypes = [
    "RH+ A",
    "RH- A",
    "RH+ B",
    "RH- B",
    "RH+ AB",
    "RH- AB",
    "RH+ O",
    "RH- O",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios({
        method: "post",
        url: "https://minsi.pythonanywhere.com/medicarrier/basicinfo/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formState,
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(
          `Failed to save basic information: ${response.statusText}`
        );
      }

      setBasicInfo(response.data);
      onClose();
    } catch (error) {
      console.error("Failed to save basic information", error);
    }
  };

  const handleBloodTypeSelect = (bloodType) => {
    setFormState((prev) => ({ ...prev, bloodType }));
    setIsDropdownOpen(false);
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
            <Input name="이름" value={formState.name} onChange={handleChange} />
          </InputRow>
          <InputRow>
            <InputLabel>성별</InputLabel>
            <Select name="성별" value={formState.sex} onChange={handleChange}>
              <option value="남">남</option>
              <option value="여">여</option>
            </Select>
          </InputRow>
          <InputRow>
            <InputLabel>국적</InputLabel>
            <Input
              name="국적"
              value={formState.nationality}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>영어 이름</InputLabel>
            <Input
              name="영어 이름"
              value={formState.nameEng}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>생년월일</InputLabel>
            <Input
              name="생년월일"
              value={formState.birthdate}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>신장</InputLabel>
            <Input
              name="신장"
              value={formState.height}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>몸무게</InputLabel>
            <Input
              name="몸무게"
              value={formState.weight}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>혈액형</InputLabel>
            <Dropdown>
              <DropdownButton
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {formState.bloodType || "혈액형 선택"}
              </DropdownButton>
              {isDropdownOpen && (
                <DropdownMenu>
                  {bloodTypes.map((bloodType) => (
                    <DropdownItem
                      key={bloodType}
                      onClick={() => handleBloodTypeSelect(bloodType)}
                    >
                      {bloodType}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </Dropdown>
          </InputRow>
          <InputRow>
            <InputLabel>임신여부</InputLabel>
            <Select
              name="임신여부"
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
  z-index: 11;
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
  font-family: "Pretendard";
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const SaveButton = styled.button`
  font-family: "Pretendard";
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.disabled ? "#CED4DA" : "#4a7dff")};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  position: absolute;
  right: 0;
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
  font-family: "Pretendard";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  flex: 1;
`;

const Input = styled.input`
  color: #000;
  text-align: right;
  font-family: "Pretendard";
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
  font-family: "Pretendard";
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

const Dropdown = styled.div`
  position: relative;
  flex: 2;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: none;
  border-radius: 5px;
  background-color: #f8f8f8;
  text-align: right;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
