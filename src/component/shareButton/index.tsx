import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"

const baseUrl = import.meta.env.BASE_URL

const getCurrentUrl = () => {
  return window.location.protocol + "//" + window.location.host + baseUrl
}

const getShareText = () => {
  return `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.\n${WEDDING_DATE.format(WEDDING_DATE_FORMAT)}\n${LOCATION}`
}

const shareToKakaoTalk = () => {
  const url = getCurrentUrl()
  const text = getShareText()
  
  // 모바일에서 카카오톡 앱 열기 시도
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  
  if (isMobile) {
    // 모바일: 카카오톡 앱으로 공유 시도
    window.location.href = `intent://send?text=${encodeURIComponent(text + "\n" + url)}#Intent;scheme=kakaotalk;package=com.kakao.talk;end`
    
    // 앱이 없으면 Web Share API 사용
    setTimeout(() => {
      if (navigator.share) {
        navigator.share({
          title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
          text: text,
          url: url,
        }).catch(() => {
          // 공유 취소 시 아무것도 하지 않음
        })
      }
    }, 500)
  } else {
    // 데스크톱: 클립보드에 복사
    copyToClipboard(text + "\n" + url)
  }
}

const copyToClipboard = async (text: string) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      alert("링크가 클립보드에 복사되었습니다!")
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand("copy")
        alert("링크가 클립보드에 복사되었습니다!")
      } catch (err) {
        console.error("복사 실패:", err)
      }
      document.body.removeChild(textArea)
    }
  } catch (err) {
    console.error("클립보드 복사 실패:", err)
  }
}

const handleShare = async () => {
  const url = getCurrentUrl()
  const text = getShareText()
  const title = `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`

  // Web Share API 지원 확인 (모바일 브라우저)
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      })
    } catch (err) {
      // 사용자가 공유를 취소한 경우
      if ((err as Error).name !== "AbortError") {
        console.error("공유 실패:", err)
        // Web Share API 실패 시 카카오톡 공유로 fallback
        shareToKakaoTalk()
      }
    }
  } else {
    // Web Share API를 지원하지 않는 경우 (데스크톱 등)
    shareToKakaoTalk()
  }
}

export const ShareButton = () => {
  return (
    <LazyDiv className="footer share-button">
      <button className="ktalk-share" onClick={handleShare}>
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
