import { useRemoteStore } from "@/data/remote-store";
import { VRChatMaxMessageLength } from "@/types/vrc";
import { HStack, IconButton, Input } from "@chakra-ui/react";
import React, { KeyboardEvent, useCallback, useState } from "react";
import { MdSend } from "react-icons/md";
import { useShallow } from "zustand/shallow";

type ChatboxProps = {
  onNewMessage?: (message: string) => void;
};

const Chatbox: React.FC<ChatboxProps> = ({}) => {
  const [message, setMessage] = useState<string>("");
  const { connectionStatus, setTyping, sendMessage } = useRemoteStore(
    useShallow(({ setTyping, sendMessage, connection: { status } }) => ({
      connectionStatus: status,
      setTyping,
      sendMessage,
    }))
  );

  const onFocus = useCallback(() => {
    setTyping(true);
  }, [setTyping]);

  const onBlur = useCallback(() => {
    setTyping(false);
  }, [setTyping]);

  const onSendMessage = useCallback(() => {
    sendMessage(message);
    setMessage("");
  }, [message]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        onSendMessage();
      }
    },
    [onSendMessage]
  );

  return (
    <HStack>
      <Input
        variant={"subtle"}
        value={message}
        disabled={connectionStatus !== "connected"}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message to send..."
        maxLength={VRChatMaxMessageLength}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      <IconButton disabled={message.length == 0} onClick={onSendMessage}>
        <MdSend />
      </IconButton>
    </HStack>
  );
};

export default Chatbox;
