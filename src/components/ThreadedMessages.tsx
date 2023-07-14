import { ChatMessage } from "@utils/types";
import { useEffect, useRef, useState } from "react";

interface IThreadedMessagesProps {
  messages: ChatMessage[];
}

export default function ThreadedMessages(props: IThreadedMessagesProps) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  useEffect(() => {
    if(props.messages.length === 0) {
      setMessages([]);
      return;
    }
    
    const lastMessage = props.messages[props.messages.length - 1];
    if(lastMessage.submission === "USER") {
      setMessages([...messages, lastMessage]);
    } else {
      const processedMessage: ChatMessage = {
        submission: "BOT",
        message: processMessage(lastMessage.message)
      };

      setMessages([...messages, processedMessage]);
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.messages]);

  return (
    <div style = {{ 
      width: "100%",
      height: "100%",
      overflowY: "auto",
      marginBottom: '1rem'
      }}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          style={{ 
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            backgroundColor: index % 2 === 0 ? '#323232' : '#232323', //Will need to update to reflect user or bot and deal with theme
          }}
          dangerouslySetInnerHTML={{ __html: message.message }}
        />
         
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

function processMessage(message: string) {
  //Will need to use React-Code-Blocks for the code parsing
  //https://www.npmjs.com/package/react-code-blocks
  const italicRegex = /(\*|_)(.*?)\1/g;
  const boldRegex = /(\*\*|__)(.*?)\1/g;
  const codeBlockRegex = /(```|~~~)([\s\S]*?)\1/g;

  let formattedText = message.replace(/\n/g, "<br>");
  formattedText = formattedText.replace(boldRegex, '<strong>$2</strong>');
  formattedText = formattedText.replace(italicRegex, '<em>$2</em>');
  formattedText = formattedText.replace(codeBlockRegex, '<hr><pre><code>$2</code></pre><hr>');

  return formattedText;
}