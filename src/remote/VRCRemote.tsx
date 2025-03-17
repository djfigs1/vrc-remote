import { Box, Card, HStack, Separator, Stack } from "@chakra-ui/react";
import React from "react";
import Chatbox from "./Chatbox";
import MovementControl from "./MovementControl";
import VoiceControl from "./VoiceControl";
import VRChatKeyPressListeners, {
  VRChatKeyPressConfig,
} from "./VRChatKeyboardButtons";
import ConnectionInput from "./ConnectionInput";
import VRCRemoteHeader from "./RemoteHeader";
import MiscActions from "./MiscActions";

type VRCRemoteProps = {};

const keysConfig: VRChatKeyPressConfig = {
  w: {
    button: "moveForward",
  },
  a: {
    button: "moveLeft",
  },
  d: {
    button: "moveRight",
  },
  s: {
    button: "moveBackward",
  },
  q: {
    button: "lookLeft",
  },
  e: {
    button: "lookRight",
  },
  v: {
    button: "voice",
  },
  " ": {
    button: "jump",
  },
  shift: {
    button: "run",
  },
  m: {
    button: "quickMenuToggleLeft",
  },
};

const VRCRemote: React.FC<VRCRemoteProps> = ({}) => {
  return (
    <>
      <Card.Root size="lg" minWidth={"512px"}>
        <Card.Header>
          <Stack gap="4">
            <VRCRemoteHeader />
            <Box flex={1}>
              <ConnectionInput />
            </Box>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Stack gap="4">
            <MovementControl />
            <MiscActions />
          </Stack>
        </Card.Body>
        <Card.Footer>
          <HStack flex={1}>
            <Box flex={1}>
              <Chatbox />
            </Box>
          </HStack>
        </Card.Footer>
      </Card.Root>
      <VRChatKeyPressListeners keysConfig={keysConfig} />
    </>
  );
};

export default VRCRemote;
