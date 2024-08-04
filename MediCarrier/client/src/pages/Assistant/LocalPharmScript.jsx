import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ProgressIndicator from "../../components/ProgressIndicator";
import useScriptStore from "../../assets/scriptStore";

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
  font-size: 24px;
  font-family: Pretendard;
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
  margin-left: 30px;
  align-self: flex-start;
`;

const ScriptText = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  line-height: 1.6;
  margin-left: 40px;
  margin-right: 20px;
  flex-grow: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 11px;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  bottom: 65px;
  margin-left: 15px;
`;

const Button = styled.button`
  font-family: Pretendard;
  width: 171px;
  height: 51px;
  padding: 10px 20px;
  font-size: 16px;
  color: ${(props) => (props.primary ? "#FFFFFF" : "#000000")};
  background-color: ${(props) => (props.primary ? "#4A7DFF" : "#F8F8F8")};
  border: none;
  border-radius: 16px;
  cursor: pointer;
`;

function LocalScript() {
  const navigate = useNavigate();
  const location = useLocation();
  const { translatedScript } = location.state || {};
  const { setTransScriptComponents } = useScriptStore((state) => state);

  const handleNext = () => {
    setTransScriptComponents(translatedScript);
    navigate("/home");
  };

  return (
    <PageContainer>
      <Container>
        <ProgressIndicator step={2} />
        <Title>
          현지어 버전의
          <br />
          스크립트를 확인해보세요!
        </Title>
        <Subtitle>번역된 스크립트는 다음과 같습니다:</Subtitle>
        <ScriptText>
          {translatedScript || "번역된 스크립트가 없습니다."}
        </ScriptText>
        <ButtonContainer>
          <Button onClick={() => navigate(-1)} primary={false}>
            이전
          </Button>
          <Button onClick={handleNext} primary={true}>
            완료
          </Button>
        </ButtonContainer>
      </Container>
    </PageContainer>
  );
}

export default LocalScript;
