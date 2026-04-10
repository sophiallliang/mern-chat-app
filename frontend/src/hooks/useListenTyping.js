import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenTyping = () => {
	const { socket } = useSocketContext();
	const { selectedConversation } = useConversation();
	const [isTyping, setIsTyping] = useState(false);

	useEffect(() => {
		socket?.on("typing", (senderId) => {
			if (senderId === selectedConversation?._id) {
				setIsTyping(true);
			}
		});

		socket?.on("stopTyping", (senderId) => {
			if (senderId === selectedConversation?._id) {
				setIsTyping(false);
			}
		});

		return () => {
			socket?.off("typing");
			socket?.off("stopTyping");
		};
	}, [socket, selectedConversation]);

	return { isTyping };
};

export default useListenTyping;
