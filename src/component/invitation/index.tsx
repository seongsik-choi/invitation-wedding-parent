import { Fragment } from "react/jsx-runtime"
import {
  BRIDE_FULLNAME,
  BRIDE_INFO,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM_FULLNAME,
  GROOM_INFO,
  GROOM_FATHER,
  GROOM_MOTHER,
  GROOM_TITLE,
  BRIDE_TITLE,
} from "../../const"
import { useModal } from "../modal"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"

export const Invitation = () => {
  const { openModal, closeModal } = useModal()
  return (
    <LazyDiv className="card invitation">
      <h2 className="english">Invitation</h2>

      <div className="break" />

      <div className="content">차분한 겨울 햇살이 머무는 날</div>
      <div className="content">소중한 분들을 모시고</div>
      <div className="content">서로의 평생을 약속하려 합니다.</div>
      <div className="break" />
      <div className="content">바람 불면 서로의 벽이 되고,</div>
      <div className="content">비가 내리면 한 울타리가 되어</div>
      <div className="content">따뜻한 부부로 걸어가겠습니다.</div>
      <div className="break" />
      <div className="content">1월 10일, 수화와 성식의 시작에</div>
      <div className="content">함께해 주셔서 축복해 주세요.</div>

      <div className="break" />

      <div className="name">
        {GROOM_FATHER} · {GROOM_MOTHER}
        <span className="relation">
          의 <span className="relation-name">{GROOM_TITLE}</span>
        </span>{" "}
        {GROOM_FULLNAME}
      </div>
      <div className="name">
        {BRIDE_FATHER} · {BRIDE_MOTHER}
        <span className="relation">
          의 <span className="relation-name">{BRIDE_TITLE}</span>
        </span>{" "}
        {BRIDE_FULLNAME}
      </div>

      <div className="break" />

      <Button
        onClick={() => {
          openModal({
            className: "contact-modal",
            closeOnClickBackground: true,
            header: (
              <div className="title-group">
                <div className="title">축하 인사 전하기</div>
                <div className="subtitle">
                  전화, 문자메세지로 축하 인사를 전해보세요.
                </div>
              </div>
            ),
            content: (
              <>
                <div className="contact-info">
                  {[
                    ...GROOM_INFO.filter(({ phone, relation }) => !!phone && relation === "신랑 아버지"),
                    ...GROOM_INFO.filter(({ phone, relation }) => !!phone && relation === "신랑 어머니"),
                  ].map(({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div>{name}</div>
                      <div>
                        <PhoneIcon
                          className="flip icon"
                          onClick={() => {
                            window.open(`tel:${phone}`, "_self")
                          }}
                        />
                        <EnvelopeIcon
                          className="icon"
                          onClick={() => {
                            window.open(`sms:${phone}`, "_self")
                          }}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div className="break" />
                <div className="contact-info">
                  {[
                    ...BRIDE_INFO.filter(({ phone, relation }) => !!phone && relation === "신부 아버지"),
                    ...BRIDE_INFO.filter(({ phone, relation }) => !!phone && relation === "신부 어머니"),
                  ].map(({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div>{name}</div>
                      <div>
                        <PhoneIcon
                          className="flip icon"
                          onClick={() => {
                            window.open(`tel:${phone}`, "_self")
                          }}
                        />
                        <EnvelopeIcon
                          className="icon"
                          onClick={() => {
                            window.open(`sms:${phone}`, "_self")
                          }}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
                <div className="break" />
                <div className="contact-info">
                  {[
                    ...GROOM_INFO.filter(({ phone, relation }) => !!phone && relation === "신랑"),
                    ...BRIDE_INFO.filter(({ phone, relation }) => !!phone && relation === "신부"),
                  ].map(({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div>{name}</div>
                      <div>
                        <PhoneIcon
                          className="flip icon"
                          onClick={() => {
                            window.open(`tel:${phone}`, "_self")
                          }}
                        />
                        <EnvelopeIcon
                          className="icon"
                          onClick={() => {
                            window.open(`sms:${phone}`, "_self")
                          }}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            ),
            footer: (
              <Button
                buttonStyle="style2"
                className="bg-light-grey-color text-dark-color"
                onClick={closeModal}
              >
                닫기
              </Button>
            ),
          })
        }}
      >
        연락하기
      </Button>
    </LazyDiv>
  )
}
