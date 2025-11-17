import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-01-10 15:00", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`

// 예식 당월 휴무일. 켈린더에 표시하기 위함.
// 예: 예식일 8월 -> 8월 15일 광복절
export const HOLIDAYS = [15]

export const LOCATION = "노블발렌티 삼성점"
export const LOCATION_ADDRESS = "서울 강남구 봉은사로 637, 노블발렌티 삼성점"

// 카카오톡 공유 시 위치 정보로 사용할 주소.
// LOCATION 과 동일하게 설정해도 무방하나, 필요에 따라 좀 더 상세히 작성 가능.
export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION

// 네이버 지도 및 카카오 네비게이션에 사용할 좌표. [경도, 위도] 형식.
export const WEDDING_HALL_POSITION = [127.064857, 37.515326]

// 네이버 지도의 웨딩홀 장소 ID
// 네이버 지도 웹페이지에서 웨딩홀 검색 후 URL에서 확인 가능.
// 예: https://map.naver.com/p/entry/place/13321741 -> 13321741
export const NMAP_PLACE_ID = 12390329

// 카카오 지도의 웨딩홀 장소 ID
// 카카오 지도 웹페이지에서 웨딩홀 검색 후 해당 장소에서 상세보기 클릭 시 URL에서 확인 가능.
// 예: https://place.map.kakao.com/8634826 -> 8634826
export const KMAP_PLACE_ID = 17157328

export const BRIDE_FULLNAME = "신수화"
export const BRIDE_FIRSTNAME = "수화"
export const BRIDE_TITLE = "차녀"
export const BRIDE_FATHER = "신유홍"
export const BRIDE_MOTHER = "어수영"
export const BRIDE_INFO = [
  { 
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-8275-5000",
    account: "하나은행 00000000000",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-2202-5000",
    account: "하나은행 00000000000000",
  },
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-8301-8275",
    account: "농협은행 3020582466351",
  },
]

export const GROOM_FULLNAME = "최성식"
export const GROOM_FIRSTNAME = "성식"
export const GROOM_TITLE = "장남"
export const GROOM_FATHER = "최광보"
export const GROOM_MOTHER = "정행자"
export const GROOM_INFO = [
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-6310-3494",
    account: "신한은행 000000000000",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-5614-1205",
    account: "SC은행 11120349204",
  },
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-2225-2513",
    account: "국민은행 16610204154456",
  },
]
