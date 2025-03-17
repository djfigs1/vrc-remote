import { useRemoteStore } from "@/data/remote-store";
import { HStack, IconButton, Input } from "@chakra-ui/react";
import React, { memo, useCallback, useState } from "react";
import { LuLink2, LuLink2Off } from "react-icons/lu";
import { useShallow } from "zustand/shallow";

type ConnectionInputProps = {};

const ConnectionInput: React.FC<ConnectionInputProps> = memo(({}) => {
  const [address, setAddress] = useState<string>("");
  let { connectionStatus, connect, disconnect } = useRemoteStore(
    useShallow(({ connect, disconnect, connection: { status } }) => ({
      connectionStatus: status,
      connect,
      disconnect,
    }))
  );

  const onClick = useCallback(() => {
    if (connectionStatus === "disconnected") {
      connect(address);
    } else {
      disconnect();
    }
  }, [connectionStatus, address, connect, disconnect]);

  return (
    <HStack gap="2">
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        disabled={connectionStatus !== "disconnected"}
        placeholder="Enter a server address..."
        flex={1}
      />
      <IconButton onClick={onClick} tabIndex={-1}>
        {connectionStatus === "disconnected" ? <LuLink2 /> : <LuLink2Off />}
      </IconButton>
    </HStack>
  );
});

export default ConnectionInput;
