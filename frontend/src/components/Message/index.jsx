import { MsgContainer, MsgSucessContainer, MsgErrorContainer } from "./styles";

export function Message({ msg, type }) {
  return (
    <>
      {type === "error" && (
        <MsgErrorContainer>
          <p>{msg}</p>
        </MsgErrorContainer>
      )}

      {type === "success" && (
        <MsgSucessContainer>
          <p>{msg}</p>
        </MsgSucessContainer>
      )}
    </>
  );
}
