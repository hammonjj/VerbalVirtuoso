import { Divider } from "@mui/material";
import { useEffect, useReducer } from "react";
import useUser from "@hooks/useUser";
import ThreadedMessages from "@components/ThreadedMessages";
import ChatHeader from "@components/Header/ChatHeader";
import ChatTextInput from "@components/ChatTextInput";
import { ChatAction } from "@utils/types";

interface ChatState {
  messages: string[];
}

const intialChatState: ChatState = {
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
  const user = useUser();
  const [state, dispatch] = useReducer(reducer, intialChatState);

  useEffect(() => {
    console.log("Messages Updated:", state.messages[state.messages.length - 1]);
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
      <ChatTextInput dispatch={dispatch} />
    </div>
  );
}
