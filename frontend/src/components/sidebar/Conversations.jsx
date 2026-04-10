import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = ({ search }) => {
  const { loading, conversations } = useGetConversations();

  const filtered = conversations.filter((c) =>
    c.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filtered.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === filtered.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
