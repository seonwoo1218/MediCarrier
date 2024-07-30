import React, { useState, useEffect } from "react";
import theme from "../../utils/theme";
import { CountryLanguageMap } from "../../utils/CountryLanguageMap"; // 객체로 가져오기

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import styled, { ThemeProvider } from "styled-components";
import BasicInfoModal from "./BasicInfoModal";
import MediInfoModal from "./MediInfoModal";

import { Pagination } from "swiper/modules";

const MediCard = () => {
  const [basicInfo, setBasicInfo] = useState({
    name: "이민지",
    sex: "여",
    nationality: "대한민국",
    nameEng: "Minji Lee",
    birthdate: "2000.03.23",
    height: "164cm",
    weight: "55kg",
    bloodType: "RH+ A",
    pregnant: "임신하지 않음",
  });

  const [mediInfo, setMediInfo] = useState({
    condition: "현재 증상 없음",
    illness: "없음",
    medicine: "복용하는 약 없음",
    allergy: "알레르기 없음",
    diagnosis: "근 n개월 이내 없음",
    surgery: "근 n개월 이내 없음",
  });

  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [isMediInfoModalOpen, setIsMediInfoModalOpen] = useState(false);

  // 사용자 선택 국가
  const userSelectedCountry = "JP";

  const translation_button_wrap = [
    "한국어",
    CountryLanguageMap[userSelectedCountry]
      ? CountryLanguageMap[userSelectedCountry].language
      : "일본어",
    "영어",
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("한국어");

  const default_information = [
    { label: "이름", value: basicInfo.name },
    { label: "성별", value: basicInfo.sex },
    { label: "국적", value: basicInfo.nationality },
    { label: "영어 이름", value: basicInfo.nameEng },
    { label: "생년월일", value: basicInfo.birthdate },
    { label: "신장", value: basicInfo.height },
    { label: "몸무게", value: basicInfo.weight },
    { label: "혈액형", value: basicInfo.bloodType },
    { label: "임신여부", value: basicInfo.pregnant },
  ];

  const medical_information = [
    { label: "몸 상태", value: mediInfo.condition },
    { label: "지병", value: mediInfo.illness },
    { label: "현재 복용 약", value: mediInfo.medicine },
    { label: "알러지 유무", value: mediInfo.allergy },
    { label: "진료 기록", value: mediInfo.diagnosis },
    { label: "수술 기록", value: mediInfo.surgery },
  ];

  return (
    <Container>
      {/** ---- 타이틀 영역 ---- */}
      <Title>의료 카드</Title>

      {/** ---- 번역 버튼 영역 ---- */}
      <TransitionButtonContainer>
        {translation_button_wrap.map((text) => (
          <TransitionButton
            key={text}
            isSelected={selectedLanguage === text}
            onClick={() => setSelectedLanguage(text)}
          >
            {text}
          </TransitionButton>
        ))}
      </TransitionButtonContainer>

      {/** ---- 스와이퍼 영역 ---- */}
      <Swiper
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={30}
        grapCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <MedicalCard
            title="기본 정보"
            informations={default_information}
            onEdit={() => setIsBasicInfoModalOpen(true)}
          />
        </SwiperSlide>
        <SwiperSlide>
          <MedicalCard
            title="의료 정보"
            informations={medical_information}
            onEdit={() => setIsMediInfoModalOpen(true)}
          />
        </SwiperSlide>
      </Swiper>

      {isBasicInfoModalOpen && (
        <BasicInfoModal
          basicInfo={basicInfo}
          setBasicInfo={setBasicInfo}
          onClose={() => setIsBasicInfoModalOpen(false)}
        />
      )}
      {isMediInfoModalOpen && (
        <MediInfoModal
          mediInfo={mediInfo}
          setMediInfo={setMediInfo}
          onClose={() => setIsMediInfoModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default MediCard;

const Container = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Pretenders";

  & > .swiper {
    width: 100%;
    padding-bottom: 50px;
    & > .swiper-wrapper > .swiper-slide {
      width: 95%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4a7dff;
`;

const TransitionButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
`;

const TransitionButton = styled.button`
  font-family: Pretendard;
  width: 100px;
  height: 33px;
  background-color: ${({ isSelected }) => (isSelected ? "#4a7dff" : "#f8f8f8")};
  color: ${({ isSelected }) => (isSelected ? "#ffffff" : "#000000")};
  border-radius: 200px;
  border: none;

  &:nth-child(2) {
    margin: 0 8px;
  }
  &:hover {
    cursor: pointer;
    background-color: #4a7dff;
    color: #ffffff;
  }
`;

/**
 * @props
 * - title: string
 * - informations: { label: string; value: string; }[]
 * - onEdit: () => void
 */

function MedicalCard({ title, informations, onEdit }) {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <EditButton onClick={onEdit}>
            <img src="./img/edit.svg" alt="edit_icon" />
          </EditButton>
        </CardHeader>
        <CardBody>
          {informations.map((information) => (
            <InfoRow key={information.label}>
              <InfoLabel>{information.label}</InfoLabel>
              <InfoValue>{information.value}</InfoValue>
            </InfoRow>
          ))}
        </CardBody>
      </Card>
    </ThemeProvider>
  );
}

const Card = styled.div`
  width: 100%;
  height: 510px;
  padding: 25px;
  background: #fff;
  box-shadow: 0px 4px 12.9px 0px #00000014;
  border: 0.4px solid #9c9c9c4d;
  border-radius: 24px;
  overflow: hidden;
  @media ${({ theme }) => theme.device.mobile} {
    height: 380px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    height: 470px;
  }
`;

const CardHeader = styled.div`
  padding: 0px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.span`
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 700;
  line-height: 17.9px;
`;

const EditButton = styled.button`
  width: 20px;
  height: 21px;
  position: fixed;
  right: 25px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const CardBody = styled.div`
  margin-top: 40px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const InfoLabel = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  text-align: center;
  color: #6f6f6f;
`;

const InfoValue = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;
  text-align: right;
`;
