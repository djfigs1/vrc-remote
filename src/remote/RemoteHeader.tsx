import { HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { SiVrchat } from "react-icons/si";
import ConnectionIndicator from "./ConnectionIndicator";

type VRCRemoteHeaderProps = {};

const VRCRemoteHeader: React.FC<VRCRemoteHeaderProps> = ({}) => {
  return (
    <HStack justify="space-between">
      <HStack>
        <Icon size="2xl">
          <SiVrchat />
        </Icon>
        <Text>Remote</Text>
      </HStack>
      <ConnectionIndicator />
    </HStack>
  );
};

export default VRCRemoteHeader;
