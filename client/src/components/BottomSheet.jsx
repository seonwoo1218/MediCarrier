import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDrag } from "@use-gesture/react";

// shouldForwardProp을 사용하여 불필요한 prop이 DOM으로 전달되지 않도록 설정합니다.
const Sheet = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isOpen", "isExpand"].includes(prop),
})`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  height: 70%;
  max-height: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 0;
  touch-action: none; /* 추가: 터치 제스처 문제 해결을 위해 touch-action: none; 설정 */
`;

const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 0;
`;

const Head = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
    letter-spacing: -0.64px;
    padding: 25px 309px 0 21px;
    white-space: nowrap;
  }
`;

const DragHandle = styled.div`
  width: 50px;
  height: 5px;
  background: #ccc;
  border-radius: 5px;
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const BottomSheet = ({ isOpen, onClose, children }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [translateY, setTranslateY] = useState(200); // 기본 위치를 200px 아래로 설정
  const [initialOffset, setInitialOffset] = useState(200); // 초기 오프셋을 200px로 설정
  const sheetRef = useRef(null);

  const bind = useDrag(
    (state) => {
      // 드래그 시작 시
      if (state.first) {
        setInitialOffset(-state.offset[1] + initialOffset);
      }

      // 드래그 방향이 위쪽일 때
      if (state.offset[1] < 0) {
        setIsExpand(true);
        setTranslateY(Math.max(state.offset[1] + initialOffset, 0)); // 컨텐츠가 보이도록
      } else {
        // 드래그 방향이 아래쪽일 때
        setIsExpand(false);
        setTranslateY(Math.min(state.offset[1] + initialOffset, 200)); // 초기 위치로 돌아가도록 설정
      }
    },
    {
      from: () => [0, translateY],
      filterTaps: true,
      bounds: { top: -200, bottom: 0 }, // 드래그 범위 설정
    }
  );

  useEffect(() => {
    if (isOpen) {
      setTranslateY(200); // Bottom Sheet의 기본 위치를 200px로 설정
      setIsExpand(false);
    }
  }, [isOpen]);

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <Sheet
        {...bind()}
        ref={sheetRef}
        isExpand={isExpand}
        style={{ transform: `translateY(${translateY}px)` }}
      >
        <Head>
          <DragHandle />
          <p>검색 결과</p>
        </Head>
        {isExpand && (
          <Content>
            {children} What is Lorem Ipsum? Lorem Ipsum is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
            {/* 여기에 Bottom Sheet의 내용을 추가하세요 */}
          </Content>
        )}
      </Sheet>
    </>
  );
};

export default BottomSheet;
