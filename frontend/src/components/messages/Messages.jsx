import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import useListenTyping from "../../hooks/useListenTyping";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const { isTyping } = useListenTyping();
  const { selectedConversation } = useConversation();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages, isTyping]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}

      {isTyping && (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={selectedConversation?.profilePic} alt="avatar" />
            </div>
          </div>
          <div className="chat-bubble bg-gray-700 flex gap-1 items-center py-3">
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
