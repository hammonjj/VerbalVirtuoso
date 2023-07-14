import CustomButton from "@components/CustomButton";
import { isMobileDevice } from "@utils/helpers";
import { ChatAction } from "@utils/types";

interface ChatHeaderProps {
  dispatch: React.Dispatch<ChatAction>;
}

export default function ChatHeader(props: ChatHeaderProps) {
  function clearMessages() {
    props.dispatch({ type: "CLEAR_MESSAGES" });
  }

  const marginTop = isMobileDevice() ? "0rem" : "1rem";
  return (
    <div style={{ display: "flex", marginBottom: "1rem", marginTop: marginTop }}>
      <CustomButton label="Clear Chat" onClick={clearMessages} />
    </div>
  );
}