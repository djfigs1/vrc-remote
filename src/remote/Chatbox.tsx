import { useRemoteStore } from "@/data/remote-store";
import { VRChatMaxMessageLength } from "@/types/vrc";
import {
  Flex,
  HStack,
  IconButton,
  Input,
  Stack,
  Switch,
} from "@chakra-ui/react";
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

  const submitAndClearMessage = useCallback(() => {
    sendMessage(message);
    setMessage("");
  }, [message]);

  const onInputKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        submitAndClearMessage();
      }
    },
    [submitAndClearMessage]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    },
    []
  );

  return (
    <Stack gap="4">
      <HStack flex={1}>
        <Input
          variant={"subtle"}
          value={message}
          disabled={connectionStatus !== "connected"}
          onChange={onInputChange}
          placeholder="Enter a message to send..."
          maxLength={VRChatMaxMessageLength}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onInputKeyDown}
        />

        <IconButton
          disabled={message.length == 0}
          onClick={submitAndClearMessage}
        >
          <MdSend />
        </IconButton>
      </HStack>
    </Stack>
  );
};

export default Chatbox;
