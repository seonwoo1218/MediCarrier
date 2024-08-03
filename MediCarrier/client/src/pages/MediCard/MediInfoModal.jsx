import React, { useState } from "react";
import axios from "axios"; // axios 불러오기
import styled from "styled-components";

const MediInfoModal = ({ mediInfo, setMediInfo, onClose }) => {
  const [formState, setFormState] = useState(mediInfo);

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
        url: "https://minsi.pythonanywhere.com/medicarrier/mediinfo/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formState,
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(
          `Failed to save medical information: ${response.statusText}`
        );
      }

      setMediInfo(response.data);
      onClose();
    } catch (error) {
      console.error("Failed to save medical information", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>의료 정보 수정</ModalTitle>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </ModalHeader>
        <ModalBody>
          <InputRow>
            <InputLabel>몸 상태</InputLabel>
            <Input
              name="몸 상태"
              value={formState.condition}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>지병</InputLabel>
            <Input
              name="지병"
              value={formState.illness}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>현재 복용 약</InputLabel>
            <Input
              name="현재 복용 약"
              value={formState.medicine}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>알러지 유무</InputLabel>
            <Input
              name="알러지 유무"
              value={formState.allergy}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>진료 기록</InputLabel>
            <Input
              name="진료 기록"
              value={formState.diagnosis}
              onChange={handleChange}
            />
          </InputRow>
          <InputRow>
            <InputLabel>수술 기록</InputLabel>
            <Input
              name="수술 기록"
              value={formState.surgery}
              onChange={handleChange}
            />
          </InputRow>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MediInfoModal;

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
