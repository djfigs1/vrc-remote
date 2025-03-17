import { useRemoteStore } from "@/data/remote-store";
import { HStack, IconButton, Input } from "@chakra-ui/react";
import React from "react";
import { LuLink2, LuLink2Off } from "react-icons/lu";

type ConnectionInputProps = {};

const ConnectionInput: React.FC<ConnectionInputProps> = ({}) => {
  let status = useRemoteStore((state) => state.connection.status);
  return (
    <HStack gap="2">
      <Input
        disabled={status !== "disconnected"}
        placeholder="Enter a server address..."
        flex={1}
      />
      <IconButton>
        {status === "disconnected" ? <LuLink2 /> : <LuLink2Off />}
      </IconButton>
    </HStack>
  );
};

export default ConnectionInput;
