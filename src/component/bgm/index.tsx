import { useEffect, useRef } from "react"

// BGM 파일 경로 (public 폴더에 저장)
// Vite의 base URL을 사용하여 경로 설정
// public 폴더의 파일은 항상 루트에서 접근 가능
const baseUrl = import.meta.env.BASE_URL || "/"
// baseUrl이 슬래시로 끝나지 않으면 추가
const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`
const BGM_PATH = `${normalizedBaseUrl}bgm.mp3`

export const BGM = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasInteractedRef = useRef(false)

  useEffect(() => {
    // Audio 요소 생성
    const audio = new Audio()
    audio.loop = true // 반복 재생
    audio.volume = 0.5 // 볼륨 설정 (0.0 ~ 1.0)
    audio.preload = "auto" // 미리 로드

    // 파일 경로 설정
    audio.src = BGM_PATH

    audioRef.current = audio

    // 오디오 로드 완료 후 재생 시도
    const handleCanPlay = () => {
      if (!hasInteractedRef.current) {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("BGM 재생 시작")
            })
            .catch((error) => {
              console.log("BGM 자동 재생 실패 (브라우저 정책):", error)
            })
        }
      }
    }

    // 오디오 에러 처리
    const handleError = (e: Event) => {
      console.error("BGM 파일 로드 실패:", e)
      const target = e.target as HTMLAudioElement
      if (target.error) {
        console.error("오디오 에러 코드:", target.error.code)
        console.error("오디오 에러 메시지:", target.error.message)
        console.error("BGM 파일 경로:", BGM_PATH)
        console.error(
          "파일이 손상되었거나 지원하지 않는 형식일 수 있습니다.",
        )
      }
    }

    // 오디오 로드 이벤트
    audio.addEventListener("canplaythrough", handleCanPlay)
    audio.addEventListener("loadeddata", () => {
      console.log("BGM 파일 로드 완료")
    })
    audio.addEventListener("error", handleError)

    // 사용자 상호작용 후 재생
    const handleUserInteraction = () => {
      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true
        audio
          .play()
          .then(() => {
            console.log("BGM 재생 시작 (사용자 상호작용 후)")
          })
          .catch((error) => {
            console.error("BGM 재생 실패:", error)
          })
        // 이벤트 리스너 제거
        document.removeEventListener("click", handleUserInteraction)
        document.removeEventListener("touchstart", handleUserInteraction)
        document.removeEventListener("keydown", handleUserInteraction)
      }
    }

    // 사용자 상호작용 이벤트 리스너 추가
    document.addEventListener("click", handleUserInteraction, { once: true })
    document.addEventListener("touchstart", handleUserInteraction, {
      once: true,
    })
    document.addEventListener("keydown", handleUserInteraction, { once: true })

    // 컴포넌트 언마운트 시 정리
    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay)
      audio.removeEventListener("error", handleError)
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // 컴포넌트는 UI를 렌더링하지 않음 (백그라운드 재생)
  return null
}

