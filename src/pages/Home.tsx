import { Divider } from "@mui/material";
import { useEffect, useReducer } from "react";
import ThreadedMessages from "@components/ThreadedMessages";
import ChatHeader from "@components/Header/ChatHeader";
import ChatTextInput from "@components/ChatTextInput";
import { ChatAction, ChatGPTPrompt, ChatMessage } from "@utils/types";
import useChatGPT from "@hooks/useChatGPT";

interface ChatState {
  messages: ChatMessage[];
}

const initialChatState: ChatState = {
  messages: []
}

const reducer = (state: ChatState, action: ChatAction) => {
  switch (action.type) {
    case "CLEAR_MESSAGES":
      return {
        ...state,
        messages: []
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
}

interface IHomeProps {
  isMobileDevice: boolean;
}

export default function Home(props: IHomeProps) {
  const { isReady, submitPrompt, loadingResponse } = useChatGPT();
  const [state, dispatch] = useReducer(reducer, initialChatState);

  useEffect(() => {
    async function submitNewPrompt() {
      const prompt: ChatGPTPrompt = {
        prompt: state.messages[state.messages.length - 1].message,
      }

      const response = await submitPrompt(prompt);
      dispatch({ type: "ADD_MESSAGE", payload: { message: response, submission: 'BOT' } });
    }

    if(isReady && 
      state.messages.length > 0 && 
      state.messages[state.messages.length - 1].submission === "USER") {
      submitNewPrompt();
    }
  }, [state.messages]);

  return (
    <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        height: "95.5vh", 
        justifyContent: "center", 
        alignItems: "center", 
        paddingLeft: props.isMobileDevice ? "0" : "15rem",
        paddingRight: props.isMobileDevice ? "0" : "0.5rem",
      }}
    >
      <ChatHeader dispatch={dispatch} />
      <ThreadedMessages messages={state.messages} />
      <Divider style={{ marginTop: 'auto', marginBottom: "1rem" }} />
      <ChatTextInput dispatch={dispatch} isBotReady={isReady} loadingResponse={loadingResponse} />
    </div>
  );
}
