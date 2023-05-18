/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Favorite, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const modalStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const modalContent = css`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 80%;
  max-height: 60%;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const imageWrapper = css`
  flex-basis: 50%;
  padding-right: 20px;
  border-right: 1px solid #e1e1e1;
`;

const infoWrapper = css`
  flex-basis: 70%;
  padding-left: 20px;
`;

const buttonStyle = css`
  margin-top: 40px;
  border: none;
  width: 144px;
  height: 44px;
  background-color: #0BD0AF;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;

  &:hover {
    background-color: #0BAF94;
  }

  &:active {
    background-color: #40D6BD;
  }
`;

const iconContainer = css`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const UserIconStyle = styled(Person)`
  font-size: 2rem;
`;

const FavoriteIcon = styled(Favorite)`
  font-size: 2rem;
`;


const Pstyle = css`
  color: #808080;
`;

const LocationInfo = [
  {
    title: '제주도',
    description: 'Jeju',
    info: "섬 전체가 하나의 거대한 관광자원인 제주도. 에메랄드빛 물빛이 인상적인 협재 해수욕장은 제주 대표 여행지며, 파도가 넘보는 주상절리와 바다 위 산책로인 용머리 해안은 제주에서만 볼 수 있는 천혜의 자연경관으로 손꼽힌다. 드라마 촬영지로 알려진 섭지코스는 꾸준한 사랑을 받고 있으며 한라봉과 흑돼지, 은갈치 등은 제주를 대표하는 음식이다."
  },
  {
    title: '부산',
    description: 'Busan',
    info: "우리나라 제2의 수도 부산광역시. 부산 대표 관광지로 손꼽히는 해운대는 밤에는 마린시티의 야경이 더해져 더욱 화려한 해변이 된다. 감천문화마을은 사진 찍기에 좋으며, 매해 가을마다 개최되는 아시아 최대 규모의 영화제인 부산국제영화제와 함께 부산의 구석구석을 즐겨보는 것도 좋다. 전통시장 투어가 있을 만큼 먹거리가 가득한 부산의 맛기행은 필수!"
  },
  {
    title: '여수',
    description: 'Yeosu',
    info: "국제 해양관광의 중심 전남 여수시. 3천여 그루의 동백나무로 가득 찬 붉은 섬 오동도는 웰빙 트래킹 코스를 갖추고 있어 한층 더 운치 있다. 해상 케이블카를 타면 마치 바다 위를 걷는 듯한 느낌이 들며 탁 트인 바다 전망을 감상할 수 있다. 노래 가사에도 나오는 낭만적이고 황홀한 여수의 밤바다는 돌산대교와 음악분수가 함께 어우러져 멋진 야경을 선사한다. 공식 밥도둑 게장백반과 돌산 갓김치, 갈치조림 등 풍부한 먹거리까지 갖춘 인기 만점 관광지!"
  },
  {
    title: '경주',
    description: 'Gyeongju',
    info: "지붕 없는 박물관 경주. 경주는 그만큼 발길이 닿는 어느 곳이든 문화 유적지를 만날 수 있는 곳이다. 밤이면 더 빛나는 안압지를 비롯해 허허벌판에 자리를 굳건히 지키고 있는 첨성대. 뛰어난 건축미를 자랑하는 불국사 석굴암까지 어느 하나 빼놓을 수 없다. 경주 여행의 기록을 남기고 싶다면 스탬프 투어를 이용해보는 것도 좋다. 16곳의 명소를 탐방할 때마다 찍히는 도장 모으는 재미가 쏠쏠하다. 모바일 앱으로도 스탬프 투어 참여가 가능하다."
  },
  {
    title: '강릉',
    description: 'Gangneung',
    info: "은은한 커피향이 남다른 강원도 강릉시. 그중에도 카페거리로 유명한 안목해변은 발이 닿는 어디든 향긋한 커피 한 잔에 지평선 끝까지 펼쳐지는 바다 풍경은 덤으로 얻을 수 있다. 일출 명소로 유명한 정동진과 야경이 아름다운 경포대는 대표 여행 코스! 구름도 머물다 간다는 해발 1,100m에 위치한 강릉 안반데기 마을은 전망대에 올라 드넓게 펼쳐진 배추밭이 붉게 물드는 일출 전경이 일품이다."
  },
  {
    title: '서울',
    description: 'Seoul',
    info: "과거와 현재가 공존하며 하루가 다르게 변하는 서울을 여행하는 일은 매일이 새롭다. 도시 한복판에서 600년의 역사를 그대로 안고 있는 아름다운 고궁들과 더불어 대한민국의 트렌드를 이끌어나가는 예술과 문화의 크고 작은 동네들을 둘러볼 수 있는 서울은 도시 여행에 최적화된 장소다."
  },
  {
    title: '용인',
    description: 'Yongin',
    info: "주말 나들이 코스로 좋은 용인. 국내 최대 규모의 테마파크 에버랜드는 4계절 내내 다양한 행사로 즐거움이 끊이지 않는 곳이다. 옛 생활 모습을 둘러볼 수 있는 한국민속촌도 용인의 대표 관광지! 탈 일상의 전원체험을 느낄 수 있는 용인농촌테마파크와 주택가 골목을 따라 생긴 보정동 카페거리도 데이트 코스로 좋다."
  },
  {
    title: '서산',
    description: 'Seosan',
    info: "충청남도 서산에는 날마다 섬과 육지를 옮겨 다니는 땅이 있다. 바로 간월암을 떠받들고 있는 간월도인데, 만조시 석양으로 물드는 모습이 절경이다. 직접 간월암까지 발걸음을 하고 싶다면 간조 시간 체크는 필수! 서산 땅 끝에 위치한 황금산을 넘으면 서해의 물을 모조리 들이마시고 있는 코끼리 바위를 만날 수 있으며, 썰물 때는 황금산 둘레로 해안 트래킹도 가능하다. 프란치스코 교황 방문과 함께 알려진 해미읍성은 산책 코스로 좋다."
  },
  {
    title: '전주',
    description: 'Jeonju',
    info: "한국의 멋이 살아있는 전주. 도심 한복판에 자리한 한옥마을에 들어서면 시대를 거슬러가는 기분이다. '경사스러운 터에 지어진 궁궐'이란 의미의 경기전에 들어서면 대나무가 서로 부대끼며 내는 소리에 귀 기울이게 된다. 전주 야경투어 명소의 대표인 전동성당과 한옥마을을 한눈에 내려다볼 수 있는 오목대 역시 빼놓을 수 없는 곳. 마을 전체가 미술관인 자만 벽화마을은 전주의 대표 포토 존이다."
  },
  {
    title: '울산',
    description: 'Ulsan',
    info: "울산시는 2017년을 '울산 방문의 해'로 지정하고 더욱 풍성한 볼거리를 준비했다. 5월 태화강 봄꽃 대향연을 시작으로 국내 유일의 고래축제 등 다양한 축제가 기다리고 있다. 일출이 가장 빨리 시작되는 간절곶과 해안을 따라 산책하기 좋은 대왕암 공원은 울산의 대표 명소다. 아름다운 생태공원으로 재탄생한 태화강을 따라 대나무가 시원하게 뻗어있는 십리대숲길을 산책할 수 있으며, 태화강대공원을 좀 더 제대로 감상하고 싶다면 태화강 전망대를 이용하면 된다."
  },
  {
    title: '목포',
    description: 'Mokpo',
    info: "아름다운 한 폭의 동양화를 연상시키는 유달산에서 다도해의 경관을 한눈에 감상할 수 있다. 때묻지 않은 자연을 간직한 사랑의 섬 외달도는 전국에서 휴양하기 좋은 섬 30위 안에 선정될 만큼 아름다운 바다와 해변이 특징이다. 목포 평화광장 앞 바다에는 음악에 맞춰 빛과 물이 어우러지는 세계 최대의 춤추는 바다분수가 있어 이색적인 볼거리를 제공하고 있다. 갯벌 속의 인삼이라 불리는 세 발 낙지는 목포의 대표적인 토산품 중 하나이며 일부 지역에서만 잡히는 지역 특산품이다."
  },
  {
    title: '순천',
    description: 'Suncheon',
    info: "살아숨쉬는 생태 수도 전남 순천시. 매년 깊어지는 가을마다 세계 5대 습지이자 철새들의 도래지인 순천만 습지의 갈대밭은 더욱 몽환적인 모습으로 무장한다. 이를 보호하고자 만든 순천만 국가 정원에서는 다양한 생태 식물들을 관찰할 수 있어 또 다른 자연의 아름다움을 느낄 수 있다. 구불구불한 리아스식 해안선을 따라 드라이브할 수 있는 와온해변은 일몰이 아름답기로 유명하며 이곳의 마을에서는 어촌체험도 가능하다. 추억을 떠올리게 하는 순천 드라마 세트장은 60-80년대의 모습을 완벽히 재현하고 있어 떠오르는 관광 명소다."
  },
]

const Modal = ({ isOpen, onClose, destination }) => {
  const navigate = useNavigate();

  if (!isOpen || !destination) {
    return null;
  }

  const { image, title, englishing } = destination;

  const infoObject = LocationInfo.find((info) => info.title === title);
  const info = infoObject ? infoObject.info : '';


  return (
    <div css={modalStyle} onClick={onClose}>
      <div css={modalContent} onClick={(e) => e.stopPropagation()}>
        <div css={imageWrapper}>
          <img src={image} alt={title} style={{ width: "100%" }} />
        </div>
        <div css={infoWrapper}>
          <h2>{title}</h2>
          <span>{englishing}</span>
          <p css={Pstyle}>{info}</p>
          <div css={iconContainer}>
            <UserIconStyle /> <FavoriteIcon />
          </div>
          <button css={buttonStyle} onClick={() => navigate(`/contents?destinationTitle=${title}`)}>일정 만들기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;