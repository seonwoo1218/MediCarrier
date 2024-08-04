import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PharmacyIcon from "../../assets/icons/Pharmacy.svg";
import HospitalIcon from "../../assets/icons/Hospital.svg";
import ProgressIndicator from "../../components/ProgressIndicator";
import useStore from "../../store/store";
function SelectFacility() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const setFacility = useStore((state) => state.setFacility); // 상태 변경 함수

  const handleSelect = (facility) => {
    setSelected(facility);
  };

  const handleNext = () => {
    let facility = ""; // 변수 정의
    if (selected === "pharmacy") {
      facility = "약국"; // 변수 값 설정
      setFacility(facility); // 상태 업데이트
      navigate("/map-pharmacy", { state: { facility } });
    } else if (selected === "hospital") {
      facility = "병원"; // 변수 값 설정
      setFacility(facility); // 상태 업데이트
      navigate("/select-specialty", { state: { facility } });
    }
  };

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={1} />
        <Title>
          이용하실 의료 시설을
          <br />
          선택해주세요
        </Title>
        <Subtitle>
          병원을 이용하실 경우 복잡한 보험 청구 과정까지 어시스트와
          <br />
          함께하실 수 있어요
        </Subtitle>
        <Options>
          <Option
            selected={selected === "pharmacy"}
            onClick={() => handleSelect("pharmacy")}
            left
          >
            <Icon src={PharmacyIcon} alt="약국" />
          </Option>
          <Option
            selected={selected === "hospital"}
            onClick={() => handleSelect("hospital")}
            right
          >
            <Icon src={HospitalIcon} alt="병원" />
          </Option>
        </Options>
        <Button onClick={handleNext} disabled={!selected}>
          다음
        </Button>
      </Container>
    </PageContainer>
  );
}

export default SelectFacility;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  background: #fafafa;
  overflow-y: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  height: 792px;
  margin: 0;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 95px;
`;

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
  text-align: left;
  line-height: 1.5;
  align-self: flex-start;
  margin-left: 30px;
  margin-top: 25px;
`;

const Subtitle = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.439px;
  margin-bottom: 40px;
  margin-top: 0px;
  margin-left: 30px;
  align-self: flex-start;
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  gap: 9px;
  width: 172px;
  height: 205px;
  margin-bottom: 20px;
`;

const Option = styled.div`
  font-family: Pretendard;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 31px 48px;
  gap: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: ${(props) =>
    props.selected ? "rgba(255, 249, 119, 0.40)" : "#F8F8F8"};
  margin-left: ${(props) => (props.left ? "20px" : "0")};
  margin-right: ${(props) => (props.right ? "20px" : "0")};
`;

const Icon = styled.img`
  width: 74px;
  height: 143px;
`;

const Button = styled.button`
  font-family: Pretendard;
  padding: 15px;
  width: 353px;
  height: 51px;
  font-size: 16px;
  color: #fff;
  border-radius: 16px;
  background: var(--mainblue, #4a7dff);
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 130px;
`;
