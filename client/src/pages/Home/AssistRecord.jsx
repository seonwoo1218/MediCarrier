import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AssistRecord = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <Header>
        <button
          style={{ border: 0, backgroundColor: "transparent" }}
          onClick={navigateToHome}
        >
          <img src="../img/arrow-left.svg" alt="back" />
        </button>
        어시스트 이용 기록
      </Header>
    </>
  );
};

export default AssistRecord;

const Header = styled.div`
  position: fixed;
  background: #ffffff;
  z-index: 10;
  top: 0px;
  display: inline-flex;
  height: 29px;
  padding: 13px 17px;
  align-items: center;
  width: 359px;
  gap: 74px;
  color: var(--mainblue, var(--Color, #4a7dff));
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1px;
  img {
    cursor: pointer;
  }
`;
