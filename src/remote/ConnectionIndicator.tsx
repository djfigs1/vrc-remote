import { useRemoteStore } from "@/data/remote-store";
import { ConnectionStatus } from "@/types/remote";
import { HStack, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { IconType } from "react-icons";
import { LuEllipsis } from "react-icons/lu";
import { MdCheck, MdClose } from "react-icons/md";

type ConnectionIndicatorProps = {};

let ConnectionIcons: Record<ConnectionStatus, IconType> = {
  disconnected: MdClose,
  connecting: LuEllipsis,
  connected: MdCheck,
};

let ConnectionText: Record<ConnectionStatus, string> = {
  disconnected: "Disconnected",
  connecting: "Connecting",
  connected: "Connected",
};

let ConnectionColors: Record<ConnectionStatus, string | undefined> = {
  disconnected: undefined,
  connecting: "gold",
  connected: "green",
};

const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = memo(({}) => {
  let status = useRemoteStore((state) => state.connection.status);
  let ConnectionIcon = ConnectionIcons[status];
  let text = ConnectionText[status];
  let color = ConnectionColors[status];

  return (
    <HStack color={color}>
      <ConnectionIcon />
      <Text>{text}</Text>
    </HStack>
  );
});

export default ConnectionIndicator;
