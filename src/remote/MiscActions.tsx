import { HStack } from "@chakra-ui/react";
import React from "react";
import VRChatButton from "./VRChatButtonInput";
import { MdMenu, MdWarning } from "react-icons/md";
import VoiceControl from "./VoiceControl";

type MiscActionsProps = {};

const MiscActions: React.FC<MiscActionsProps> = ({}) => {
  return (
    <HStack justify={"center"}>
      <VRChatButton button="quickMenuToggleLeft">
        <MdMenu />
      </VRChatButton>
      <VoiceControl />
      <VRChatButton colorPalette={"red"} button="panicButton">
        <MdWarning />
      </VRChatButton>
    </HStack>
  );
};

export default MiscActions;
