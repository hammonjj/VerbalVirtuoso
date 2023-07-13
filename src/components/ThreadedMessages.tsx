import { useEffect, useRef } from "react";

interface IThreadedMessagesProps {
  messages: string[];
}

export default function ThreadedMessages(props: IThreadedMessagesProps) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  useEffect(() => {
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
      {props.messages.map((message, index) => (
        <div
          key={index}
          style={{ 
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            backgroundColor: index % 2 === 0 ? '#e0e0e0' : '#f0f0f0', 
          }}
        >
          {message}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}