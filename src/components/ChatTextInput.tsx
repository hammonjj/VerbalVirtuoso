import { IconButton, InputAdornment, TextField } from "@mui/material";
import { ChatAction } from "@utils/types";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

interface ChatTextInputProps {
  dispatch: React.Dispatch<ChatAction>;
  isBotReady: boolean;
  loadingResponse: boolean;
}

export default function ChatTextInput(props: ChatTextInputProps) {
  const [message, setMessage] = useState("");

  function onMessageSend() {
    props.dispatch({ type: "ADD_MESSAGE", payload: { message: message, submission: "USER"} });
    setMessage("");
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if(event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onMessageSend();
    }
  }

  return (
    <TextField
      id="outlined-multiline-static"
      label="Message"
      value={message}
      disabled={!props.isBotReady || props.loadingResponse}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      multiline
      style={{ width: '60%', marginBottom: '1rem' }}
      minRows={1}
      maxRows={4}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton 
              type="button" 
              aria-label="send"
              onClick={onMessageSend}
              disabled={!props.isBotReady || props.loadingResponse}
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}