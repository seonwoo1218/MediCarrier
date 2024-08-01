import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import BottomSheet from "../../components/BottomSheet";

const MapSearch = () => {
  const location = useLocation();
  const { searchValue } = location.state || { searchValue: "" };
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchValue);

  const handleOpenSheet = () => setIsSheetOpen(true);
  const handleCloseSheet = () => setIsSheetOpen(false);

  return (
    <>
      <MapSearchBar>
        <input
          placeholder="의료시설을 검색해보세요!"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} // onChange 핸들러 추가
        />
        <img src="/img/search-normal-gray.svg" alt="search" />
      </MapSearchBar>
      <BottomSheet isOpen={isSheetOpen} onClose={handleCloseSheet}>
        <p>Bottom Sheet의 내용입니다.</p>
        {/* 여기에 Bottom Sheet의 내용을 추가하세요 */}
      </BottomSheet>
    </>
  );
};

export default MapSearch;

const MapSearchBar = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  margin-top: 19px;
  padding: 0 20px;
  input {
    width: 323px;
    height: 23px;
    padding: 14px 18px;
    border-radius: 12px;
    border: 1px solid #bdbdbd;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    color: black;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.64px;
  }
  input::placeholder {
    color: #7e7e7e;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.64px;
  }
  img {
    margin-left: -40px;
    width: 24px;
    height: 24px;
    z-index: 100;
  }
`;
