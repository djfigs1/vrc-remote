import { useRemoteStore } from "@/data/remote-store";
import { HStack, IconButton, Input } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { MdSend } from "react-icons/md";
import { useShallow } from "zustand/shallow";

type ChatboxProps = {
  onNewMessage?: (message: string) => void;
};

const VRChatMaxMessageLength = 144;

const Chatbox: React.FC<ChatboxProps> = ({}) => {
  const [message, setMessage] = useState<string>("");
  const { connectionStatus, setTyping } = useRemoteStore(
    useShallow(({ setTyping, connection: { status } }) => ({
      connectionStatus: status,
      setTyping,
    }))
  );

  const onFocus = useCallback(() => {
    setTyping(true);
  }, [setTyping]);

  const onBlur = useCallback(() => {
    setTyping(false);
  }, [setTyping]);

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
      />
      <IconButton disabled={message.length == 0}>
        <MdSend />
      </IconButton>
    </HStack>
  );
};

export default Chatbox;
