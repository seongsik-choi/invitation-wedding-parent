
const RULES = {
  name: {
    maxLength: 10,
  },
  count: {
    min: 0,
    default: 1,
  },
}

export const AttendanceInfo = () => {
  return null
}

const AttendanceModalContent = () => {
  const { closeModal } = useModal()
  const inputRef = useRef({ side: {}, meal: {} }) as React.RefObject<{
    side: {
      groom: HTMLInputElement
      bride: HTMLInputElement
    }
    name: HTMLInputElement
    meal: {
      yes: HTMLInputElement
      undecided: HTMLInputElement
      no: HTMLInputElement
    }
    count: HTMLInputElement
  }>
  const [loading, setLoading] = useState(false)

  return (
    <form
      id="attendance-form"
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const form = e.currentTarget
          const formData = new FormData(form)
          
          const side = formData.get("side") as string | null
          const name = (formData.get("name") as string) || ""
          const meal = formData.get("meal") as string | null
          const count = Number(formData.get("count") || 0)

          if (!side) {
            alert("신랑 또는 신부를 선택해주세요.")
            setLoading(false)
            return
          }

          if (!name) {
            alert("성함을 입력해주세요.")
            setLoading(false)
            return
          }
          if (name.length > RULES.name.maxLength) {
            alert(`성함을 ${RULES.name.maxLength}자 이하로 입력해주세요.`)
            setLoading(false)
            return
          }

          if (!meal) {
            alert("식사 여부를 선택해주세요.")
            setLoading(false)
            return
          }

          if (isNaN(count)) {
            alert("참석 인원을 입력해주세요.")
            setLoading(false)
            return
          }
          if (count < RULES.count.min) {
            alert(`참석 인원을 ${RULES.count.min}명 이상으로 입력해주세요.`)
            setLoading(false)
            return
          }

          const requestBody = { side, name, meal, count }
          console.log("전송 데이터:", requestBody)

          const res = await fetch(`${SERVER_URL}/attendance`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          })
          if (!res.ok) {
            throw new Error(res.statusText)
          }

          alert("참석 의사가 성공적으로 전달되었습니다.")
          closeModal()
        } catch {
          alert("참석 의사 전달에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      <div className="input-group">
        <div className="label">구분</div>
        <div className="select-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="groom"
              hidden
              defaultChecked
              ref={(ref) => {
                if (ref && inputRef.current) {
                  inputRef.current.side.groom = ref
                }
              }}
            />
            <span>신랑</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="bride"
              hidden
              ref={(ref) => {
                if (ref && inputRef.current) {
                  inputRef.current.side.bride = ref
                }
              }}
            />
            <span>신부</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">성함</div>
        <div className="input">
          <input
            disabled={loading}
            type="text"
            name="name"
            placeholder="참석자 성함을 입력해주세요."
            maxLength={RULES.name.maxLength}
            ref={(ref) => {
              if (ref && inputRef.current) {
                inputRef.current.name = ref
              }
            }}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="label">식사</div>
        <div className="radio-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="yes"
              ref={(ref) => {
                if (ref && inputRef.current) {
                  inputRef.current.meal.yes = ref
                }
              }}
            />
            <span>예정</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="undecided"
              ref={(ref) => {
                if (ref && inputRef.current) {
                  inputRef.current.meal.undecided = ref
                }
              }}
            />
            <span>미정</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="no"
              ref={(ref) => {
                if (ref && inputRef.current) {
                  inputRef.current.meal.no = ref
                }
              }}
            />
            <span>불참</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">참석 인원 (본인 포함)</div>
        <div>
          <input
            disabled={loading}
            type="number"
            name="count"
            min={RULES.count.min}
            defaultValue={RULES.count.default}
            ref={(ref) => {
              if (ref && inputRef.current) {
                inputRef.current.count = ref
              }
            }}
          />
          명
        </div>
      </div>
    </form>
  )
}
const AttendanceModalFooter = () => {
  const { closeModal } = useModal()
  return (
    <>
      <Button buttonStyle="style2" type="submit" form="attendance-form">
        전달하기
      </Button>
      <Button
        buttonStyle="style2"
        className="bg-light-grey-color text-dark-color"
        onClick={closeModal}
      >
        닫기
      </Button>
    </>
  )
}

const attendanceModalInfo = {
  className: "attendance-modal",
  header: <div className="title">참석 의사 전달하기</div>,
  content: <AttendanceModalContent />,
  footer: <AttendanceModalFooter />,
}
