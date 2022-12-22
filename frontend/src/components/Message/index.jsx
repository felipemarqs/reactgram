import { MsgContainer, MsgSucessContainer, MsgErrorContainer } from "./styles";

export function Message({ msg, type }) {
  return (
    <>
    
    <MsgErrorContainer>
          <p>{msg}</p>
        </MsgErrorContainer>
      {type === "error" && (
        <MsgErrorContainer>
          <p>{msg}</p>
        </MsgErrorContainer>
      )}
    </>
  );
};
