import CustomButton from "@components/CustomButton";
import { ChatAction } from "@utils/types";

interface ChatHeaderProps {
  dispatch: React.Dispatch<ChatAction>;
}

export default function ChatHeader(props: ChatHeaderProps) {
  function clearMessages() {
    props.dispatch({ type: "CLEAR_MESSAGES" });
  }

  return (
    <div style={{ display: "flex", marginBottom: "1rem" }}>
      <CustomButton label="Model 3.5" onClick={() => {}} />
      <CustomButton label="Model 4.0" onClick={() => {}} />
      <CustomButton label="Clear Chat" onClick={clearMessages} />
    </div>
  );
}